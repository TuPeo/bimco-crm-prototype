'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ContactModal from '@/components/ContactModal';
import ContactClassificationManager from '@/components/ContactClassificationManager';
import CommunicationHistoryTracker from '@/components/CommunicationHistoryTracker';
import { mockContacts } from '@/data/mockData';
import { Contact, ContactClassification, CommunicationRecord } from '@/types';
import { 
  PencilIcon,
  ArrowLeftIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon
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

  // Classification handlers
  const handleUpdateClassifications = (classifications: ContactClassification[]) => {
    if (contact) {
      const updatedContact = {
        ...contact,
        classifications,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setContactData(updatedContact);
    }
  };

  // Communication history handlers
  const handleUpdateCommunicationHistory = (history: CommunicationRecord[]) => {
    if (contact) {
      const updatedContact = {
        ...contact,
        communicationHistory: history,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setContactData(updatedContact);
    }
  };

  const isOrphaned = !contact?.companyId || !contact?.companyName;

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
    { id: 'history', name: 'Communication History', icon: ChatBubbleLeftRightIcon },
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

        {/* Status Badges */}
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
          {isOrphaned && (
            <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-amber-100 text-amber-800">
              <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
              Orphaned Contact
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
                {tab.id === 'history' && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {contact.communicationHistory?.length || 0}
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
                    <dd className="mt-1 text-sm text-gray-900 font-mono">{contact.contactNumber}</dd>
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
                      {contact.companyName ? (
                        <Link href={`/companies/${contact.companyId}`} className="text-blue-600 hover:text-blue-500">
                          {contact.companyName}
                        </Link>
                      ) : (
                        <span className="text-amber-600 font-medium">No company assigned (Orphaned)</span>
                      )}
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

                {/* Quick Stats */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {contact.classifications.length}
                      </div>
                      <div className="text-xs text-gray-500">Classifications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {contact.communicationHistory?.length || 0}
                      </div>
                      <div className="text-xs text-gray-500">Communications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'classifications' && (
            <div className="bimco-card">
              <ContactClassificationManager
                classifications={contact.classifications}
                onUpdate={handleUpdateClassifications}
                readOnly={false}
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bimco-card">
              <CommunicationHistoryTracker
                contactId={contact.id}
                contactName={`${contact.firstName} ${contact.lastName}`}
                history={contact.communicationHistory || []}
                onUpdate={handleUpdateCommunicationHistory}
                readOnly={false}
              />
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
