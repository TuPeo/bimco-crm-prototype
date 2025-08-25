'use client';

import React, { useState, useEffect } from 'react';
import { Segment, SegmentCriteria } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (segment: Omit<Segment, 'id'> | Segment) => void;
  segment?: Segment | null;
  mode: 'add' | 'edit';
}

export default function SegmentModal({ isOpen, onClose, onSave, segment, mode }: SegmentModalProps) {
  const [formData, setFormData] = useState<Omit<Segment, 'id'>>({
    name: '',
    description: '',
    criteria: [],
    contactCount: 0,
    lastUpdated: '',
    createdAt: '',
    createdBy: 'Current User',
    status: 'draft',
    type: 'static',
    tags: [],
    autoRefresh: false,
    estimatedReach: 0,
    campaigns: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && segment) {
      setFormData({
        name: segment.name,
        description: segment.description || '',
        criteria: segment.criteria,
        contactCount: segment.contactCount,
        status: segment.status,
        createdBy: segment.createdBy,
        lastUpdated: segment.lastUpdated,
        createdAt: segment.createdAt,
        type: segment.type,
        tags: segment.tags,
        autoRefresh: segment.autoRefresh,
        estimatedReach: segment.estimatedReach,
        campaigns: segment.campaigns
      });
    } else if (mode === 'add') {
      const now = new Date().toISOString();
      setFormData({
        name: '',
        description: '',
        criteria: [],
        contactCount: 0,
        status: 'draft',
        createdBy: 'Current User',
        createdAt: now,
        lastUpdated: now,
        type: 'static',
        tags: [],
        autoRefresh: false,
        estimatedReach: 0,
        campaigns: []
      });
    }
    setErrors({});
  }, [mode, segment, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCriteriaChange = (entityType: 'companies' | 'contacts' | 'courses', field: string, value: string[]) => {
    // For now, this is disabled since we're using the array structure
    // TODO: Convert this component to work with the new criteria structure
    console.log('Criteria update:', { entityType, field, value });
  };

  const updateCriteria = (entityType: string, field: string, value: unknown) => {
    // For now, this is disabled since we're using the array structure
    // TODO: Convert this component to work with the new criteria structure
    console.log('Criteria update:', { entityType, field, value });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Segment name is required';
    }

    // At least one criteria should be set
    const hasCriteria = Object.keys(formData.criteria).length > 0 && 
      Object.values(formData.criteria).some(criteria => 
        criteria && Object.keys(criteria).length > 0
      );

    if (!hasCriteria) {
      newErrors.criteria = 'At least one criteria must be defined';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const segmentToSave = {
      ...formData,
      lastUpdated: new Date().toISOString()
    };

    if (mode === 'edit' && segment) {
      onSave({ ...segmentToSave, id: segment.id });
    } else {
      onSave(segmentToSave);
    }
    
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const companyStatuses = ['M1', 'M0', 'M2'];
  const companyTypes = ['A1', 'A2', 'B1', 'B2'];
  const countries = ['Denmark', 'Germany', 'Norway', 'Sweden', 'Finland'];
  const contactRoles = ['Manager', 'Director', 'Officer', 'Engineer', 'Captain'];
  const courseCategories = ['Maritime Training', 'Technology', 'Legal & Regulatory', 'Safety & Security'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {mode === 'add' ? 'Create New Segment' : 'Edit Segment'}
              </h3>
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
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Segment Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter segment name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter segment description"
                />
              </div>

              {/* TODO: Update status controls to work with new Segment structure */}
              <div className="text-sm text-gray-500">
                Status controls will be available in a future update.
              </div>
              
              {/*
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="onHold"
                    checked={formData.onHold}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">On Hold</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="readyForInvoice"
                    checked={formData.readyForInvoice}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Ready for Invoice</span>
                </label>
              </div>
              */}
            </div>

            {/* Segment Criteria */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Segment Criteria</h4>
              {/* TODO: Implement criteria form for new Segment structure */}
              <div className="text-sm text-gray-500 py-4">
                Criteria configuration interface will be implemented to work with the new segment structure.
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
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
                {mode === 'add' ? 'Create Segment' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
