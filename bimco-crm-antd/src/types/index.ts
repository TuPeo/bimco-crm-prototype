// Company Types
export interface Company {
  id: string;
  registrationNumber: string;
  name: string;
  name2?: string;
  status: CompanyStatus;
  type: CompanyType;
  address: Address;
  email: string;
  numberOfEmployees: number;
  dateCreated: string;
  lastUpdated: string;
  contacts?: Contact[];
}

export interface CompanyStatus {
  code: string;
  label: string;
}

export interface CompanyType {
  code: string;
  label: string;
}

export interface Address {
  name?: string;
  line1: string;
  line2?: string;
  line3?: string;
  postCode: string;
  country: string;
  countryCode: string;
}

// Contact Types
export interface Contact {
  id: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  department?: string;
  companyId: string;
  company?: Company;
  status: 'Active' | 'Inactive';
  classifications: ContactClassification[];
  dateCreated: string;
  lastUpdated: string;
}

export interface ContactClassification {
  code: string;
  description: string;
  date: string;
}

// Fleet Types
export interface Fleet {
  id: string;
  name: string;
  type: string;
  capacity: number;
  registrationNumber: string;
  operationalStatus: string;
  ihsInfo?: IHSInfo;
  maintenanceHistory: MaintenanceRecord[];
  certificates: Certificate[];
}

export interface IHSInfo {
  ihsNumber: string;
  vesselType: string;
  flag: string;
  buildYear: number;
  dwt: number;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  cost?: number;
  status: string;
}

export interface Certificate {
  id: string;
  name: string;
  issueDate: string;
  expiryDate: string;
  issuer: string;
  fileUrl?: string;
}

// Course & Event Types
export interface Course {
  id: string;
  title: string;
  type: 'Course' | 'Event';
  category: string;
  group: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  participants: Participant[];
  agenda?: string;
  materials: CourseMaterial[];
  description?: string;
  venue?: VenueDetails;
  dateCreated: string;
  lastUpdated: string;
}

export interface Participant {
  id: string;
  contactId: string;
  contact: Contact;
  role: 'Attendee' | 'Instructor' | 'Organizer';
  registrationDate: string;
  attendanceStatus?: 'Registered' | 'Attended' | 'No Show';
}

export interface CourseMaterial {
  id: string;
  name: string;
  type: string;
  fileUrl: string;
  uploadDate: string;
}

export interface VenueDetails {
  name: string;
  address: Address;
  capacity: number;
  facilities?: string[];
  catering?: boolean;
  cost?: number;
}

// Search Types
export interface SearchResult {
  type: 'Company' | 'Contact' | 'Fleet' | 'Course';
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
}

export interface SearchFilters {
  type?: string[];
  status?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  country?: string[];
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  dateCreated: string;
  actionUrl?: string;
}

// User & Auth Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: Permission[];
  lastLogin?: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  entity: string;
  action: 'Create' | 'Read' | 'Update' | 'Delete';
  scope: 'Global' | 'Company' | 'Own';
}

// Dashboard Types
export interface DashboardStats {
  totalCompanies: number;
  totalContacts: number;
  upcomingEvents: number;
  activeFleets: number;
  companiesByStatus: { [key: string]: number };
  contactsByCountry: { [key: string]: number };
  eventsByMonth: { month: string; count: number }[];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}
