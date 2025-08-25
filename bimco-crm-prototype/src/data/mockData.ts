import { Company, Contact, Course, DashboardStats, Fleet, SearchResult, SavedSearch, Segment } from '@/types';

// Dashboard Statistics Mock Data
export const mockDashboardStats: DashboardStats = {
  totalCompanies: 2847,
  totalContacts: 15632,
  totalCourses: 156,
  pendingNotifications: 8
};

// Chart Data for Dashboard
export const companyDistributionData = [
  { name: 'Denmark', value: 485, color: '#0092bc' },
  { name: 'Norway', value: 392, color: '#00557e' },
  { name: 'Germany', value: 356, color: '#37b7dc' },
  { name: 'Singapore', value: 298, color: '#55a9d8' },
  { name: 'United Kingdom', value: 267, color: '#037798' },
  { name: 'Greece', value: 234, color: '#04486a' },
  { name: 'Others', value: 815, color: '#ddd6c7' }
];

export const contactRoleData = [
  { role: 'Fleet Manager', active: 1250, inactive: 89 },
  { role: 'Operations Director', active: 890, inactive: 45 },
  { role: 'Technical Director', active: 675, inactive: 32 },
  { role: 'CEO/Managing Director', active: 567, inactive: 23 },
  { role: 'Regional Manager', active: 445, inactive: 28 },
  { role: 'Port Agent', active: 389, inactive: 67 },
  { role: 'Other', active: 2234, inactive: 156 }
];

export const eventTrendData = [
  { month: 'Sep 2023', courses: 12, events: 8, participants: 245 },
  { month: 'Oct 2023', courses: 15, events: 10, participants: 298 },
  { month: 'Nov 2023', courses: 18, events: 12, participants: 342 },
  { month: 'Dec 2023', courses: 10, events: 6, participants: 178 },
  { month: 'Jan 2024', courses: 14, events: 9, participants: 267 },
  { month: 'Feb 2024', courses: 16, events: 11, participants: 312 },
  { month: 'Mar 2024', courses: 20, events: 14, participants: 389 },
  { month: 'Apr 2024', courses: 22, events: 16, participants: 434 },
  { month: 'May 2024', courses: 19, events: 13, participants: 378 },
  { month: 'Jun 2024', courses: 17, events: 12, participants: 323 },
  { month: 'Jul 2024', courses: 21, events: 15, participants: 402 },
  { month: 'Aug 2024', courses: 23, events: 17, participants: 456 }
];

export const membershipStatusData = [
  { name: 'Active Members (M1)', value: 1892, color: '#059669' },
  { name: 'Associate Members (M2)', value: 634, color: '#0586ab' },
  { name: 'Inactive', value: 87, color: '#6b7280' },
  { name: 'Prospects', value: 234, color: '#d97706' }
];

// Recent Activity Feed for Dashboard
export const recentActivityData = [
  {
    id: '1',
    user: 'Lars Nielsen',
    action: 'updated company profile',
    target: 'Maersk Line',
    timestamp: '2024-08-19T10:45:00Z',
    type: 'company_update'
  },
  {
    id: '2', 
    user: 'System',
    action: 'synchronized campaign',
    target: 'Q3 Member Newsletter',
    timestamp: '2024-08-19T09:30:00Z',
    type: 'system'
  },
  {
    id: '3',
    user: 'Astrid Johannessen',
    action: 'registered for course',
    target: 'BIMCO Laytime Definitions',
    timestamp: '2024-08-19T08:15:00Z',
    type: 'course_registration'
  },
  {
    id: '4',
    user: 'Admin',
    action: 'created new contact',
    target: 'Wei Ming Tan - PIL',
    timestamp: '2024-08-18T16:20:00Z',
    type: 'contact_create'
  },
  {
    id: '5',
    user: 'Hans Mueller',
    action: 'updated course materials',
    target: 'Digital Ship Management Systems',
    timestamp: '2024-08-18T14:30:00Z',
    type: 'course_update'
  }
];

// Mock Companies Data
export const mockCompanies: Company[] = [
  {
    id: '1',
    registrationNumber: '123456',
    name: 'Maersk Line',
    name2: 'A.P. Moller-Maersk',
    status: 'M1',
    type: 'A1',
    address: {
      line1: 'Esplanaden 50',
      line2: '',
      line3: '',
      postCode: '1098',
      country: 'Denmark',
      countryCode: 'DK'
    },
    email: 'contact@maersk.com',
    numberOfEmployees: 25,
    dateCreated: '2023-01-15',
    lastUpdated: '2024-08-15'
  },
  {
    id: '2',
    registrationNumber: '789012',
    name: 'MSC Mediterranean Shipping Company',
    status: 'M0',
    type: 'A2',
    address: {
      line1: 'Chemin Rieu 12-14',
      line2: '',
      line3: '',
      postCode: '1208',
      country: 'Switzerland',
      countryCode: 'CH'
    },
    email: 'info@msc.com',
    numberOfEmployees: 18,
    dateCreated: '2023-03-20',
    lastUpdated: '2024-08-10'
  },
  {
    id: '3',
    registrationNumber: '345678',
    name: 'CMA CGM Group',
    status: 'M1',
    type: 'A1',
    address: {
      line1: '4 Quai d\'Arenc',
      line2: '',
      line3: '',
      postCode: '13235',
      country: 'France',
      countryCode: 'FR'
    },
    email: 'contact@cma-cgm.com',
    numberOfEmployees: 32,
    dateCreated: '2023-02-10',
    lastUpdated: '2024-08-12'
  },
  {
    id: '4',
    registrationNumber: '901234',
    name: 'COSCO Shipping Lines',
    status: 'M2',
    type: 'B1',
    address: {
      line1: 'COSCO Plaza, Dong Chang\'an Jie 20',
      line2: '',
      line3: '',
      postCode: '100006',
      country: 'China',
      countryCode: 'CN'
    },
    email: 'info@cosco.com.cn',
    numberOfEmployees: 45,
    dateCreated: '2023-05-15',
    lastUpdated: '2024-08-08'
  },
  {
    id: '5',
    registrationNumber: '567890',
    name: 'Hapag-Lloyd AG',
    status: 'M1',
    type: 'A1',
    address: {
      line1: 'Ballindamm 25',
      line2: '',
      line3: '',
      postCode: '20095',
      country: 'Germany',
      countryCode: 'DE'
    },
    email: 'info@hapag-lloyd.com',
    numberOfEmployees: 28,
    dateCreated: '2023-04-08',
    lastUpdated: '2024-08-14'
  }
];

// Mock Contacts Data
export const mockContacts: Contact[] = [
  {
    id: '1',
    contactNumber: '123456_001',
    firstName: 'John',
    lastName: 'Hansen',
    email: 'john.hansen@maersk.com',
    phone: '+45 33 63 33 63',
    companyId: '1',
    companyName: 'Maersk Line',
    role: 'Fleet Manager',
    status: 'Active',
    classifications: [
      { code: 'BI-ADM', description: 'BIMCO Administrator', date: '2023-01-15' },
      { code: 'BI-ASIA', description: 'BIMCO Asia Representative', date: '2023-06-20' }
    ],
    communicationHistory: [
      {
        id: 'comm-1',
        type: 'email',
        subject: 'Contract Review Meeting',
        description: 'Discussed new charter party terms and BIMCO clauses implementation',
        date: '2024-08-20',
        direction: 'outbound',
        participants: ['Maria Rodriguez', 'Legal Team'],
        tags: ['contract', 'charter-party'],
        createdBy: 'Current User',
        createdAt: '2024-08-20T10:30:00Z'
      },
      {
        id: 'comm-2',
        type: 'phone',
        subject: 'Fleet Maintenance Discussion',
        description: 'Coordinated maintenance schedule for Q4',
        date: '2024-08-18',
        direction: 'inbound',
        participants: ['Technical Team'],
        tags: ['maintenance', 'fleet'],
        createdBy: 'Current User',
        createdAt: '2024-08-18T14:15:00Z'
      }
    ],
    dateCreated: '2023-01-15',
    lastUpdated: '2024-08-15'
  },
  {
    id: '2',
    contactNumber: '789012_001',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    email: 'maria.rodriguez@msc.com',
    phone: '+41 22 703 88 88',
    companyId: '2',
    companyName: 'MSC Mediterranean Shipping Company',
    role: 'Operations Manager',
    status: 'Active',
    classifications: [
      { code: 'BI-BD', description: 'BIMCO Board Member', date: '2023-03-20' }
    ],
    communicationHistory: [
      {
        id: 'comm-3',
        type: 'meeting',
        subject: 'Board Meeting Preparation',
        description: 'Prepared agenda items for upcoming BIMCO board meeting',
        date: '2024-08-19',
        direction: 'outbound',
        participants: ['Board Members'],
        tags: ['board', 'meeting'],
        createdBy: 'Current User',
        createdAt: '2024-08-19T16:00:00Z'
      }
    ],
    dateCreated: '2023-03-20',
    lastUpdated: '2024-08-10'
  },
  {
    id: '3',
    contactNumber: '345678_001',
    firstName: 'Pierre',
    lastName: 'Dubois',
    email: 'pierre.dubois@cma-cgm.com',
    phone: '+33 4 88 91 90 00',
    companyId: '3',
    companyName: 'CMA CGM Group',
    role: 'Technical Director',
    status: 'Active',
    classifications: [
      { code: 'BI-BS', description: 'BIMCO Business Support', date: '2023-02-10' }
    ],
    communicationHistory: [
      {
        id: 'comm-4',
        type: 'video_call',
        subject: 'Technical Standards Review',
        description: 'Reviewed new environmental compliance standards',
        date: '2024-08-17',
        direction: 'outbound',
        participants: ['Technical Committee'],
        tags: ['technical', 'compliance'],
        createdBy: 'Current User',
        createdAt: '2024-08-17T11:00:00Z'
      }
    ],
    dateCreated: '2023-02-10',
    lastUpdated: '2024-08-12'
  },
  {
    id: '4',
    contactNumber: '901234_001',
    firstName: 'Li',
    lastName: 'Wei',
    email: 'li.wei@cosco.com.cn',
    phone: '+86 10 6649 2000',
    companyId: '4',
    companyName: 'COSCO Shipping Lines',
    role: 'Regional Manager',
    status: 'Active',
    classifications: [
      { code: 'BI-ASIA', description: 'BIMCO Asia Representative', date: '2023-05-15' }
    ],
    communicationHistory: [],
    dateCreated: '2023-05-15',
    lastUpdated: '2024-08-08'
  },
  {
    id: '5',
    contactNumber: '567890_001',
    firstName: 'Klaus',
    lastName: 'Mueller',
    email: 'klaus.mueller@hapag-lloyd.com',
    phone: '+49 40 3001 0',
    companyId: '5',
    companyName: 'Hapag-Lloyd AG',
    role: 'CEO',
    status: 'Inactive',
    classifications: [
      { code: 'BI-ADM', description: 'BIMCO Administrator', date: '2023-04-08' }
    ],
    communicationHistory: [
      {
        id: 'comm-5',
        type: 'note',
        subject: 'Status Change Note',
        description: 'Contact became inactive due to role change within company',
        date: '2024-08-01',
        direction: 'outbound',
        participants: [],
        tags: ['status-change', 'internal'],
        createdBy: 'System',
        createdAt: '2024-08-01T12:00:00Z'
      }
    ],
    dateCreated: '2023-04-08',
    lastUpdated: '2024-08-14'
  },
  {
    id: '6',
    contactNumber: 'ORPHANED_001',
    firstName: 'Sarah',
    lastName: 'Thompson',
    email: 'sarah.thompson@orphaned.com',
    phone: '+1 555 123 4567',
    companyId: '',
    companyName: '',
    role: 'Unknown',
    status: 'Active',
    classifications: [],
    communicationHistory: [],
    dateCreated: '2024-01-15',
    lastUpdated: '2024-01-15'
  },
  {
    id: '7',
    contactNumber: 'ORPHANED_002',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@freelance.com',
    phone: '+971 4 123 4567',
    companyId: '',
    companyName: '',
    role: 'Consultant',
    status: 'Active',
    classifications: [
      { code: 'BI-MED', description: 'BIMCO Mediterranean Representative', date: '2024-02-01' }
    ],
    communicationHistory: [],
    dateCreated: '2024-02-01',
    lastUpdated: '2024-02-01'
  }
];

// Mock Courses Data
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'BIMCO Laytime Definitions for Chartering',
    category: 'Maritime Training',
    group: 'BIMCO',
    startDate: '2025-09-15T09:00:00Z',
    endDate: '2025-09-17T17:00:00Z',
    location: 'Copenhagen, Denmark',
    status: 'Upcoming',
    maxParticipants: 25,
    description: 'Comprehensive training on BIMCO laytime definitions and their practical application in chartering operations.',
    bimcoLegalEntity: 'BIMCO Copenhagen',
    timezone: 'Europe/Copenhagen',
    recurrence: {
      type: 'none',
      interval: 1
    },
    content: {
      program: 'Day 1: Introduction to Laytime Definitions\nDay 2: Practical Applications\nDay 3: Case Studies and Q&A',
      materials: [
        {
          id: 'file1',
          name: 'BIMCO Laytime Handbook.pdf',
          url: '/files/laytime-handbook.pdf',
          type: 'application/pdf',
          size: 2500000,
          uploadedBy: 'Course Admin',
          uploadedAt: '2025-08-01T10:00:00Z'
        }
      ],
      objectives: [
        'Understand BIMCO laytime definitions',
        'Apply definitions in real scenarios',
        'Master dispute resolution processes'
      ],
      prerequisites: ['Basic chartering knowledge', 'Commercial shipping experience']
    },
    logistics: {
      venue: {
        name: 'BIMCO Conference Center',
        address: 'Bagsvaerdvej 161, 2880 Bagsvaerd, Denmark',
        capacity: 50,
        facilities: ['WiFi', 'Projector', 'Coffee Station', 'Parking'],
        contactInfo: 'events@bimco.org'
      },
      catering: {
        included: true,
        type: 'lunch',
        dietaryRestrictions: ['Vegetarian', 'Halal'],
        cost: 150
      },
      costs: {
        venue: 5000,
        catering: 3750,
        materials: 1250,
        instructor: 7500,
        other: 500,
        total: 18000
      }
    },
    revenue: {
      totalRevenue: 37500,
      paidAmount: 30000,
      pendingAmount: 7500,
      refundedAmount: 0,
      ticketsSold: 15,
      ticketsAvailable: 10
    },
    paymentSettings: {
      ticketTypes: [
        {
          id: 'early-bird',
          name: 'Early Bird',
          price: 1200,
          description: 'Special price for early registration',
          maxQuantity: 10,
          soldQuantity: 8,
          availability: 'limited'
        },
        {
          id: 'regular',
          name: 'Regular',
          price: 1500,
          description: 'Standard registration fee',
          maxQuantity: 15,
          soldQuantity: 7,
          availability: 'available'
        }
      ],
      discountCodes: [
        {
          id: 'member10',
          code: 'MEMBER10',
          type: 'percentage',
          value: 10,
          maxUses: 20,
          usedCount: 5,
          validFrom: '2025-07-01T00:00:00Z',
          validUntil: '2025-09-14T23:59:59Z',
          applicableTicketTypes: ['early-bird', 'regular']
        }
      ],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Invoice'],
      refundPolicy: 'Full refund until 14 days before course start. 50% refund until 7 days before. No refund after.'
    },
    participants: [
      {
        contactId: '1',
        contactName: 'John Hansen',
        email: 'john.hansen@maersk.com',
        role: 'Attendee',
        registrationDate: '2025-08-01',
        ticketType: 'early-bird',
        paymentStatus: 'paid',
        amountPaid: 1080,
        discountApplied: 'MEMBER10',
        specialRequirements: ['Vegetarian meal']
      },
      {
        contactId: '2',
        contactName: 'Maria Rodriguez',
        email: 'maria.rodriguez@msc.com',
        role: 'Attendee',
        registrationDate: '2025-08-03',
        ticketType: 'regular',
        paymentStatus: 'pending',
        amountPaid: 0,
        specialRequirements: []
      }
    ]
  },
  {
    id: '2',
    title: 'Digital Maritime Technologies Webinar',
    category: 'Technology',
    group: 'BIMCO',
    startDate: '2025-08-25T14:00:00Z',
    endDate: '2025-08-25T16:00:00Z',
    location: 'Online',
    status: 'Ongoing',
    maxParticipants: 100,
    description: 'Learn about the latest digital technologies transforming the maritime industry.',
    participants: [
      {
        contactId: '3',
        contactName: 'Pierre Dubois',
        email: 'pierre.dubois@cma-cgm.com',
        role: 'Attendee',
        registrationDate: '2025-08-05',
        ticketType: 'regular',
        paymentStatus: 'paid',
        amountPaid: 1200,
        specialRequirements: []
      },
      {
        contactId: '4',
        contactName: 'Li Wei',
        email: 'li.wei@cosco.com.cn',
        role: 'Speaker',
        registrationDate: '2025-07-20',
        ticketType: 'speaker',
        paymentStatus: 'complimentary',
        amountPaid: 0,
        specialRequirements: ['Presentation setup']
      }
    ]
  },
  {
    id: '3',
    title: 'Maritime Law and Compliance Workshop',
    category: 'Legal & Regulatory',
    group: 'BIMCO',
    startDate: '2025-07-10T09:00:00Z',
    endDate: '2025-07-12T17:00:00Z',
    location: 'Hamburg, Germany',
    status: 'Completed',
    maxParticipants: 50,
    description: 'Deep dive into maritime legal frameworks and compliance requirements.',
    participants: [
      {
        contactId: '1',
        contactName: 'John Hansen',
        email: 'john.hansen@maersk.com',
        role: 'Attendee',
        registrationDate: '2025-06-15',
        ticketType: 'early-bird',
        paymentStatus: 'paid',
        amountPaid: 800,
        specialRequirements: []
      },
      {
        contactId: '5',
        contactName: 'Klaus Mueller',
        email: 'klaus.mueller@hapag-lloyd.com',
        role: 'Organizer',
        registrationDate: '2025-06-10',
        ticketType: 'staff',
        paymentStatus: 'complimentary',
        amountPaid: 0,
        specialRequirements: []
      }
    ]
  },
  {
    id: '4',
    title: 'Safety & Security Certification Course',
    category: 'Safety & Security',
    group: 'BIMCO',
    startDate: '2025-08-20T10:00:00Z',
    endDate: '2025-08-22T16:00:00Z',
    location: 'Singapore',
    status: 'Upcoming',
    maxParticipants: 30,
    description: 'Comprehensive course covering maritime safety and security protocols.',
    participants: [
      {
        contactId: '2',
        contactName: 'Maria Rodriguez',
        email: 'maria.rodriguez@msc.com',
        role: 'Attendee',
        registrationDate: '2025-08-01',
        ticketType: 'regular',
        paymentStatus: 'pending',
        amountPaid: 0,
        specialRequirements: []
      }
    ]
  },
  {
    id: '5',
    title: 'Environmental Compliance Conference',
    category: 'Environmental',
    group: 'BIMCO',
    startDate: '2025-09-05T08:00:00Z',
    endDate: '2025-09-06T18:00:00Z',
    location: 'Rotterdam, Netherlands',
    status: 'Upcoming',
    maxParticipants: 200,
    description: 'Annual conference on environmental regulations and compliance in maritime industry.',
    participants: [
      {
        contactId: '3',
        contactName: 'Pierre Dubois',
        email: 'pierre.dubois@cma-cgm.com',
        role: 'Speaker',
        registrationDate: '2025-07-15',
        ticketType: 'speaker',
        paymentStatus: 'complimentary',
        amountPaid: 0,
        specialRequirements: ['Keynote presentation setup']
      },
      {
        contactId: '4',
        contactName: 'Li Wei',
        email: 'li.wei@cosco.com.cn',
        role: 'Attendee',
        registrationDate: '2025-07-20',
        ticketType: 'regular',
        paymentStatus: 'paid',
        amountPaid: 350,
        specialRequirements: []
      }
    ]
  },
  {
    id: '6',
    title: 'Leadership in Maritime Industry',
    category: 'Leadership',
    group: 'BIMCO',
    startDate: '2025-08-28T09:00:00Z',
    endDate: '2025-08-30T17:00:00Z',
    location: 'London, UK',
    status: 'Upcoming',
    maxParticipants: 40,
    description: 'Executive leadership program for maritime industry professionals.',
    participants: [
      {
        contactId: '5',
        contactName: 'Klaus Mueller',
        email: 'klaus.mueller@hapag-lloyd.com',
        role: 'Attendee',
        registrationDate: '2025-08-01',
        ticketType: 'premium',
        paymentStatus: 'paid',
        amountPaid: 2500,
        specialRequirements: ['Executive accommodation']
      }
    ]
  },
  {
    id: '7',
    title: 'Port Operations Optimization',
    category: 'Technical',
    group: 'BIMCO',
    startDate: '2025-08-22T10:00:00Z',
    endDate: '2025-08-22T16:00:00Z',
    location: 'Dubai, UAE',
    status: 'Upcoming',
    maxParticipants: 60,
    description: 'One-day intensive workshop on optimizing port operations and logistics.',
    participants: []
  }
];

// Mock Notifications Data
export const mockNotifications = [
  {
    id: '1',
    title: 'New Course Registration',
    message: 'John Hansen registered for BIMCO Laytime Definitions course',
    type: 'course_registration',
    priority: 'medium',
    isRead: false,
    createdAt: '2024-08-19T10:30:00Z',
    relatedEntity: 'course',
    relatedId: '1'
  },
  {
    id: '2',
    title: 'Company Update Required',
    message: 'Hapag-Lloyd AG profile needs verification',
    type: 'company_update',
    priority: 'high',
    isRead: false,
    createdAt: '2024-08-18T14:15:00Z',
    relatedEntity: 'company',
    relatedId: '5'
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance completed successfully',
    type: 'system',
    priority: 'low',
    isRead: true,
    createdAt: '2024-08-17T09:00:00Z',
    relatedEntity: 'system',
    relatedId: 'maintenance'
  }
];

// Fleet Management Mock Data
export const mockFleets: Fleet[] = [
  {
    id: '1',
    name: 'Emma Maersk',
    type: 'Container Ship',
    capacity: 15000,
    registration: 'IMO9321483',
    operationalStatus: 'Active',
    companyId: '1',
    companyName: 'Maersk Line',
    ihsNumber: '9321483',
    yearBuilt: 2006,
    flag: 'Denmark',
    grossTonnage: 170794,
    deadweight: 156907,
    length: 397,
    beam: 56,
    draft: 16,
    enginePower: 80080,
    fuelType: 'Marine Gas Oil',
    certificates: [
      {
        id: '1',
        type: 'Safety Certificate',
        issuer: 'Danish Maritime Authority',
        issuedDate: '2023-01-15',
        expiryDate: '2024-01-15'
      },
      {
        id: '2',
        type: 'Environmental Certificate',
        issuer: 'IMO',
        issuedDate: '2023-03-10',
        expiryDate: '2025-03-10'
      }
    ],
    maintenanceRecords: [
      {
        id: '1',
        type: 'Engine Overhaul',
        description: 'Complete engine maintenance and inspection',
        scheduledDate: '2024-09-15',
        status: 'Scheduled',
        cost: 250000,
        vendor: 'MAN Energy Solutions'
      }
    ],
    dateCreated: '2006-08-12T00:00:00Z',
    lastUpdated: '2024-08-15T14:30:00Z'
  },
  {
    id: '2',
    name: 'Nordic Star',
    type: 'Bulk Carrier',
    capacity: 85000,
    registration: 'IMO9156742',
    operationalStatus: 'Active',
    companyId: '2',
    companyName: 'Norden A/S',
    ihsNumber: '9156742',
    yearBuilt: 2018,
    flag: 'Singapore',
    grossTonnage: 47500,
    deadweight: 85000,
    length: 229,
    beam: 38,
    draft: 14,
    enginePower: 12600,
    fuelType: 'Heavy Fuel Oil',
    certificates: [
      {
        id: '3',
        type: 'Load Line Certificate',
        issuer: 'Singapore Maritime Authority',
        issuedDate: '2023-06-01',
        expiryDate: '2028-06-01'
      }
    ],
    maintenanceRecords: [
      {
        id: '2',
        type: 'Hull Inspection',
        description: 'Annual hull and structure inspection',
        scheduledDate: '2024-08-25',
        completedDate: '2024-08-20',
        status: 'Completed',
        cost: 15000,
        vendor: 'Lloyd\'s Register'
      }
    ],
    dateCreated: '2018-03-22T00:00:00Z',
    lastUpdated: '2024-08-20T10:15:00Z'
  },
  {
    id: '3',
    name: 'Viking Explorer',
    type: 'Tanker',
    capacity: 115000,
    registration: 'IMO9287634',
    operationalStatus: 'Maintenance',
    companyId: '3',
    companyName: 'Frontline Management AS',
    ihsNumber: '9287634',
    yearBuilt: 2015,
    flag: 'Norway',
    grossTonnage: 62000,
    deadweight: 115000,
    length: 274,
    beam: 48,
    draft: 16.5,
    enginePower: 21600,
    fuelType: 'Marine Gas Oil',
    certificates: [
      {
        id: '4',
        type: 'Safety Certificate',
        issuer: 'Norwegian Maritime Authority',
        issuedDate: '2023-12-01',
        expiryDate: '2024-12-01'
      }
    ],
    maintenanceRecords: [
      {
        id: '3',
        type: 'Dry Dock',
        description: 'Scheduled dry dock maintenance',
        scheduledDate: '2024-08-01',
        status: 'In Progress',
        cost: 850000,
        vendor: 'Damen Shipyards'
      }
    ],
    dateCreated: '2015-11-10T00:00:00Z',
    lastUpdated: '2024-08-19T08:45:00Z'
  }
];

// Search Management Mock Data
export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    type: 'company',
    title: 'Maersk Line',
    subtitle: 'Container Shipping • Denmark',
    description: 'Leading global container shipping company',
    url: '/companies/1',
    relevanceScore: 0.95,
    matchedFields: ['name', 'industry', 'country']
  },
  {
    id: '2',
    type: 'contact',
    title: 'Lars Nielsen',
    subtitle: 'CEO • Maersk Line',
    description: 'Chief Executive Officer at Maersk Line',
    url: '/contacts/1',
    relevanceScore: 0.87,
    matchedFields: ['name', 'role', 'company']
  },
  {
    id: '3',
    type: 'fleet',
    title: 'Emma Maersk',
    subtitle: 'Container Ship • IMO9321483',
    description: '15,000 TEU capacity container vessel',
    url: '/fleets/1',
    relevanceScore: 0.82,
    matchedFields: ['name', 'type', 'registration']
  }
];

export const mockSavedSearches: SavedSearch[] = [
  {
    id: '1',
    title: 'Active Danish Companies',
    description: 'All active companies based in Denmark',
    query: {
      query: 'status:active AND country:Denmark',
      filters: { 
        status: ['active'], 
        countries: ['Denmark'],
        entityTypes: ['company']
      },
      sorting: {
        field: 'name',
        direction: 'asc'
      },
      pagination: {
        page: 1,
        limit: 50
      }
    },
    userId: 'user1',
    isPublic: false,
    createdAt: new Date('2024-07-15T10:00:00Z'),
    updatedAt: new Date('2024-08-18T14:30:00Z'),
    resultCount: 25
  },
  {
    id: '2',
    title: 'Upcoming Maritime Courses',
    description: 'All upcoming courses in maritime categories',
    query: {
      query: 'category:maritime AND status:upcoming',
      filters: { 
        categories: ['maritime'], 
        status: ['upcoming'],
        entityTypes: ['course']
      },
      sorting: {
        field: 'startDate',
        direction: 'asc'
      },
      pagination: {
        page: 1,
        limit: 50
      }
    },
    userId: 'user1',
    isPublic: true,
    createdAt: new Date('2024-06-20T09:15:00Z'),
    updatedAt: new Date('2024-08-19T08:00:00Z'),
    resultCount: 12
  }
];

// Segment Management Mock Data
export const mockSegments: Segment[] = [
  {
    id: '1',
    name: 'Nordic Shipping Companies',
    description: 'Active shipping companies in Nordic countries',
    criteria: [
      {
        id: 'nordic_companies_status',
        field: 'company_status',
        operator: 'in',
        value: ['Active', 'M1'],
        logicalOperator: undefined
      },
      {
        id: 'nordic_companies_type',
        field: 'company_type',
        operator: 'equals',
        value: 'Member',
        logicalOperator: 'AND'
      },
      {
        id: 'nordic_companies_country',
        field: 'company_country',
        operator: 'in',
        value: ['Denmark', 'Norway', 'Sweden', 'Finland'],
        logicalOperator: 'AND'
      }
    ],
    contactCount: 156,
    lastUpdated: '2024-08-15T14:30:00Z',
    createdAt: '2024-06-01T10:00:00Z',
    createdBy: 'admin@bimco.org',
    status: 'active',
    type: 'geographic',
    tags: ['nordic', 'shipping', 'member'],
    autoRefresh: true,
    refreshInterval: 24,
    lastRefreshAt: '2024-08-15T14:30:00Z',
    estimatedReach: 160,
    conversionRate: 12.5,
    revenue: 285000,
    campaigns: ['nordic_campaign_2024']
  },
  {
    id: '2',
    name: 'Maritime Training Prospects',
    description: 'Contacts interested in maritime training courses',
    criteria: [
      {
        id: 'training_prospects_classification',
        field: 'contact_classification',
        operator: 'in',
        value: ['BI-BD', 'BI-BS'],
        logicalOperator: undefined
      },
      {
        id: 'training_prospects_role',
        field: 'contact_role',
        operator: 'in',
        value: ['Fleet Manager', 'Technical Director'],
        logicalOperator: 'AND'
      },
      {
        id: 'training_prospects_status',
        field: 'contact_status',
        operator: 'equals',
        value: 'Active',
        logicalOperator: 'AND'
      }
    ],
    contactCount: 234,
    lastUpdated: '2024-08-18T16:45:00Z',
    createdAt: '2024-07-10T09:00:00Z',
    createdBy: 'training@bimco.org',
    status: 'active',
    type: 'behavioral',
    tags: ['training', 'prospects', 'maritime'],
    autoRefresh: false,
    estimatedReach: 250,
    conversionRate: 18.3,
    revenue: 145000,
    campaigns: ['training_campaign_q3']
  },
  {
    id: '3',
    name: 'Asia-Pacific Fleet Owners',
    description: 'Companies with fleet operations in Asia-Pacific',
    criteria: [
      {
        id: 'apac_companies_status',
        field: 'company_status',
        operator: 'equals',
        value: 'Active',
        logicalOperator: undefined
      },
      {
        id: 'apac_companies_country',
        field: 'company_country',
        operator: 'in',
        value: ['Singapore', 'Hong Kong', 'Japan', 'South Korea'],
        logicalOperator: 'AND'
      }
    ],
    contactCount: 89,
    lastUpdated: '2024-08-19T10:15:00Z',
    createdAt: '2024-08-01T11:30:00Z',
    createdBy: 'regional@bimco.org',
    status: 'draft',
    type: 'geographic',
    tags: ['apac', 'fleet', 'owners'],
    autoRefresh: false,
    estimatedReach: 95,
    campaigns: []
  }
];