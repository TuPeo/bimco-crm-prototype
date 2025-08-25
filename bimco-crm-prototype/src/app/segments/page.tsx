'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import EnhancedSegmentManagement from '@/components/EnhancedSegmentManagement';
import type { Segment, SegmentCriteria, SegmentPerformance } from '@/components/EnhancedSegmentManagement';

// Mock data for demonstration
const mockSegments: Segment[] = [
  {
    id: 'seg_1',
    name: 'Premium Course Participants',
    description: 'High-value customers who have participated in premium training courses',
    criteria: [
      {
        id: 'crit_1',
        field: 'course_value',
        operator: 'greater_than',
        value: 1000,
        logicalOperator: undefined
      },
      {
        id: 'crit_2',
        field: 'participation_count',
        operator: 'greater_than',
        value: 2,
        logicalOperator: 'AND'
      }
    ],
    contactCount: 342,
    lastUpdated: '2025-08-24T10:30:00Z',
    createdAt: '2025-07-01T09:00:00Z',
    createdBy: 'Marketing Team',
    status: 'active',
    type: 'behavioral',
    tags: ['premium', 'high-value', 'loyal'],
    autoRefresh: true,
    refreshInterval: 24,
    lastRefreshAt: '2025-08-24T10:30:00Z',
    estimatedReach: 350,
    conversionRate: 15.2,
    revenue: 425000,
    campaigns: ['campaign_1', 'campaign_3']
  },
  {
    id: 'seg_2',
    name: 'European Maritime Companies',
    description: 'Companies based in European countries interested in maritime training',
    criteria: [
      {
        id: 'crit_3',
        field: 'company_country',
        operator: 'in',
        value: ['Denmark', 'Norway', 'Germany', 'Netherlands', 'UK'],
        logicalOperator: undefined
      },
      {
        id: 'crit_4',
        field: 'industry',
        operator: 'equals',
        value: 'Maritime',
        logicalOperator: 'AND'
      }
    ],
    contactCount: 1250,
    lastUpdated: '2025-08-23T15:45:00Z',
    createdAt: '2025-06-15T08:00:00Z',
    createdBy: 'Sales Team',
    status: 'active',
    type: 'geographic',
    tags: ['europe', 'maritime', 'companies'],
    autoRefresh: true,
    refreshInterval: 168, // Weekly
    lastRefreshAt: '2025-08-23T15:45:00Z',
    estimatedReach: 1280,
    conversionRate: 8.7,
    revenue: 180000,
    campaigns: ['campaign_2']
  },
  {
    id: 'seg_3',
    name: 'Course Drop-offs',
    description: 'Contacts who started course registration but did not complete',
    criteria: [
      {
        id: 'crit_5',
        field: 'registration_status',
        operator: 'equals',
        value: 'incomplete',
        logicalOperator: undefined
      },
      {
        id: 'crit_6',
        field: 'last_activity',
        operator: 'greater_than',
        value: 7, // days ago
        logicalOperator: 'AND'
      }
    ],
    contactCount: 89,
    lastUpdated: '2025-08-25T06:00:00Z',
    createdAt: '2025-08-10T12:00:00Z',
    createdBy: 'Course Admin',
    status: 'active',
    type: 'behavioral',
    tags: ['re-engagement', 'incomplete', 'follow-up'],
    autoRefresh: true,
    refreshInterval: 6, // Every 6 hours
    lastRefreshAt: '2025-08-25T06:00:00Z',
    estimatedReach: 95,
    conversionRate: 22.1,
    campaigns: []
  },
  {
    id: 'seg_4',
    name: 'New Contacts - Last 30 Days',
    description: 'Recently added contacts requiring welcome sequence',
    criteria: [
      {
        id: 'crit_7',
        field: 'date_created',
        operator: 'greater_than',
        value: '2025-07-25T00:00:00Z',
        logicalOperator: undefined
      }
    ],
    contactCount: 156,
    lastUpdated: '2025-08-25T00:00:00Z',
    createdAt: '2025-07-25T10:00:00Z',
    createdBy: 'Marketing Automation',
    status: 'active',
    type: 'demographic',
    tags: ['new', 'welcome', 'onboarding'],
    autoRefresh: true,
    refreshInterval: 1, // Hourly
    lastRefreshAt: '2025-08-25T07:00:00Z',
    estimatedReach: 160,
    conversionRate: 12.8,
    campaigns: ['welcome_series']
  }
];

const mockPerformances: SegmentPerformance[] = [
  {
    segmentId: 'seg_1',
    emailsSent: 1250,
    emailsOpened: 756,
    emailsClicked: 189,
    conversions: 52,
    revenue: 65000,
    engagementScore: 78.5,
    churnRate: 3.2,
    growthRate: 12.8,
    lastCalculated: '2025-08-24T23:59:59Z'
  },
  {
    segmentId: 'seg_2',
    emailsSent: 3200,
    emailsOpened: 1408,
    emailsClicked: 312,
    conversions: 108,
    revenue: 45000,
    engagementScore: 68.2,
    churnRate: 5.1,
    growthRate: 8.9,
    lastCalculated: '2025-08-23T23:59:59Z'
  },
  {
    segmentId: 'seg_3',
    emailsSent: 267,
    emailsOpened: 89,
    emailsClicked: 23,
    conversions: 19,
    revenue: 12500,
    engagementScore: 45.3,
    churnRate: 12.5,
    growthRate: -2.1,
    lastCalculated: '2025-08-24T23:59:59Z'
  },
  {
    segmentId: 'seg_4',
    emailsSent: 468,
    emailsOpened: 234,
    emailsClicked: 67,
    conversions: 20,
    revenue: 8900,
    engagementScore: 72.1,
    churnRate: 1.8,
    growthRate: 45.2,
    lastCalculated: '2025-08-24T23:59:59Z'
  }
];

const availableFields = [
  'company_name',
  'company_country',
  'company_type',
  'industry',
  'contact_name',
  'contact_email',
  'contact_role',
  'course_category',
  'course_value',
  'participation_count',
  'registration_status',
  'last_activity',
  'date_created',
  'date_updated',
  'revenue_generated',
  'engagement_score'
];

export default function Segments() {
  const [segments, setSegments] = useState<Segment[]>(mockSegments);
  const [performances, setPerformances] = useState<SegmentPerformance[]>(mockPerformances);

  const handleCreateSegment = (segment: Omit<Segment, 'id' | 'createdAt' | 'lastUpdated' | 'contactCount' | 'estimatedReach'>) => {
    const newSegment: Segment = {
      ...segment,
      id: `seg_${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      contactCount: Math.floor(Math.random() * 500) + 50, // Mock contact count
      estimatedReach: Math.floor(Math.random() * 600) + 60,
      conversionRate: Math.random() * 20 + 5,
      revenue: Math.floor(Math.random() * 100000) + 10000,
      campaigns: []
    };
    setSegments(prev => [...prev, newSegment]);
  };

  const handleUpdateSegment = (segmentId: string, segment: Partial<Segment>) => {
    setSegments(prev => 
      prev.map(s => 
        s.id === segmentId 
          ? { ...s, ...segment, lastUpdated: new Date().toISOString() }
          : s
      )
    );
  };

  const handleDeleteSegment = (segmentId: string) => {
    setSegments(prev => prev.filter(s => s.id !== segmentId));
    setPerformances(prev => prev.filter(p => p.segmentId !== segmentId));
  };

  const handleRefreshSegment = (segmentId: string) => {
    setSegments(prev => 
      prev.map(s => 
        s.id === segmentId 
          ? { 
              ...s, 
              lastRefreshAt: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
              contactCount: Math.floor(Math.random() * 500) + 50 // Mock refresh
            }
          : s
      )
    );
  };

  const handleDuplicateSegment = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      const duplicatedSegment: Segment = {
        ...segment,
        id: `seg_${Date.now()}`,
        name: `${segment.name} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        contactCount: 0,
        campaigns: []
      };
      setSegments(prev => [...prev, duplicatedSegment]);
    }
  };

  const handleExportSegment = (segmentId: string, format: 'csv' | 'excel' | 'pdf') => {
    const segment = segments.find(s => s.id === segmentId);
    if (segment) {
      // In a real implementation, this would generate and download the file
      console.log(`Exporting segment "${segment.name}" as ${format}`);
      alert(`Segment "${segment.name}" would be exported as ${format.toUpperCase()}`);
    }
  };

  return (
    <Layout>
      <EnhancedSegmentManagement
        segments={segments}
        performances={performances}
        availableFields={availableFields}
        onCreateSegment={handleCreateSegment}
        onUpdateSegment={handleUpdateSegment}
        onDeleteSegment={handleDeleteSegment}
        onRefreshSegment={handleRefreshSegment}
        onDuplicateSegment={handleDuplicateSegment}
        onExportSegment={handleExportSegment}
      />
    </Layout>
  );
}