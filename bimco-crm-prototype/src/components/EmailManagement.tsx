'use client';

import { useState } from 'react';
import { 
  CloudIcon,
  BellIcon,
  CogIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
  LinkIcon,
  InformationCircleIcon,
  XMarkIcon,
  DocumentIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

import {
  QueueListIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';

// Original EmailTemplate interface (for backward compatibility)
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'course' | 'marketing' | 'support' | 'newsletter' | 'event' | 'system' | 'invoice' | 'certificate';
  variables: string[];
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
  isActive: boolean;
  dotdigitalTemplateId?: string;
}

// Original EmailCampaign interface (for backward compatibility)
export interface EmailCampaign {
  id: string;
  name: string;
  templateId: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'failed';
  recipientSegments: string[];
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribeCount: number;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
}

// New Dotdigital Campaign Interface
export interface DotdigitalCampaign {
  id: string;
  dotdigitalId: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'failed';
  assignedArea: 'MyAccount' | 'SmartCon' | 'Business Central' | 'Course Management' | 'General';
  triggerType: 'manual' | 'event' | 'scheduled' | 'api';
  triggerEvents: string[];
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribeCount: number;
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  lastSyncAt: string;
  syncStatus: 'synced' | 'pending' | 'failed' | 'never';
  dotdigitalUrl?: string;
}

// Trigger Event Interface
export interface TriggerEvent {
  id: string;
  name: string;
  description: string;
  eventType: 'event_registration' | 'invoice_ready' | 'course_completion' | 'certificate_issued' | 'payment_received' | 'custom';
  isActive: boolean;
  associatedCampaigns: string[];
  conditions: {
    [key: string]: any;
  };
  notificationDelay: number; // in minutes
  createdAt: string;
}

// Mail Queue Interface
export interface EmailQueue {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  content: string;
  templateId?: string;
  campaignId?: string;
  priority: 'high' | 'normal' | 'low';
  status: 'queued' | 'processing' | 'sent' | 'failed' | 'scheduled';
  scheduledAt?: string;
  sentAt?: string;
  failureReason?: string;
  retryCount: number;
  maxRetries: number;
  deliveryMethod: 'direct' | 'dotdigital';
  metadata: {
    courseId?: string;
    contactId?: string;
    eventType?: 'course_registration' | 'enrollment_confirmation' | 'course_reminder' | 'invoice_ready' | 'certificate_issued';
    invoiceId?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

interface EmailManagementProps {
  templates: EmailTemplate[];
  campaigns: EmailCampaign[];
  dotdigitalCampaigns?: DotdigitalCampaign[];
  triggerEvents?: TriggerEvent[];
  emailQueue?: EmailQueue[];
  onCreateTemplate: (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'usageCount'>) => void;
  onUpdateTemplate: (templateId: string, template: Partial<EmailTemplate>) => void;
  onDeleteTemplate: (templateId: string) => void;
  onCreateCampaign: (campaign: Omit<EmailCampaign, 'id' | 'createdAt' | 'sentCount' | 'deliveredCount' | 'openCount' | 'clickCount' | 'bounceCount' | 'unsubscribeCount'>) => void;
  onUpdateCampaign: (campaignId: string, campaign: Partial<EmailCampaign>) => void;
  onDeleteCampaign: (campaignId: string) => void;
  onSyncDotdigital?: () => Promise<void>;
  onCreateTrigger?: (trigger: Omit<TriggerEvent, 'id' | 'createdAt'>) => void;
  onUpdateTrigger?: (triggerId: string, updates: Partial<TriggerEvent>) => void;
  onDeleteTrigger?: (triggerId: string) => void;
  onProcessQueue?: (queueId: string) => void;
  onRetryQueueItem?: (queueId: string) => void;
}

export default function EmailManagement({
  templates,
  campaigns,
  dotdigitalCampaigns = [],
  triggerEvents = [],
  emailQueue = [],
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  onCreateCampaign,
  onUpdateCampaign,
  onDeleteCampaign,
  onSyncDotdigital,
  onCreateTrigger,
  onUpdateTrigger,
  onDeleteTrigger,
  onProcessQueue,
  onRetryQueueItem
}: EmailManagementProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'campaigns' | 'dotdigital' | 'queue' | 'triggers' | 'settings'>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());

  // Handle Dotdigital sync
  const handleSync = async () => {
    if (!onSyncDotdigital) return;
    setIsSyncing(true);
    try {
      await onSyncDotdigital();
      setLastSyncTime(new Date());
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  // Get area-specific styling
  const getAreaColor = (area: string) => {
    const colors: { [key: string]: string } = {
      'MyAccount': 'bg-blue-100 text-blue-800',
      'SmartCon': 'bg-purple-100 text-purple-800',
      'Business Central': 'bg-green-100 text-green-800',
      'Course Management': 'bg-orange-100 text-orange-800',
      'General': 'bg-gray-100 text-gray-800'
    };
    return colors[area] || 'bg-gray-100 text-gray-800';
  };

  // Get status styling and icon
  const getStatusInfo = (status: string) => {
    const statusConfig: { [key: string]: { color: string; icon: any } } = {
      'sent': { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      'sending': { color: 'bg-blue-100 text-blue-800', icon: ArrowPathIcon },
      'scheduled': { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
      'paused': { color: 'bg-orange-100 text-orange-800', icon: PauseIcon },
      'failed': { color: 'bg-red-100 text-red-800', icon: ExclamationTriangleIcon },
      'draft': { color: 'bg-gray-100 text-gray-800', icon: PencilIcon }
    };
    return statusConfig[status] || statusConfig['draft'];
  };

  // Templates Tab Component
  const TemplatesTab = () => {
    const [newTemplate, setNewTemplate] = useState<Partial<EmailTemplate>>({
      name: '',
      subject: '',
      content: '',
      category: 'course',
      variables: [],
      isActive: true
    });

    const filteredTemplates = templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const handleCreateTemplate = () => {
      if (newTemplate.name && newTemplate.subject && newTemplate.content) {
        onCreateTemplate(newTemplate as Omit<EmailTemplate, 'id' | 'createdAt' | 'usageCount'>);
        setNewTemplate({
          name: '',
          subject: '',
          content: '',
          category: 'course',
          variables: [],
          isActive: true
        });
        setIsCreateModalOpen(false);
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create and manage email templates for various purposes
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="course">Course</option>
            <option value="marketing">Marketing</option>
            <option value="support">Support</option>
            <option value="newsletter">Newsletter</option>
            <option value="event">Event</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <DocumentIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingItem(template)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteTemplate(template.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">{template.subject}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                    template.category === 'course' ? 'bg-blue-100 text-blue-800' :
                    template.category === 'marketing' ? 'bg-green-100 text-green-800' :
                    template.category === 'support' ? 'bg-yellow-100 text-yellow-800' :
                    template.category === 'newsletter' ? 'bg-purple-100 text-purple-800' :
                    template.category === 'event' ? 'bg-pink-100 text-pink-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {template.category}
                  </span>
                  <span>Used {template.usageCount} times</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${template.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                    {template.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {template.lastUsed ? `Last used ${new Date(template.lastUsed).toLocaleDateString()}` : 'Never used'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Template Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Create Email Template</h3>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                    <input
                      type="text"
                      value={newTemplate.name || ''}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter template name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newTemplate.category || 'course'}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value as EmailTemplate['category'] }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="course">Course</option>
                      <option value="marketing">Marketing</option>
                      <option value="support">Support</option>
                      <option value="newsletter">Newsletter</option>
                      <option value="event">Event</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
                    <input
                      type="text"
                      value={newTemplate.subject || ''}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Content</label>
                    <textarea
                      value={newTemplate.content || ''}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                      rows={8}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email content..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={newTemplate.isActive || true}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                      Active template
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateTemplate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Campaigns Tab Component
  const CampaignsTab = () => {
    const getStatusColor = (status: string) => {
      const colors: { [key: string]: string } = {
        'sent': 'bg-green-100 text-green-800',
        'sending': 'bg-blue-100 text-blue-800',
        'scheduled': 'bg-yellow-100 text-yellow-800',
        'paused': 'bg-orange-100 text-orange-800',
        'failed': 'bg-red-100 text-red-800',
        'draft': 'bg-gray-100 text-gray-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Email Campaigns</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage and monitor email campaigns
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PaperAirplaneIcon className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">
                        Created {new Date(campaign.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div>{campaign.sentCount} / {campaign.totalRecipients} sent</div>
                      <div className="text-xs text-gray-500">{campaign.deliveredCount} delivered</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-1">
                      <div>Open: {campaign.deliveredCount > 0 ? Math.round((campaign.openCount / campaign.deliveredCount) * 100) : 0}%</div>
                      <div>Click: {campaign.openCount > 0 ? Math.round((campaign.clickCount / campaign.openCount) * 100) : 0}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteCampaign(campaign.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Dotdigital Campaigns Tab Component (enhanced feature)
  const DotdigitalTab = () => {
    if (!onSyncDotdigital) {
      return (
        <div className="text-center py-12">
          <CloudIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Dotdigital Integration</h3>
          <p className="text-gray-500">Dotdigital integration is not configured</p>
        </div>
      );
    }

    const filteredCampaigns = dotdigitalCampaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === 'all' || campaign.assignedArea === selectedArea;
      return matchesSearch && matchesArea;
    });

    return (
      <div className="space-y-6">
        {/* Header with Sync */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Dotdigital Campaigns</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage email campaigns synchronized from Dotdigital platform
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-gray-500">
              Last sync: {lastSyncTime.toLocaleTimeString()}
            </div>
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <CloudIcon className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
            </button>
          </div>
        </div>

        {/* Sync Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <InformationCircleIcon className="w-5 h-5 text-blue-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-900">Sync Status</h3>
              <p className="text-sm text-blue-700 mt-1">
                {dotdigitalCampaigns.filter(c => c.syncStatus === 'synced').length} campaigns synced, 
                {dotdigitalCampaigns.filter(c => c.syncStatus === 'pending').length} pending, 
                {dotdigitalCampaigns.filter(c => c.syncStatus === 'failed').length} failed
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Areas</option>
            <option value="MyAccount">MyAccount</option>
            <option value="SmartCon">SmartCon</option>
            <option value="Business Central">Business Central</option>
            <option value="Course Management">Course Management</option>
            <option value="General">General</option>
          </select>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => {
            const statusInfo = getStatusInfo(campaign.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <StatusIcon className={`w-5 h-5 ${
                      campaign.status === 'sending' ? 'animate-spin text-blue-600' : 'text-gray-600'
                    }`} />
                    <h3 className="font-semibold text-gray-900 truncate">{campaign.name}</h3>
                  </div>
                  <div className="flex space-x-2 ml-2">
                    {campaign.dotdigitalUrl && (
                      <a
                        href={campaign.dotdigitalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600"
                        title="Open in Dotdigital"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setEditingItem(campaign)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <CogIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-gray-600 truncate">{campaign.subject}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAreaColor(campaign.assignedArea)}`}>
                      {campaign.assignedArea}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusInfo.color}`}>
                      {campaign.status}
                    </span>
                  </div>

                  {/* Performance metrics */}
                  {campaign.status === 'sent' && (
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium">Delivered</div>
                        <div>{campaign.deliveredCount}/{campaign.totalRecipients}</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium">Opens</div>
                        <div>{campaign.openCount} ({campaign.deliveredCount > 0 ? Math.round((campaign.openCount/campaign.deliveredCount)*100) : 0}%)</div>
                      </div>
                    </div>
                  )}

                  {/* Sync status */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className={`flex items-center space-x-1 ${
                      campaign.syncStatus === 'synced' ? 'text-green-600' :
                      campaign.syncStatus === 'pending' ? 'text-yellow-600' :
                      campaign.syncStatus === 'failed' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        campaign.syncStatus === 'synced' ? 'bg-green-500' :
                        campaign.syncStatus === 'pending' ? 'bg-yellow-500' :
                        campaign.syncStatus === 'failed' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`} />
                      <span>{campaign.syncStatus}</span>
                    </span>
                    <span>
                      Synced {new Date(campaign.lastSyncAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <CloudIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-500">Try syncing with Dotdigital or adjust your search filters</p>
          </div>
        )}
      </div>
    );
  };

  // Mail Queue Tab Component
  const MailQueueTab = () => {
    const [queueFilter, setQueueFilter] = useState<'all' | 'queued' | 'processing' | 'sent' | 'failed' | 'scheduled'>('all');

    const getStatusColor = (status: EmailQueue['status']) => {
      const colors = {
        'sent': 'bg-green-100 text-green-800',
        'processing': 'bg-blue-100 text-blue-800',
        'queued': 'bg-gray-100 text-gray-800',
        'scheduled': 'bg-yellow-100 text-yellow-800',
        'failed': 'bg-red-100 text-red-800'
      };
      return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority: EmailQueue['priority']) => {
      const colors = {
        'high': 'bg-red-50 text-red-700 border-red-200',
        'normal': 'bg-blue-50 text-blue-700 border-blue-200',
        'low': 'bg-gray-50 text-gray-700 border-gray-200'
      };
      return colors[priority];
    };

    const getEventTypeIcon = (eventType?: string) => {
      switch (eventType) {
        case 'course_registration':
          return <DocumentIcon className="w-4 h-4 text-blue-600" />;
        case 'enrollment_confirmation':
          return <CheckCircleIcon className="w-4 h-4 text-green-600" />;
        case 'course_reminder':
          return <ClockIcon className="w-4 h-4 text-yellow-600" />;
        case 'invoice_ready':
          return <DocumentIcon className="w-4 h-4 text-orange-600" />;
        case 'certificate_issued':
          return <DocumentIcon className="w-4 h-4 text-purple-600" />;
        default:
          return <PaperAirplaneIcon className="w-4 h-4 text-gray-600" />;
      }
    };

    const filteredQueue = emailQueue.filter(item => {
      const matchesSearch = item.recipientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = queueFilter === 'all' || item.status === queueFilter;
      return matchesSearch && matchesStatus;
    });

    const queueStats = {
      total: emailQueue.length,
      queued: emailQueue.filter(item => item.status === 'queued').length,
      processing: emailQueue.filter(item => item.status === 'processing').length,
      sent: emailQueue.filter(item => item.status === 'sent').length,
      failed: emailQueue.filter(item => item.status === 'failed').length,
      scheduled: emailQueue.filter(item => item.status === 'scheduled').length
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Mail Queue Management</h2>
            <p className="text-sm text-gray-600 mt-1">
              Monitor and manage scheduled and queued email deliveries
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onProcessQueue?.('all')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <PlayIcon className="w-4 h-4" />
              <span>Process Queue</span>
            </button>
          </div>
        </div>

        {/* Queue Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="text-2xl font-bold text-gray-900">{queueStats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-800">{queueStats.queued}</div>
            <div className="text-sm text-yellow-700">Queued</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-800">{queueStats.processing}</div>
            <div className="text-sm text-blue-700">Processing</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-800">{queueStats.scheduled}</div>
            <div className="text-sm text-orange-700">Scheduled</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-800">{queueStats.sent}</div>
            <div className="text-sm text-green-700">Sent</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-800">{queueStats.failed}</div>
            <div className="text-sm text-red-700">Failed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search queue items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={queueFilter}
            onChange={(e) => setQueueFilter(e.target.value as typeof queueFilter)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="queued">Queued</option>
            <option value="processing">Processing</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Queue Items */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQueue.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getEventTypeIcon(item.metadata?.eventType)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{item.recipientName}</div>
                          <div className="text-sm text-gray-500">{item.recipientEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{item.subject}</div>
                      {item.metadata?.courseId && (
                        <div className="text-xs text-gray-500">Course: {item.metadata.courseId}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                      {item.status === 'failed' && item.failureReason && (
                        <div className="text-xs text-red-600 mt-1 max-w-xs truncate" title={item.failureReason}>
                          {item.failureReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded border text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.deliveryMethod === 'dotdigital' ? (
                          <CloudIcon className="w-4 h-4 text-blue-600 mr-1" />
                        ) : (
                          <ServerIcon className="w-4 h-4 text-gray-600 mr-1" />
                        )}
                        <span className="text-sm text-gray-900">{item.deliveryMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.scheduledAt ? (
                        <div>
                          <div>{new Date(item.scheduledAt).toLocaleDateString()}</div>
                          <div className="text-xs">{new Date(item.scheduledAt).toLocaleTimeString()}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Immediate</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        {item.status === 'failed' && (
                          <button
                            onClick={() => onRetryQueueItem?.(item.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Retry sending"
                          >
                            <ArrowPathIcon className="w-4 h-4" />
                          </button>
                        )}
                        {(item.status === 'queued' || item.status === 'scheduled') && (
                          <button
                            onClick={() => onProcessQueue?.(item.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Process immediately"
                          >
                            <PlayIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingItem(item)}
                          className="text-gray-600 hover:text-gray-900"
                          title="View details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredQueue.length === 0 && (
          <div className="text-center py-12">
            <QueueListIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No queue items found</h3>
            <p className="text-gray-500">No emails match the current filter criteria</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'templates', name: 'Templates', icon: DocumentIcon },
            { id: 'campaigns', name: 'Campaigns', icon: PaperAirplaneIcon },
            ...(onSyncDotdigital ? [{ id: 'dotdigital', name: 'Dotdigital', icon: CloudIcon }] : []),
            { id: 'queue', name: 'Mail Queue', icon: QueueListIcon },
            ...(onCreateTrigger ? [{ id: 'triggers', name: 'Triggers', icon: BellIcon }] : []),
            { id: 'settings', name: 'Settings', icon: CogIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
      {activeTab === 'templates' && <TemplatesTab />}
      {activeTab === 'campaigns' && <CampaignsTab />}
      {activeTab === 'dotdigital' && <DotdigitalTab />}
      {activeTab === 'queue' && <MailQueueTab />}
      {activeTab === 'triggers' && (
        <div className="text-center py-12">
          <BellIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Trigger Events</h3>
          <p className="text-gray-500">Trigger-based notifications feature coming soon</p>
        </div>
      )}
      {activeTab === 'settings' && (
        <div className="text-center py-12">
          <CogIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Email Settings</h3>
          <p className="text-gray-500">Email management settings coming soon</p>
        </div>
      )}
    </div>
  );
}
