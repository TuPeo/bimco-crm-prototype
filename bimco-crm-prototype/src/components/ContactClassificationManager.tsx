'use client';

import { useState } from 'react';
import { ContactClassification } from '@/types';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

interface ContactClassificationManagerProps {
  classifications: ContactClassification[];
  onUpdate: (classifications: ContactClassification[]) => void;
  readOnly?: boolean;
}

export default function ContactClassificationManager({
  classifications,
  onUpdate,
  readOnly = false
}: ContactClassificationManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    date: ''
  });

  // Predefined classification codes
  const predefinedCodes = [
    { code: 'BI-ADM', description: 'BIMCO Administrator' },
    { code: 'BI-ASIA', description: 'BIMCO Asia Representative' },
    { code: 'BI-BD', description: 'BIMCO Board Member' },
    { code: 'BI-BS', description: 'BIMCO Business Support' },
    { code: 'BI-EUR', description: 'BIMCO Europe Representative' },
    { code: 'BI-AM', description: 'BIMCO Americas Representative' },
    { code: 'BI-AF', description: 'BIMCO Africa Representative' },
    { code: 'BI-MED', description: 'BIMCO Mediterranean Representative' },
    { code: 'BI-TECH', description: 'BIMCO Technical Committee' },
    { code: 'BI-LEG', description: 'BIMCO Legal & Contractual Committee' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newClassification: ContactClassification = {
      code: formData.code,
      description: formData.description || predefinedCodes.find(p => p.code === formData.code)?.description || '',
      date: formData.date || new Date().toISOString().split('T')[0]
    };

    let updatedClassifications;
    if (editingIndex !== null) {
      // Update existing
      updatedClassifications = [...classifications];
      updatedClassifications[editingIndex] = newClassification;
    } else {
      // Add new
      updatedClassifications = [...classifications, newClassification];
    }

    onUpdate(updatedClassifications);
    resetForm();
  };

  const handleDelete = (index: number) => {
    const updatedClassifications = classifications.filter((_, i) => i !== index);
    onUpdate(updatedClassifications);
  };

  const handleEdit = (index: number) => {
    const classification = classifications[index];
    setFormData({
      code: classification.code,
      description: classification.description,
      date: classification.date
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ code: '', description: '', date: '' });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleCodeChange = (code: string) => {
    const predefined = predefinedCodes.find(p => p.code === code);
    setFormData(prev => ({
      ...prev,
      code,
      description: predefined ? predefined.description : prev.description
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Contact Classifications</h3>
        {!readOnly && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Classification
          </button>
        )}
      </div>

      {/* Classification List */}
      <div className="space-y-2">
        {classifications.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No classifications assigned</p>
        ) : (
          classifications.map((classification, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {classification.code}
                  </span>
                  <span className="text-sm text-gray-900">{classification.description}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Added: {new Date(classification.date).toLocaleDateString()}
                </p>
              </div>
              
              {!readOnly && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">
                {editingIndex !== null ? 'Edit Classification' : 'Add Classification'}
              </h3>
              <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Classification Code
                </label>
                <select
                  value={formData.code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a code</option>
                  {predefinedCodes.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} - {item.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description will auto-populate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
                  {editingIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
