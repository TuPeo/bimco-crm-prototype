'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { mockFleets } from '@/data/mockData';
import { Fleet } from '@/types';
import {
  ArrowLeftIcon,
  PencilIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function FleetDetailPage() {
  const params = useParams();
  const [fleet, setFleet] = useState<Fleet | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fleetId = params.id as string;
    const foundFleet = mockFleets.find(f => f.id === fleetId);
    setFleet(foundFleet || null);
  }, [params.id]);

  if (!fleet) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">Fleet not found</div>
          <Link href="/fleets" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
            ← Back to Fleet Management
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Decommissioned': 'bg-red-100 text-red-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Overdue': 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: DocumentTextIcon },
    { id: 'certificates', name: 'Certificates', icon: DocumentTextIcon },
    { id: 'maintenance', name: 'Maintenance', icon: WrenchScrewdriverIcon }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number | undefined) => {
    return amount ? `$${amount.toLocaleString()}` : 'N/A';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/fleets"
              className="p-2 -m-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{fleet.name}</h1>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(fleet.operationalStatus)}`}>
                  {fleet.operationalStatus}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                {fleet.type} • IMO {fleet.registration} • {fleet.companyName}
              </p>
            </div>
          </div>
          <button className="bimco-btn-secondary">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit Vessel
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basic Information */}
            <div className="lg:col-span-2">
              <div className="bimco-card">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Vessel Information</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">IMO Number</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.registration}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">IHS Number</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.ihsNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vessel Type</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Flag</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.flag}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year Built</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.yearBuilt}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Owner</label>
                      <Link href={`/companies/${fleet.companyId}`} className="mt-1 text-sm text-blue-600 hover:text-blue-500">
                        {fleet.companyName}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="bimco-card mt-6">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Technical Specifications</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gross Tonnage</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.grossTonnage?.toLocaleString()} GT</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Deadweight</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.deadweight?.toLocaleString()} MT</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Length Overall</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.length} m</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Beam</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.beam} m</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Draft</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.draft} m</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Engine Power</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.enginePower?.toLocaleString()} kW</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.fuelType}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Capacity</label>
                      <p className="mt-1 text-sm text-gray-900">{fleet.capacity.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status and Quick Actions */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bimco-card">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Status Overview</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Operational Status</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(fleet.operationalStatus)}`}>
                        {fleet.operationalStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Certificates</span>
                      <span className="text-sm font-medium text-gray-900">
                        {fleet.certificates.length} active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Updated</span>
                      <span className="text-sm text-gray-900">
                        {formatDate(fleet.lastUpdated)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bimco-card">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6 space-y-3">
                  <button className="w-full bimco-btn-secondary justify-start">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    View All Certificates
                  </button>
                  <button className="w-full bimco-btn-secondary justify-start">
                    <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                    Schedule Maintenance
                  </button>
                  <button className="w-full bimco-btn-secondary justify-start">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    View Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="bimco-card">
            <div className="bimco-card-header">
              <h3 className="text-lg font-medium text-gray-900">Certificates & Documents</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {fleet.certificates.map((certificate) => {
                const isExpiringSoon = new Date(certificate.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
                const isExpired = new Date(certificate.expiryDate) < new Date();
                
                return (
                  <div key={certificate.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-900">{certificate.type}</h4>
                          {(isExpired || isExpiringSoon) && (
                            <ExclamationTriangleIcon className={`h-4 w-4 ${isExpired ? 'text-red-500' : 'text-yellow-500'}`} />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Issued by: {certificate.issuer}</p>
                        <div className="mt-1 text-xs text-gray-500 flex items-center gap-4">
                          <span>Issued: {formatDate(certificate.issuedDate)}</span>
                          <span className={isExpired ? 'text-red-600 font-medium' : isExpiringSoon ? 'text-yellow-600 font-medium' : ''}>
                            Expires: {formatDate(certificate.expiryDate)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {certificate.documentUrl && (
                          <button className="text-blue-600 hover:text-blue-500 text-sm">
                            View Document
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="bimco-card">
            <div className="bimco-card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Maintenance Records</h3>
                <button className="bimco-btn-primary">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Schedule Maintenance
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {fleet.maintenanceRecords.map((record) => (
                <div key={record.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900">{record.type}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{record.description}</p>
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          Scheduled: {formatDate(record.scheduledDate)}
                        </span>
                        {record.completedDate && (
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            Completed: {formatDate(record.completedDate)}
                          </span>
                        )}
                        {record.vendor && (
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            {record.vendor}
                          </span>
                        )}
                        {record.cost && (
                          <span className="flex items-center gap-1">
                            <CurrencyDollarIcon className="h-3 w-3" />
                            {formatCurrency(record.cost)}
                          </span>
                        )}
                      </div>
                      {record.notes && (
                        <p className="mt-2 text-xs text-gray-600">{record.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
