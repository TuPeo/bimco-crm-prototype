'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CompanyModal from '@/components/CompanyModal';
import { mockCompanies, mockContacts } from '@/data/mockData';
import { Company, Contact } from '@/types';
import { 
  PencilIcon,
  ArrowLeftIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  EnvelopeIcon,
  UsersIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function CompanyDetail() {
  const params = useParams();
  const companyId = params?.id as string;
  
  const [activeTab, setActiveTab] = useState<'general' | 'address' | 'contacts'>('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState(mockCompanies.find(c => c.id === companyId));

  const companyContacts = mockContacts.filter(c => c.companyId === companyId);

  // Modal handlers
  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCompany = (updatedCompany: Company) => {
    setCompany(updatedCompany);
    // In a real app, you would also update the global state or make an API call
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
    { id: 'contacts', name: 'Associated Contacts', icon: UsersIcon },
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
                onClick={() => setActiveTab(tab.id as 'general' | 'address' | 'contacts')}
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
                <h3 className="text-lg font-medium text-gray-900">Associated Contacts</h3>
                <button className="bimco-btn-primary text-sm">Add Contact</button>
              </div>
              
              {companyContacts.length > 0 ? (
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
                      {companyContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="font-medium text-blue-600">
                            <Link href={`/contacts/${contact.id}`}>
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
                            <Link href={`/contacts/${contact.id}`}>
                              <button className="text-blue-600 hover:text-blue-900 text-sm">View</button>
                            </Link>
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
                    No contacts have been added to this company yet.
                  </p>
                  <div className="mt-6">
                    <button className="bimco-btn-primary">Add Contact</button>
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
      </div>
    </Layout>
  );
}
