'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CompanyModal from '@/components/CompanyModal';
import { mockCompanies } from '@/data/mockData';
import { getCountryName, getActiveCountries } from '@/data/countries';
import { Company } from '@/types';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon,
} from '@heroicons/react/24/solid';

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Company>('registrationNumber');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [sortFields, setSortFields] = useState<Array<{field: keyof Company, direction: 'asc' | 'desc'}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Get unique values for filters
  const uniqueStatuses = [...new Set(companies.map(c => c.status))];
  const uniqueTypes = [...new Set(companies.map(c => c.type))];
  // Get unique countries from setup data instead of companies data
  const availableCountries = getActiveCountries();
  const uniqueCountries = availableCountries.map(c => c.countryName);

  // Multi-field sorting function
  const sortCompanies = (companiesList: Company[]) => {
    if (sortFields.length === 0) {
      return [...companiesList].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          const result = aValue.localeCompare(bValue);
          return sortDirection === 'asc' ? result : -result;
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return [...companiesList].sort((a, b) => {
      for (const { field, direction } of sortFields) {
        const aValue = a[field];
        const bValue = b[field];
        
        let result = 0;
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          result = aValue.localeCompare(bValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          if (aValue < bValue) {
            result = -1;
          } else if (aValue > bValue) {
            result = 1;
          }
        }
        
        if (result !== 0) {
          return direction === 'asc' ? result : -result;
        }
      }
      return 0;
    });
  };

  // Filter and sort companies
  const filteredCompanies = sortCompanies(
    companies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
      const matchesType = typeFilter === 'all' || company.type === typeFilter;
      const matchesCountry = countryFilter === 'all' || getCountryName(company.address.countryCode) === countryFilter;
      
      return matchesSearch && matchesStatus && matchesType && matchesCountry;
    })
  );

  // Sorting handlers
  const handleSort = (field: keyof Company, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Multi-field sorting
      const existingIndex = sortFields.findIndex(s => s.field === field);
      if (existingIndex >= 0) {
        // Toggle direction or remove
        const currentDirection = sortFields[existingIndex].direction;
        if (currentDirection === 'asc') {
          setSortFields(prev => prev.map((s, i) => i === existingIndex ? {...s, direction: 'desc'} : s));
        } else {
          setSortFields(prev => prev.filter((_, i) => i !== existingIndex));
        }
      } else {
        // Add new sort field
        setSortFields(prev => [...prev, { field, direction: 'asc' }]);
      }
    } else {
      // Single field sorting
      setSortFields([]);
      if (sortField === field) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    }
  };

  const getSortIcon = (field: keyof Company) => {
    // Check multi-sort first
    const multiSort = sortFields.find(s => s.field === field);
    if (multiSort) {
      return multiSort.direction === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />;
    }
    
    // Check single sort
    if (sortField === field && sortFields.length === 0) {
      return sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />;
    }
    
    return null;
  };

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

  const handleSaveCompany = (companyData: Company) => {
    if (modalMode === 'add') {
      // Add new company
      setCompanies(prev => [...prev, companyData]);
    } else {
      // Update existing company
      setCompanies(prev => prev.map(c => c.id === companyData.id ? companyData : c));
    }
    closeModal();
  };

  // Favorites handlers
  const toggleFavorite = (companyId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(companyId)) {
      newFavorites.delete(companyId);
    } else {
      newFavorites.add(companyId);
    }
    setFavorites(newFavorites);
    
    // Save to localStorage
    try {
      const favoritesData = {
        companies: Array.from(newFavorites).map(id => ({ id }))
      };
      localStorage.setItem('bimco-crm-favorites', JSON.stringify(favoritesData));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Export functions
  const exportToCSV = () => {
    setIsLoading(true);
    
    const headers = ['Registration Number', 'Name', 'Status', 'Type', 'Country', 'Email', 'Employees', 'Date Created'];
    const csvData = filteredCompanies.map(company => [
      company.registrationNumber,
      company.name,
      company.status,
      company.type,
      getCountryName(company.address.countryCode),
      company.email,
      company.numberOfEmployees.toString(),
      company.dateCreated
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'companies.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  const exportToExcel = () => {
    setIsLoading(true);
    
    // Create a more Excel-friendly format
    const headers = ['Registration Number', 'Name', 'Status', 'Type', 'Address Line 1', 'Post Code', 'Country', 'Email', 'Employees', 'Date Created'];
    const csvData = filteredCompanies.map(company => [
      company.registrationNumber,
      company.name,
      company.status,
      company.type,
      company.address.line1,
      company.address.postCode,
      getCountryName(company.address.countryCode),
      company.email,
      company.numberOfEmployees.toString(),
      company.dateCreated
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'companies.xlsx');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Companies
            </h1>
            <p className="text-sm text-gray-600">
              Manage and view all companies in your BIMCO CRM
            </p>
          </div>
          <button 
            onClick={openAddModal}
            className="bimco-btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Company
          </button>
        </div>

        {/* Filters */}
        <div className="bimco-card">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bimco-input pl-10 w-full"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bimco-input"
            >
              <option value="all">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bimco-input"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Country Filter */}
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="bimco-input"
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            {/* Favorites Toggle */}
            <button 
              onClick={() => {
                if (statusFilter === 'favorites') {
                  setStatusFilter('all');
                } else {
                  setStatusFilter('favorites');
                }
              }}
              className={`flex items-center justify-center px-3 py-2 border rounded-md text-sm font-medium ${
                statusFilter === 'favorites' 
                  ? 'bg-red-50 border-red-300 text-red-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <HeartIcon className={`h-4 w-4 mr-2 ${statusFilter === 'favorites' ? 'text-red-500' : 'text-gray-400'}`} />
              Favorites
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredCompanies.length} of {companies.length} companies
            {sortFields.length > 0 && (
              <span className="ml-2 text-blue-600">
                (Multi-sort: {sortFields.map(s => `${s.field} ${s.direction}`).join(', ')})
              </span>
            )}
          </p>
          
          <div className="flex space-x-2">
            <button
              onClick={exportToCSV}
              className="bimco-btn-secondary text-sm"
              disabled={filteredCompanies.length === 0}
            >
              Export CSV
            </button>
            <button
              onClick={exportToExcel}
              className="bimco-btn-secondary text-sm"
              disabled={filteredCompanies.length === 0}
            >
              Export Excel
            </button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bimco-card overflow-hidden">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12">
              <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || countryFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters.'
                  : 'Get started by adding a new company.'}
              </p>
              {(!searchTerm && statusFilter === 'all' && typeFilter === 'all' && countryFilter === 'all') && (
                <div className="mt-6">
                  <button
                    onClick={openAddModal}
                    className="bimco-btn-primary"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Company
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="bimco-table">
                <thead>
                  <tr>
                    <th></th>
                    <th 
                      className="cursor-pointer hover:bg-gray-50 select-none"
                      onClick={(e) => handleSort('registrationNumber', e)}
                      title="Click to sort, Ctrl+Click for multi-sort"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Registration #</span>
                        {getSortIcon('registrationNumber')}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer hover:bg-gray-50 select-none"
                      onClick={(e) => handleSort('name', e)}
                      title="Click to sort, Ctrl+Click for multi-sort"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Company Name</span>
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer hover:bg-gray-50 select-none"
                      onClick={(e) => handleSort('status', e)}
                      title="Click to sort, Ctrl+Click for multi-sort"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        {getSortIcon('status')}
                      </div>
                    </th>
                    <th 
                      className="cursor-pointer hover:bg-gray-50 select-none"
                      onClick={(e) => handleSort('type', e)}
                      title="Click to sort, Ctrl+Click for multi-sort"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Type</span>
                        {getSortIcon('type')}
                      </div>
                    </th>
                    <th>Country</th>
                    <th 
                      className="cursor-pointer hover:bg-gray-50 select-none"
                      onClick={(e) => handleSort('dateCreated', e)}
                      title="Click to sort, Ctrl+Click for multi-sort"
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date Created</span>
                        {getSortIcon('dateCreated')}
                      </div>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50">
                      <td>
                        <button
                          onClick={() => toggleFavorite(company.id)}
                          className={`p-1 rounded ${favorites.has(company.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                        >
                          <HeartIcon className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="font-mono text-sm">{company.registrationNumber}</td>
                      <td>
                        <Link 
                          href={`/companies/${company.id}`}
                          className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                        >
                          {company.name}
                        </Link>
                        {company.name2 && (
                          <div className="text-sm text-gray-500">{company.name2}</div>
                        )}
                      </td>
                      <td>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          company.status === 'M1' ? 'bg-green-100 text-green-800' :
                          company.status === 'M0' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {company.status}
                        </span>
                      </td>
                      <td>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {company.type}
                        </span>
                      </td>
                      <td className="text-sm text-gray-900">
                        {getCountryName(company.address.countryCode)}
                      </td>
                      <td className="text-sm text-gray-500">
                        {new Date(company.dateCreated).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <Link
                            href={`/companies/${company.id}`}
                            className="bimco-btn-icon"
                            title="View Details"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => openEditModal(company)}
                            className="bimco-btn-icon"
                            title="Edit Company"
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
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-900">Exporting data...</span>
            </div>
          </div>
        )}
      </div>

      {/* Company Modal */}
      <CompanyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveCompany}
        company={selectedCompany}
        mode={modalMode}
      />
    </Layout>
  );
}
