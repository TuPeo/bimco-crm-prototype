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
  communicationHistory?: CommunicationRecord[];
  dateCreated: string;
  lastUpdated: string;
}

export interface ContactClassification {
  code: string;
  description: string;
  date: string;
}

export interface CommunicationRecord {
  id: string;
  type: 'email' | 'phone' | 'meeting' | 'video_call' | 'note';
  subject: string;
  description: string;
  date: string;
  direction: 'inbound' | 'outbound';
  participants: string[];
  attachments?: string[];
  tags?: string[];
  createdBy: string;
  createdAt: string;
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
  // Enhanced fields
  bimcoLegalEntity?: string;
  timezone?: string;
  recurrence?: CourseRecurrence;
  content?: CourseContent;
  logistics?: CourseLogistics;
  revenue?: CourseRevenue;
  paymentSettings?: CoursePaymentSettings;
}

export interface CourseRecurrence {
  type: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: string;
  daysOfWeek?: number[]; // 0-6, Sunday = 0
}

export interface CourseContent {
  program?: string; // Rich text content
  materials?: CourseFile[];
  objectives?: string[];
  prerequisites?: string[];
}

export interface CourseFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface CourseLogistics {
  venue?: CourseVenue;
  catering?: CourseCatering;
  costs?: CourseCosts;
  equipment?: string[];
}

export interface CourseVenue {
  name: string;
  address: string;
  capacity: number;
  facilities: string[];
  contactInfo?: string;
}

export interface CourseCatering {
  included: boolean;
  type?: 'breakfast' | 'lunch' | 'dinner' | 'coffee' | 'full';
  dietaryRestrictions?: string[];
  cost?: number;
}

export interface CourseCosts {
  venue: number;
  catering: number;
  materials: number;
  instructor: number;
  other: number;
  total: number;
}

export interface CourseRevenue {
  totalRevenue: number;
  paidAmount: number;
  pendingAmount: number;
  refundedAmount: number;
  ticketsSold: number;
  ticketsAvailable: number;
}

export interface CoursePaymentSettings {
  ticketTypes: TicketType[];
  discountCodes: DiscountCode[];
  paymentMethods: string[];
  refundPolicy?: string;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description?: string;
  maxQuantity?: number;
  soldQuantity: number;
  availability: 'available' | 'limited' | 'sold_out' | 'coming_soon';
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUses?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  applicableTicketTypes?: string[];
}

export interface CourseParticipant {
  contactId: string;
  contactName: string;
  email: string;
  role: 'Attendee' | 'Instructor' | 'Organizer' | 'Speaker';
  registrationDate: string;
  ticketType?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled' | 'complimentary';
  amountPaid?: number;
  discountApplied?: string;
  specialRequirements?: string[];
}

export interface Fleet {
  id: string;
  name: string;
  type: string;
  vesselType?: string; // Added for fleet management
  capacity: number;
  registration: string;
  imoNumber?: string; // Added for fleet management
  operationalStatus: 'Active' | 'Inactive' | 'Maintenance' | 'Decommissioned' | 'In Service' | 'Under Maintenance' | 'Dry Dock' | 'Laid Up' | 'Out of Service';
  companyId: string;
  companyName: string;
  ihsNumber?: string;
  yearBuilt?: number;
  builtYear?: number; // Added for consistency
  flag: string;
  classificationSociety?: string; // Added for fleet management
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
  metadata?: Record<string, unknown>;
}

export interface SavedSearch {
  id: string;
  title: string; // Changed from 'name' to 'title'
  description?: string;
  query: PowerSearchQuery; // Changed from searchQuery and filters to a complete query object
  userId: string;
  isPublic: boolean;
  isStarred?: boolean; // Added for favorites functionality
  category?: string; // Added for categorization
  tags?: string[]; // Added for tagging
  createdAt: Date; // Changed from dateCreated string to Date
  updatedAt: Date; // Added for tracking modifications
  resultCount?: number;
}

export interface SearchFilters {
  entityTypes?: string[];
  status?: string[];
  dateRange?: { start: string; end: string };
  // Company specific
  companyTypes?: string[];
  countries?: string[];
  // Contact specific
  classifications?: string[];
  roles?: string[];
  // Course specific
  categories?: string[];
  locations?: string[];
  // Fleet specific
  vesselTypes?: string[];
  operationalStatus?: string[];
  // Advanced filters
  customFields?: Record<string, unknown>;
}

export interface PowerSearchQuery {
  query: string;
  filters: SearchFilters;
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pagination: {
    page: number;
    limit: number;
  };
}

export interface UserPermissions {
  canViewAllCompanies: boolean;
  canViewAllContacts: boolean;
  canViewAllFleets: boolean;
  canViewAllCourses: boolean;
  canCreateSegments: boolean;
  canSaveSearches: boolean;
  allowedCountries?: string[];
  allowedCompanyTypes?: string[];
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
  // Original criteria structure
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
  // Extended criteria for search-based segments
  searchQuery?: PowerSearchQuery;
  includedItemIds?: string[];
  createdFromSearch?: boolean;
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
