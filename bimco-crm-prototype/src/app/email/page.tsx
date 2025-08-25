'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import EmailManagement from '@/components/EmailManagement';
import type { EmailTemplate, EmailCampaign } from '@/components/EmailManagement';

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

export default function EmailManagementPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(mockTemplates);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockCampaigns);

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

  return (
    <Layout>
      <EmailManagement
        templates={templates}
        campaigns={campaigns}
        onCreateTemplate={handleCreateTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onCreateCampaign={handleCreateCampaign}
        onUpdateCampaign={handleUpdateCampaign}
        onDeleteCampaign={handleDeleteCampaign}
      />
    </Layout>
  );
}
