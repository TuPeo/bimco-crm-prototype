'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Eye, 
  Trash2, 
  RotateCcw,
  Download,
  Filter,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { masterCountries, getAllCountries, Country as CountryData } from '@/data/countries';

interface Country {
  id: string;
  countryCode: string;
  countryName: string;
  status: 'Active' | 'Inactive';
  lastModified: string;
  modifiedBy: string;
  createdDate: string;
}

interface CountryTabProps {
  userRole: 'Admin' | 'Manager' | 'Staff';
}

const CountryTab: React.FC<CountryTabProps> = ({ userRole }) => {
  const [countries, setCountries] = useState<Country[]>(getAllCountries());

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [viewingCountry, setViewingCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Country>('countryCode');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState({
    countryCode: '',
    countryName: '',
    status: 'Active' as 'Active' | 'Inactive'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filter and sort countries
  const filteredCountries = countries
    .filter(country => {
      const matchesSearch = country.countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           country.countryCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || country.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      const direction = sortDirection === 'asc' ? 1 : -1;
      return aVal < bVal ? -direction : aVal > bVal ? direction : 0;
    });

  // Permission checks
  const canEdit = userRole === 'Admin' || userRole === 'Manager';
  const canDeactivate = userRole === 'Admin';

  const handleSort = (column: keyof Country) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleView = (country: Country) => {
    setViewingCountry(country);
    setIsViewModalOpen(true);
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
    setFormData({
      countryCode: country.countryCode,
      countryName: country.countryName,
      status: country.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingCountry(null);
    setFormData({
      countryCode: '',
      countryName: '',
      status: 'Active'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.countryCode.trim()) {
      errors.countryCode = 'Country code is required';
    } else if (formData.countryCode.length !== 2) {
      errors.countryCode = 'Country code must be 2 characters (ISO format)';
    } else if (!editingCountry && countries.some(c => c.countryCode === formData.countryCode)) {
      errors.countryCode = 'Country code already exists';
    }
    
    if (!formData.countryName.trim()) {
      errors.countryName = 'Country name is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editingCountry) {
      // Update existing country
      setCountries(countries.map(country => 
        country.id === editingCountry.id 
          ? { 
              ...country, 
              ...formData,
              lastModified: new Date().toISOString().split('T')[0],
              modifiedBy: 'Current User'
            }
          : country
      ));
    } else {
      // Create new country
      const newCountry: Country = {
        id: (countries.length + 1).toString(),
        ...formData,
        lastModified: new Date().toISOString().split('T')[0],
        modifiedBy: 'Current User',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setCountries([...countries, newCountry]);
    }

    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleDeactivate = async (country: Country) => {
    if (!window.confirm(`Are you sure you want to deactivate ${country.countryName}?`)) {
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setCountries(countries.map(c => 
      c.id === country.id 
        ? { 
            ...c, 
            status: 'Inactive',
            lastModified: new Date().toISOString().split('T')[0],
            modifiedBy: 'Current User'
          }
        : c
    ));

    setIsLoading(false);
  };

  const handleExport = () => {
    const csvContent = [
      ['Country Code', 'Country Name', 'Status', 'Last Modified', 'Modified By'],
      ...filteredCountries.map(country => [
        country.countryCode,
        country.countryName,
        country.status,
        country.lastModified,
        country.modifiedBy
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'countries.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const SortIcon = ({ column }: { column: keyof Country }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Countries</h2>
          <p className="text-sm text-gray-600">
            Manage the list of countries that can be assigned to companies, contacts, fleets, and events
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          {canEdit && (
            <button
              onClick={handleCreate}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Country
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No countries found. Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('countryCode')}
                >
                  Country Code <SortIcon column="countryCode" />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('countryName')}
                >
                  Country Name <SortIcon column="countryName" />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('status')}
                >
                  Status <SortIcon column="status" />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('lastModified')}
                >
                  Last Modified <SortIcon column="lastModified" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modified By
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCountries.map((country) => (
                <tr key={country.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {country.countryCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {country.countryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      country.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {country.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {country.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {country.modifiedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(country)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canEdit && (
                        <button
                          onClick={() => handleEdit(country)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit country"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {canDeactivate && country.status === 'Active' && (
                        <button
                          onClick={() => handleDeactivate(country)}
                          className="text-red-600 hover:text-red-900"
                          title="Deactivate country"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingCountry ? 'Edit Country' : 'Add New Country'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={2}
                    value={formData.countryCode}
                    onChange={(e) => setFormData({ ...formData, countryCode: e.target.value.toUpperCase() })}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                      formErrors.countryCode ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g., DK, NO, SE"
                    disabled={!!editingCountry}
                  />
                  {formErrors.countryCode && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.countryCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.countryName}
                    onChange={(e) => setFormData({ ...formData, countryName: e.target.value })}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                      formErrors.countryName ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g., Denmark, Norway, Sweden"
                  />
                  {formErrors.countryName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.countryName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {editingCountry ? 'Update' : 'Create'}
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingCountry && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Country Details</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country Code</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingCountry.countryCode}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country Name</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingCountry.countryName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    viewingCountry.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {viewingCountry.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created Date</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingCountry.createdDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingCountry.lastModified}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Modified By</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingCountry.modifiedBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryTab;
