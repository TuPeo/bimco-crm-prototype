'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { mockFleets } from '@/data/mockData';
import { Fleet } from '@/types';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function FleetsPage() {
  const [fleets] = useState<Fleet[]>(mockFleets);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredFleets = fleets.filter(fleet => {
    const matchesSearch = fleet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fleet.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fleet.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || fleet.operationalStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Decommissioned': 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const formatNumber = (num: number | undefined) => {
    return num ? num.toLocaleString() : 'N/A';
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Fleet Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage vessel details, maintenance schedules, and certificates
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/fleets/new"
              className="bimco-btn-primary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Vessel
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bimco-card">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vessels by name, IMO, or company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <FunnelIcon className="h-4 w-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Decommissioned">Decommissioned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fleet List */}
          <div className="divide-y divide-gray-200">
            {filteredFleets.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 text-sm">
                  No vessels found matching your criteria.
                </div>
              </div>
            ) : (
              filteredFleets.map((fleet) => (
                <div
                  key={fleet.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/fleets/${fleet.id}`}
                              className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {fleet.name}
                            </Link>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(fleet.operationalStatus)}`}>
                              {fleet.operationalStatus}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {fleet.type} • IMO {fleet.registration} • {fleet.companyName}
                          </div>
                          <div className="mt-1 text-xs text-gray-400 flex items-center gap-4">
                            <span>Flag: {fleet.flag}</span>
                            <span>Built: {fleet.yearBuilt}</span>
                            <span>DWT: {formatNumber(fleet.deadweight)} MT</span>
                            <span>GT: {formatNumber(fleet.grossTonnage)} GT</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Quick Actions */}
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Certificates"
                      >
                        <DocumentTextIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Maintenance Records"
                      >
                        <WrenchScrewdriverIcon className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/fleets/${fleet.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <ChevronRightIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Maintenance Status */}
                  {fleet.maintenanceRecords.some(record => record.status === 'In Progress' || record.status === 'Overdue') && (
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <WrenchScrewdriverIcon className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-600">
                        Maintenance: {fleet.maintenanceRecords.find(r => r.status === 'In Progress' || r.status === 'Overdue')?.description}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-semibold">
                      {fleets.filter(f => f.operationalStatus === 'Active').length}
                    </span>
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Active Vessels</p>
                  <p className="text-xs text-gray-400">Currently operational</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 text-sm font-semibold">
                      {fleets.filter(f => f.operationalStatus === 'Maintenance').length}
                    </span>
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">In Maintenance</p>
                  <p className="text-xs text-gray-400">Under repair/service</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-sm font-semibold">
                      {fleets.reduce((count, fleet) => 
                        count + fleet.certificates.filter(cert => 
                          new Date(cert.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                        ).length, 0)}
                    </span>
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Expiring Certificates</p>
                  <p className="text-xs text-gray-400">Next 90 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-semibold">
                      {fleets.reduce((sum, fleet) => sum + fleet.capacity, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                  <p className="text-xs text-gray-400">Combined fleet capacity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
