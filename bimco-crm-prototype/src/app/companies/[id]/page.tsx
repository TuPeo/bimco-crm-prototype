'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CompanyModal from '@/components/CompanyModal';
import ContactModal from '@/components/ContactModal';
import FleetModal from '@/components/FleetModal';
import CertificatesModal from '@/components/CertificatesModal';
import MaintenanceModal from '@/components/MaintenanceModal';
import { mockCompanies, mockContacts, mockFleets } from '@/data/mockData';
import { Company, Contact, Fleet } from '@/types';
import { 
  PencilIcon,
  ArrowLeftIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  UsersIcon,
  TruckIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function CompanyDetail() {
  const params = useParams();
  const companyId = params?.id as string;
  
  const [activeTab, setActiveTab] = useState<'general' | 'address' | 'contacts' | 'fleets'>('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [contactStatusFilter, setContactStatusFilter] = useState('all');
  const [fleetSearchTerm, setFleetSearchTerm] = useState('');
  const [fleetStatusFilter, setFleetStatusFilter] = useState('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [isCertificatesModalOpen, setIsCertificatesModalOpen] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [modalFleet, setModalFleet] = useState<Fleet | null>(null);
  const [company, setCompany] = useState(mockCompanies.find(c => c.id === companyId));
  const [contactModalMode, setContactModalMode] = useState<'add' | 'edit'>('add');
  const [fleetModalMode, setFleetModalMode] = useState<'add' | 'edit'>('add');

  const companyContacts = mockContacts.filter(c => c.companyId === companyId);
  const companyFleets = mockFleets.filter(f => f.companyId === companyId);

  // Modal handlers
  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompany(updatedCompany);
  };

  // Contact handlers
  const openAddContactModal = () => {
    setSelectedContact(null);
    setContactModalMode('add');
    setIsContactModalOpen(true);
  };

  const openEditContactModal = (contact: Contact) => {
    setSelectedContact(contact);
    setContactModalMode('edit');
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedContact(null);
  };

  const handleSaveContact = (contactData: Contact | Omit<Contact, 'id'>) => {
    // Handle contact save logic here
    console.log('Contact saved:', contactData);
  };

  // Fleet handlers
  const openAddFleetModal = () => {
    setSelectedFleet(null);
    setFleetModalMode('add');
    setIsFleetModalOpen(true);
  };

  const openEditFleetModal = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setFleetModalMode('edit');
    setIsFleetModalOpen(true);
  };

  const closeFleetModal = () => {
    setIsFleetModalOpen(false);
    setSelectedFleet(null);
  };

  const handleSaveFleet = (fleetData: Fleet | Omit<Fleet, 'id'>) => {
    // Handle fleet save logic here
    console.log('Fleet saved:', fleetData);
  };

  const handleViewFleet = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    // Could open a view-only modal or navigate to fleet detail page
    console.log('Viewing fleet:', fleet);
  };

  const handleEditFleet = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setFleetModalMode('edit');
    setIsFleetModalOpen(true);
  };

  const handleRemoveFleet = (fleetId: string) => {
    if (confirm('Are you sure you want to remove this vessel from the fleet?')) {
      // Handle fleet removal logic here
      console.log('Removing fleet:', fleetId);
    }
  };

  // Filter contacts based on search and filters
  const filteredContacts = companyContacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
      contact.contactNumber.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
      (contact.role && contact.role.toLowerCase().includes(contactSearchTerm.toLowerCase()));
    
    const matchesStatus = contactStatusFilter === 'all' || contact.status === contactStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filter fleets based on search and status
  const filteredFleets = companyFleets.filter(fleet => {
    const matchesSearch = 
      fleet.name.toLowerCase().includes(fleetSearchTerm.toLowerCase()) ||
      fleet.registration.toLowerCase().includes(fleetSearchTerm.toLowerCase()) ||
      (fleet.ihsNumber && fleet.ihsNumber.toLowerCase().includes(fleetSearchTerm.toLowerCase())) ||
      fleet.type.toLowerCase().includes(fleetSearchTerm.toLowerCase());
    
    const matchesStatus = fleetStatusFilter === 'all' || fleet.operationalStatus === fleetStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Additional fleet handlers for certificates and maintenance
  const openCertificatesModal = (fleet: Fleet) => {
    setModalFleet(fleet);
    setIsCertificatesModalOpen(true);
  };

  const openMaintenanceModal = (fleet: Fleet) => {
    setModalFleet(fleet);
    setIsMaintenanceModalOpen(true);
  };

  const closeCertificatesModal = () => {
    setIsCertificatesModalOpen(false);
    setModalFleet(null);
  };

  const closeMaintenanceModal = () => {
    setIsMaintenanceModalOpen(false);
    setModalFleet(null);
  };

  // Helper functions
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'Maintenance': 'bg-yellow-100 text-yellow-800',
      'Decommissioned': 'bg-red-100 text-red-800'
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const formatNumber = (num: number | undefined) => {
    return num ? num.toLocaleString() : 'N/A';
  };

  if (!company) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Company Not Found</h2>
          <p className="mt-2 text-gray-600">The requested company could not be found.</p>
          <Link href="/companies" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Companies
          </Link>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'general', name: 'General', icon: BuildingOfficeIcon },
    { id: 'address', name: 'Address', icon: MapPinIcon },
    { id: 'contacts', name: 'Contact Management', icon: UsersIcon },
    { id: 'fleets', name: 'Fleet Management', icon: TruckIcon },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/companies" className="text-gray-400 hover:text-gray-600">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {company.name}
              </h1>
              <p className="text-sm text-gray-600">Registration: {company.registrationNumber}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={openEditModal}
              className="bimco-btn-primary flex items-center"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center space-x-4">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            company.status === 'M1' ? 'bg-green-100 text-green-800' :
            company.status === 'M0' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            Status: {company.status}
          </span>
          <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
            Type: {company.type}
          </span>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'general' | 'address' | 'contacts' | 'fleets')}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon
                  className={`-ml-0.5 mr-2 h-5 w-5 ${
                    activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {tab.name}
                {tab.id === 'contacts' && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {companyContacts.length}
                  </span>
                )}
                {tab.id === 'fleets' && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {companyFleets.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Registration Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.registrationNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.name}</dd>
                  </div>
                  {company.name2 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Company Name 2</dt>
                      <dd className="mt-1 text-sm text-gray-900">{company.name2}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a href={`mailto:${company.email}`} className="text-blue-600 hover:text-blue-500">
                        {company.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Number of Employees</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.numberOfEmployees}</dd>
                  </div>
                </dl>
              </div>

              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(company.dateCreated).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(company.lastUpdated).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="bimco-card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address Line 1</dt>
                  <dd className="mt-1 text-sm text-gray-900">{company.address.line1}</dd>
                </div>
                {company.address.line2 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Address Line 2</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.address.line2}</dd>
                  </div>
                )}
                {company.address.line3 && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Address Line 3</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.address.line3}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Post Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{company.address.postCode}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country</dt>
                  <dd className="mt-1 text-sm text-gray-900">{company.address.country}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Country Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{company.address.countryCode}</dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bimco-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Management</h3>
                <button 
                  onClick={openAddContactModal}
                  className="bimco-btn-primary text-sm flex items-center"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Contact
                </button>
              </div>

              {/* Contact Search and Filters */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search contacts..."
                      value={contactSearchTerm}
                      onChange={(e) => setContactSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={contactStatusFilter}
                    onChange={(e) => setContactStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <div className="text-sm text-gray-500 flex items-center">
                    Showing {filteredContacts.length} of {companyContacts.length} contacts
                  </div>
                </div>
              </div>
              
              {filteredContacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="bimco-table">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="font-medium text-blue-600">
                            <Link href={`/contacts/${contact.id}`} className="hover:text-blue-500">
                              {contact.contactNumber}
                            </Link>
                          </td>
                          <td className="font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </td>
                          <td className="text-gray-500">{contact.role || 'N/A'}</td>
                          <td>
                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-500">
                              {contact.email}
                            </a>
                          </td>
                          <td className="text-gray-500">{contact.phone || 'N/A'}</td>
                          <td>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              contact.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {contact.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex space-x-2">
                              <Link href={`/contacts/${contact.id}`}>
                                <button className="text-blue-600 hover:text-blue-900" title="View Contact">
                                  <EyeIcon className="h-4 w-4" />
                                </button>
                              </Link>
                              <button 
                                onClick={() => openEditContactModal(contact)}
                                className="text-gray-600 hover:text-gray-900"
                                title="Edit Contact"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                title="Remove Contact"
                                onClick={() => {
                                  if (confirm('Are you sure you want to remove this contact from the company?')) {
                                    // Handle contact removal
                                    console.log('Removing contact:', contact.id);
                                  }
                                }}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No contacts</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {contactSearchTerm ? 'No contacts found matching your search.' : 'No contacts have been added to this company yet.'}
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={openAddContactModal}
                      className="bimco-btn-primary"
                    >
                      Add Contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fleet Management Tab */}
          {activeTab === 'fleets' && (
            <div className="space-y-6">
              {/* Fleet Search and Filters */}
              <div className="bimco-card">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search vessels by name, IMO, or registration..."
                          value={fleetSearchTerm}
                          onChange={(e) => setFleetSearchTerm(e.target.value)}
                          className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                      <FunnelIcon className="h-4 w-4 text-gray-400" />
                      <select
                        value={fleetStatusFilter}
                        onChange={(e) => setFleetStatusFilter(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Decommissioned">Decommissioned</option>
                      </select>
                    </div>

                    {/* Add Button */}
                    <button
                      onClick={openAddFleetModal}
                      className="bimco-btn-primary flex-shrink-0"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Vessel
                    </button>
                  </div>

                  {/* Results Count */}
                  <div className="mt-3 text-sm text-gray-500">
                    Showing {filteredFleets.length} of {companyFleets.length} vessels
                  </div>
                </div>

                {/* Fleet List */}
                <div className="divide-y divide-gray-200">
                  {filteredFleets.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                      <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No vessels found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {fleetSearchTerm ? 'No vessels found matching your criteria.' : 'No vessels have been registered for this company yet.'}
                      </p>
                      <div className="mt-6">
                        <button 
                          onClick={openAddFleetModal}
                          className="bimco-btn-primary"
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add First Vessel
                        </button>
                      </div>
                    </div>
                  ) : (
                    filteredFleets.map((fleet) => (
                      <div
                        key={fleet.id}
                        className="px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <Link
                                    href={`/fleets/${fleet.id}`}
                                    className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                                  >
                                    {fleet.name}
                                  </Link>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(fleet.operationalStatus)}`}>
                                    {fleet.operationalStatus}
                                  </span>
                                </div>
                                <div className="mt-1 text-sm text-gray-500">
                                  {fleet.type} • IMO {fleet.registration} • {company.name}
                                </div>
                                <div className="mt-1 text-xs text-gray-400 flex items-center gap-4">
                                  <span>Flag: {fleet.flag}</span>
                                  <span>Built: {fleet.yearBuilt}</span>
                                  <span>DWT: {formatNumber(fleet.deadweight)} MT</span>
                                  <span>GT: {formatNumber(fleet.grossTonnage)} GT</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Quick Actions */}
                            <button
                              onClick={() => openCertificatesModal(fleet)}
                              type="button"
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              title="View Certificates"
                            >
                              <DocumentTextIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openMaintenanceModal(fleet)}
                              type="button"
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Maintenance Records"
                            >
                              <WrenchScrewdriverIcon className="h-4 w-4" />
                            </button>
                            <Link
                              href={`/fleets/${fleet.id}`}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => openEditFleetModal(fleet)}
                              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Edit Vessel"
                            >
                              <ChevronRightIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Maintenance Status */}
                        {fleet.maintenanceRecords && fleet.maintenanceRecords.some && fleet.maintenanceRecords.some(record => record.status === 'In Progress' || record.status === 'Overdue') && (
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <WrenchScrewdriverIcon className="h-4 w-4 text-yellow-500" />
                            <span className="text-yellow-600">
                              Maintenance: {fleet.maintenanceRecords.find(r => r.status === 'In Progress' || r.status === 'Overdue')?.description}
                            </span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Fleet Summary Cards */}
              {companyFleets.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bimco-stat-card">
                    <div className="px-4 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-semibold">
                              {companyFleets.filter(f => f.operationalStatus === 'Active').length}
                            </span>
                          </div>
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">Active Vessels</p>
                          <p className="text-xs text-gray-400">Currently operational</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bimco-stat-card">
                    <div className="px-4 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-yellow-600 text-sm font-semibold">
                              {companyFleets.filter(f => f.operationalStatus === 'Maintenance').length}
                            </span>
                          </div>
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">In Maintenance</p>
                          <p className="text-xs text-gray-400">Under repair/service</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bimco-stat-card">
                    <div className="px-4 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-sm font-semibold">
                              {companyFleets.reduce((count, fleet) => 
                                count + (fleet.certificates ? fleet.certificates.filter(cert => 
                                  new Date(cert.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
                                ).length : 0), 0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">Expiring Certificates</p>
                          <p className="text-xs text-gray-400">Next 90 days</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bimco-stat-card">
                    <div className="px-4 py-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-sm font-semibold">
                              {companyFleets.reduce((sum, fleet) => sum + (fleet.capacity || 0), 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-5">
                          <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                          <p className="text-xs text-gray-400">Combined fleet capacity</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Company Edit Modal */}
        {company && (
          <CompanyModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSaveCompany}
            company={company}
            mode="edit"
          />
        )}

        {/* Contact Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
          onSave={handleSaveContact}
          contact={selectedContact}
          mode={contactModalMode}
        />

        {/* Fleet Modal */}
        <FleetModal
          isOpen={isFleetModalOpen}
          onClose={closeFleetModal}
          onSave={handleSaveFleet}
          fleet={selectedFleet}
          mode={fleetModalMode}
        />

        {/* Certificates Modal */}
        {modalFleet && (
          <CertificatesModal
            isOpen={isCertificatesModalOpen}
            onClose={closeCertificatesModal}
            fleet={modalFleet}
          />
        )}

        {/* Maintenance Modal */}
        {modalFleet && (
          <MaintenanceModal
            isOpen={isMaintenanceModalOpen}
            onClose={closeMaintenanceModal}
            fleet={modalFleet}
          />
        )}
      </div>
    </Layout>
  );
}
