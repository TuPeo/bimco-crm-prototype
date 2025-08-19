'use client';

import React, { useState, useEffect } from 'react';
import { Company } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
  company?: Company;
  mode: 'add' | 'edit';
}

export default function CompanyModal({ isOpen, onClose, onSave, company, mode }: CompanyModalProps) {
  const [formData, setFormData] = useState<Omit<Company, 'id' | 'dateCreated' | 'lastUpdated'>>({
    registrationNumber: '',
    name: '',
    name2: '',
    status: 'M0',
    type: 'A1',
    address: {
      line1: '',
      line2: '',
      line3: '',
      postCode: '',
      country: '',
      countryCode: ''
    },
    email: '',
    numberOfEmployees: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (company && mode === 'edit') {
      setFormData({
        registrationNumber: company.registrationNumber,
        name: company.name,
        name2: company.name2 || '',
        status: company.status,
        type: company.type,
        address: { ...company.address },
        email: company.email,
        numberOfEmployees: company.numberOfEmployees
      });
    } else if (mode === 'add') {
      setFormData({
        registrationNumber: '',
        name: '',
        name2: '',
        status: 'M0',
        type: 'A1',
        address: {
          line1: '',
          line2: '',
          line3: '',
          postCode: '',
          country: '',
          countryCode: ''
        },
        email: '',
        numberOfEmployees: 0
      });
    }
    setErrors({});
  }, [company, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Registration number is required';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!formData.address.line1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }
    if (!formData.address.postCode.trim()) {
      newErrors.postCode = 'Post code is required';
    }
    if (!formData.address.country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!formData.address.countryCode.trim()) {
      newErrors.countryCode = 'Country code is required';
    }
    if (formData.numberOfEmployees < 0) {
      newErrors.numberOfEmployees = 'Number of employees cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const now = new Date().toISOString();
    const savedCompany: Company = {
      id: company?.id || Math.random().toString(36).substr(2, 9),
      ...formData,
      dateCreated: company?.dateCreated || now,
      lastUpdated: now
    };

    onSave(savedCompany);
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="w-full mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
                {mode === 'add' ? 'Add New Company' : 'Edit Company'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Registration Number *
                    </label>
                    <input
                      type="text"
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                        errors.registrationNumber 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter registration number"
                    />
                    {errors.registrationNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.registrationNumber}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter company name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name2" className="block text-sm font-medium text-gray-700 mb-1">
                      Alternative Name
                    </label>
                    <input
                      type="text"
                      id="name2"
                      value={formData.name2}
                      onChange={(e) => handleInputChange('name2', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter alternative name (optional)"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="M0">M0 - Inactive</option>
                      <option value="M1">M1 - Active</option>
                      <option value="M2">M2 - Suspended</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="A1">A1 - Shipowner</option>
                      <option value="A2">A2 - Operator</option>
                      <option value="A3">A3 - Charterer</option>
                      <option value="B1">B1 - Broker</option>
                      <option value="B2">B2 - Agent</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="numberOfEmployees" className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      id="numberOfEmployees"
                      min="0"
                      value={formData.numberOfEmployees}
                      onChange={(e) => handleInputChange('numberOfEmployees', parseInt(e.target.value) || 0)}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                        errors.numberOfEmployees 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="0"
                    />
                    {errors.numberOfEmployees && (
                      <p className="mt-1 text-sm text-red-600">{errors.numberOfEmployees}</p>
                    )}
                  </div>
                </div>

                {/* Address Section */}
                <div className="border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Address Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        id="addressLine1"
                        value={formData.address.line1}
                        onChange={(e) => handleInputChange('address.line1', e.target.value)}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                          errors.addressLine1 
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Enter street address"
                      />
                      {errors.addressLine1 && (
                        <p className="mt-1 text-sm text-red-600">{errors.addressLine1}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 2
                        </label>
                        <input
                          type="text"
                          id="addressLine2"
                          value={formData.address.line2}
                          onChange={(e) => handleInputChange('address.line2', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Apartment, suite, etc. (optional)"
                        />
                      </div>

                      <div>
                        <label htmlFor="addressLine3" className="block text-sm font-medium text-gray-700 mb-1">
                          Address Line 3
                        </label>
                        <input
                          type="text"
                          id="addressLine3"
                          value={formData.address.line3}
                          onChange={(e) => handleInputChange('address.line3', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Additional address info (optional)"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="postCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Post Code *
                        </label>
                        <input
                          type="text"
                          id="postCode"
                          value={formData.address.postCode}
                          onChange={(e) => handleInputChange('address.postCode', e.target.value)}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                            errors.postCode 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          placeholder="Enter post code"
                        />
                        {errors.postCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.postCode}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <input
                          type="text"
                          id="country"
                          value={formData.address.country}
                          onChange={(e) => handleInputChange('address.country', e.target.value)}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                            errors.country 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          placeholder="Enter country"
                        />
                        {errors.country && (
                          <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Country Code *
                        </label>
                        <input
                          type="text"
                          id="countryCode"
                          maxLength={2}
                          value={formData.address.countryCode}
                          onChange={(e) => handleInputChange('address.countryCode', e.target.value.toUpperCase())}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm ${
                            errors.countryCode 
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                          }`}
                          placeholder="DK"
                        />
                        {errors.countryCode && (
                          <p className="mt-1 text-sm text-red-600">{errors.countryCode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {mode === 'add' ? 'Add Company' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
