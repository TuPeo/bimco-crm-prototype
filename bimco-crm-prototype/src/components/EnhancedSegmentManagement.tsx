'use client';

import { useState, useEffect } from 'react';
import { 
  UserGroupIcon,
  FunnelIcon,
  ChartBarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  TagIcon,
  AdjustmentsHorizontalIcon,
  DocumentArrowDownIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';

export interface Segment {
  id: string;
  name: string;
  description?: string;
  criteria: SegmentCriteria[];
  contactCount: number;
  lastUpdated: string;
  createdAt: string;
  createdBy: string;
  status: 'active' | 'inactive' | 'draft';
  type: 'static' | 'dynamic' | 'behavioral' | 'geographic' | 'demographic' | 'psychographic';
  tags: string[];
  autoRefresh: boolean;
  refreshInterval?: number; // hours
  lastRefreshAt?: string;
  estimatedReach: number;
  conversionRate?: number;
  revenue?: number;
  campaigns: string[];
}

export interface SegmentCriteria {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in' | 'is_null' | 'is_not_null';
  value: string | number | string[] | number[];
  logicalOperator?: 'AND' | 'OR';
}

export interface SegmentPerformance {
  segmentId: string;
  emailsSent: number;
  emailsOpened: number;
  emailsClicked: number;
  conversions: number;
  revenue: number;
  engagementScore: number;
  churnRate: number;
  growthRate: number;
  lastCalculated: string;
}

interface EnhancedSegmentManagementProps {
  segments: Segment[];
  performances: SegmentPerformance[];
  availableFields: string[];
  onCreateSegment: (segment: Omit<Segment, 'id' | 'createdAt' | 'lastUpdated' | 'contactCount' | 'estimatedReach'>) => void;
  onUpdateSegment: (segmentId: string, segment: Partial<Segment>) => void;
  onDeleteSegment: (segmentId: string) => void;
  onRefreshSegment: (segmentId: string) => void;
  onDuplicateSegment: (segmentId: string) => void;
  onExportSegment: (segmentId: string, format: 'csv' | 'excel' | 'pdf') => void;
}

export default function EnhancedSegmentManagement({
  segments,
  performances,
  availableFields,
  onCreateSegment,
  onUpdateSegment,
  onDeleteSegment,
  onRefreshSegment,
  onDuplicateSegment,
  onExportSegment
}: EnhancedSegmentManagementProps) {
  const [activeTab, setActiveTab] = useState<'segments' | 'builder' | 'analytics'>('segments');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [builderSegment, setBuilderSegment] = useState<Partial<Segment>>({
    name: '',
    description: '',
    criteria: [],
    status: 'draft',
    type: 'static',
    tags: [],
    autoRefresh: false
  });

  // Segment List Management
  const SegmentList = () => {
    const filteredSegments = segments.filter(segment => {
      const matchesSearch = segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (segment.description && segment.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || segment.status === statusFilter;
      const matchesType = typeFilter === 'all' || segment.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status: Segment['status']) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800';
        case 'inactive':
          return 'bg-gray-100 text-gray-800';
        case 'draft':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getTypeColor = (type: Segment['type']) => {
      switch (type) {
        case 'dynamic':
          return 'bg-blue-100 text-blue-800';
        case 'behavioral':
          return 'bg-purple-100 text-purple-800';
        case 'geographic':
          return 'bg-green-100 text-green-800';
        case 'demographic':
          return 'bg-orange-100 text-orange-800';
        case 'psychographic':
          return 'bg-pink-100 text-pink-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getPerformance = (segmentId: string): SegmentPerformance | undefined => {
      return performances.find(p => p.segmentId === segmentId);
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Customer Segments</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredSegments.length} segments • {segments.reduce((sum, s) => sum + s.contactCount, 0)} total contacts
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Create Segment</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <DocumentArrowDownIcon className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search segments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="static">Static</option>
            <option value="dynamic">Dynamic</option>
            <option value="behavioral">Behavioral</option>
            <option value="geographic">Geographic</option>
            <option value="demographic">Demographic</option>
            <option value="psychographic">Psychographic</option>
          </select>
        </div>

        {/* Segments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSegments.map((segment) => {
            const performance = getPerformance(segment.id);
            return (
              <div key={segment.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{segment.name}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => onRefreshSegment(segment.id)}
                      className="text-gray-400 hover:text-blue-600"
                      title="Refresh"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedSegment(segment)}
                      className="text-gray-400 hover:text-blue-600"
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="text-gray-400 hover:text-blue-600"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteSegment(segment.id)}
                      className="text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {segment.description && (
                  <p className="text-sm text-gray-600 mb-3">{segment.description}</p>
                )}

                {/* Metrics */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Contacts</span>
                    <span className="text-sm font-medium text-gray-900">
                      {segment.contactCount.toLocaleString()}
                    </span>
                  </div>
                  {performance && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Engagement</span>
                        <span className="text-sm font-medium text-gray-900">
                          {performance.engagementScore}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Revenue</span>
                        <span className="text-sm font-medium text-gray-900">
                          ${performance.revenue.toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Status and Type */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(segment.status)}`}>
                    {segment.status.charAt(0).toUpperCase() + segment.status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(segment.type)}`}>
                    {segment.type.charAt(0).toUpperCase() + segment.type.slice(1)}
                  </span>
                </div>

                {/* Tags */}
                {segment.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {segment.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {segment.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        +{segment.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Auto Refresh Status */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    {segment.autoRefresh ? (
                      <>
                        <PlayIcon className="w-3 h-3 text-green-500" />
                        <span>Auto-refresh ON</span>
                      </>
                    ) : (
                      <>
                        <PauseIcon className="w-3 h-3 text-gray-400" />
                        <span>Manual refresh</span>
                      </>
                    )}
                  </div>
                  <span>Updated {new Date(segment.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSegments.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No segments found</h3>
            <p className="text-gray-500">Create your first segment to organize your contacts.</p>
          </div>
        )}
      </div>
    );
  };

  // Segment Builder
  const SegmentBuilder = () => {
    const [criteriaErrors, setCriteriaErrors] = useState<Record<string, string>>({});

    const addCriteria = () => {
      const newCriteria: SegmentCriteria = {
        id: `criteria_${Date.now()}`,
        field: availableFields[0] || '',
        operator: 'equals',
        value: '',
        logicalOperator: builderSegment.criteria?.length === 0 ? undefined : 'AND'
      };
      
      setBuilderSegment(prev => ({
        ...prev,
        criteria: [...(prev.criteria || []), newCriteria]
      }));
    };

    const removeCriteria = (criteriaId: string) => {
      setBuilderSegment(prev => ({
        ...prev,
        criteria: prev.criteria?.filter(c => c.id !== criteriaId) || []
      }));
    };

    const updateCriteria = (criteriaId: string, updates: Partial<SegmentCriteria>) => {
      setBuilderSegment(prev => ({
        ...prev,
        criteria: prev.criteria?.map(c => 
          c.id === criteriaId ? { ...c, ...updates } : c
        ) || []
      }));
    };

    const handleSave = () => {
      if (builderSegment.name && builderSegment.criteria && builderSegment.criteria.length > 0) {
        onCreateSegment({
          name: builderSegment.name,
          description: builderSegment.description,
          criteria: builderSegment.criteria,
          status: builderSegment.status || 'draft',
          type: builderSegment.type || 'static',
          tags: builderSegment.tags || [],
          autoRefresh: builderSegment.autoRefresh || false,
          refreshInterval: builderSegment.refreshInterval,
          createdBy: 'Current User', // This should come from auth context
          campaigns: []
        });
        
        // Reset builder
        setBuilderSegment({
          name: '',
          description: '',
          criteria: [],
          status: 'draft',
          type: 'static',
          tags: [],
          autoRefresh: false
        });
        setIsBuilderOpen(false);
      }
    };

    if (!isBuilderOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Segment Builder</h3>
              <button
                onClick={() => setIsBuilderOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Basic Information */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Segment Name</label>
                  <input
                    type="text"
                    value={builderSegment.name || ''}
                    onChange={(e) => setBuilderSegment(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter segment name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={builderSegment.type || 'static'}
                    onChange={(e) => setBuilderSegment(prev => ({ ...prev, type: e.target.value as Segment['type'] }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="static">Static</option>
                    <option value="dynamic">Dynamic</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="geographic">Geographic</option>
                    <option value="demographic">Demographic</option>
                    <option value="psychographic">Psychographic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={builderSegment.description || ''}
                  onChange={(e) => setBuilderSegment(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe this segment..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={builderSegment.autoRefresh || false}
                    onChange={(e) => setBuilderSegment(prev => ({ ...prev, autoRefresh: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Auto-refresh segment</span>
                </label>
                {builderSegment.autoRefresh && (
                  <div>
                    <select
                      value={builderSegment.refreshInterval || 24}
                      onChange={(e) => setBuilderSegment(prev => ({ ...prev, refreshInterval: parseInt(e.target.value) }))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value={1}>Every hour</option>
                      <option value={6}>Every 6 hours</option>
                      <option value={12}>Every 12 hours</option>
                      <option value={24}>Daily</option>
                      <option value={168}>Weekly</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Criteria Builder */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Segment Criteria</h4>
                <button
                  onClick={addCriteria}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Criteria</span>
                </button>
              </div>

              <div className="space-y-3">
                {builderSegment.criteria?.map((criteria, index) => (
                  <div key={criteria.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    {index > 0 && (
                      <select
                        value={criteria.logicalOperator || 'AND'}
                        onChange={(e) => updateCriteria(criteria.id, { logicalOperator: e.target.value as 'AND' | 'OR' })}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    )}
                    
                    <select
                      value={criteria.field}
                      onChange={(e) => updateCriteria(criteria.id, { field: e.target.value })}
                      className="border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                    >
                      {availableFields.map((field) => (
                        <option key={field} value={field}>{field}</option>
                      ))}
                    </select>

                    <select
                      value={criteria.operator}
                      onChange={(e) => updateCriteria(criteria.id, { operator: e.target.value as SegmentCriteria['operator'] })}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="equals">equals</option>
                      <option value="not_equals">not equals</option>
                      <option value="contains">contains</option>
                      <option value="not_contains">not contains</option>
                      <option value="greater_than">greater than</option>
                      <option value="less_than">less than</option>
                      <option value="between">between</option>
                      <option value="in">in</option>
                      <option value="not_in">not in</option>
                      <option value="is_null">is null</option>
                      <option value="is_not_null">is not null</option>
                    </select>

                    <input
                      type="text"
                      value={Array.isArray(criteria.value) ? criteria.value.join(', ') : criteria.value?.toString() || ''}
                      onChange={(e) => updateCriteria(criteria.id, { value: e.target.value })}
                      className="border border-gray-300 rounded px-2 py-1 text-sm flex-1"
                      placeholder="Value"
                    />

                    <button
                      onClick={() => removeCriteria(criteria.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {(!builderSegment.criteria || builderSegment.criteria.length === 0) && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <FunnelIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">Add criteria to define your segment</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsBuilderOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!builderSegment.name || !builderSegment.criteria || builderSegment.criteria.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Segment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Segment Detail Modal
  const SegmentDetailModal = () => {
    if (!selectedSegment) return null;

    const performance = performances.find(p => p.segmentId === selectedSegment.id);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedSegment.name}</h3>
                <p className="text-sm text-gray-500">{selectedSegment.description}</p>
              </div>
              <button
                onClick={() => setSelectedSegment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Performance Metrics */}
            {performance && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900">Engagement Score</h4>
                  <p className="text-2xl font-bold text-blue-600">{performance.engagementScore}%</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-green-900">Revenue</h4>
                  <p className="text-2xl font-bold text-green-600">${performance.revenue.toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-purple-900">Conversions</h4>
                  <p className="text-2xl font-bold text-purple-600">{performance.conversions}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-900">Growth Rate</h4>
                  <p className="text-2xl font-bold text-orange-600">{performance.growthRate.toFixed(1)}%</p>
                </div>
              </div>
            )}

            {/* Segment Criteria */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Segment Criteria</h4>
              <div className="space-y-2">
                {selectedSegment.criteria.map((criteria, index) => (
                  <div key={criteria.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    {index > 0 && (
                      <span className="text-sm font-medium text-gray-600">
                        {criteria.logicalOperator}
                      </span>
                    )}
                    <span className="text-sm text-gray-800">
                      <strong>{criteria.field}</strong> {criteria.operator} <strong>{criteria.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => onExportSegment(selectedSegment.id, 'csv')}
                className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Export CSV
              </button>
              <button
                onClick={() => onExportSegment(selectedSegment.id, 'excel')}
                className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
              >
                Export Excel
              </button>
              <button
                onClick={() => onDuplicateSegment(selectedSegment.id)}
                className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Duplicate Segment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'segments', name: 'Segments', icon: UserGroupIcon },
            { id: 'builder', name: 'Builder', icon: FunnelIcon },
            { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'segments' | 'builder' | 'analytics')}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'segments' && <SegmentList />}
      {activeTab === 'builder' && (
        <div className="text-center py-12">
          <FunnelIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Segment Builder</h3>
          <p className="text-gray-500 mb-4">Create sophisticated customer segments with advanced criteria</p>
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Segment Builder
          </button>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <ChartBarIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Segment Analytics</h3>
          <p className="text-gray-500">Advanced analytics and performance insights coming soon</p>
        </div>
      )}

      {/* Modals */}
      <SegmentBuilder />
      {selectedSegment && <SegmentDetailModal />}
    </div>
  );
}
