'use client';

import React, { useState } from 'react';
import { XMarkIcon, ChatBubbleLeftRightIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface CreateInteractionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (interactionData: { subject: string; [key: string]: unknown }) => void;
  segmentName?: string;
}

export default function CreateInteractionModal({ isOpen, onClose, onSave, segmentName }: CreateInteractionModalProps) {
  const [formData, setFormData] = useState({
    type: 'Email',
    subject: '',
    description: '',
    targetAudience: 'All Members',
    customAudience: [] as string[],
    priority: 'Medium',
    scheduledDate: '',
    scheduledTime: '',
    template: '',
    personalization: true,
    trackOpens: true,
    trackClicks: true,
    followUpRequired: false,
    followUpDays: 7,
    tags: [] as string[],
    attachments: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTag, setNewTag] = useState('');
  const [newRecipient, setNewRecipient] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseInt(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addRecipient = () => {
    if (newRecipient.trim() && !formData.customAudience.includes(newRecipient.trim())) {
      setFormData(prev => ({
        ...prev,
        customAudience: [...prev.customAudience, newRecipient.trim()]
      }));
      setNewRecipient('');
    }
  };

  const removeRecipient = (recipient: string) => {
    setFormData(prev => ({
      ...prev,
      customAudience: prev.customAudience.filter(r => r !== recipient)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description/content is required';
    }

    if (formData.targetAudience === 'Custom' && formData.customAudience.length === 0) {
      newErrors.customAudience = 'At least one recipient is required for custom audience';
    }

    if (formData.scheduledDate && !formData.scheduledTime) {
      newErrors.scheduledTime = 'Time is required when date is specified';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const interactionToSave = {
      ...formData,
      id: Date.now(),
      segmentName,
      createdAt: new Date().toISOString(),
      status: formData.scheduledDate ? 'Scheduled' : 'Draft',
      estimatedReach: getEstimatedReach()
    };

    onSave(interactionToSave);
    handleClose();
  };

  const getEstimatedReach = () => {
    if (formData.targetAudience === 'All Members') return '1,250';
    if (formData.targetAudience === 'Custom') return formData.customAudience.length.toString();
    return '850'; // Default for other audience types
  };

  const handleClose = () => {
    setFormData({
      type: 'Email',
      subject: '',
      description: '',
      targetAudience: 'All Members',
      customAudience: [],
      priority: 'Medium',
      scheduledDate: '',
      scheduledTime: '',
      template: '',
      personalization: true,
      trackOpens: true,
      trackClicks: true,
      followUpRequired: false,
      followUpDays: 7,
      tags: [],
      attachments: []
    });
    setNewTag('');
    setNewRecipient('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const interactionTypes = ['Email', 'SMS', 'Call', 'Survey', 'Newsletter'];
  const audiences = ['All Members', 'Active Members', 'New Members', 'High Value', 'Custom'];
  const priorities = ['High', 'Medium', 'Low'];
  const templates = ['Welcome Email', 'Newsletter', 'Event Invitation', 'Survey Request', 'Follow-up', 'Custom'];

  const getTypeIcon = () => {
    switch (formData.type) {
      case 'Email': return <EnvelopeIcon className="h-5 w-5" />;
      case 'SMS': return <ChatBubbleLeftRightIcon className="h-5 w-5" />;
      case 'Call': return <PhoneIcon className="h-5 w-5" />;
      default: return <ChatBubbleLeftRightIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  {getTypeIcon()}
                  <span className="ml-2">Create Interaction</span>
                </h3>
                {segmentName && (
                  <p className="text-sm text-gray-600 mt-1">For segment: {segmentName}</p>
                )}
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interaction Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {interactionTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select template</option>
                  {templates.map(template => (
                    <option key={template} value={template}>{template}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject/Title *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter subject or title"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content/Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter the content of your interaction"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {audiences.map(audience => (
                  <option key={audience} value={audience}>{audience}</option>
                ))}
              </select>
              
              <div className="mt-2 text-sm text-gray-600">
                Estimated reach: {getEstimatedReach()} recipients
              </div>

              {formData.targetAudience === 'Custom' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Recipients
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="email"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRecipient())}
                    />
                    <button
                      type="button"
                      onClick={addRecipient}
                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.customAudience.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.customAudience.map((recipient, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {recipient}
                          <button
                            type="button"
                            onClick={() => removeRecipient(recipient)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.customAudience && (
                    <p className="text-red-500 text-sm mt-1">{errors.customAudience}</p>
                  )}
                </div>
              )}
            </div>

            {/* Scheduling */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Scheduling</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Date (optional)
                  </label>
                  <input
                    type="date"
                    name="scheduledDate"
                    value={formData.scheduledDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Scheduled Time
                  </label>
                  <input
                    type="time"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.scheduledTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                    disabled={!formData.scheduledDate}
                  />
                  {errors.scheduledTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.scheduledTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="border-t pt-4">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="personalization"
                      checked={formData.personalization}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable personalization</span>
                  </label>
                  
                  {formData.type === 'Email' && (
                    <>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="trackOpens"
                          checked={formData.trackOpens}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-700">Track email opens</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="trackClicks"
                          checked={formData.trackClicks}
                          onChange={handleInputChange}
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-gray-700">Track link clicks</span>
                      </label>
                    </>
                  )}
                </div>

                <div>
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      name="followUpRequired"
                      checked={formData.followUpRequired}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Follow-up required</span>
                  </label>

                  {formData.followUpRequired && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Follow-up after (days)
                      </label>
                      <input
                        type="number"
                        name="followUpDays"
                        value={formData.followUpDays}
                        onChange={handleInputChange}
                        min="1"
                        max="30"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Add Tag
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {formData.scheduledDate ? (
                  <span>Will be sent on {new Date(formData.scheduledDate).toLocaleDateString()}</span>
                ) : (
                  <span>Will be saved as draft</span>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {formData.scheduledDate ? 'Schedule Interaction' : 'Save Draft'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
