'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CompanyModal from '@/components/CompanyModal';
import { mockCompanies } from '@/data/mockData';
import { Company } from '@/types';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon,
} from '@heroicons/react/24/solid';

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Company>('registrationNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  // Favorites state
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('bimco-crm-favorites');
      if (storedFavorites) {
        const favoritesData = JSON.parse(storedFavorites);
        const companyIds = new Set<string>(
          (favoritesData.companies || []).map((c: { id: string }) => String(c.id))
        );
        setFavorites(companyIds);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Toggle favorite status
  const toggleFavorite = (company: Company) => {
    const isCurrentlyFavorite = favorites.has(company.id);
    const newFavorites = new Set(favorites);
    
    if (isCurrentlyFavorite) {
      // Remove from favorites
      newFavorites.delete(company.id);
    } else {
      // Add to favorites
      newFavorites.add(company.id);
    }
    
    setFavorites(newFavorites);
    
    // Update localStorage
    try {
      const storedFavorites = localStorage.getItem('bimco-crm-favorites');
      const favoritesData = storedFavorites ? JSON.parse(storedFavorites) : { companies: [], contacts: [] };
      
      if (isCurrentlyFavorite) {
        // Remove from stored favorites
        favoritesData.companies = favoritesData.companies.filter((c: { id: string }) => c.id !== company.id);
      } else {
        // Add to stored favorites
        const favoriteCompany = {
          id: company.id,
          name: company.name,
          type: company.type,
          accessCount: 1,
          addedAt: new Date().toISOString(),
          lastAccessed: new Date().toISOString()
        };
        
        // Remove if already exists to avoid duplicates
        favoritesData.companies = favoritesData.companies.filter((c: { id: string }) => c.id !== company.id);
        favoritesData.companies.push(favoriteCompany);
      }
      
      localStorage.setItem('bimco-crm-favorites', JSON.stringify(favoritesData));
      
      // Dispatch event for dashboard to update
      window.dispatchEvent(new CustomEvent('favoritesChanged'));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  // Filter companies based on search and status
  const filteredCompanies = companies
    .filter((company) => {
      const matchesSearch = 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.address.country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
      
      return matchesSearch && matchesStatus;
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

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const uniqueStatuses = Array.from(new Set(companies.map(c => c.status)));

  // Modal handlers
  const openAddModal = () => {
    setSelectedCompany(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (company: Company) => {
    setSelectedCompany(company);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(undefined);
  };

  const handleSaveCompany = (company: Company) => {
    if (modalMode === 'add') {
      setCompanies(prev => [...prev, company]);
    } else {
      setCompanies(prev => prev.map(c => c.id === company.id ? company : c));
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Companies
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and view all company records in the BIMCO CRM system.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button 
              onClick={openAddModal}
              className="bimco-btn-primary flex items-center"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Company
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bimco-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search companies..."
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
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <div className="text-sm text-gray-500 flex items-center">
              Showing {filteredCompanies.length} of {companies.length} companies
            </div>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bimco-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="bimco-table">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-12">
                    Favorite
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('registrationNumber')}
                  >
                    Registration Number
                    {sortField === 'registrationNumber' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    scope="col" 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    Company Name
                    {sortField === 'name' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">Type</th>
                  <th scope="col">Country</th>
                  <th scope="col">Employees</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="text-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(company);
                        }}
                        className={`p-1 rounded-full transition-colors ${
                          favorites.has(company.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-300 hover:text-red-400'
                        }`}
                        title={favorites.has(company.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <HeartIcon className="h-5 w-5" />
                      </button>
                    </td>
                    <td className="font-medium text-blue-600">
                      <Link href={`/companies/${company.id}`}>
                        {company.registrationNumber}
                      </Link>
                    </td>
                    <td className="font-medium text-gray-900">{company.name}</td>
                    <td>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        company.status === 'M1' ? 'bg-green-100 text-green-800' :
                        company.status === 'M0' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="text-gray-500">{company.type}</td>
                    <td className="text-gray-500">{company.address.country}</td>
                    <td className="text-gray-500">{company.numberOfEmployees}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Link href={`/companies/${company.id}`}>
                          <button className="text-blue-600 hover:text-blue-900" title="View">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => openEditModal(company)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit"
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
          
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No companies found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="flex justify-end space-x-3">
          <button className="bimco-btn-secondary">Export CSV</button>
          <button className="bimco-btn-secondary">Export Excel</button>
        </div>
        
        {/* Company Modal */}
        <CompanyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveCompany}
          company={selectedCompany}
          mode={modalMode}
        />
      </div>
    </Layout>
  );
}
