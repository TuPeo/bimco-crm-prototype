'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CompanyModal from '@/components/CompanyModal';
import ContactModal from '@/components/ContactModal';
import FleetModal from '@/components/FleetModal';
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
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function CompanyDetail() {
  const params = useParams();
  const companyId = params?.id as string;
  
  // State management
  const [activeTab, setActiveTab] = useState<'general' | 'address' | 'contacts' | 'fleets'>('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [fleetSearchTerm, setFleetSearchTerm] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);
  const [company, setCompany] = useState(mockCompanies.find(c => c.id === companyId));
  const [contactModalMode, setContactModalMode] = useState<'add' | 'edit'>('add');
  const [fleetModalMode, setFleetModalMode] = useState<'add' | 'edit'>('add');

  // Data filtering
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
    closeContactModal();
  };

  const handleViewContact = (contact: Contact) => {
    console.log('Viewing contact:', contact);
  };

  const handleRemoveContact = (contactId: string) => {
    if (confirm('Are you sure you want to remove this contact from the company?')) {
      console.log('Removing contact:', contactId);
    }
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
    closeFleetModal();
  };

  const handleViewFleet = (fleet: Fleet) => {
    console.log('Viewing fleet:', fleet);
  };

  const handleEditFleet = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setFleetModalMode('edit');
    setIsFleetModalOpen(true);
  };

  const handleRemoveFleet = (fleetId: string) => {
    if (confirm('Are you sure you want to remove this vessel from the fleet?')) {
      console.log('Removing fleet:', fleetId);
    }
  };

  // Filter contacts based on search
  const filteredContacts = companyContacts.filter(contact =>
    contact.firstName.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
    (contact.role && contact.role.toLowerCase().includes(contactSearchTerm.toLowerCase()))
  );

  // Filter fleets based on search
  const filteredFleets = companyFleets.filter(fleet =>
    fleet.name.toLowerCase().includes(fleetSearchTerm.toLowerCase()) ||
    fleet.registration.toLowerCase().includes(fleetSearchTerm.toLowerCase()) ||
    (fleet.ihsNumber && fleet.ihsNumber.toLowerCase().includes(fleetSearchTerm.toLowerCase())) ||
    fleet.type.toLowerCase().includes(fleetSearchTerm.toLowerCase())
  );

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
          {/* General Tab */}
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
                      <dt className="text-sm font-medium text-gray-500">Alternative Name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{company.name2}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.status}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.email}</dd>
                  </div>
                </dl>
              </div>

              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Number of Employees</dt>
                    <dd className="mt-1 text-sm text-gray-900">{company.numberOfEmployees}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date Created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(company.dateCreated).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(company.lastUpdated).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === 'address' && (
            <div className="bimco-card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company Address</h3>
              <dl className="space-y-4">
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

          {/* Contact Management Tab */}
          {activeTab === 'contacts' && (
            <div className="bimco-card">
              <div className="bimco-card-header">
                <h2>Contact Management</h2>
                <p>Manage contacts associated with this company</p>
              </div>

              {/* Contact Search and Filters */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Search contacts by name, email, or role..."
                      value={contactSearchTerm}
                      onChange={(e) => setContactSearchTerm(e.target.value)}
                      className="bimco-input w-full"
                    />
                  </div>
                  <button 
                    onClick={openAddContactModal}
                    className="bimco-btn-primary"
                  >
                    Add Contact
                  </button>
                </div>
              </div>

              {/* Contact Table */}
              {filteredContacts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="bimco-table">
                    <thead>
                      <tr>
                        <th>Contact #</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td className="font-medium">{contact.contactNumber}</td>
                          <td className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </td>
                          <td>{contact.role || 'N/A'}</td>
                          <td>
                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-500">
                              {contact.email}
                            </a>
                          </td>
                          <td>{contact.phone || 'N/A'}</td>
                          <td>
                            <span className={`bimco-tag ${
                              contact.status === 'Active' ? 'bimco-tag-success' : 'bimco-tag-error'
                            }`}>
                              {contact.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewContact(contact)}
                                className="bimco-btn-icon"
                                title="View Details"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openEditContactModal(contact)}
                                className="bimco-btn-icon"
                                title="Edit Contact"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveContact(contact.id)}
                                className="bimco-btn-icon bimco-btn-danger"
                                title="Remove Contact"
                              >
                                <TrashIcon className="w-4 h-4" />
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
            <div className="bimco-card">
              <div className="bimco-card-header">
                <h2>Fleet Management</h2>
                <p>Manage vessels associated with this company</p>
              </div>

              {/* Fleet Search and Filters */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      placeholder="Search vessels by name, registration, or IHS number..."
                      value={fleetSearchTerm}
                      onChange={(e) => setFleetSearchTerm(e.target.value)}
                      className="bimco-input w-full"
                    />
                  </div>
                  <button 
                    onClick={openAddFleetModal}
                    className="bimco-btn-primary"
                  >
                    Add Vessel
                  </button>
                </div>
              </div>

              {/* Fleet Table */}
              {filteredFleets.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="bimco-table">
                    <thead>
                      <tr>
                        <th>Vessel Name</th>
                        <th>Registration</th>
                        <th>IHS Number</th>
                        <th>Deadweight</th>
                        <th>Gross Tonnage</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFleets.map((fleet) => (
                        <tr key={fleet.id}>
                          <td className="font-medium">{fleet.name}</td>
                          <td>{fleet.registration}</td>
                          <td>{fleet.ihsNumber || '-'}</td>
                          <td>{fleet.deadweight?.toLocaleString() || '-'}</td>
                          <td>{fleet.grossTonnage?.toLocaleString() || '-'}</td>
                          <td>
                            <span className="bimco-tag">{fleet.type}</span>
                          </td>
                          <td>
                            <span className={`bimco-tag ${
                              fleet.operationalStatus === 'Active' ? 'bimco-tag-success' :
                              fleet.operationalStatus === 'Inactive' ? 'bimco-tag-error' :
                              fleet.operationalStatus === 'Maintenance' ? 'bimco-tag-warning' :
                              'bimco-tag-secondary'
                            }`}>
                              {fleet.operationalStatus}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewFleet(fleet)}
                                className="bimco-btn-icon"
                                title="View Details"
                              >
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEditFleet(fleet)}
                                className="bimco-btn-icon"
                                title="Edit Fleet"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveFleet(fleet.id)}
                                className="bimco-btn-icon bimco-btn-danger"
                                title="Remove Fleet"
                              >
                                <TrashIcon className="w-4 h-4" />
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
                  <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No vessels</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {fleetSearchTerm ? 'No vessels found matching your search.' : 'No vessels have been registered for this company yet.'}
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={openAddFleetModal}
                      className="bimco-btn-primary"
                    >
                      Add Vessel
                    </button>
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
      </div>
    </Layout>
  );
}
