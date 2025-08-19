'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { mockSegments } from '@/data/mockData';
import { Segment } from '@/types';
import {
  RectangleGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  CurrencyDollarIcon,
  UsersIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function SegmentsPage() {
  const [segments] = useState<Segment[]>(mockSegments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredSegments = segments.filter(segment => {
    const matchesSearch = segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         segment.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || segment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Archived': 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCreateEvent = (segmentId: string) => {
    console.log('Creating event for segment:', segmentId);
    // Navigate to event creation with pre-filled segment data
  };

  const handleCreateInteraction = (segmentId: string) => {
    console.log('Creating interaction for segment:', segmentId);
    // Navigate to interaction creation with pre-filled segment data
  };

  const handleRemoveHold = (segmentId: string) => {
    console.log('Removing hold for segment:', segmentId);
    // API call to remove hold status
  };

  const handleSetReadyForInvoice = (segmentId: string) => {
    console.log('Setting ready for invoice for segment:', segmentId);
    // API call to set ready for invoice
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Segment Management
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Create and manage customer segments for targeted campaigns and interactions
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/segments/new"
              className="bimco-btn-primary"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Create New Segment
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
                    placeholder="Search segments by name or description..."
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
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Segments List */}
          <div className="divide-y divide-gray-200">
            {filteredSegments.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <RectangleGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-400 text-sm">
                  No segments found matching your criteria.
                </div>
                <Link href="/segments/new" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
                  Create your first segment
                </Link>
              </div>
            ) : (
              filteredSegments.map((segment) => (
                <div
                  key={segment.id}
                  className="px-6 py-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Link
                          href={`/segments/${segment.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {segment.name}
                        </Link>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(segment.status)}`}>
                          {segment.status}
                        </span>
                        {segment.onHold && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <PauseIcon className="h-3 w-3 mr-1" />
                            On Hold
                          </span>
                        )}
                        {segment.readyForInvoice && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <CurrencyDollarIcon className="h-3 w-3 mr-1" />
                            Ready for Invoice
                          </span>
                        )}
                      </div>
                      
                      {segment.description && (
                        <p className="text-sm text-gray-600 mb-2">{segment.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <UsersIcon className="h-3 w-3" />
                          {segment.memberCount.toLocaleString()} members
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          Created: {formatDate(segment.dateCreated)}
                        </span>
                        <span>By: {segment.createdBy}</span>
                        <span>Updated: {formatDate(segment.lastUpdated)}</span>
                      </div>

                      {/* Criteria Preview */}
                      <div className="mt-3 flex items-center gap-2 text-xs">
                        <span className="text-gray-500">Criteria:</span>
                        {segment.criteria.companies && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            Companies
                          </span>
                        )}
                        {segment.criteria.contacts && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700">
                            Contacts
                          </span>
                        )}
                        {segment.criteria.courses && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-orange-50 text-orange-700">
                            Courses
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {/* Quick Actions Menu */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCreateEvent(segment.id)}
                          className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                          title="Create Event"
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCreateInteraction(segment.id)}
                          className="p-2 text-green-600 hover:text-green-700 transition-colors"
                          title="Create Interaction"
                        >
                          <PlayIcon className="h-4 w-4" />
                        </button>
                        {segment.onHold && (
                          <button
                            onClick={() => handleRemoveHold(segment.id)}
                            className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                            title="Remove Hold"
                          >
                            <PlayIcon className="h-4 w-4" />
                          </button>
                        )}
                        {!segment.readyForInvoice && segment.status === 'Active' && (
                          <button
                            onClick={() => handleSetReadyForInvoice(segment.id)}
                            className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                            title="Set Ready for Invoice"
                          >
                            <CurrencyDollarIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Main Actions */}
                      <Link
                        href={`/segments/${segment.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/segments/${segment.id}/edit`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit Segment"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Segment"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
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
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Active Segments</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.filter(s => s.status === 'Active').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <UsersIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Members</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.reduce((sum, segment) => sum + segment.memberCount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <PauseIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">On Hold</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.filter(s => s.onHold).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bimco-stat-card">
            <div className="px-4 py-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Ready for Invoice</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {segments.filter(s => s.readyForInvoice).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="bimco-card">
          <div className="bimco-card-header">
            <h3 className="text-lg font-medium text-gray-900">Segment Management Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="bimco-btn-secondary justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Create Event
              </button>
              <button className="bimco-btn-secondary justify-start">
                <PlayIcon className="h-4 w-4 mr-2" />
                Create Interaction
              </button>
              <button className="bimco-btn-secondary justify-start">
                <PlayIcon className="h-4 w-4 mr-2" />
                Remove on Hold
              </button>
              <button className="bimco-btn-secondary justify-start">
                <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                Set Ready for Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
