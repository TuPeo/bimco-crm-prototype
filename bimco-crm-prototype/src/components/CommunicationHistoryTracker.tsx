'use client';

import { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  PlusIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export interface CommunicationRecord {
  id: string;
  type: 'email' | 'phone' | 'meeting' | 'video_call' | 'note';
  subject: string;
  description: string;
  date: string;
  direction: 'inbound' | 'outbound';
  participants: string[];
  attachments?: string[];
  tags?: string[];
  createdBy: string;
  createdAt: string;
}

interface CommunicationHistoryTrackerProps {
  contactId: string;
  contactName: string;
  history: CommunicationRecord[];
  onUpdate: (history: CommunicationRecord[]) => void;
  readOnly?: boolean;
}

export default function CommunicationHistoryTracker({
  contactId,
  contactName,
  history,
  onUpdate,
  readOnly = false
}: CommunicationHistoryTrackerProps) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | CommunicationRecord['type']>('all');
  const [formData, setFormData] = useState({
    type: 'email' as CommunicationRecord['type'],
    subject: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    direction: 'outbound' as 'inbound' | 'outbound',
    participants: '',
    tags: ''
  });

  const communicationTypes = [
    { value: 'email', label: 'Email', icon: EnvelopeIcon, color: 'text-blue-600' },
    { value: 'phone', label: 'Phone Call', icon: PhoneIcon, color: 'text-green-600' },
    { value: 'meeting', label: 'Meeting', icon: ChatBubbleLeftRightIcon, color: 'text-purple-600' },
    { value: 'video_call', label: 'Video Call', icon: VideoCameraIcon, color: 'text-red-600' },
    { value: 'note', label: 'Note', icon: UserIcon, color: 'text-gray-600' }
  ];

  const getTypeConfig = (type: CommunicationRecord['type']) => {
    return communicationTypes.find(t => t.value === type) || communicationTypes[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord: CommunicationRecord = {
      id: `comm-${Date.now()}`,
      type: formData.type,
      subject: formData.subject,
      description: formData.description,
      date: formData.date,
      direction: formData.direction,
      participants: formData.participants.split(',').map(p => p.trim()).filter(Boolean),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdBy: 'Current User', // Would be from auth context
      createdAt: new Date().toISOString()
    };

    onUpdate([newRecord, ...history]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'email',
      subject: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      direction: 'outbound',
      participants: '',
      tags: ''
    });
    setShowForm(false);
  };

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(record => record.type === filter);

  const sortedHistory = filteredHistory.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Communication History</h3>
          <p className="text-sm text-gray-500">
            {history.length} records for {contactName}
          </p>
        </div>
        {!readOnly && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Record
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
            filter === 'all'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({history.length})
        </button>
        {communicationTypes.map((type) => {
          const count = history.filter(h => h.type === type.value).length;
          return (
            <button
              key={type.value}
              onClick={() => setFilter(type.value as CommunicationRecord['type'])}
              className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap ${
                filter === type.value
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <type.icon className={`w-4 h-4 mr-1 ${type.color}`} />
              {type.label} ({count})
            </button>
          );
        })}
      </div>

      {/* History Timeline */}
      <div className="space-y-4">
        {sortedHistory.length === 0 ? (
          <div className="text-center py-8">
            <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No communication records</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? 'Get started by creating a new communication record.'
                : `No ${getTypeConfig(filter as CommunicationRecord['type']).label.toLowerCase()} records found.`
              }
            </p>
          </div>
        ) : (
          sortedHistory.map((record) => {
            const typeConfig = getTypeConfig(record.type);
            const IconComponent = typeConfig.icon;
            
            return (
              <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 p-2 rounded-full bg-gray-100`}>
                    <IconComponent className={`w-5 h-5 ${typeConfig.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          {record.subject || `${typeConfig.label} Record`}
                        </h4>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          record.direction === 'inbound' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {record.direction}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {record.description && (
                      <p className="mt-1 text-sm text-gray-600">{record.description}</p>
                    )}
                    
                    {record.participants.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">Participants: </span>
                        <span className="text-xs text-gray-700">
                          {record.participants.join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {record.tags && record.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {record.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-gray-400">
                      Added by {record.createdBy} on {new Date(record.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Record Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Add Communication Record</h3>
              <button 
                onClick={resetForm} 
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Communication Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    type: e.target.value as CommunicationRecord['type'] 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {communicationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject/Title
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief subject or title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Detailed description or notes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Direction
                  </label>
                  <select
                    value={formData.direction}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      direction: e.target.value as 'inbound' | 'outbound' 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="outbound">Outbound</option>
                    <option value="inbound">Inbound</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Participants (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.participants}
                  onChange={(e) => setFormData(prev => ({ ...prev, participants: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe, Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="urgent, follow-up, contract"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
