'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ContactModal from '@/components/ContactModal';
import { mockContacts } from '@/data/mockData';
import { Contact } from '@/types';
import { 
  PencilIcon,
  ArrowLeftIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function ContactDetail() {
  const params = useParams();
  const contactId = params?.id as string;
  
  const [activeTab, setActiveTab] = useState<'general' | 'classifications' | 'history'>('general');
  const [contactData, setContactData] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contact = contactData || mockContacts.find(c => c.id === contactId);

  // Modal handlers
  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveContact = (updatedContact: Omit<Contact, 'id'> | Contact) => {
    if ('id' in updatedContact) {
      setContactData(updatedContact as Contact);
    }
  };

  if (!contact) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Contact Not Found</h2>
          <p className="mt-2 text-gray-600">The requested contact could not be found.</p>
          <Link href="/contacts" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Contacts
          </Link>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'general', name: 'General Info', icon: UserIcon },
    { id: 'classifications', name: 'Classifications', icon: TagIcon },
    { id: 'history', name: 'History', icon: CalendarIcon },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/contacts" className="text-gray-400 hover:text-gray-600">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {contact.firstName} {contact.lastName}
              </h1>
              <p className="text-sm text-gray-600">Contact: {contact.contactNumber}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={openEditModal}
              className="bimco-btn-primary flex items-center"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit Contact
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center space-x-4">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
            contact.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            Status: {contact.status}
          </span>
          {contact.role && (
            <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
              Role: {contact.role}
            </span>
          )}
        </div>

        {/* Quick Contact Actions */}
        <div className="flex space-x-4">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <EnvelopeIcon className="h-4 w-4 mr-2" />
            Send Email
          </a>
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <PhoneIcon className="h-4 w-4 mr-2" />
              Call
            </a>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'general' | 'classifications' | 'history')}
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
                {tab.id === 'classifications' && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {contact.classifications.length}
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">{contact.contactNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">First Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{contact.firstName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{contact.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-500">
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  {contact.phone && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-500">
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {contact.role && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Role / Job Title</dt>
                      <dd className="mt-1 text-sm text-gray-900">{contact.role}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Association</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Primary Company</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <BuildingOfficeIcon className="h-4 w-4 mr-2 text-gray-400" />
                      <Link href={`/companies/${contact.companyId}`} className="text-blue-600 hover:text-blue-500">
                        {contact.companyName}
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date Created</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(contact.dateCreated).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd className="mt-1 text-sm text-gray-900 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(contact.lastUpdated).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'classifications' && (
            <div className="bimco-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Contact Classifications</h3>
                <button className="bimco-btn-primary text-sm">Add Classification</button>
              </div>
              
              {contact.classifications.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="bimco-table">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contact.classifications.map((classification, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="font-medium text-gray-900">{classification.code}</td>
                          <td className="text-gray-500">{classification.description}</td>
                          <td className="text-gray-500">{new Date(classification.date).toLocaleDateString()}</td>
                          <td>
                            <button className="text-red-600 hover:text-red-900 text-sm">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No classifications</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No classifications have been assigned to this contact yet.
                  </p>
                  <div className="mt-6">
                    <button className="bimco-btn-primary">Add Classification</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bimco-card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Activity History</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  <li>
                    <div className="relative pb-8">
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <UserIcon className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              Contact created with email <span className="font-medium text-gray-900">{contact.email}</span>
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time>{new Date(contact.dateCreated).toLocaleDateString()}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="relative pb-8">
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                            <TagIcon className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              Classifications assigned: {contact.classifications.map(c => c.code).join(', ')}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time>{new Date(contact.lastUpdated).toLocaleDateString()}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveContact}
        contact={contact}
        mode="edit"
      />
    </Layout>
  );
}
