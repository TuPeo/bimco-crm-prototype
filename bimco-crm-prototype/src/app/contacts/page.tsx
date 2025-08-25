'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ContactModal from '@/components/ContactModal';
import BulkContactOperations from '@/components/BulkContactOperations';
import { mockContacts } from '@/data/mockData';
import { Contact } from '@/types';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon,
} from '@heroicons/react/24/solid';

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [orphanedFilter, setOrphanedFilter] = useState(false);
  const [classificationFilter, setClassificationFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Contact>('contactNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Bulk operations state
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('bimco-crm-favorites');
      if (storedFavorites) {
        const favoritesData = JSON.parse(storedFavorites);
        const contactIds = new Set<string>(
          (favoritesData.contacts || []).map((c: { id: string }) => String(c.id))
        );
        setFavorites(contactIds);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Toggle favorite status
  const toggleFavorite = (contact: Contact) => {
    const isCurrentlyFavorite = favorites.has(contact.id);
    const newFavorites = new Set(favorites);
    
    if (isCurrentlyFavorite) {
      // Remove from favorites
      newFavorites.delete(contact.id);
    } else {
      // Add to favorites
      newFavorites.add(contact.id);
    }
    
    setFavorites(newFavorites);
    
    // Update localStorage
    try {
      const storedFavorites = localStorage.getItem('bimco-crm-favorites');
      const favoritesData = storedFavorites ? JSON.parse(storedFavorites) : { companies: [], contacts: [] };
      
      if (isCurrentlyFavorite) {
        // Remove from stored favorites
        favoritesData.contacts = favoritesData.contacts.filter((c: { id: string }) => c.id !== contact.id);
      } else {
        // Add to stored favorites
        const favoriteContact = {
          id: contact.id,
          name: `${contact.firstName} ${contact.lastName}`,
          company: contact.companyName,
          role: contact.role || 'N/A',
          accessCount: 1,
          addedAt: new Date().toISOString(),
          lastAccessed: 'Just now'
        };
        
        // Remove if already exists to avoid duplicates
        favoritesData.contacts = favoritesData.contacts.filter((c: { id: string }) => c.id !== contact.id);
        favoritesData.contacts.push(favoriteContact);
      }
      
      localStorage.setItem('bimco-crm-favorites', JSON.stringify(favoritesData));
      
      // Dispatch event for dashboard to update
      window.dispatchEvent(new CustomEvent('favoritesChanged'));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  // Get unique companies and classifications for filters
  const uniqueCompanies = Array.from(new Set(contacts.map(c => c.companyName).filter(Boolean)));
  const uniqueClassifications = Array.from(
    new Set(contacts.flatMap(c => c.classifications.map(cls => cls.code)))
  );

  // Filter contacts based on search and filters
  const filteredContacts = contacts
    .filter((contact) => {
      const matchesSearch = 
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contactNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.role && contact.role.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      const matchesCompany = companyFilter === 'all' || contact.companyName === companyFilter;
      const matchesOrphaned = !orphanedFilter || (!contact.companyId || !contact.companyName);
      const matchesClassification = classificationFilter === 'all' || 
        contact.classifications.some(cls => cls.code === classificationFilter);
      
      return matchesSearch && matchesStatus && matchesCompany && matchesOrphaned && matchesClassification;
    })
    .sort((a, b) => {
      const aValue = a[sortField] as string;
      const bValue = b[sortField] as string;
      
      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

  const handleSort = (field: keyof Contact) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Modal handlers
  const openAddModal = () => {
    setModalMode('add');
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contact: Contact) => {
    setModalMode('edit');
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleSaveContact = (contactData: Omit<Contact, 'id'> | Contact) => {
    if (modalMode === 'add') {
      const newContact: Contact = {
        ...contactData as Omit<Contact, 'id'>,
        id: `contact-${Date.now()}`,
        communicationHistory: [],
      };
      setContacts(prev => [newContact, ...prev]);
    } else if (modalMode === 'edit' && 'id' in contactData) {
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactData.id ? contactData as Contact : contact
        )
      );
    }
  };

  // Bulk operations handlers
  const handleBulkUpdate = (contactIds: string[], updateData: Partial<Contact>) => {
    setContacts(prev => 
      prev.map(contact => 
        contactIds.includes(contact.id) 
          ? { ...contact, ...updateData, lastUpdated: new Date().toISOString().split('T')[0] }
          : contact
      )
    );
    setSelectedContactIds([]);
  };

  const handleBulkDelete = (contactIds: string[]) => {
    setContacts(prev => prev.filter(contact => !contactIds.includes(contact.id)));
    setSelectedContactIds([]);
  };

  const handleImport = (importedContacts: Contact[]) => {
    setContacts(prev => [...importedContacts, ...prev]);
  };

  const handleExport = (contactsToExport: Contact[]) => {
    // Create CSV content
    const headers = [
      'Contact Number', 'First Name', 'Last Name', 'Email', 'Phone', 
      'Role', 'Company', 'Status', 'Classifications', 'Date Created', 'Last Updated'
    ];
    
    const csvContent = [
      headers.join(','),
      ...contactsToExport.map(contact => [
        contact.contactNumber,
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phone || '',
        contact.role || '',
        contact.companyName,
        contact.status,
        contact.classifications.map(c => c.code).join(';'),
        contact.dateCreated,
        contact.lastUpdated
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Get count of orphaned contacts
  const orphanedCount = contacts.filter(c => !c.companyId || !c.companyName).length;

  const getSortIcon = (field: keyof Contact) => {
    if (sortField !== field) {
      return <ChevronUpDownIcon className="w-4 h-4 ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUpIcon className="w-4 h-4 ml-1 text-blue-600" />
      : <ChevronDownIcon className="w-4 h-4 ml-1 text-blue-600" />;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Contacts
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and view all contact records in the BIMCO CRM system.
              {orphanedCount > 0 && (
                <span className="text-amber-600 font-medium ml-2">
                  ({orphanedCount} orphaned contacts)
                </span>
              )}
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button 
              onClick={openAddModal}
              className="bimco-btn-primary flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bimco-card">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="relative lg:col-span-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <option value="all">All Companies</option>
              {uniqueCompanies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>

            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={classificationFilter}
              onChange={(e) => setClassificationFilter(e.target.value)}
            >
              <option value="all">All Classifications</option>
              {uniqueClassifications.map((classification) => (
                <option key={classification} value={classification}>{classification}</option>
              ))}
            </select>

            <div className="flex items-center">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={orphanedFilter}
                  onChange={(e) => setOrphanedFilter(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                />
                Orphaned Only ({orphanedCount})
              </label>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
            <span>Showing {filteredContacts.length} of {contacts.length} contacts</span>
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-4 w-4" />
              <span>Filters active: {[
                searchTerm && 'search',
                statusFilter !== 'all' && 'status', 
                companyFilter !== 'all' && 'company',
                classificationFilter !== 'all' && 'classification',
                orphanedFilter && 'orphaned'
              ].filter(Boolean).length}</span>
            </div>
          </div>
        </div>

        {/* Bulk Operations */}
        <BulkContactOperations
          contacts={filteredContacts}
          selectedContactIds={selectedContactIds}
          onSelectionChange={setSelectedContactIds}
          onBulkUpdate={handleBulkUpdate}
          onBulkDelete={handleBulkDelete}
          onImport={handleImport}
          onExport={handleExport}
        />

        {/* Contacts Table */}
        <div className="bimco-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="bimco-table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedContactIds.length === filteredContacts.length && filteredContacts.length > 0}
                      ref={(el) => {
                        if (el) el.indeterminate = selectedContactIds.length > 0 && selectedContactIds.length < filteredContacts.length;
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedContactIds(filteredContacts.map(c => c.id));
                        } else {
                          setSelectedContactIds([]);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th scope="col" className="w-12">
                    Favorite
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('contactNumber')}
                  >
                    <div className="flex items-center">
                      Contact Number
                      {getSortIcon('contactNumber')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('firstName')}
                  >
                    <div className="flex items-center">
                      Name
                      {getSortIcon('firstName')}
                    </div>
                  </th>
                  <th scope="col">Classifications</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th 
                    scope="col" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('companyName')}
                  >
                    <div className="flex items-center">
                      Company
                      {getSortIcon('companyName')}
                    </div>
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">Communication</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedContactIds.includes(contact.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContactIds(prev => [...prev, contact.id]);
                          } else {
                            setSelectedContactIds(prev => prev.filter(id => id !== contact.id));
                          }
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="text-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(contact);
                        }}
                        className={`p-1 rounded-full transition-colors ${
                          favorites.has(contact.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-300 hover:text-red-400'
                        }`}
                        title={favorites.has(contact.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <HeartIcon className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="font-medium text-blue-600">
                      <Link href={`/contacts/${contact.id}`}>
                        {contact.contactNumber}
                      </Link>
                      {(!contact.companyId || !contact.companyName) && (
                        <div className="text-xs text-amber-600 font-medium">ORPHANED</div>
                      )}
                    </td>
                    <td className="font-medium text-gray-900">
                      {contact.firstName} {contact.lastName}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {contact.classifications.map((classification, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            title={classification.description}
                          >
                            {classification.code}
                          </span>
                        ))}
                        {contact.classifications.length === 0 && (
                          <span className="text-gray-400 text-xs">None</span>
                        )}
                      </div>
                    </td>
                    <td className="text-gray-500">{contact.role || 'N/A'}</td>
                    <td>
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-500 text-sm">
                        {contact.email}
                      </a>
                    </td>
                    <td className="text-gray-500">{contact.phone || 'N/A'}</td>
                    <td className="text-gray-500">
                      {contact.companyName ? (
                        <Link href={`/companies/${contact.companyId}`} className="text-blue-600 hover:text-blue-500">
                          {contact.companyName}
                        </Link>
                      ) : (
                        <span className="text-amber-600 font-medium">No Company</span>
                      )}
                    </td>
                    <td>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        contact.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        (contact.communicationHistory?.length || 0) > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {contact.communicationHistory?.length || 0} records
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Link href={`/contacts/${contact.id}`}>
                          <button className="text-blue-600 hover:text-blue-900" title="View Details">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => openEditModal(contact)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit Contact"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No contacts found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveContact}
        contact={selectedContact}
        mode={modalMode}
      />
    </Layout>
  );
}
