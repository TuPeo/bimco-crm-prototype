export interface Company {
  id: string;
  registrationNumber: string;
  name: string;
  name2?: string;
  status: string;
  type: string;
  address: {
    line1: string;
    line2?: string;
    line3?: string;
    postCode: string;
    country: string;
    countryCode: string;
  };
  email: string;
  numberOfEmployees: number;
  dateCreated: string;
  lastUpdated: string;
  contacts?: Contact[];
}

export interface Contact {
  id: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;
  companyId: string;
  companyName: string;
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

export interface Course {
  id: string;
  title: string;
  category: string;
  group: string;
  startDate: string;
  endDate: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  participants: CourseParticipant[];
  description?: string;
  maxParticipants?: number;
}

export interface CourseParticipant {
  contactId: string;
  contactName: string;
  email: string;
  role: 'Attendee' | 'Instructor' | 'Organizer' | 'Speaker';
  registrationDate: string;
}

export interface Fleet {
  id: string;
  name: string;
  type: string;
  capacity: number;
  registration: string;
  operationalStatus: 'Active' | 'Inactive' | 'Maintenance' | 'Decommissioned';
  companyId: string;
  companyName: string;
  ihsNumber?: string;
  yearBuilt?: number;
  flag: string;
  grossTonnage?: number;
  deadweight?: number;
  length?: number;
  beam?: number;
  draft?: number;
  enginePower?: number;
  fuelType?: string;
  certificates: FleetCertificate[];
  maintenanceRecords: MaintenanceRecord[];
  dateCreated: string;
  lastUpdated: string;
}

export interface FleetCertificate {
  id: string;
  type: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string;
  documentUrl?: string;
}

export interface MaintenanceRecord {
  id: string;
  type: string;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  cost?: number;
  vendor?: string;
  notes?: string;
}

export interface SearchResult {
  id: string;
  type: 'company' | 'contact' | 'course' | 'fleet';
  title: string;
  subtitle: string;
  description?: string;
  url: string;
  relevanceScore: number;
  matchedFields: string[];
}

export interface SavedSearch {
  id: string;
  name: string;
  description?: string;
  searchQuery: string;
  filters: Record<string, string | string[] | boolean | number>;
  entityTypes: string[];
  userId: string;
  isPublic: boolean;
  dateCreated: string;
  lastUsed: string;
}

export interface Segment {
  id: string;
  name: string;
  description?: string;
  criteria: SegmentCriteria;
  memberCount: number;
  status: 'Active' | 'Draft' | 'Archived';
  createdBy: string;
  dateCreated: string;
  lastUpdated: string;
  onHold: boolean;
  readyForInvoice: boolean;
}

export interface SegmentCriteria {
  companies?: {
    statuses?: string[];
    types?: string[];
    countries?: string[];
    registrationDateRange?: { start: string; end: string };
  };
  contacts?: {
    classifications?: string[];
    roles?: string[];
    statuses?: string[];
  };
  courses?: {
    categories?: string[];
    dateRange?: { start: string; end: string };
  };
}

export interface SegmentMember {
  id: string;
  segmentId: string;
  entityType: 'company' | 'contact' | 'course';
  entityId: string;
  entityName: string;
  dateAdded: string;
}

export interface DashboardStats {
  totalCompanies: number;
  totalContacts: number;
  totalCourses: number;
  pendingNotifications: number;
}
