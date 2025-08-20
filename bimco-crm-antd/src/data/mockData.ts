import { Company, Contact, Fleet, Course, CompanyStatus, CompanyType, DashboardStats } from '../types';

// Mock Company Statuses
export const companyStatuses: CompanyStatus[] = [
  { code: 'M0', label: 'Active Member' },
  { code: 'M1', label: 'Prospect Member' },
  { code: 'M2', label: 'Inactive Member' },
  { code: 'P0', label: 'Active Prospect' },
  { code: 'P1', label: 'Cold Prospect' },
];

// Mock Company Types
export const companyTypes: CompanyType[] = [
  { code: 'A1', label: 'Shipping Company' },
  { code: 'A2', label: 'Port Authority' },
  { code: 'A3', label: 'Maritime Service Provider' },
  { code: 'B1', label: 'Insurance Company' },
  { code: 'B2', label: 'Classification Society' },
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    registrationNumber: '123456',
    name: 'Maersk Line',
    name2: 'A.P. Moller - Maersk',
    status: companyStatuses[0],
    type: companyTypes[0],
    address: {
      name: 'Headquarters',
      line1: 'Esplanaden 50',
      line2: '',
      postCode: '1098',
      country: 'Denmark',
      countryCode: 'DK'
    },
    email: 'info@maersk.com',
    numberOfEmployees: 3,
    dateCreated: '2023-01-15',
    lastUpdated: '2024-12-01',
  },
  {
    id: '2',
    registrationNumber: '234567',
    name: 'Mediterranean Shipping Company',
    name2: 'MSC',
    status: companyStatuses[0],
    type: companyTypes[0],
    address: {
      name: 'Headquarters',
      line1: 'Chemin Rieu 12-14',
      line2: '',
      postCode: '1208',
      country: 'Switzerland',
      countryCode: 'CH'
    },
    email: 'info@msc.com',
    numberOfEmployees: 2,
    dateCreated: '2023-02-20',
    lastUpdated: '2024-11-28',
  },
  {
    id: '3',
    registrationNumber: '345678',
    name: 'COSCO SHIPPING',
    name2: 'China COSCO Shipping Corporation',
    status: companyStatuses[1],
    type: companyTypes[0],
    address: {
      name: 'Headquarters',
      line1: 'COSCO Plaza, 378 Dong Da Ming Road',
      line2: 'Hongkou District',
      postCode: '200080',
      country: 'China',
      countryCode: 'CN'
    },
    email: 'info@cosco-shipping.com',
    numberOfEmployees: 4,
    dateCreated: '2023-03-10',
    lastUpdated: '2024-11-25',
  },
  {
    id: '4',
    registrationNumber: '456789',
    name: 'Hapag-Lloyd AG',
    status: companyStatuses[0],
    type: companyTypes[0],
    address: {
      name: 'Headquarters',
      line1: 'Ballindamm 25',
      line2: '',
      postCode: '20095',
      country: 'Germany',
      countryCode: 'DE'
    },
    email: 'info@hapag-lloyd.com',
    numberOfEmployees: 5,
    dateCreated: '2023-04-05',
    lastUpdated: '2024-11-30',
  },
  {
    id: '5',
    registrationNumber: '567890',
    name: 'Port of Singapore Authority',
    name2: 'PSA',
    status: companyStatuses[0],
    type: companyTypes[1],
    address: {
      name: 'Headquarters',
      line1: '460 Alexandra Road',
      line2: '#19-00 PSA Building',
      postCode: '119963',
      country: 'Singapore',
      countryCode: 'SG'
    },
    email: 'info@globalpsa.com',
    numberOfEmployees: 6,
    dateCreated: '2023-05-12',
    lastUpdated: '2024-12-02',
  }
];

// Mock Contacts
export const mockContacts: Contact[] = [
  {
    id: '1',
    contactNumber: '123456_0001',
    firstName: 'Lars',
    lastName: 'Nielsen',
    email: 'lars.nielsen@maersk.com',
    phone: '+45 33 63 33 63',
    role: 'CEO',
    department: 'Executive',
    companyId: '1',
    status: 'Active',
    classifications: [
      { code: 'BI-ADM', description: 'BIMCO Administrator', date: '2023-01-15' },
      { code: 'BI-BS', description: 'BIMCO Business', date: '2023-02-01' }
    ],
    dateCreated: '2023-01-15',
    lastUpdated: '2024-11-30',
  },
  {
    id: '2',
    contactNumber: '123456_0002',
    firstName: 'Anna',
    lastName: 'Mørch',
    email: 'anna.morch@maersk.com',
    phone: '+45 33 63 33 64',
    role: 'Head of Sustainability',
    department: 'Sustainability',
    companyId: '1',
    status: 'Active',
    classifications: [
      { code: 'BI-ENV', description: 'BIMCO Environmental', date: '2023-03-01' }
    ],
    dateCreated: '2023-03-01',
    lastUpdated: '2024-11-28',
  },
  {
    id: '3',
    contactNumber: '234567_0001',
    firstName: 'Diego',
    lastName: 'Aponte',
    email: 'diego.aponte@msc.com',
    phone: '+41 22 703 8888',
    role: 'President & CEO',
    department: 'Executive',
    companyId: '2',
    status: 'Active',
    classifications: [
      { code: 'BI-ADM', description: 'BIMCO Administrator', date: '2023-02-20' }
    ],
    dateCreated: '2023-02-20',
    lastUpdated: '2024-12-01',
  },
  {
    id: '4',
    contactNumber: '345678_0001',
    firstName: 'Zhang',
    lastName: 'Wei',
    email: 'zhang.wei@cosco-shipping.com',
    phone: '+86 21 3570 5888',
    role: 'Chairman',
    department: 'Executive',
    companyId: '3',
    status: 'Active',
    classifications: [
      { code: 'BI-ASIA', description: 'BIMCO Asia Pacific', date: '2023-03-10' }
    ],
    dateCreated: '2023-03-10',
    lastUpdated: '2024-11-25',
  },
  {
    id: '5',
    contactNumber: '456789_0001',
    firstName: 'Rolf',
    lastName: 'Habben Jansen',
    email: 'rolf.jansen@hapag-lloyd.com',
    phone: '+49 40 3001 2001',
    role: 'CEO',
    department: 'Executive',
    companyId: '4',
    status: 'Active',
    classifications: [
      { code: 'BI-BD', description: 'BIMCO Board Director', date: '2023-04-05' }
    ],
    dateCreated: '2023-04-05',
    lastUpdated: '2024-11-30',
  }
];

// Mock Fleets
export const mockFleets: Fleet[] = [
  {
    id: '1',
    name: 'Maersk Eindhoven',
    type: 'Container Ship',
    capacity: 20568,
    registrationNumber: 'IMO-9778451',
    operationalStatus: 'Active',
    ihsInfo: {
      ihsNumber: '9778451',
      vesselType: 'Container Ship',
      flag: 'Denmark',
      buildYear: 2018,
      dwt: 217596
    },
    maintenanceHistory: [
      {
        id: '1',
        date: '2024-10-15',
        type: 'Dry Dock',
        description: 'Regular maintenance and inspection',
        cost: 2500000,
        status: 'Completed'
      }
    ],
    certificates: [
      {
        id: '1',
        name: 'Safety Management Certificate',
        issueDate: '2024-01-15',
        expiryDate: '2027-01-14',
        issuer: 'DNV GL'
      }
    ]
  },
  {
    id: '2',
    name: 'MSC Oscar',
    type: 'Container Ship',
    capacity: 19224,
    registrationNumber: 'IMO-9778463',
    operationalStatus: 'Active',
    ihsInfo: {
      ihsNumber: '9778463',
      vesselType: 'Container Ship',
      flag: 'Panama',
      buildYear: 2015,
      dwt: 195636
    },
    maintenanceHistory: [
      {
        id: '2',
        date: '2024-09-20',
        type: 'Engine Overhaul',
        description: 'Main engine maintenance',
        cost: 1800000,
        status: 'Completed'
      }
    ],
    certificates: [
      {
        id: '2',
        name: 'International Safety Management Certificate',
        issueDate: '2024-03-01',
        expiryDate: '2027-02-28',
        issuer: 'Bureau Veritas'
      }
    ]
  }
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Maritime Law and Regulations',
    type: 'Course',
    category: 'Training',
    group: 'Legal',
    startDate: '2025-01-15',
    endDate: '2025-01-17',
    location: 'Copenhagen, Denmark',
    status: 'Upcoming',
    participants: [
      {
        id: '1',
        contactId: '1',
        contact: mockContacts[0],
        role: 'Attendee',
        registrationDate: '2024-12-01',
        attendanceStatus: 'Registered'
      }
    ],
    agenda: 'Day 1: Introduction to Maritime Law\nDay 2: International Regulations\nDay 3: Case Studies',
    materials: [
      {
        id: '1',
        name: 'Maritime Law Handbook',
        type: 'PDF',
        fileUrl: '/materials/maritime-law-handbook.pdf',
        uploadDate: '2024-12-01'
      }
    ],
    description: 'Comprehensive course covering maritime law and international regulations',
    venue: {
      name: 'BIMCO Training Center',
      address: {
        line1: 'Bagsvaerdvej 161',
        postCode: '2880',
        country: 'Denmark',
        countryCode: 'DK'
      },
      capacity: 50,
      facilities: ['Projector', 'WiFi', 'Parking'],
      catering: true,
      cost: 15000
    },
    dateCreated: '2024-11-01',
    lastUpdated: '2024-12-01',
  },
  {
    id: '2',
    title: 'Digital Transformation in Shipping',
    type: 'Event',
    category: 'Conference',
    group: 'Technology',
    startDate: '2025-02-20',
    endDate: '2025-02-21',
    location: 'Online',
    status: 'Upcoming',
    participants: [
      {
        id: '2',
        contactId: '2',
        contact: mockContacts[1],
        role: 'Attendee',
        registrationDate: '2024-11-15',
        attendanceStatus: 'Registered'
      },
      {
        id: '3',
        contactId: '3',
        contact: mockContacts[2],
        role: 'Instructor',
        registrationDate: '2024-11-01',
        attendanceStatus: 'Registered'
      }
    ],
    agenda: 'Digital technologies transforming the maritime industry',
    materials: [],
    description: 'Two-day virtual conference on digital transformation trends in shipping',
    dateCreated: '2024-10-15',
    lastUpdated: '2024-11-30',
  }
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalCompanies: mockCompanies.length,
  totalContacts: mockContacts.length,
  upcomingEvents: 2,
  activeFleets: mockFleets.length,
  companiesByStatus: {
    'Active Member': 4,
    'Prospect Member': 1,
    'Inactive Member': 0
  },
  contactsByCountry: {
    'Denmark': 2,
    'Switzerland': 1,
    'China': 1,
    'Germany': 1,
    'Singapore': 0
  },
  eventsByMonth: [
    { month: 'Jan 2025', count: 1 },
    { month: 'Feb 2025', count: 1 },
    { month: 'Mar 2025', count: 0 },
    { month: 'Apr 2025', count: 0 }
  ]
};

// Add company references to contacts
mockContacts.forEach(contact => {
  const company = mockCompanies.find(c => c.id === contact.companyId);
  if (company) {
    contact.company = company;
  }
});

// Add contacts to companies
mockCompanies.forEach(company => {
  company.contacts = mockContacts.filter(c => c.companyId === company.id);
});

// Chart Data
export const companyStatusChartData = [
  { type: 'Active Member', value: 5 },
  { type: 'Prospect Member', value: 1 },
  { type: 'Inactive Member', value: 0 },
];

export const companyByCountryChartData = [
  { country: 'Denmark', value: 1 },
  { country: 'Switzerland', value: 1 },
  { country: 'China', value: 1 },
  { country: 'Germany', value: 1 },
  { country: 'Singapore', value: 1 },
  { country: 'Norway', value: 1 },
];

export const monthlyTrendsData = [
  { month: 'Sep 2024', companies: 120, contacts: 450, events: 15 },
  { month: 'Oct 2024', companies: 135, contacts: 520, events: 18 },
  { month: 'Nov 2024', companies: 142, contacts: 580, events: 22 },
  { month: 'Dec 2024', companies: 158, contacts: 635, events: 20 },
  { month: 'Jan 2025', companies: 165, contacts: 690, events: 25 },
  { month: 'Feb 2025', companies: 178, contacts: 745, events: 28 },
  { month: 'Mar 2025', companies: 185, contacts: 780, events: 30 },
  { month: 'Apr 2025', companies: 192, contacts: 825, events: 32 },
];

export const revenueData = [
  { month: 'Sep 2024', membership: 45000, courses: 12000, events: 8000 },
  { month: 'Oct 2024', membership: 48000, courses: 15000, events: 9500 },
  { month: 'Nov 2024', membership: 52000, courses: 18000, events: 11000 },
  { month: 'Dec 2024', membership: 49000, courses: 14000, events: 9000 },
  { month: 'Jan 2025', membership: 55000, courses: 20000, events: 12000 },
  { month: 'Feb 2025', membership: 58000, courses: 22000, events: 13500 },
  { month: 'Mar 2025', membership: 62000, courses: 25000, events: 15000 },
  { month: 'Apr 2025', membership: 65000, courses: 28000, events: 16500 },
];

export const kpiData = {
  membershipGrowth: 15.3,
  courseCompletion: 87.5,
  customerSatisfaction: 92.1,
  fleetUtilization: 78.9,
};

export const courseAnalyticsData = [
  { month: 'Sep 2024', enrollments: 45, completions: 38, revenue: 12000 },
  { month: 'Oct 2024', enrollments: 52, completions: 47, revenue: 15000 },
  { month: 'Nov 2024', enrollments: 48, completions: 42, revenue: 18000 },
  { month: 'Dec 2024', enrollments: 35, completions: 31, revenue: 14000 },
  { month: 'Jan 2025', enrollments: 58, completions: 52, revenue: 20000 },
  { month: 'Feb 2025', enrollments: 62, completions: 55, revenue: 22000 },
  { month: 'Mar 2025', enrollments: 67, completions: 59, revenue: 25000 },
  { month: 'Apr 2025', enrollments: 71, completions: 63, revenue: 28000 },
];
