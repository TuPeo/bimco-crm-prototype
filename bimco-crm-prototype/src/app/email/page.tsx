'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import EmailManagement from '@/components/EmailManagement';
import type { EmailTemplate, EmailCampaign, DotdigitalCampaign, TriggerEvent, EmailQueue } from '@/components/EmailManagement';

// Mock data for demonstration
const mockTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Course Registration Confirmation',
    subject: 'Welcome to {{course_name}} - Registration Confirmed',
    content: 'Dear {{participant_name}},\n\nThank you for registering for {{course_name}}. Your registration has been confirmed.\n\nCourse Details:\n- Date: {{course_date}}\n- Location: {{course_location}}\n- Duration: {{course_duration}}\n\nBest regards,\nBIMCO Training Team',
    category: 'course',
    variables: ['course_name', 'participant_name', 'course_date', 'course_location', 'course_duration'],
    createdAt: '2025-08-01T10:00:00Z',
    lastUsed: '2025-08-20T14:30:00Z',
    usageCount: 45,
    isActive: true
  },
  {
    id: '2',
    name: 'Course Reminder',
    subject: 'Reminder: {{course_name}} starts tomorrow',
    content: 'Dear {{participant_name}},\n\nThis is a friendly reminder that {{course_name}} starts tomorrow.\n\nPlease make sure to:\n- Arrive 15 minutes early\n- Bring required materials\n- Complete pre-course survey\n\nSee you soon!\nBIMCO Training Team',
    category: 'course',
    variables: ['course_name', 'participant_name'],
    createdAt: '2025-07-15T09:00:00Z',
    lastUsed: '2025-08-24T16:00:00Z',
    usageCount: 23,
    isActive: true
  },
  {
    id: '3',
    name: 'Monthly Newsletter',
    subject: 'BIMCO Maritime Insights - {{month}} {{year}}',
    content: 'Dear {{subscriber_name}},\n\nWelcome to this month\'s maritime insights newsletter.\n\nIn this issue:\n- Market updates\n- New training courses\n- Industry news\n\nRead more at {{newsletter_link}}\n\nBest regards,\nBIMCO Team',
    category: 'newsletter',
    variables: ['subscriber_name', 'month', 'year', 'newsletter_link'],
    createdAt: '2025-06-01T08:00:00Z',
    lastUsed: '2025-08-01T10:00:00Z',
    usageCount: 12,
    isActive: true
  }
];

// Mock Dotdigital Campaigns
const mockDotdigitalCampaigns: DotdigitalCampaign[] = [
  {
    id: 'dd_1',
    dotdigitalId: 'dg_campaign_12345',
    name: 'MyAccount Welcome Series - New Users',
    subject: 'Welcome to Your BIMCO MyAccount Portal',
    status: 'sent',
    assignedArea: 'MyAccount',
    triggerType: 'event',
    triggerEvents: ['user_registration', 'account_activation'],
    totalRecipients: 450,
    sentCount: 450,
    deliveredCount: 432,
    openCount: 298,
    clickCount: 89,
    bounceCount: 18,
    unsubscribeCount: 2,
    scheduledAt: '2025-08-20T09:00:00Z',
    sentAt: '2025-08-20T09:15:00Z',
    createdAt: '2025-08-18T14:00:00Z',
    lastSyncAt: '2025-08-25T08:30:00Z',
    syncStatus: 'synced',
    dotdigitalUrl: 'https://app.dotdigital.com/campaigns/12345'
  },
  {
    id: 'dd_2',
    dotdigitalId: 'dg_campaign_12346',
    name: 'SmartCon 2025 Event Announcements',
    subject: 'SmartCon 2025: Early Bird Registration Now Open',
    status: 'scheduled',
    assignedArea: 'SmartCon',
    triggerType: 'scheduled',
    triggerEvents: ['event_announcement'],
    totalRecipients: 2800,
    sentCount: 0,
    deliveredCount: 0,
    openCount: 0,
    clickCount: 0,
    bounceCount: 0,
    unsubscribeCount: 0,
    scheduledAt: '2025-09-01T10:00:00Z',
    createdAt: '2025-08-20T16:00:00Z',
    lastSyncAt: '2025-08-25T08:30:00Z',
    syncStatus: 'synced',
    dotdigitalUrl: 'https://app.dotdigital.com/campaigns/12346'
  },
  {
    id: 'dd_3',
    dotdigitalId: 'dg_campaign_12347',
    name: 'Course Registration Confirmations - Laytime',
    subject: 'Your Laytime & Demurrage Course Registration Confirmed',
    status: 'sent',
    assignedArea: 'Course Management',
    triggerType: 'event',
    triggerEvents: ['course_registration', 'payment_confirmed'],
    totalRecipients: 85,
    sentCount: 85,
    deliveredCount: 82,
    openCount: 78,
    clickCount: 45,
    bounceCount: 3,
    unsubscribeCount: 0,
    scheduledAt: '2025-08-22T14:00:00Z',
    sentAt: '2025-08-22T14:05:00Z',
    createdAt: '2025-08-20T11:00:00Z',
    lastSyncAt: '2025-08-25T08:30:00Z',
    syncStatus: 'synced',
    dotdigitalUrl: 'https://app.dotdigital.com/campaigns/12347'
  },
  {
    id: 'dd_4',
    dotdigitalId: 'dg_campaign_12348',
    name: 'Business Central Integration Notifications',
    subject: 'Your Invoice is Ready - Action Required',
    status: 'sending',
    assignedArea: 'Business Central',
    triggerType: 'api',
    triggerEvents: ['invoice_ready', 'payment_due'],
    totalRecipients: 156,
    sentCount: 89,
    deliveredCount: 85,
    openCount: 52,
    clickCount: 23,
    bounceCount: 4,
    unsubscribeCount: 1,
    scheduledAt: '2025-08-25T09:00:00Z',
    createdAt: '2025-08-24T15:00:00Z',
    lastSyncAt: '2025-08-25T08:30:00Z',
    syncStatus: 'synced',
    dotdigitalUrl: 'https://app.dotdigital.com/campaigns/12348'
  },
  {
    id: 'dd_5',
    dotdigitalId: 'dg_campaign_12349',
    name: 'General Newsletter - Maritime Market Update',
    subject: 'Maritime Market Weekly Insights - Week 34',
    status: 'failed',
    assignedArea: 'General',
    triggerType: 'scheduled',
    triggerEvents: ['weekly_newsletter'],
    totalRecipients: 3200,
    sentCount: 0,
    deliveredCount: 0,
    openCount: 0,
    clickCount: 0,
    bounceCount: 0,
    unsubscribeCount: 0,
    scheduledAt: '2025-08-24T08:00:00Z',
    createdAt: '2025-08-23T10:00:00Z',
    lastSyncAt: '2025-08-25T08:30:00Z',
    syncStatus: 'failed',
    dotdigitalUrl: 'https://app.dotdigital.com/campaigns/12349'
  }
];

// Mock Trigger Events
const mockTriggerEvents: TriggerEvent[] = [
  {
    id: 'trigger_1',
    name: 'Course Registration Notification',
    description: 'Send confirmation email when user registers for any course',
    eventType: 'event_registration',
    isActive: true,
    associatedCampaigns: ['dd_3'],
    conditions: {
      courseType: 'any',
      paymentStatus: 'confirmed'
    },
    notificationDelay: 0,
    createdAt: '2025-08-15T10:00:00Z'
  },
  {
    id: 'trigger_2',
    name: 'Invoice Ready Alert',
    description: 'Notify customers when their invoice is ready for payment',
    eventType: 'invoice_ready',
    isActive: true,
    associatedCampaigns: ['dd_4'],
    conditions: {
      invoiceAmount: '>0',
      customerType: 'all'
    },
    notificationDelay: 5,
    createdAt: '2025-08-18T14:00:00Z'
  },
  {
    id: 'trigger_3',
    name: 'Course Completion Certificate',
    description: 'Send certificate when course is completed',
    eventType: 'certificate_issued',
    isActive: true,
    associatedCampaigns: [],
    conditions: {
      completionScore: '>=80'
    },
    notificationDelay: 15,
    createdAt: '2025-08-10T09:00:00Z'
  },
  {
    id: 'trigger_4',
    name: 'Payment Received Confirmation',
    description: 'Confirm payment receipt and next steps',
    eventType: 'payment_received',
    isActive: false,
    associatedCampaigns: [],
    conditions: {
      paymentMethod: 'all'
    },
    notificationDelay: 0,
    createdAt: '2025-08-12T11:00:00Z'
  },
  {
    id: 'trigger_5',
    name: 'Course Completion Follow-up',
    description: 'Send follow-up survey and additional resources after course completion',
    eventType: 'course_completion',
    isActive: true,
    associatedCampaigns: ['dd_1', 'dd_2'],
    conditions: {
      completionScore: '>=70',
      courseCategory: 'professional',
      followUpRequired: true
    },
    notificationDelay: 1440, // 24 hours
    createdAt: '2025-08-20T08:30:00Z'
  },
  {
    id: 'trigger_6',
    name: 'Custom Welcome Series',
    description: 'Multi-step welcome email series for new members',
    eventType: 'custom',
    isActive: true,
    associatedCampaigns: ['dd_5'],
    conditions: {
      membershipType: 'premium',
      registrationSource: 'website',
      hasCompletedProfile: true
    },
    notificationDelay: 30,
    createdAt: '2025-08-22T12:15:00Z'
  },
  {
    id: 'trigger_7',
    name: 'Event Registration Reminder',
    description: 'Send reminder 48 hours before event starts',
    eventType: 'event_registration',
    isActive: true,
    associatedCampaigns: [],
    conditions: {
      eventType: 'webinar',
      reminderRequired: true,
      registrationStatus: 'confirmed'
    },
    notificationDelay: 2880, // 48 hours
    createdAt: '2025-08-23T16:45:00Z'
  },
  {
    id: 'trigger_8',
    name: 'Certificate Expiry Warning',
    description: 'Warn members about certificate expiration 30 days in advance',
    eventType: 'certificate_issued',
    isActive: false,
    associatedCampaigns: ['dd_3'],
    conditions: {
      certificateType: 'professional',
      daysUntilExpiry: '30',
      renewalAvailable: true
    },
    notificationDelay: 60,
    createdAt: '2025-08-21T14:20:00Z'
  }
];

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'August Course Promotions',
    templateId: '1',
    status: 'sent',
    recipientSegments: ['premium-customers', 'course-interested'],
    totalRecipients: 1250,
    sentCount: 1250,
    deliveredCount: 1205,
    openCount: 542,
    clickCount: 156,
    bounceCount: 25,
    unsubscribeCount: 3,
    scheduledAt: '2025-08-01T09:00:00Z',
    sentAt: '2025-08-01T09:15:00Z',
    createdAt: '2025-07-28T14:00:00Z',
    createdBy: 'Marketing Team'
  },
  {
    id: '2',
    name: 'Course Reminder - Laytime Definitions',
    templateId: '2',
    status: 'scheduled',
    recipientSegments: ['laytime-course-participants'],
    totalRecipients: 25,
    sentCount: 0,
    deliveredCount: 0,
    openCount: 0,
    clickCount: 0,
    bounceCount: 0,
    unsubscribeCount: 0,
    scheduledAt: '2025-09-14T08:00:00Z',
    createdAt: '2025-08-25T10:30:00Z',
    createdBy: 'Course Admin'
  }
];

// Mock Email Queue
const mockEmailQueue: EmailQueue[] = [
  {
    id: 'queue_1',
    recipientEmail: 'john.smith@maritime.com',
    recipientName: 'John Smith',
    subject: 'Course Registration Confirmation - Laytime & Demurrage',
    content: 'Dear John Smith, Your registration for Laytime & Demurrage course has been confirmed...',
    templateId: '1',
    campaignId: 'dd_3',
    priority: 'high',
    status: 'sent',
    scheduledAt: '2025-08-24T14:00:00Z',
    sentAt: '2025-08-24T14:05:00Z',
    failureReason: undefined,
    retryCount: 0,
    maxRetries: 3,
    deliveryMethod: 'dotdigital',
    metadata: {
      courseId: 'course_laytime_2025',
      contactId: 'contact_123',
      eventType: 'course_registration',
      registrationId: 'reg_456'
    },
    createdAt: '2025-08-24T13:45:00Z',
    updatedAt: '2025-08-24T14:05:00Z'
  },
  {
    id: 'queue_2',
    recipientEmail: 'maria.garcia@shipping.com',
    recipientName: 'Maria Garcia',
    subject: 'Enrollment Confirmation - Maritime Law Course',
    content: 'Dear Maria Garcia, Your enrollment in Maritime Law course has been processed...',
    templateId: '1',
    priority: 'normal',
    status: 'processing',
    scheduledAt: '2025-08-25T10:00:00Z',
    failureReason: undefined,
    retryCount: 0,
    maxRetries: 3,
    deliveryMethod: 'direct',
    metadata: {
      courseId: 'course_maritime_law',
      contactId: 'contact_789',
      eventType: 'enrollment_confirmation',
      enrollmentId: 'enroll_321'
    },
    createdAt: '2025-08-25T09:30:00Z',
    updatedAt: '2025-08-25T09:35:00Z'
  },
  {
    id: 'queue_3',
    recipientEmail: 'peter.johnson@logistics.com',
    recipientName: 'Peter Johnson',
    subject: 'Course Reminder - Navigation Course starts tomorrow',
    content: 'Dear Peter Johnson, This is a reminder that your Navigation course starts tomorrow...',
    templateId: '2',
    priority: 'normal',
    status: 'scheduled',
    scheduledAt: '2025-08-26T08:00:00Z',
    failureReason: undefined,
    retryCount: 0,
    maxRetries: 3,
    deliveryMethod: 'dotdigital',
    metadata: {
      courseId: 'course_navigation',
      contactId: 'contact_456',
      eventType: 'course_reminder'
    },
    createdAt: '2025-08-25T15:00:00Z',
    updatedAt: '2025-08-25T15:00:00Z'
  },
  {
    id: 'queue_4',
    recipientEmail: 'sarah.wilson@trade.com',
    recipientName: 'Sarah Wilson',
    subject: 'Invoice Ready - Course Registration Payment Required',
    content: 'Dear Sarah Wilson, Your invoice for course registration is now ready...',
    priority: 'high',
    status: 'queued',
    scheduledAt: '2025-08-25T16:00:00Z',
    failureReason: undefined,
    retryCount: 0,
    maxRetries: 3,
    deliveryMethod: 'direct',
    metadata: {
      invoiceId: 'inv_789',
      contactId: 'contact_012',
      eventType: 'invoice_ready',
      courseId: 'course_safety'
    },
    createdAt: '2025-08-25T15:45:00Z',
    updatedAt: '2025-08-25T15:45:00Z'
  },
  {
    id: 'queue_5',
    recipientEmail: 'mike.brown@vessel.com',
    recipientName: 'Mike Brown',
    subject: 'Certificate Issued - Maritime Safety Course Completed',
    content: 'Congratulations Mike Brown! Your Maritime Safety course certificate is ready...',
    priority: 'normal',
    status: 'failed',
    scheduledAt: '2025-08-24T18:00:00Z',
    failureReason: 'Invalid email address format',
    retryCount: 2,
    maxRetries: 3,
    deliveryMethod: 'dotdigital',
    metadata: {
      courseId: 'course_safety',
      contactId: 'contact_345',
      eventType: 'certificate_issued',
      certificateId: 'cert_567'
    },
    createdAt: '2025-08-24T17:30:00Z',
    updatedAt: '2025-08-25T08:15:00Z'
  },
  {
    id: 'queue_6',
    recipientEmail: 'anna.davis@port.com',
    recipientName: 'Anna Davis',
    subject: 'Course Registration Confirmation - Port Operations',
    content: 'Dear Anna Davis, Thank you for registering for Port Operations course...',
    templateId: '1',
    priority: 'normal',
    status: 'sent',
    scheduledAt: '2025-08-23T09:00:00Z',
    sentAt: '2025-08-23T09:02:00Z',
    failureReason: undefined,
    retryCount: 0,
    maxRetries: 3,
    deliveryMethod: 'direct',
    metadata: {
      courseId: 'course_port_ops',
      contactId: 'contact_678',
      eventType: 'course_registration'
    },
    createdAt: '2025-08-23T08:45:00Z',
    updatedAt: '2025-08-23T09:02:00Z'
  },
  {
    id: 'queue_7',
    recipientEmail: 'robert.lee@cargo.com',
    recipientName: 'Robert Lee',
    subject: 'Enrollment Confirmation - Cargo Handling Course',
    content: 'Dear Robert Lee, Your enrollment has been successfully processed...',
    priority: 'low',
    status: 'scheduled',
    scheduledAt: '2025-08-27T14:00:00Z',
    failureReason: undefined,
    retryCount: 0,
    maxRetries: 3,
    deliveryMethod: 'dotdigital',
    metadata: {
      courseId: 'course_cargo_handling',
      contactId: 'contact_901',
      eventType: 'enrollment_confirmation'
    },
    createdAt: '2025-08-25T12:00:00Z',
    updatedAt: '2025-08-25T12:00:00Z'
  }
];

export default function EmailManagementPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);
  const [dotdigitalCampaigns, setDotdigitalCampaigns] = useState<DotdigitalCampaign[]>(mockDotdigitalCampaigns);
  const [triggerEvents, setTriggerEvents] = useState<TriggerEvent[]>(mockTriggerEvents);

  const handleCreateTemplate = (template: Omit<EmailTemplate, 'id' | 'createdAt' | 'usageCount'>) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: `template_${Date.now()}`,
      createdAt: new Date().toISOString(),
      usageCount: 0
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const handleUpdateTemplate = (templateId: string, template: Partial<EmailTemplate>) => {
    setTemplates(prev => 
      prev.map(t => 
        t.id === templateId ? { ...t, ...template } : t
      )
    );
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const handleCreateCampaign = (campaign: Omit<EmailCampaign, 'id' | 'createdAt' | 'sentCount' | 'deliveredCount' | 'openCount' | 'clickCount' | 'bounceCount' | 'unsubscribeCount'>) => {
    const newCampaign: EmailCampaign = {
      ...campaign,
      id: `campaign_${Date.now()}`,
      createdAt: new Date().toISOString(),
      sentCount: 0,
      deliveredCount: 0,
      openCount: 0,
      clickCount: 0,
      bounceCount: 0,
      unsubscribeCount: 0
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const handleUpdateCampaign = (campaignId: string, campaign: Partial<EmailCampaign>) => {
    setCampaigns(prev => 
      prev.map(c => 
        c.id === campaignId ? { ...c, ...campaign } : c
      )
    );
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  // Dotdigital handlers
  const handleSyncDotdigital = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Dotdigital sync completed');
  };

  const handleCreateDotdigitalCampaign = (campaign: Omit<DotdigitalCampaign, 'id' | 'createdAt' | 'lastSyncAt' | 'syncStatus'>) => {
    const newCampaign: DotdigitalCampaign = {
      ...campaign,
      id: `dd_${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastSyncAt: new Date().toISOString(),
      syncStatus: 'synced'
    };
    setDotdigitalCampaigns(prev => [...prev, newCampaign]);
  };

  const handleUpdateDotdigitalCampaign = (campaignId: string, updates: Partial<DotdigitalCampaign>) => {
    setDotdigitalCampaigns(prev => 
      prev.map(c => 
        c.id === campaignId ? { ...c, ...updates, lastSyncAt: new Date().toISOString() } : c
      )
    );
  };

  const handleDeleteDotdigitalCampaign = (campaignId: string) => {
    setDotdigitalCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  // Trigger event handlers
  const handleCreateTrigger = (trigger: Omit<TriggerEvent, 'id' | 'createdAt'>) => {
    const newTrigger: TriggerEvent = {
      ...trigger,
      id: `trigger_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setTriggerEvents(prev => [...prev, newTrigger]);
  };

  const handleUpdateTrigger = (triggerId: string, updates: Partial<TriggerEvent>) => {
    setTriggerEvents(prev => 
      prev.map(t => 
        t.id === triggerId ? { ...t, ...updates } : t
      )
    );
  };

  const handleDeleteTrigger = (triggerId: string) => {
    setTriggerEvents(prev => prev.filter(t => t.id !== triggerId));
  };

  const handleSendTriggerEvent = (eventId: string) => {
    console.log('Sending trigger event:', eventId);
  };

  // Mail Queue Management handlers
  const [emailQueues, setEmailQueues] = useState<EmailQueue[]>(mockEmailQueue);

  const handleProcessQueue = (queueId: string) => {
    console.log('Processing queue item:', queueId);
    // Update queue status to processing/sent
    setEmailQueues(prev => prev.map(queue => 
      queue.id === queueId 
        ? { ...queue, status: 'processing' as const, updatedAt: new Date().toISOString() }
        : queue
    ));
  };

  const handleRetryQueueItem = (queueId: string) => {
    console.log('Retrying queue item:', queueId);
    // Update queue retry count and status
    setEmailQueues(prev => prev.map(queue => 
      queue.id === queueId 
        ? { 
            ...queue, 
            retryCount: queue.retryCount + 1,
            status: 'queued' as const,
            failureReason: undefined,
            updatedAt: new Date().toISOString() 
          }
        : queue
    ));
  };

  return (
    <Layout>
      <EmailManagement
        templates={templates}
        campaigns={campaigns}
        dotdigitalCampaigns={dotdigitalCampaigns}
        triggerEvents={triggerEvents}
        emailQueue={emailQueues}
        onCreateTemplate={handleCreateTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onCreateCampaign={handleCreateCampaign}
        onUpdateCampaign={handleUpdateCampaign}
        onDeleteCampaign={handleDeleteCampaign}
        onSyncDotdigital={handleSyncDotdigital}
        onCreateTrigger={handleCreateTrigger}
        onUpdateTrigger={handleUpdateTrigger}
        onDeleteTrigger={handleDeleteTrigger}
        onProcessQueue={handleProcessQueue}
        onRetryQueueItem={handleRetryQueueItem}
      />
    </Layout>
  );
}
