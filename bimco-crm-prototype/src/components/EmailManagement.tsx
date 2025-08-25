'use client';

import { useState } from 'react';
import { 
  PaperAirplaneIcon,
  DocumentIcon,
  UserGroupIcon,
  ClockIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon,
  FolderIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: 'course' | 'marketing' | 'support' | 'newsletter' | 'event' | 'system';
  variables: string[];
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
  isActive: boolean;
}

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

export interface EmailAnalytics {
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  revenueGenerated?: number;
}

interface EmailManagementProps {
  templates: EmailTemplate[];
  campaigns: EmailCampaign[];
  onCreateTemplate: (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'usageCount'>) => void;
  onUpdateTemplate: (templateId: string, template: Partial<EmailTemplate>) => void;
  onDeleteTemplate: (templateId: string) => void;
  onCreateCampaign: (campaign: Omit<EmailCampaign, 'id' | 'createdAt' | 'sentCount' | 'deliveredCount' | 'openCount' | 'clickCount' | 'bounceCount' | 'unsubscribeCount'>) => void;
  onUpdateCampaign: (campaignId: string, campaign: Partial<EmailCampaign>) => void;
  onDeleteCampaign: (campaignId: string) => void;
}

export default function EmailManagement({
  templates,
  campaigns,
  onCreateTemplate,
  onUpdateTemplate,
  onDeleteTemplate,
  onCreateCampaign,
  onUpdateCampaign,
  onDeleteCampaign
}: EmailManagementProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'campaigns' | 'analytics'>('templates');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EmailTemplate | EmailCampaign | null>(null);

  // Template Management
  const EmailTemplateManager = () => {
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
          <h2 className="text-xl font-semibold text-gray-900">Email Templates</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PencilIcon className="w-4 h-4" />
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

  // Campaign Management
  const EmailCampaignManager = () => {
    const getStatusColor = (status: EmailCampaign['status']) => {
      switch (status) {
        case 'sent':
          return 'bg-green-100 text-green-800';
        case 'sending':
          return 'bg-blue-100 text-blue-800';
        case 'scheduled':
          return 'bg-yellow-100 text-yellow-800';
        case 'paused':
          return 'bg-orange-100 text-orange-800';
        case 'failed':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const calculateAnalytics = (campaign: EmailCampaign): EmailAnalytics => ({
      deliveryRate: campaign.totalRecipients > 0 ? (campaign.deliveredCount / campaign.totalRecipients) * 100 : 0,
      openRate: campaign.deliveredCount > 0 ? (campaign.openCount / campaign.deliveredCount) * 100 : 0,
      clickRate: campaign.openCount > 0 ? (campaign.clickCount / campaign.openCount) * 100 : 0,
      bounceRate: campaign.totalRecipients > 0 ? (campaign.bounceCount / campaign.totalRecipients) * 100 : 0,
      unsubscribeRate: campaign.totalRecipients > 0 ? (campaign.unsubscribeCount / campaign.totalRecipients) * 100 : 0,
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Email Campaigns</h2>
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
              {campaigns.map((campaign) => {
                const analytics = calculateAnalytics(campaign);
                return (
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
                        <div>Open: {analytics.openRate.toFixed(1)}%</div>
                        <div>Click: {analytics.clickRate.toFixed(1)}%</div>
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
                );
              })}
            </tbody>
          </table>
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
            { id: 'templates', name: 'Templates', icon: DocumentIcon },
            { id: 'campaigns', name: 'Campaigns', icon: PaperAirplaneIcon },
            { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'templates' | 'campaigns' | 'analytics')}
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
      {activeTab === 'templates' && <EmailTemplateManager />}
      {activeTab === 'campaigns' && <EmailCampaignManager />}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <ChartBarIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Email Analytics</h3>
          <p className="text-gray-500">Detailed analytics dashboard coming soon</p>
        </div>
      )}
    </div>
  );
}
