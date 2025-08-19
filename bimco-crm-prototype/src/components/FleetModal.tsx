'use client';

import React, { useState, useEffect } from 'react';
import { Fleet } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FleetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fleet: Omit<Fleet, 'id'> | Fleet) => void;
  fleet?: Fleet | null;
  mode: 'add' | 'edit';
}

export default function FleetModal({ isOpen, onClose, onSave, fleet, mode }: FleetModalProps) {
  const [formData, setFormData] = useState<Omit<Fleet, 'id'>>({
    name: '',
    type: '',
    capacity: 0,
    registration: '',
    operationalStatus: 'Active',
    companyId: '',
    companyName: '',
    ihsNumber: '',
    yearBuilt: new Date().getFullYear(),
    flag: '',
    grossTonnage: 0,
    deadweight: 0,
    length: 0,
    beam: 0,
    draft: 0,
    enginePower: 0,
    fuelType: '',
    certificates: [],
    maintenanceRecords: [],
    dateCreated: '',
    lastUpdated: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && fleet) {
      setFormData({
        name: fleet.name,
        type: fleet.type,
        capacity: fleet.capacity,
        registration: fleet.registration,
        operationalStatus: fleet.operationalStatus,
        companyId: fleet.companyId,
        companyName: fleet.companyName,
        ihsNumber: fleet.ihsNumber || '',
        yearBuilt: fleet.yearBuilt || new Date().getFullYear(),
        flag: fleet.flag,
        grossTonnage: fleet.grossTonnage || 0,
        deadweight: fleet.deadweight || 0,
        length: fleet.length || 0,
        beam: fleet.beam || 0,
        draft: fleet.draft || 0,
        enginePower: fleet.enginePower || 0,
        fuelType: fleet.fuelType || '',
        certificates: fleet.certificates,
        maintenanceRecords: fleet.maintenanceRecords,
        dateCreated: fleet.dateCreated,
        lastUpdated: fleet.lastUpdated
      });
    } else if (mode === 'add') {
      const now = new Date().toISOString();
      setFormData({
        name: '',
        type: 'Container Ship',
        capacity: 0,
        registration: `REG${Date.now()}`,
        operationalStatus: 'Active',
        companyId: '',
        companyName: '',
        ihsNumber: '',
        yearBuilt: new Date().getFullYear(),
        flag: '',
        grossTonnage: 0,
        deadweight: 0,
        length: 0,
        beam: 0,
        draft: 0,
        enginePower: 0,
        fuelType: 'Heavy Fuel Oil',
        certificates: [],
        maintenanceRecords: [],
        dateCreated: now,
        lastUpdated: now
      });
    }
    setErrors({});
  }, [mode, fleet, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'yearBuilt' || name === 'grossTonnage' || 
              name === 'deadweight' || name === 'length' || name === 'beam' || 
              name === 'draft' || name === 'enginePower' 
        ? parseInt(value) || 0 
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vessel name is required';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Vessel type is required';
    }

    if (!formData.registration.trim()) {
      newErrors.registration = 'Registration number is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.flag.trim()) {
      newErrors.flag = 'Flag state is required';
    }

    if (formData.capacity <= 0) {
      newErrors.capacity = 'Capacity must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const fleetToSave = {
      ...formData,
      lastUpdated: new Date().toISOString()
    };

    if (mode === 'edit' && fleet) {
      onSave({ ...fleetToSave, id: fleet.id });
    } else {
      onSave(fleetToSave);
    }
    
    onClose();
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const vesselTypes = [
    'Container Ship',
    'Bulk Carrier',
    'Tanker',
    'General Cargo',
    'Passenger Ship',
    'Ro-Ro Ship',
    'Chemical Tanker',
    'LNG Carrier',
    'Offshore Vessel',
    'Other'
  ];

  const fuelTypes = [
    'Heavy Fuel Oil',
    'Marine Gas Oil',
    'Low Sulphur Fuel Oil',
    'LNG',
    'Methanol',
    'Hydrogen',
    'Electric',
    'Hybrid'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {mode === 'add' ? 'Add New Vessel' : 'Edit Vessel'}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vessel Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter vessel name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vessel Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {vesselTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  name="registration"
                  value={formData.registration}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.registration ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter registration number"
                />
                {errors.registration && (
                  <p className="text-red-500 text-sm mt-1">{errors.registration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMO Number
                </label>
                <input
                  type="text"
                  name="ihsNumber"
                  value={formData.ihsNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter IMO number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flag State *
                </label>
                <input
                  type="text"
                  name="flag"
                  value={formData.flag}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.flag ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter flag state"
                />
                {errors.flag && (
                  <p className="text-red-500 text-sm mt-1">{errors.flag}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operational Status
                </label>
                <select
                  name="operationalStatus"
                  value={formData.operationalStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Decommissioned">Decommissioned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Technical Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.capacity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter capacity"
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gross Tonnage
                  </label>
                  <input
                    type="number"
                    name="grossTonnage"
                    value={formData.grossTonnage}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadweight (MT)
                  </label>
                  <input
                    type="number"
                    name="deadweight"
                    value={formData.deadweight}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length (m)
                  </label>
                  <input
                    type="number"
                    name="length"
                    value={formData.length}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beam (m)
                  </label>
                  <input
                    type="number"
                    name="beam"
                    value={formData.beam}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Draft (m)
                  </label>
                  <input
                    type="number"
                    name="draft"
                    value={formData.draft}
                    onChange={handleInputChange}
                    min="0"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Engine Power (kW)
                  </label>
                  <input
                    type="number"
                    name="enginePower"
                    value={formData.enginePower}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
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
                {mode === 'add' ? 'Add Vessel' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
