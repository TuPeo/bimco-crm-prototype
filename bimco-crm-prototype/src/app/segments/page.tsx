'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import SegmentModal from '@/components/SegmentModal';
import CreateEventModal from '@/components/CreateEventModal';
import CreateInteractionModal from '@/components/CreateInteractionModal';
import Link from 'next/link';
import { Segment } from '@/types';
import {
  RectangleGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  CurrencyDollarIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Mock data - replace with actual API calls
const initialSegments: Segment[] = [
  {
    id: '1',
    name: 'High Value Customers',
    description: 'Customers with purchases over $10,000',
    criteria: {
      companies: {
        statuses: ['M1'],
        types: ['A1', 'A2']
      }
    },
    memberCount: 156,
    status: 'Active',
    createdBy: 'John Smith',
    dateCreated: '2024-01-15',
    lastUpdated: '2024-02-10',
    onHold: false,
    readyForInvoice: true
  },
  {
    id: '2',
    name: 'New Members',
    description: 'Members joined in the last 30 days',
    criteria: {
      companies: {
        statuses: ['M0']
      },
      contacts: {
        roles: ['Manager', 'Director']
      }
    },
    memberCount: 87,
    status: 'Active',
    createdBy: 'Sarah Johnson',
    dateCreated: '2024-02-01',
    lastUpdated: '2024-02-20',
    onHold: false,
    readyForInvoice: false
  },
  {
    id: '3',
    name: 'Training Prospects',
    description: 'Companies interested in maritime training',
    criteria: {
      courses: {
        categories: ['Maritime Training', 'Safety & Security']
      },
      companies: {
        types: ['B1', 'B2']
      }
    },
    memberCount: 234,
    status: 'Draft',
    createdBy: 'Mike Davis',
    dateCreated: '2024-01-20',
    lastUpdated: '2024-02-15',
    onHold: true,
    readyForInvoice: false
  },
  {
    id: '4',
    name: 'European Members',
    description: 'Companies based in European countries',
    criteria: {
      companies: {
        countries: ['Denmark', 'Germany', 'Norway', 'Sweden']
      }
    },
    memberCount: 432,
    status: 'Active',
    createdBy: 'Anna Nielsen',
    dateCreated: '2024-01-10',
    lastUpdated: '2024-02-18',
    onHold: false,
    readyForInvoice: true
  }
];

export default function SegmentsPage() {
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal states
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);
  const [segmentModalMode, setSegmentModalMode] = useState<'add' | 'edit'>('add');
  const [activeSegmentForAction, setActiveSegmentForAction] = useState<Segment | null>(null);

  const filteredSegments = segments.filter(segment => {
    const matchesSearch = segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         segment.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         segment.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || segment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Archived': 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCreateEvent = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      setActiveSegmentForAction(segment);
      setIsEventModalOpen(true);
    }
  };

  const handleCreateInteraction = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      setActiveSegmentForAction(segment);
      setIsInteractionModalOpen(true);
    }
  };

  const handleRemoveHold = (segmentId: string) => {
    if (confirm('Are you sure you want to remove hold status from this segment?')) {
      const updatedSegments = segments.map(segment =>
        segment.id === segmentId
          ? { ...segment, onHold: false, lastUpdated: new Date().toISOString() }
          : segment
      );
      setSegments(updatedSegments);
      alert('Hold status removed successfully');
    }
  };

  const handleSetReadyForInvoice = (segmentId: string) => {
    if (confirm('Are you sure you want to set this segment as ready for invoice?')) {
      const updatedSegments = segments.map(segment =>
        segment.id === segmentId
          ? { ...segment, readyForInvoice: true, lastUpdated: new Date().toISOString() }
          : segment
      );
      setSegments(updatedSegments);
      alert('Segment set as ready for invoice');
    }
  };

  const handleAddSegment = () => {
    setSegmentModalMode('add');
    setEditingSegment(null);
    setIsSegmentModalOpen(true);
  };

  const handleEditSegment = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      setSegmentModalMode('edit');
      setEditingSegment(segment);
      setIsSegmentModalOpen(true);
    }
  };

  const handleDeleteSegment = (segmentId: string) => {
    if (confirm('Are you sure you want to delete this segment? This action cannot be undone.')) {
      setSegments(segments.filter(s => s.id !== segmentId));
      alert('Segment deleted successfully');
    }
  };

  const handleSaveSegment = (segmentData: Omit<Segment, 'id'> | Segment) => {
    if (segmentModalMode === 'add') {
      const newSegment: Segment = {
        ...(segmentData as Omit<Segment, 'id'>),
        id: (Math.max(...segments.map(s => parseInt(s.id)), 0) + 1).toString()
      };
      setSegments([...segments, newSegment]);
      alert('Segment created successfully');
    } else if (segmentModalMode === 'edit' && 'id' in segmentData) {
      setSegments(segments.map(s => 
        s.id === segmentData.id ? segmentData as Segment : s
      ));
      alert('Segment updated successfully');
    }
  };

  const handleSaveEvent = (eventData: { title: string; [key: string]: unknown }) => {
    console.log('Event created:', eventData);
    alert(`Event "${eventData.title}" created successfully for segment "${activeSegmentForAction?.name}"`);
    setActiveSegmentForAction(null);
  };

  const handleSaveInteraction = (interactionData: { subject: string; [key: string]: unknown }) => {
    console.log('Interaction created:', interactionData);
    alert(`Interaction "${interactionData.subject}" created successfully for segment "${activeSegmentForAction?.name}"`);
    setActiveSegmentForAction(null);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Segment Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Create and manage customer segments for targeted campaigns and interactions
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleAddSegment}
              className="bimco-btn-primary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Segment
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bimco-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search segments by name, description, or creator..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <FunnelIcon className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Segments List */}
          <div className="divide-y divide-gray-200">
            {filteredSegments.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <RectangleGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-400 text-sm">
                  No segments found matching your criteria.
                </div>
                <button
                  onClick={handleAddSegment}
                  className="text-blue-600 hover:text-blue-500 mt-2 inline-block"
                >
                  Create your first segment
                </button>
              </div>
            ) : (
              filteredSegments.map((segment) => (
                <div
                  key={segment.id}
                  className="px-6 py-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {segment.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(segment.status)}`}>
                          {segment.status}
                        </span>
                        {segment.onHold && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <PauseIcon className="h-3 w-3 mr-1" />
                            On Hold
                          </span>
                        )}
                        {segment.readyForInvoice && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <CurrencyDollarIcon className="h-3 w-3 mr-1" />
                            Ready for Invoice
                          </span>
                        )}
                      </div>
                      
                      {segment.description && (
                        <p className="text-sm text-gray-600 mb-2">{segment.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" />
                          {segment.memberCount.toLocaleString()} members
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          Created: {formatDate(segment.dateCreated)}
                        </span>
                        <span>By: {segment.createdBy}</span>
                        <span>Updated: {formatDate(segment.lastUpdated)}</span>
                      </div>

                      {/* Criteria Preview */}
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-gray-500">Criteria:</span>
                        {segment.criteria.companies && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            Companies
                          </span>
                        )}
                        {segment.criteria.contacts && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700">
                            Contacts
                          </span>
                        )}
                        {segment.criteria.courses && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-50 text-orange-700">
                            Courses
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {/* Quick Actions Menu */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCreateEvent(segment.id)}
                          className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                          title="Create Event"
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCreateInteraction(segment.id)}
                          className="p-2 text-green-600 hover:text-green-700 transition-colors"
                          title="Create Interaction"
                        >
                          <PlayIcon className="h-4 w-4" />
                        </button>
                        {segment.onHold && (
                          <button
                            onClick={() => handleRemoveHold(segment.id)}
                            className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                            title="Remove Hold"
                          >
                            <PlayIcon className="h-4 w-4" />
                          </button>
                        )}
                        {!segment.readyForInvoice && segment.status === 'Active' && (
                          <button
                            onClick={() => handleSetReadyForInvoice(segment.id)}
                            className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                            title="Set Ready for Invoice"
                          >
                            <CurrencyDollarIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Main Actions */}
                      <Link
                        href={`/segments/${segment.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleEditSegment(segment.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Segment"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSegment(segment.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Segment"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Active Segments</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.filter(s => s.status === 'Active').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <PauseIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">On Hold</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.filter(s => s.onHold).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Ready for Invoice</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.filter(s => s.readyForInvoice).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Members</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.reduce((sum, s) => sum + s.memberCount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SegmentModal
        isOpen={isSegmentModalOpen}
        onClose={() => setIsSegmentModalOpen(false)}
        onSave={handleSaveSegment}
        segment={editingSegment}
        mode={segmentModalMode}
      />

      <CreateEventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setActiveSegmentForAction(null);
        }}
        onSave={handleSaveEvent}
        segmentName={activeSegmentForAction?.name}
      />

      <CreateInteractionModal
        isOpen={isInteractionModalOpen}
        onClose={() => {
          setIsInteractionModalOpen(false);
          setActiveSegmentForAction(null);
        }}
        onSave={handleSaveInteraction}
        segmentName={activeSegmentForAction?.name}
      />
    </Layout>
  );
}
