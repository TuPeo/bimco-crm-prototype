'use client';

import React, { useState } from 'react';
import { Fleet, MaintenanceRecord } from '@/types';
import { XMarkIcon, WrenchScrewdriverIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface MaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  fleet: Fleet;
}

export default function MaintenanceModal({ isOpen, onClose, fleet }: MaintenanceModalProps) {
  const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);

  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Completed': 'text-green-600 bg-green-100',
      'In Progress': 'text-blue-600 bg-blue-100',
      'Scheduled': 'text-yellow-600 bg-yellow-100',
      'Overdue': 'text-red-600 bg-red-100',
      'Cancelled': 'text-gray-600 bg-gray-100'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'text-gray-600 bg-gray-100';
  };

  const getTypeBadge = (type: string) => {
    const typeStyles = {
      'Routine': 'text-blue-600 bg-blue-100',
      'Emergency': 'text-red-600 bg-red-100',
      'Preventive': 'text-green-600 bg-green-100',
      'Corrective': 'text-orange-600 bg-orange-100',
      'Overhaul': 'text-purple-600 bg-purple-100'
    };
    return typeStyles[type as keyof typeof typeStyles] || 'text-gray-600 bg-gray-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const formatCurrency = (amount: number | undefined) => {
    if (amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Maintenance Records - {fleet.name}
                </h3>
                <p className="text-sm text-gray-500">{fleet.type} • {fleet.registration}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            {fleet.maintenanceRecords.length === 0 ? (
              <div className="text-center py-12">
                <WrenchScrewdriverIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance records</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No maintenance records have been created for this vessel yet.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <WrenchScrewdriverIcon className="-ml-1 mr-2 h-5 w-5" />
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Maintenance Summary */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <WrenchScrewdriverIcon className="h-8 w-8 text-blue-600" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Total Records</p>
                          <p className="text-2xl font-semibold text-gray-900">{fleet.maintenanceRecords.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-semibold">
                            {fleet.maintenanceRecords.filter(record => record.status === 'Completed').length}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Completed</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {fleet.maintenanceRecords.filter(record => record.status === 'Completed').length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 text-sm font-semibold">
                            {fleet.maintenanceRecords.filter(record => record.status === 'In Progress').length}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">In Progress</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {fleet.maintenanceRecords.filter(record => record.status === 'In Progress').length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-sm font-semibold">
                            {fleet.maintenanceRecords.filter(record => record.status === 'Overdue').length}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Overdue</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {fleet.maintenanceRecords.filter(record => record.status === 'Overdue').length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance Records */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Maintenance History</h4>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <WrenchScrewdriverIcon className="-ml-0.5 mr-2 h-4 w-4" />
                      Schedule New Maintenance
                    </button>
                  </div>

                  {/* Timeline View */}
                  <div className="flow-root">
                    <ul className="divide-y divide-gray-200">
                      {fleet.maintenanceRecords.map((record, index) => (
                        <li key={record.id} className="py-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                record.status === 'Completed' ? 'bg-green-100' :
                                record.status === 'In Progress' ? 'bg-blue-100' :
                                record.status === 'Overdue' ? 'bg-red-100' : 'bg-yellow-100'
                              }`}>
                                <WrenchScrewdriverIcon className={`w-5 h-5 ${
                                  record.status === 'Completed' ? 'text-green-600' :
                                  record.status === 'In Progress' ? 'text-blue-600' :
                                  record.status === 'Overdue' ? 'text-red-600' : 'text-yellow-600'
                                }`} />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h5 className="text-sm font-medium text-gray-900">{record.description}</h5>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(record.status)}`}>
                                      {record.status}
                                    </span>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeBadge(record.type)}`}>
                                      {record.type}
                                    </span>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center">
                                      <CalendarIcon className="h-4 w-4 mr-2" />
                                      <span>Scheduled: {formatDate(record.scheduledDate)}</span>
                                    </div>
                                    {record.completedDate && (
                                      <div className="flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-2" />
                                        <span>Completed: {formatDate(record.completedDate)}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center">
                                      <span>Cost: {formatCurrency(record.cost)}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <span>Vendor: {record.vendor}</span>
                                    </div>
                                  </div>

                                  {record.notes && (
                                    <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-600">
                                      <strong>Notes:</strong> {record.notes}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-2 ml-4">
                                  <button
                                    onClick={() => setSelectedRecord(record)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                  >
                                    View Details
                                  </button>
                                  <button
                                    onClick={() => {
                                      // Handle edit maintenance record
                                    }}
                                    className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
