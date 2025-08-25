'use client';

import React, { useState } from 'react';
import { Fleet } from '../types';
import {
  InformationCircleIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PencilIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface FleetDetailCardProps {
  fleet: Fleet;
  onEdit?: (fleet: Fleet) => void;
  onMaintenanceSchedule?: (fleet: Fleet) => void;
}

export default function FleetDetailCard({ 
  fleet, 
  onEdit, 
  onMaintenanceSchedule 
}: FleetDetailCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'certificates' | 'maintenance' | 'ihs'>('overview');

  const tabs = [
    { key: 'overview' as const, label: 'Overview', icon: InformationCircleIcon },
    { key: 'certificates' as const, label: 'Certificates', icon: DocumentTextIcon },
    { key: 'maintenance' as const, label: 'Maintenance', icon: WrenchScrewdriverIcon },
    { key: 'ihs' as const, label: 'IHS Information', icon: BuildingOfficeIcon }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'In Service': 'bg-green-100 text-green-800',
      'Active': 'bg-green-100 text-green-800',
      'Under Maintenance': 'bg-yellow-100 text-yellow-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Dry Dock': 'bg-blue-100 text-blue-800',
      'Laid Up': 'bg-gray-100 text-gray-800',
      'Out of Service': 'bg-red-100 text-red-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Decommissioned': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCertificateStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (expiry <= now) {
      return { status: 'Expired', color: 'text-red-600', bg: 'bg-red-50', icon: ExclamationTriangleIcon };
    } else if (expiry <= threeMonthsFromNow) {
      return { status: 'Expiring Soon', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: ClockIcon };
    } else {
      return { status: 'Valid', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircleIcon };
    }
  };

  const getMaintenanceStatus = (record: any) => {
    const colors: Record<string, { color: string; bg: string }> = {
      'Completed': { color: 'text-green-600', bg: 'bg-green-50' },
      'In Progress': { color: 'text-blue-600', bg: 'bg-blue-50' },
      'Scheduled': { color: 'text-gray-600', bg: 'bg-gray-50' },
      'Overdue': { color: 'text-red-600', bg: 'bg-red-50' }
    };
    return colors[record.status] || { color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Vessel Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">IMO Number:</span>
              <span className="font-medium">{fleet.imoNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Vessel Type:</span>
              <span className="font-medium">{fleet.vesselType || fleet.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Flag State:</span>
              <span className="font-medium">{fleet.flag}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Classification Society:</span>
              <span className="font-medium">{fleet.classificationSociety || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Year Built:</span>
              <span className="font-medium">{fleet.builtYear || fleet.yearBuilt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Registration:</span>
              <span className="font-medium">{fleet.registration}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Technical Specifications</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Gross Tonnage:</span>
              <span className="font-medium">
                {fleet.grossTonnage ? `${fleet.grossTonnage.toLocaleString()} GT` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Deadweight:</span>
              <span className="font-medium">
                {fleet.deadweight ? `${fleet.deadweight.toLocaleString()} DWT` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Length Overall:</span>
              <span className="font-medium">
                {fleet.length ? `${fleet.length} m` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Beam:</span>
              <span className="font-medium">
                {fleet.beam ? `${fleet.beam} m` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Draft:</span>
              <span className="font-medium">
                {fleet.draft ? `${fleet.draft} m` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Engine Power:</span>
              <span className="font-medium">
                {fleet.enginePower ? `${fleet.enginePower.toLocaleString()} kW` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fuel Type:</span>
              <span className="font-medium">{fleet.fuelType || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Company Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Owner/Operator:</span>
            <span className="font-medium">{fleet.companyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">IHS Number:</span>
            <span className="font-medium">{fleet.ihsNumber || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm">Last maintenance completed</span>
            </div>
            <span className="text-sm text-gray-500">
              {fleet.maintenanceRecords?.find(r => r.status === 'Completed') ? 
                new Date(fleet.maintenanceRecords.find(r => r.status === 'Completed')?.completedDate || '').toLocaleDateString() : 
                'No recent maintenance'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm">Certificate renewal</span>
            </div>
            <span className="text-sm text-gray-500">
              {fleet.certificates?.filter(c => new Date(c.expiryDate) > new Date()).length || 0} active certificates
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <InformationCircleIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm">Record updated</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(fleet.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-4">
      {fleet.certificates && fleet.certificates.length > 0 ? (
        <>
          {/* Certificate Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {fleet.certificates.filter(c => new Date(c.expiryDate) > new Date()).length}
              </div>
              <div className="text-sm text-green-700">Active</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {fleet.certificates.filter(c => {
                  const expiry = new Date(c.expiryDate);
                  const threeMonths = new Date();
                  threeMonths.setMonth(threeMonths.getMonth() + 3);
                  return expiry > new Date() && expiry <= threeMonths;
                }).length}
              </div>
              <div className="text-sm text-yellow-700">Expiring Soon</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {fleet.certificates.filter(c => new Date(c.expiryDate) <= new Date()).length}
              </div>
              <div className="text-sm text-red-700">Expired</div>
            </div>
          </div>

          {/* Certificate List */}
          <div className="space-y-3">
            {fleet.certificates
              .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
              .map((certificate, index) => {
                const status = getCertificateStatus(certificate.expiryDate);
                return (
                  <div key={index} className={`border rounded-lg p-4 ${status.bg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <status.icon className={`h-5 w-5 ${status.color}`} />
                        <div>
                          <h5 className="font-semibold text-gray-900">{certificate.type}</h5>
                          <p className="text-sm text-gray-600">
                            Issued by: {certificate.issuer}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${status.color}`}>
                          {status.status}
                        </div>
                        <div className="text-sm text-gray-500">
                          Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates</h3>
          <p className="text-gray-600">No certificates found for this vessel.</p>
        </div>
      )}
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-6">
      {/* Maintenance Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Completed', 'In Progress', 'Scheduled', 'Overdue'].map(status => (
          <div key={status} className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {fleet.maintenanceRecords?.filter(r => r.status === status).length || 0}
            </div>
            <div className="text-sm text-gray-600">{status}</div>
          </div>
        ))}
      </div>

      {/* Schedule Maintenance Button */}
      {onMaintenanceSchedule && (
        <div className="flex justify-end">
          <button
            onClick={() => onMaintenanceSchedule(fleet)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Schedule Maintenance</span>
          </button>
        </div>
      )}

      {/* Maintenance Records */}
      <div className="space-y-3">
        {fleet.maintenanceRecords && fleet.maintenanceRecords.length > 0 ? (
          fleet.maintenanceRecords
            .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
            .map((record, index) => {
              const statusStyle = getMaintenanceStatus(record);
              return (
                <div key={index} className={`border rounded-lg p-4 ${statusStyle.bg}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-semibold text-gray-900">{record.type}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.color} bg-opacity-20`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{record.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Scheduled:</span>{' '}
                          <span className="font-medium">
                            {new Date(record.scheduledDate).toLocaleDateString()}
                          </span>
                        </div>
                        {record.completedDate && (
                          <div>
                            <span className="text-gray-500">Completed:</span>{' '}
                            <span className="font-medium">
                              {new Date(record.completedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {record.vendor && (
                          <div>
                            <span className="text-gray-500">Vendor:</span>{' '}
                            <span className="font-medium">{record.vendor}</span>
                          </div>
                        )}
                        {record.cost && (
                          <div>
                            <span className="text-gray-500">Cost:</span>{' '}
                            <span className="font-medium">${record.cost.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      {record.notes && (
                        <div className="mt-2 p-3 bg-gray-100 rounded text-sm">
                          <strong>Notes:</strong> {record.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="text-center py-8">
            <WrenchScrewdriverIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Maintenance Records</h3>
            <p className="text-gray-600">No maintenance records found for this vessel.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderIHS = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
          <div>
            <h4 className="font-semibold text-blue-900">IHS Markit Information</h4>
            <p className="text-sm text-blue-700">
              Comprehensive vessel data from IHS Markit database
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-3">IHS Registry Data</h5>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">IHS Number:</span>
              <span className="font-medium">{fleet.ihsNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Ship ID:</span>
              <span className="font-medium">{fleet.imoNumber || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Current Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fleet.operationalStatus)}`}>
                {fleet.operationalStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Position Update:</span>
              <span className="font-medium">Live Tracking</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-semibold text-gray-900 mb-3">Market Intelligence</h5>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Value:</span>
              <span className="font-medium">Contact IHS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Market Segment:</span>
              <span className="font-medium">{fleet.vesselType || fleet.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Trading Area:</span>
              <span className="font-medium">Global</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Last Sale Date:</span>
              <span className="font-medium">N/A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <InformationCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-yellow-800">IHS Data Integration</h5>
            <p className="text-sm text-yellow-700 mt-1">
              This section would display real-time data from IHS Markit when integrated. 
              Information includes vessel positioning, market valuations, and comprehensive technical specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{fleet.name}</h2>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-gray-600">{fleet.vesselType || fleet.type}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(fleet.operationalStatus)}`}>
                  {fleet.operationalStatus}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <PrinterIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ShareIcon className="h-5 w-5" />
            </button>
            {onEdit && (
              <button
                onClick={() => onEdit(fleet)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 px-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'certificates' && renderCertificates()}
        {activeTab === 'maintenance' && renderMaintenance()}
        {activeTab === 'ihs' && renderIHS()}
      </div>
    </div>
  );
}
