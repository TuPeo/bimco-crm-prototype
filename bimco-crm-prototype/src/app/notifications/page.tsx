'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import InternalNotificationCenter from '@/components/InternalNotificationCenter';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ArchiveBoxIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  ChevronDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  ExclamationCircleIcon,
  TagIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { 
  CheckCircleIcon as CheckCircleIconSolid,
  ExclamationTriangleIcon as ExclamationTriangleIconSolid
} from '@heroicons/react/24/solid';

// Notification interfaces
interface Notification {
  id: string;
  type: 'system' | 'membership' | 'course' | 'event' | 'invoice' | 'contract' | 'task' | 'bc_integration' | 'myaccount' | 'smartcon';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'assigned' | 'snoozed' | 'resolved' | 'archived';
  source: 'crm' | 'bc' | 'myaccount' | 'smartcon' | 'manual';
  assignedTo?: string;
  assignedBy?: string;
  department?: 'sales' | 'marketing' | 'customer_service' | 'training' | 'finance' | 'technical';
  relatedEntity?: {
    type: 'company' | 'contact' | 'course' | 'contract' | 'invoice';
    id: string;
    name: string;
  };
  actions?: NotificationAction[];
  snoozeUntil?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  auditTrail: AuditEntry[];
  tags?: string[];
  escalationLevel?: number;
  autoAssignmentRule?: string;
  rolePermissions?: string[];
  teamAccess?: string[];
}

interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  action: string;
}

interface AuditEntry {
  timestamp: string;
  action: 'created' | 'read' | 'assigned' | 'snoozed' | 'resolved' | 'archived';
  user: string;
  details?: string;
}

// Comprehensive mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'membership',
    title: 'New Company Membership Registration',
    message: 'Maritime Solutions Ltd has applied for premium membership with 15 vessels.',
    timestamp: '2025-08-25T08:30:00Z',
    read: false,
    priority: 'high',
    status: 'new',
    source: 'bc',
    department: 'sales',
    relatedEntity: {
      type: 'company',
      id: 'comp_001',
      name: 'Maritime Solutions Ltd'
    },
    actions: [
      { id: 'approve', label: 'Approve', type: 'primary', action: 'approve_membership' },
      { id: 'review', label: 'Review', type: 'secondary', action: 'review_application' }
    ],
    tags: ['membership', 'new-company', 'premium'],
    autoAssignmentRule: 'New membership applications -> Sales team lead',
    rolePermissions: ['sales_manager', 'membership_admin'],
    teamAccess: ['sales', 'management'],
    auditTrail: [
      { timestamp: '2025-08-25T08:30:00Z', action: 'created', user: 'BC Integration', details: 'Auto-generated from BC integration' },
      { timestamp: '2025-08-25T08:31:00Z', action: 'created', user: 'System', details: 'Applied auto-assignment rules' }
    ]
  },
  {
    id: '2',
    type: 'course',
    title: 'Large Course Registration',
    message: 'Maersk Group has registered 25 employees for "Advanced Maritime Law" course.',
    timestamp: '2025-08-25T07:45:00Z',
    read: false,
    priority: 'medium',
    status: 'assigned',
    source: 'myaccount',
    assignedTo: 'Sarah Johnson',
    assignedBy: 'Mike Brown',
    department: 'training',
    relatedEntity: {
      type: 'company',
      id: 'comp_002',
      name: 'Maersk Group'
    },
    actions: [
      { id: 'confirm', label: 'Confirm Registration', type: 'primary', action: 'confirm_registration' },
      { id: 'contact', label: 'Contact Customer', type: 'secondary', action: 'contact_customer' },
      { id: 'capacity_check', label: 'Check Capacity', type: 'secondary', action: 'check_course_capacity' }
    ],
    tags: ['course', 'bulk-registration', 'maritime-law'],
    rolePermissions: ['training_coordinator', 'course_admin'],
    teamAccess: ['training', 'customer_service'],
    auditTrail: [
      { timestamp: '2025-08-25T07:45:00Z', action: 'created', user: 'MyAccount API', details: 'Bulk course registration received' },
      { timestamp: '2025-08-25T08:00:00Z', action: 'assigned', user: 'Mike Brown', details: 'Assigned to Sarah Johnson for processing' },
      { timestamp: '2025-08-25T08:15:00Z', action: 'read', user: 'Sarah Johnson', details: 'Notification opened and reviewed' }
    ]
  },
  {
    id: '3',
    type: 'bc_integration',
    title: 'Fleet Update Notification',
    message: 'CMA CGM updated their fleet size from 12 to 18 vessels in Business Central.',
    timestamp: '2025-08-25T06:15:00Z',
    read: true,
    priority: 'medium',
    status: 'resolved',
    source: 'bc',
    assignedTo: 'David Wilson',
    assignedBy: 'System Auto-Assignment',
    department: 'customer_service',
    relatedEntity: {
      type: 'company',
      id: 'comp_003',
      name: 'CMA CGM'
    },
    resolvedAt: '2025-08-25T09:00:00Z',
    resolvedBy: 'David Wilson',
    tags: ['fleet-update', 'bc-sync', 'vessel-count'],
    autoAssignmentRule: 'BC fleet updates -> Customer Service by company assignment',
    rolePermissions: ['customer_service_rep', 'fleet_admin'],
    teamAccess: ['customer_service', 'technical'],
    auditTrail: [
      { timestamp: '2025-08-25T06:15:00Z', action: 'created', user: 'BC Integration', details: 'Fleet data synchronization detected changes' },
      { timestamp: '2025-08-25T08:30:00Z', action: 'assigned', user: 'System Auto-Assignment', details: 'Auto-assigned based on company-territory rules' },
      { timestamp: '2025-08-25T08:45:00Z', action: 'read', user: 'David Wilson', details: 'Notification reviewed' },
      { timestamp: '2025-08-25T09:00:00Z', action: 'resolved', user: 'David Wilson', details: 'CRM fleet data updated and verified successfully' }
    ]
  },
  {
    id: '4',
    type: 'task',
    title: 'Contract Expiring Soon',
    message: 'Service contract with Evergreen Marine expires in 7 days.',
    timestamp: '2025-08-24T16:30:00Z',
    read: false,
    priority: 'urgent',
    status: 'new',
    source: 'crm',
    department: 'sales',
    relatedEntity: {
      type: 'contract',
      id: 'contract_001',
      name: 'Evergreen Marine Service Contract'
    },
    actions: [
      { id: 'renew', label: 'Initiate Renewal', type: 'primary', action: 'initiate_renewal' },
      { id: 'contact', label: 'Contact Client', type: 'secondary', action: 'contact_client' },
      { id: 'escalate', label: 'Escalate to Manager', type: 'danger', action: 'escalate_to_manager' }
    ],
    tags: ['contract-expiry', 'renewal-reminder', 'high-value'],
    escalationLevel: 1,
    autoAssignmentRule: 'Contract expiry alerts -> Account manager for client',
    rolePermissions: ['account_manager', 'sales_rep', 'contract_admin'],
    teamAccess: ['sales', 'legal'],
    auditTrail: [
      { timestamp: '2025-08-24T16:30:00Z', action: 'created', user: 'CRM Contract Monitor', details: 'Automated contract expiry reminder - 7 days warning' }
    ]
  },
  {
    id: '5',
    type: 'invoice',
    title: 'Overdue Invoice Alert',
    message: 'Invoice INV-2025-0847 from COSCO Shipping is 15 days overdue.',
    timestamp: '2025-08-24T14:20:00Z',
    read: true,
    priority: 'high',
    status: 'snoozed',
    source: 'crm',
    assignedTo: 'Anna Davis',
    assignedBy: 'Finance Manager',
    department: 'finance',
    snoozeUntil: '2025-08-26T09:00:00Z',
    relatedEntity: {
      type: 'invoice',
      id: 'inv_847',
      name: 'INV-2025-0847'
    },
    actions: [
      { id: 'send_reminder', label: 'Send Reminder', type: 'primary', action: 'send_payment_reminder' },
      { id: 'escalate', label: 'Escalate', type: 'danger', action: 'escalate_overdue' },
      { id: 'negotiate', label: 'Negotiate Terms', type: 'secondary', action: 'negotiate_payment_terms' }
    ],
    tags: ['overdue-payment', 'collections', 'escalation-ready'],
    escalationLevel: 2,
    rolePermissions: ['finance_collector', 'finance_manager'],
    teamAccess: ['finance', 'legal'],
    auditTrail: [
      { timestamp: '2025-08-24T14:20:00Z', action: 'created', user: 'Finance System', details: 'Overdue payment detected - 15 days past due' },
      { timestamp: '2025-08-24T15:00:00Z', action: 'read', user: 'Anna Davis', details: 'Reviewed overdue invoice details' },
      { timestamp: '2025-08-24T15:05:00Z', action: 'assigned', user: 'Finance Manager', details: 'Assigned to Anna Davis for collection follow-up' },
      { timestamp: '2025-08-24T15:10:00Z', action: 'snoozed', user: 'Anna Davis', details: 'Snoozed until Monday morning - awaiting client response to email' }
    ]
  },
  {
    id: '6',
    type: 'smartcon',
    title: 'SmartCon Integration Alert',
    message: 'New charter party contract data received from SmartCon for MSC Mediterranean.',
    timestamp: '2025-08-24T11:45:00Z',
    read: false,
    priority: 'medium',
    status: 'new',
    source: 'smartcon',
    department: 'technical',
    relatedEntity: {
      type: 'contract',
      id: 'smartcon_001',
      name: 'MSC Mediterranean Charter Party'
    },
    actions: [
      { id: 'process', label: 'Process Data', type: 'primary', action: 'process_smartcon_data' },
      { id: 'review', label: 'Review Contract', type: 'secondary', action: 'review_contract' },
      { id: 'validate', label: 'Validate Terms', type: 'secondary', action: 'validate_contract_terms' }
    ],
    tags: ['smartcon-sync', 'charter-party', 'contract-integration'],
    autoAssignmentRule: 'SmartCon integrations -> Technical team lead',
    rolePermissions: ['technical_analyst', 'contract_specialist'],
    teamAccess: ['technical', 'legal'],
    auditTrail: [
      { timestamp: '2025-08-24T11:45:00Z', action: 'created', user: 'SmartCon API', details: 'New charter party contract data received via API integration' }
    ]
  },
  {
    id: '7',
    type: 'event',
    title: 'Webinar Registration Milestone',
    message: '"Maritime Sustainability Summit 2025" has reached 500+ registrations.',
    timestamp: '2025-08-23T20:15:00Z',
    read: true,
    priority: 'low',
    status: 'archived',
    source: 'crm',
    department: 'marketing',
    relatedEntity: {
      type: 'course',
      id: 'event_001',
      name: 'Maritime Sustainability Summit 2025'
    },
    tags: ['milestone', 'webinar', 'marketing-success'],
    rolePermissions: ['marketing_coordinator', 'event_manager'],
    teamAccess: ['marketing', 'training'],
    auditTrail: [
      { timestamp: '2025-08-23T20:15:00Z', action: 'created', user: 'Event System', details: 'Registration milestone reached - 500 participants' },
      { timestamp: '2025-08-24T08:00:00Z', action: 'read', user: 'Marketing Team', details: 'Milestone notification reviewed' },
      { timestamp: '2025-08-24T08:05:00Z', action: 'archived', user: 'Marketing Team', details: 'Milestone acknowledged and celebrated' }
    ]
  },
  {
    id: '8',
    type: 'system',
    title: 'System Maintenance Complete',
    message: 'Scheduled maintenance completed successfully. All services are operational.',
    timestamp: '2025-08-23T04:00:00Z',
    read: true,
    priority: 'low',
    status: 'resolved',
    source: 'crm',
    department: 'technical',
    resolvedAt: '2025-08-23T04:00:00Z',
    resolvedBy: 'System',
    tags: ['maintenance', 'system-status', 'operational'],
    rolePermissions: ['system_admin', 'technical_lead'],
    teamAccess: ['technical', 'management'],
    auditTrail: [
      { timestamp: '2025-08-23T04:00:00Z', action: 'created', user: 'System Monitor', details: 'Maintenance completion notification generated' },
      { timestamp: '2025-08-23T04:00:00Z', action: 'resolved', user: 'System', details: 'Auto-resolved - all systems operational' }
    ]
  },
  {
    id: '9',
    type: 'membership',
    title: 'Membership Renewal Required',
    message: 'Hapag-Lloyd membership expires in 30 days. Renewal required to maintain premium benefits.',
    timestamp: '2025-08-23T10:00:00Z',
    read: false,
    priority: 'high',
    status: 'assigned',
    source: 'crm',
    assignedTo: 'Robert Chen',
    assignedBy: 'Sarah Miller',
    department: 'customer_service',
    relatedEntity: {
      type: 'company',
      id: 'comp_004',
      name: 'Hapag-Lloyd'
    },
    actions: [
      { id: 'send_renewal', label: 'Send Renewal Notice', type: 'primary', action: 'send_renewal_notice' },
      { id: 'schedule_call', label: 'Schedule Call', type: 'secondary', action: 'schedule_renewal_call' },
      { id: 'prepare_proposal', label: 'Prepare Proposal', type: 'secondary', action: 'prepare_renewal_proposal' }
    ],
    tags: ['membership-renewal', 'high-value-client', 'premium-benefits'],
    escalationLevel: 0,
    rolePermissions: ['account_manager', 'membership_coordinator'],
    teamAccess: ['customer_service', 'sales'],
    auditTrail: [
      { timestamp: '2025-08-23T10:00:00Z', action: 'created', user: 'Membership System', details: '30-day renewal reminder generated' },
      { timestamp: '2025-08-23T11:15:00Z', action: 'assigned', user: 'Sarah Miller', details: 'Assigned to Robert Chen - primary account manager' }
    ]
  },
  {
    id: '10',
    type: 'course',
    title: 'Course Capacity Alert',
    message: '"Basic Maritime Safety" course is at 90% capacity. Consider opening additional session.',
    timestamp: '2025-08-22T15:30:00Z',
    read: true,
    priority: 'medium',
    status: 'resolved',
    source: 'crm',
    assignedTo: 'Lisa Wang',
    assignedBy: 'Training Manager',
    department: 'training',
    resolvedAt: '2025-08-23T09:30:00Z',
    resolvedBy: 'Lisa Wang',
    relatedEntity: {
      type: 'course',
      id: 'course_001',
      name: 'Basic Maritime Safety'
    },
    actions: [
      { id: 'add_session', label: 'Add Session', type: 'primary', action: 'add_course_session' },
      { id: 'waitlist', label: 'Enable Waitlist', type: 'secondary', action: 'enable_waitlist' }
    ],
    tags: ['capacity-management', 'popular-course', 'additional-session'],
    rolePermissions: ['training_coordinator', 'course_scheduler'],
    teamAccess: ['training', 'customer_service'],
    auditTrail: [
      { timestamp: '2025-08-22T15:30:00Z', action: 'created', user: 'Course Management System', details: 'Capacity threshold reached - 90% full' },
      { timestamp: '2025-08-22T16:00:00Z', action: 'assigned', user: 'Training Manager', details: 'Assigned to Lisa Wang for capacity management' },
      { timestamp: '2025-08-22T16:30:00Z', action: 'read', user: 'Lisa Wang', details: 'Reviewed capacity situation' },
      { timestamp: '2025-08-23T09:30:00Z', action: 'resolved', user: 'Lisa Wang', details: 'Additional session scheduled for next month' }
    ]
  }
];

// Mock notifications for InternalNotificationCenter (header component)
const mockInternalNotifications: import('@/components/InternalNotificationCenter').Notification[] = [
  {
    id: 'int_1',
    type: 'warning',
    title: 'Contract Expiring',
    message: 'Evergreen Marine contract expires in 7 days',
    createdAt: '2025-08-24T16:30:00Z',
    isRead: false,
    priority: 'urgent',
    category: 'payment',
    actionUrl: '/contracts/contract_001'
  },
  {
    id: 'int_2',
    type: 'info',
    title: 'New Registration',
    message: 'Maersk Group registered 25 employees for course',
    createdAt: '2025-08-25T07:45:00Z',
    isRead: false,
    priority: 'medium',
    category: 'course'
  },
  {
    id: 'int_3',
    type: 'success',
    title: 'Payment Received',
    message: 'Invoice INV-2025-0848 has been paid',
    createdAt: '2025-08-25T10:15:00Z',
    isRead: true,
    priority: 'low',
    category: 'payment'
  },
  {
    id: 'int_4',
    type: 'task',
    title: 'Follow-up Required',
    message: 'Contact COSCO Shipping about overdue payment',
    createdAt: '2025-08-24T14:20:00Z',
    isRead: false,
    priority: 'high',
    category: 'payment'
  },
  {
    id: 'int_5',
    type: 'system',
    title: 'Maintenance Complete',
    message: 'Scheduled system maintenance completed successfully',
    createdAt: '2025-08-23T04:00:00Z',
    isRead: true,
    priority: 'low',
    category: 'system'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [internalNotifications, setInternalNotifications] = useState(mockInternalNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignedTo, setFilterAssignedTo] = useState<string>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [assignmentTarget, setAssignmentTarget] = useState('');
  const [activeTab, setActiveTab] = useState<'detailed' | 'internal'>('detailed');

  // Filter notifications based on search and filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesDepartment = filterDepartment === 'all' || notification.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesAssigned = filterAssignedTo === 'all' || notification.assignedTo === filterAssignedTo;
    
    return matchesSearch && matchesType && matchesDepartment && matchesStatus && matchesPriority && matchesAssigned;
  });

  // Get notification statistics
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    urgent: notifications.filter(n => n.priority === 'urgent').length,
    assigned: notifications.filter(n => n.status === 'assigned').length,
    snoozed: notifications.filter(n => n.status === 'snoozed').length,
    resolved: notifications.filter(n => n.status === 'resolved').length
  };

  // Get unique assignees for filter
  const uniqueAssignees = Array.from(new Set(notifications.filter(n => n.assignedTo).map(n => n.assignedTo))).sort();

  const getIcon = (type: string) => {
    switch (type) {
      case 'membership': return BuildingOfficeIcon;
      case 'course': return AcademicCapIcon;
      case 'event': return CalendarIcon;
      case 'invoice': return CurrencyDollarIcon;
      case 'contract': return DocumentTextIcon;
      case 'task': return CheckCircleIcon;
      case 'bc_integration': return ArrowPathIcon;
      case 'myaccount': return UserIcon;
      case 'smartcon': return DocumentTextIcon;
      case 'system': return ExclamationTriangleIcon;
      default: return BellIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-600 bg-blue-50';
      case 'assigned': return 'text-purple-600 bg-purple-50';
      case 'snoozed': return 'text-yellow-600 bg-yellow-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'archived': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'membership': return 'bg-blue-100 text-blue-800';
      case 'course': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'invoice': return 'bg-red-100 text-red-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'task': return 'bg-yellow-100 text-yellow-800';
      case 'bc_integration': return 'bg-indigo-100 text-indigo-800';
      case 'myaccount': return 'bg-cyan-100 text-cyan-800';
      case 'smartcon': return 'bg-teal-100 text-teal-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignNotification = (notificationId: string, assignedTo: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            status: 'assigned' as const,
            assignedTo,
            assignedBy: 'Current User',
            auditTrail: [...n.auditTrail, {
              timestamp: new Date().toISOString(),
              action: 'assigned',
              user: 'Current User',
              details: `Assigned to ${assignedTo}`
            }]
          } 
        : n
    ));
  };

  const handleEscalateNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            priority: 'urgent' as const,
            escalationLevel: (n.escalationLevel || 0) + 1,
            auditTrail: [...n.auditTrail, {
              timestamp: new Date().toISOString(),
              action: 'created',
              user: 'Current User',
              details: `Escalated to level ${(n.escalationLevel || 0) + 1}`
            }]
          } 
        : n
    ));
  };

  // const handleForwardNotification = (notificationId: string, targetDepartment: string) => {
  //   setNotifications(prev => prev.map(n => 
  //     n.id === notificationId 
  //       ? { 
  //           ...n, 
  //           department: targetDepartment as 'sales' | 'marketing' | 'customer_service' | 'training' | 'finance' | 'technical',
  //           status: 'new' as const,
  //           assignedTo: undefined,
  //           auditTrail: [...n.auditTrail, {
  //             timestamp: new Date().toISOString(),
  //             action: 'created',
  //             user: 'Current User',
  //             details: `Forwarded to ${targetDepartment} department`
  //           }]
  //         } 
  //       : n
  //   ));
  // };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            read: true,
            auditTrail: [...n.auditTrail, {
              timestamp: new Date().toISOString(),
              action: 'read',
              user: 'Current User'
            }]
          } 
        : n
    ));
  };

  const handleSnoozeNotification = (notificationId: string, snoozeUntil: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            status: 'snoozed' as const,
            snoozeUntil,
            auditTrail: [...n.auditTrail, {
              timestamp: new Date().toISOString(),
              action: 'snoozed',
              user: 'Current User',
              details: `Snoozed until ${new Date(snoozeUntil).toLocaleString()}`
            }]
          } 
        : n
    ));
  };

  const handleResolveNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            status: 'resolved' as const,
            resolvedAt: new Date().toISOString(),
            resolvedBy: 'Current User',
            auditTrail: [...n.auditTrail, {
              timestamp: new Date().toISOString(),
              action: 'resolved',
              user: 'Current User'
            }]
          } 
        : n
    ));
  };

  const handleArchiveNotification = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId 
        ? { 
            ...n, 
            status: 'archived' as const,
            auditTrail: [...n.auditTrail, {
              timestamp: new Date().toISOString(),
              action: 'archived',
              user: 'Current User'
            }]
          } 
        : n
    ));
  };

  const handleBulkAction = (action: string) => {
    const currentTime = new Date().toISOString();
    
    setNotifications(prev => prev.map(n => {
      if (selectedNotifications.includes(n.id)) {
        const newAuditEntry = {
          timestamp: currentTime,
          action: action as 'created' | 'read' | 'assigned' | 'snoozed' | 'resolved' | 'archived',
          user: 'Current User'
        };

        switch (action) {
          case 'read':
            return { 
              ...n, 
              read: true,
              auditTrail: [...n.auditTrail, newAuditEntry]
            };
          case 'resolve':
            return { 
              ...n, 
              status: 'resolved' as const,
              resolvedAt: currentTime,
              resolvedBy: 'Current User',
              auditTrail: [...n.auditTrail, newAuditEntry]
            };
          case 'archive':
            return { 
              ...n, 
              status: 'archived' as const,
              auditTrail: [...n.auditTrail, newAuditEntry]
            };
          default:
            return n;
        }
      }
      return n;
    }));
    
    setSelectedNotifications([]);
  };

  // Handlers for InternalNotificationCenter
  const handleMarkInternalAsRead = (notificationId: string) => {
    setInternalNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAllInternalAsRead = () => {
    setInternalNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteInternal = (notificationId: string) => {
    setInternalNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleClearAllInternal = () => {
    setInternalNotifications([]);
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
              <p className="mt-2 text-gray-600">Centralized notification management for CRM staff</p>
            </div>
            
            {/* Internal Notification Center - Header Component */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Quick Access Notifications
              </div>
              <InternalNotificationCenter
                notifications={internalNotifications}
                onMarkAsRead={handleMarkInternalAsRead}
                onMarkAllAsRead={handleMarkAllInternalAsRead}
                onDelete={handleDeleteInternal}
                onClearAll={handleClearAllInternal}
              />
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BellIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <EyeSlashIcon className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.unread}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ExclamationTriangleIconSolid className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Urgent</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.urgent}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assigned</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.assigned}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Snoozed</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.snoozed}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircleIconSolid className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.resolved}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('detailed')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'detailed'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Detailed Notifications
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {stats.total}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('internal')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'internal'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Quick Access Notifications
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {internalNotifications.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'detailed' && (
            <>
              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <FunnelIcon className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDownIcon className={`h-4 w-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {selectedNotifications.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{selectedNotifications.length} selected</span>
                      <button
                        onClick={() => handleBulkAction('read')}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                      >
                        Mark Read
                      </button>
                      <button
                        onClick={() => setShowAssignmentModal(true)}
                        className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => handleBulkAction('resolve')}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={() => handleBulkAction('archive')}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                      >
                        Archive
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {showFilters && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="membership">Membership</option>
                      <option value="course">Course</option>
                      <option value="event">Event</option>
                      <option value="invoice">Invoice</option>
                      <option value="contract">Contract</option>
                      <option value="task">Task</option>
                      <option value="bc_integration">BC Integration</option>
                      <option value="myaccount">MyAccount</option>
                      <option value="smartcon">SmartCon</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={filterDepartment}
                      onChange={(e) => setFilterDepartment(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      <option value="sales">Sales</option>
                      <option value="marketing">Marketing</option>
                      <option value="customer_service">Customer Service</option>
                      <option value="training">Training</option>
                      <option value="finance">Finance</option>
                      <option value="technical">Technical</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="new">New</option>
                      <option value="assigned">Assigned</option>
                      <option value="snoozed">Snoozed</option>
                      <option value="resolved">Resolved</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                    >
                      <option value="all">All Priorities</option>
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      value={filterAssignedTo}
                      onChange={(e) => setFilterAssignedTo(e.target.value)}
                    >
                      <option value="all">All Assignees</option>
                      <option value="unassigned">Unassigned</option>
                      {uniqueAssignees.map(assignee => (
                        <option key={assignee} value={assignee}>{assignee}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications found matching your criteria</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => {
                  const IconComponent = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedNotifications(prev => [...prev, notification.id]);
                            } else {
                              setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                            }
                          }}
                        />
                        
                        <div className="flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-gray-500 mt-1" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </h3>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                                  {notification.type.replace('_', ' ')}
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority}
                                </span>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                                  {notification.status}
                                </span>
                                {notification.escalationLevel && notification.escalationLevel > 0 && (
                                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                    <ExclamationTriangleIconSolid className="h-3 w-3 mr-1" />
                                    Level {notification.escalationLevel}
                                  </span>
                                )}
                              </div>
                              
                              <p className={`text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                              
                              {/* Tags */}
                              {notification.tags && notification.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {notification.tags.map((tag) => (
                                    <span key={tag} className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md">
                                      <TagIcon className="h-3 w-3 mr-1" />
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                                <span>Source: {notification.source.toUpperCase()}</span>
                                {notification.department && (
                                  <span>Department: {notification.department.replace('_', ' ')}</span>
                                )}
                                {notification.assignedTo && (
                                  <span>Assigned to: {notification.assignedTo}</span>
                                )}
                                {notification.assignedBy && (
                                  <span>by {notification.assignedBy}</span>
                                )}
                                {notification.relatedEntity && (
                                  <span className="inline-flex items-center">
                                    <LinkIcon className="h-3 w-3 mr-1" />
                                    {notification.relatedEntity.type}: {notification.relatedEntity.name}
                                  </span>
                                )}
                              </div>
                              
                              {/* Auto-assignment rule */}
                              {notification.autoAssignmentRule && (
                                <div className="mt-1 text-xs text-gray-500 italic">
                                  Rule: {notification.autoAssignmentRule}
                                </div>
                              )}
                              
                              {notification.actions && notification.actions.length > 0 && (
                                <div className="mt-3 flex items-center space-x-2">
                                  {notification.actions.map((action) => (
                                    <button
                                      key={action.id}
                                      className={`px-3 py-1 text-xs font-medium rounded-md ${
                                        action.type === 'primary' 
                                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                          : action.type === 'danger'
                                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                      }`}
                                    >
                                      {action.label}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <time className="text-xs text-gray-500 whitespace-nowrap">
                                {new Date(notification.timestamp).toLocaleString()}
                              </time>
                              
                              <div className="flex items-center space-x-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                    title="Mark as read"
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => {
                                    setSelectedNotification(notification);
                                    setShowAuditTrail(true);
                                  }}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                  title="View audit trail"
                                >
                                  <ClipboardDocumentListIcon className="h-4 w-4" />
                                </button>
                                
                                {!notification.assignedTo && (
                                  <button
                                    onClick={() => {
                                      setSelectedNotifications([notification.id]);
                                      setShowAssignmentModal(true);
                                    }}
                                    className="p-1 text-gray-400 hover:text-blue-600"
                                    title="Assign to user"
                                  >
                                    <UserPlusIcon className="h-4 w-4" />
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => handleEscalateNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-red-600"
                                  title="Escalate priority"
                                >
                                  <ExclamationCircleIcon className="h-4 w-4" />
                                </button>
                                
                                <button
                                  onClick={() => handleSnoozeNotification(notification.id, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())}
                                  className="p-1 text-gray-400 hover:text-yellow-600"
                                  title="Snooze for 24 hours"
                                >
                                  <ClockIcon className="h-4 w-4" />
                                </button>
                                
                                <button
                                  onClick={() => handleResolveNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-green-600"
                                  title="Resolve"
                                >
                                  <CheckCircleIcon className="h-4 w-4" />
                                </button>
                                
                                <button
                                  onClick={() => handleArchiveNotification(notification.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                  title="Archive"
                                >
                                  <ArchiveBoxIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
            </>
          )}

          {activeTab === 'internal' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Quick Access Notifications</h3>
                <p className="mt-1 text-sm text-gray-600">
                  These are the same notifications available in the header notification center
                </p>
              </div>
              
              <div className="p-6">
                {internalNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <BellIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No quick access notifications</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {internalNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border rounded-lg hover:bg-gray-50 transition-colors ${
                          !notification.isRead ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </h4>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                                notification.type === 'error' ? 'bg-red-100 text-red-800' :
                                notification.type === 'success' ? 'bg-green-100 text-green-800' :
                                notification.type === 'task' ? 'bg-blue-100 text-blue-800' :
                                notification.type === 'system' ? 'bg-purple-100 text-purple-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {notification.type}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                notification.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {notification.priority}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>Category: {notification.category}</span>
                                <span>{new Date(notification.createdAt).toLocaleString()}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {!notification.isRead && (
                                  <button
                                    onClick={() => handleMarkInternalAsRead(notification.id)}
                                    className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                                  >
                                    Mark Read
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteInternal(notification.id)}
                                  className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                                >
                                  Delete
                                </button>
                                {notification.actionUrl && (
                                  <a
                                    href={notification.actionUrl}
                                    className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                                  >
                                    View Details
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {internalNotifications.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center space-x-4">
                    <button
                      onClick={handleMarkAllInternalAsRead}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Mark All Read
                    </button>
                    <button
                      onClick={handleClearAllInternal}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Audit Trail Modal */}
          {showAuditTrail && selectedNotification && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
              <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
                    <button
                      onClick={() => setShowAuditTrail(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900">{selectedNotification.title}</h4>
                      <p className="text-sm text-gray-600">{selectedNotification.message}</p>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedNotification.auditTrail.map((entry, index) => (
                        <div key={index} className="flex items-start space-x-3 border-l-2 border-blue-200 pl-4">
                          <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900 capitalize">{entry.action}</span>
                              <time className="text-sm text-gray-500">
                                {new Date(entry.timestamp).toLocaleString()}
                              </time>
                            </div>
                            <p className="text-sm text-gray-600">by {entry.user}</p>
                            {entry.details && (
                              <p className="text-sm text-gray-500 mt-1">{entry.details}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assignment Modal */}
          {showAssignmentModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
              <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-lg max-w-md w-full">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Assign Notification(s)</h3>
                    <button
                      onClick={() => setShowAssignmentModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assign to User
                      </label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={assignmentTarget}
                        onChange={(e) => setAssignmentTarget(e.target.value)}
                      >
                        <option value="">Select user...</option>
                        <option value="Sarah Johnson">Sarah Johnson</option>
                        <option value="Mike Brown">Mike Brown</option>
                        <option value="David Wilson">David Wilson</option>
                        <option value="Anna Davis">Anna Davis</option>
                        <option value="Robert Chen">Robert Chen</option>
                        <option value="Lisa Wang">Lisa Wang</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => {
                          if (assignmentTarget) {
                            selectedNotifications.forEach(id => {
                              handleAssignNotification(id, assignmentTarget);
                            });
                            setShowAssignmentModal(false);
                            setSelectedNotifications([]);
                            setAssignmentTarget('');
                          }
                        }}
                        disabled={!assignmentTarget}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() => {
                          setShowAssignmentModal(false);
                          setAssignmentTarget('');
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
