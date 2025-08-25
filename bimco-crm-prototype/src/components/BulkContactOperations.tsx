'use client';

import { useState } from 'react';
import { Contact } from '@/types';
import { 
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  DocumentArrowUpIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface BulkContactOperationsProps {
  contacts: Contact[];
  selectedContactIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onBulkUpdate: (contactIds: string[], updateData: Partial<Contact>) => void;
  onBulkDelete: (contactIds: string[]) => void;
  onImport: (contacts: Contact[]) => void;
  onExport: (contacts: Contact[]) => void;
}

export default function BulkContactOperations({
  contacts,
  selectedContactIds,
  onSelectionChange,
  onBulkUpdate,
  onBulkDelete,
  onImport,
  onExport
}: BulkContactOperationsProps) {
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [bulkEditData, setBulkEditData] = useState({
    status: '',
    companyId: '',
    role: ''
  });

  const [importData, setImportData] = useState('');
  const [importErrors, setImportErrors] = useState<string[]>([]);

  const selectedContacts = contacts.filter(c => selectedContactIds.includes(c.id));
  const allSelected = contacts.length > 0 && selectedContactIds.length === contacts.length;
  const someSelected = selectedContactIds.length > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(contacts.map(c => c.id));
    }
  };

  const handleBulkEdit = () => {
    const updateData: Partial<Contact> = {};
    
    if (bulkEditData.status) updateData.status = bulkEditData.status as 'Active' | 'Inactive';
    if (bulkEditData.companyId) updateData.companyId = bulkEditData.companyId;
    if (bulkEditData.role) updateData.role = bulkEditData.role;

    onBulkUpdate(selectedContactIds, updateData);
    setShowBulkEditModal(false);
    setBulkEditData({ status: '', companyId: '', role: '' });
  };

  const handleBulkDelete = () => {
    onBulkDelete(selectedContactIds);
    setShowDeleteConfirm(false);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    const contactsToExport = selectedContactIds.length > 0 ? selectedContacts : contacts;
    onExport(contactsToExport);
  };

  const parseImportData = (csvData: string): Contact[] => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const errors: string[] = [];
    const parsedContacts: Contact[] = [];

    // Expected headers
    const expectedHeaders = [
      'contactNumber', 'firstName', 'lastName', 'email', 
      'phone', 'role', 'companyId', 'companyName', 'status'
    ];

    // Validate headers
    const missingHeaders = expectedHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      errors.push(`Missing required headers: ${missingHeaders.join(', ')}`);
      setImportErrors(errors);
      return [];
    }

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      if (values.length !== headers.length) {
        errors.push(`Line ${i + 1}: Column count mismatch`);
        continue;
      }

      const contact: Partial<Contact> = {};
      headers.forEach((header, index) => {
        if (expectedHeaders.includes(header)) {
          (contact as any)[header] = values[index] || '';
        }
      });

      // Validate required fields
      if (!contact.firstName || !contact.lastName || !contact.email) {
        errors.push(`Line ${i + 1}: Missing required fields (firstName, lastName, email)`);
        continue;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact.email!)) {
        errors.push(`Line ${i + 1}: Invalid email format`);
        continue;
      }

      parsedContacts.push({
        id: `imported-${Date.now()}-${i}`,
        contactNumber: contact.contactNumber || '',
        firstName: contact.firstName!,
        lastName: contact.lastName!,
        email: contact.email!,
        phone: contact.phone,
        role: contact.role,
        companyId: contact.companyId || '',
        companyName: contact.companyName || '',
        status: (contact.status as 'Active' | 'Inactive') || 'Active',
        classifications: [],
        dateCreated: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }

    setImportErrors(errors);
    return parsedContacts;
  };

  const handleImport = () => {
    const parsedContacts = parseImportData(importData);
    
    if (parsedContacts.length > 0) {
      onImport(parsedContacts);
      setShowImportModal(false);
      setImportData('');
      setImportErrors([]);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      'contactNumber', 'firstName', 'lastName', 'email', 
      'phone', 'role', 'companyId', 'companyName', 'status'
    ];
    
    const csvContent = headers.join(',') + '\n' +
      '123456_001,John,Doe,john.doe@example.com,+1234567890,Manager,1,Example Company,Active\n' +
      '123456_002,Jane,Smith,jane.smith@example.com,+1234567891,Director,1,Example Company,Active';

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_import_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Bulk Operations Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Select All Checkbox */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected && !allSelected;
                }}
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedContactIds.length > 0 
                  ? `${selectedContactIds.length} selected`
                  : 'Select all'
                }
              </span>
            </label>

            {/* Bulk Actions */}
            {selectedContactIds.length > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowBulkEditModal(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <PencilIcon className="w-4 h-4 mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Import/Export Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowUpTrayIcon className="w-4 h-4 mr-1" />
              Import
            </button>
            
            <div className="relative inline-block text-left">
              <button
                onClick={() => handleExport('csv')}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Edit Modal */}
      {showBulkEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                Bulk Edit {selectedContactIds.length} Contact{selectedContactIds.length !== 1 ? 's' : ''}
              </h3>
              <button 
                onClick={() => setShowBulkEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status (leave empty to keep unchanged)
                </label>
                <select
                  value={bulkEditData.status}
                  onChange={(e) => setBulkEditData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Keep unchanged</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role (leave empty to keep unchanged)
                </label>
                <input
                  type="text"
                  value={bulkEditData.role}
                  onChange={(e) => setBulkEditData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new role"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowBulkEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkEdit}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Update Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex items-center mb-4">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete {selectedContactIds.length} contact{selectedContactIds.length !== 1 ? 's' : ''}? 
              This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Import Contacts</h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-center">
                  <DocumentArrowUpIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">CSV Format Required</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Upload a CSV file with the required headers. 
                  <button 
                    onClick={downloadTemplate}
                    className="ml-1 underline hover:no-underline"
                  >
                    Download template
                  </button>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CSV Data (paste your CSV content here)
                </label>
                <textarea
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="contactNumber,firstName,lastName,email,phone,role,companyId,companyName,status
123456_001,John,Doe,john.doe@example.com,+1234567890,Manager,1,Example Company,Active"
                />
              </div>

              {importErrors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm font-medium text-red-800">Import Errors</span>
                  </div>
                  <ul className="text-sm text-red-600 mt-2 space-y-1">
                    {importErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importData.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-md"
                >
                  Import Contacts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
