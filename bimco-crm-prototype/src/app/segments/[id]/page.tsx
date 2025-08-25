'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { mockSegments, mockCompanies, mockContacts } from '@/data/mockData';
import { Segment } from '@/types';
import {
  ArrowLeftIcon,
  PencilIcon,
  PlayIcon,
  PauseIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function SegmentDetailPage() {
  const params = useParams();
  const [segment, setSegment] = useState<Segment | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [members, setMembers] = useState<Array<{
    id: string;
    type: string;
    name: string;
    subtitle: string;
    details: string;
    url: string;
    dateAdded: string;
  }>>([]);

  useEffect(() => {
    const segmentId = params.id as string;
    const foundSegment = mockSegments.find(s => s.id === segmentId);
    setSegment(foundSegment || null);

    // Simulate loading segment members based on criteria
    if (foundSegment) {
      const segmentMembers: Array<{
        id: string;
        type: string;
        name: string;
        subtitle: string;
        details: string;
        url: string;
        dateAdded: string;
      }> = [];
      
      // Since we now use array-based criteria, we need to parse the criteria differently
      // For now, we'll show some mock members based on segment ID
      if (segmentId === '1') {
        // Nordic Shipping Companies
        mockCompanies.filter(c => 
          ['Denmark', 'Norway', 'Sweden', 'Finland'].includes(c.address.country) &&
          ['Active', 'M1'].includes(c.status)
        ).slice(0, 20).forEach(company => {
          segmentMembers.push({
            id: company.id,
            type: 'company',
            name: company.name,
            subtitle: `${company.type} • ${company.address.country}`,
            details: company.registrationNumber,
            url: `/companies/${company.id}`,
            dateAdded: foundSegment.createdAt
          });
        });
      } else if (segmentId === '2') {
        // Maritime Training Prospects
        mockContacts.filter(c => 
          c.status === 'Active' &&
          ['Fleet Manager', 'Technical Director'].includes(c.role || '')
        ).slice(0, 20).forEach(contact => {
          segmentMembers.push({
            id: contact.id,
            type: 'contact',
            name: `${contact.firstName} ${contact.lastName}`,
            subtitle: `${contact.role} • ${contact.companyName}`,
            details: contact.email,
            url: `/contacts/${contact.id}`,
            dateAdded: foundSegment.createdAt
          });
        });
      } else if (segmentId === '3') {
        // Asia-Pacific Fleet Owners
        mockCompanies.filter(c => 
          ['Singapore', 'Hong Kong', 'Japan', 'South Korea'].includes(c.address.country) &&
          c.status === 'Active'
        ).slice(0, 20).forEach(company => {
          segmentMembers.push({
            id: company.id,
            type: 'company',
            name: company.name,
            subtitle: `${company.type} • ${company.address.country}`,
            details: company.registrationNumber,
            url: `/companies/${company.id}`,
            dateAdded: foundSegment.createdAt
          });
        });
      }

      setMembers(segmentMembers.slice(0, 50)); // Limit to 50 for demo
    }
  }, [params.id]);

  if (!segment) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">Segment not found</div>
          <Link href="/segments" className="text-blue-600 hover:text-blue-500 mt-2 inline-block">
            ← Back to Segments
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Draft': 'bg-gray-100 text-gray-800',
      'Archived': 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'company': return BuildingOfficeIcon;
      case 'contact': return UsersIcon;
      case 'course': return AcademicCapIcon;
      default: return UsersIcon;
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'company': return 'text-blue-600 bg-blue-100';
      case 'contact': return 'text-green-600 bg-green-100';
      case 'course': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'members', name: `Members (${members.length})` },
    { id: 'criteria', name: 'Criteria' },
    { id: 'activity', name: 'Activity' }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/segments"
              className="p-2 -m-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{segment.name}</h1>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(segment.status)}`}>
                  {segment.status}
                </span>
                {/* TODO: Update status indicators for new structure */}
                {/* 
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
                */}
              </div>
              {segment.description && (
                <p className="mt-1 text-sm text-gray-600">{segment.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bimco-btn-secondary">
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Export Members
            </button>
            <Link href={`/segments/${segment.id}/edit`} className="bimco-btn-secondary">
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Segment
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="bimco-btn-primary">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Create Event
          </button>
          <button className="bimco-btn-secondary">
            <PlayIcon className="h-4 w-4 mr-2" />
            Create Interaction
          </button>
          {/* TODO: Update action buttons for new structure */}
          {/*
          {segment.onHold && (
            <button className="bimco-btn-secondary">
              <PlayIcon className="h-4 w-4 mr-2" />
              Remove Hold
            </button>
          )}
          {!segment.readyForInvoice && segment.status === 'Active' && (
            <button className="bimco-btn-secondary">
              <CurrencyDollarIcon className="h-4 w-4 mr-2" />
              Set Ready for Invoice
            </button>
          )}
          */}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Segment Information */}
            <div className="lg:col-span-2">
              <div className="bimco-card">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Segment Information</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Member Count</label>
                      <p className="mt-1 text-2xl font-semibold text-gray-900">{segment.contactCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(segment.status)}`}>
                          {segment.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Created By</label>
                      <p className="mt-1 text-sm text-gray-900">{segment.createdBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Created</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(segment.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                      <p className="mt-1 text-sm text-gray-900">{formatDate(segment.lastUpdated)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">On Hold</label>
                      <div className="mt-1">
                        {segment.status === 'active' ? (
                          <span className="inline-flex items-center text-sm text-yellow-600">
                            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-sm text-green-600">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            No
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bimco-card">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Quick Stats</h3>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ready for Invoice</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      segment.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {segment.status === 'active' ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Companies</span>
                    <span className="text-sm font-medium text-gray-900">
                      {members.filter(m => m.type === 'company').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Contacts</span>
                    <span className="text-sm font-medium text-gray-900">
                      {members.filter(m => m.type === 'contact').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Courses</span>
                    <span className="text-sm font-medium text-gray-900">
                      {members.filter(m => m.type === 'course').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="bimco-card">
            <div className="bimco-card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Segment Members</h3>
                <button className="bimco-btn-secondary">
                  <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                  Export All
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {members.map((member) => {
                const Icon = getEntityIcon(member.type);
                return (
                  <div key={`${member.type}-${member.id}`} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg ${getEntityColor(member.type)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={member.url}
                            className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors block"
                          >
                            {member.name}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">{member.subtitle}</p>
                          <p className="text-xs text-gray-500 mt-1">{member.details}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Added: {formatDate(member.dateAdded)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'criteria' && (
          <div className="bimco-card">
            <div className="bimco-card-header">
              <h3 className="text-lg font-medium text-gray-900">Segment Criteria</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Segment Criteria</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="space-y-2 text-sm">
                    {segment.criteria.map((criterion) => (
                      <div key={criterion.id} className="flex items-center space-x-2">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {criterion.field}
                        </span>
                        <span className="text-gray-600">{criterion.operator}</span>
                        <span className="font-medium text-gray-900">
                          {Array.isArray(criterion.value) ? criterion.value.join(', ') : criterion.value}
                        </span>
                        {criterion.logicalOperator && (
                          <span className="text-gray-500 text-xs">{criterion.logicalOperator}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bimco-card">
            <div className="bimco-card-header">
              <h3 className="text-lg font-medium text-gray-900">Activity Log</h3>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-500 py-8">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p>Activity tracking will be available soon</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
