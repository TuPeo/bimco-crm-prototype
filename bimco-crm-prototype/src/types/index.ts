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
  operationalStatus: string;
  companyId: string;
}

export interface DashboardStats {
  totalCompanies: number;
  totalContacts: number;
  totalCourses: number;
  pendingNotifications: number;
}
