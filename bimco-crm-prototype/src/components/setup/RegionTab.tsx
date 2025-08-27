'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Eye, 
  Trash2,
  Download,
  Filter,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { getActiveCountries } from '@/data/countries';

interface Region {
  id: string;
  regionCode: string;
  regionName: string;
  assignedCountries: string[];
  countryNames: string[];
  status: 'Active' | 'Inactive';
  lastModified: string;
  modifiedBy: string;
  createdDate: string;
}

interface Country {
  code: string;
  name: string;
}

interface RegionTabProps {
  userRole: 'Admin' | 'Manager' | 'Staff';
}

const RegionTab: React.FC<RegionTabProps> = ({ userRole }) => {
  // Use countries from the shared data source
  const availableCountries: Country[] = getActiveCountries().map(c => ({
    code: c.countryCode,
    name: c.countryName
  }));

  const [regions, setRegions] = useState<Region[]>([
    {
      id: '1',
      regionCode: 'NORDIC',
      regionName: 'Nordic Countries',
      assignedCountries: ['DK', 'NO', 'SE'],
      countryNames: ['Denmark', 'Norway', 'Sweden'],
      status: 'Active',
      lastModified: '2025-08-15',
      modifiedBy: 'John Admin',
      createdDate: '2025-01-15'
    },
    {
      id: '2',
      regionCode: 'WESTERN_EU',
      regionName: 'Western Europe',
      assignedCountries: ['DE', 'FR', 'NL', 'BE'],
      countryNames: ['Germany', 'France', 'Netherlands', 'Belgium'],
      status: 'Active',
      lastModified: '2025-08-10',
      modifiedBy: 'Jane Manager',
      createdDate: '2025-01-20'
    },
    {
      id: '3',
      regionCode: 'SOUTHERN_EU',
      regionName: 'Southern Europe',
      assignedCountries: ['ES', 'IT'],
      countryNames: ['Spain', 'Italy'],
      status: 'Inactive',
      lastModified: '2025-07-20',
      modifiedBy: 'Bob Staff',
      createdDate: '2025-02-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [viewingRegion, setViewingRegion] = useState<Region | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Region>('regionCode');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [formData, setFormData] = useState({
    regionCode: '',
    regionName: '',
    assignedCountries: [] as string[],
    status: 'Active' as 'Active' | 'Inactive'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Filter and sort regions
  const filteredRegions = regions
    .filter(region => {
      const matchesSearch = region.regionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           region.regionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           region.countryNames.some(country => 
                             country.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      const matchesStatus = statusFilter === 'All' || region.status === statusFilter;
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

  const handleSort = (column: keyof Region) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleView = (region: Region) => {
    setViewingRegion(region);
    setIsViewModalOpen(true);
  };

  const handleEdit = (region: Region) => {
    setEditingRegion(region);
    setFormData({
      regionCode: region.regionCode,
      regionName: region.regionName,
      assignedCountries: region.assignedCountries,
      status: region.status
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingRegion(null);
    setFormData({
      regionCode: '',
      regionName: '',
      assignedCountries: [],
      status: 'Active'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.regionCode.trim()) {
      errors.regionCode = 'Region code is required';
    } else if (!editingRegion && regions.some(r => r.regionCode === formData.regionCode)) {
      errors.regionCode = 'Region code already exists';
    }
    
    if (!formData.regionName.trim()) {
      errors.regionName = 'Region name is required';
    }

    if (formData.assignedCountries.length === 0) {
      errors.assignedCountries = 'At least one country must be assigned';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const countryNames = formData.assignedCountries.map(code => 
      availableCountries.find(c => c.code === code)?.name || code
    );

    if (editingRegion) {
      // Update existing region
      setRegions(regions.map(region => 
        region.id === editingRegion.id 
          ? { 
              ...region, 
              ...formData,
              countryNames,
              lastModified: new Date().toISOString().split('T')[0],
              modifiedBy: 'Current User'
            }
          : region
      ));
    } else {
      // Create new region
      const newRegion: Region = {
        id: (regions.length + 1).toString(),
        ...formData,
        countryNames,
        lastModified: new Date().toISOString().split('T')[0],
        modifiedBy: 'Current User',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setRegions([...regions, newRegion]);
    }

    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleDeactivate = async (region: Region) => {
    if (!window.confirm(`Are you sure you want to deactivate ${region.regionName}?`)) {
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setRegions(regions.map(r => 
      r.id === region.id 
        ? { 
            ...r, 
            status: 'Inactive',
            lastModified: new Date().toISOString().split('T')[0],
            modifiedBy: 'Current User'
          }
        : r
    ));

    setIsLoading(false);
  };

  const handleExport = () => {
    const csvContent = [
      ['Region Code', 'Region Name', 'Countries', 'Status', 'Last Modified', 'Modified By'],
      ...filteredRegions.map(region => [
        region.regionCode,
        region.regionName,
        region.countryNames.join('; '),
        region.status,
        region.lastModified,
        region.modifiedBy
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'regions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCountryToggle = (countryCode: string) => {
    const currentCountries = formData.assignedCountries;
    const updatedCountries = currentCountries.includes(countryCode)
      ? currentCountries.filter(code => code !== countryCode)
      : [...currentCountries, countryCode];
    
    setFormData({ ...formData, assignedCountries: updatedCountries });
  };

  const SortIcon = ({ column }: { column: keyof Region }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Regions</h2>
          <p className="text-sm text-gray-600">
            Manage regional groupings of countries used for reporting, segmentation, and company assignments
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
              Add Region
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
            placeholder="Search regions or countries..."
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
      <div className="bg-white shadow rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {filteredRegions.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No regions found. Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('regionCode')}
                >
                  Region Code <SortIcon column="regionCode" />
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('regionName')}
                >
                  Region Name <SortIcon column="regionName" />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Countries Assigned
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
              {filteredRegions.map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {region.regionCode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {region.regionName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {region.countryNames.slice(0, 3).map((country, index) => (
                        <span 
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {country}
                        </span>
                      ))}
                      {region.countryNames.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{region.countryNames.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      region.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {region.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.modifiedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(region)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canEdit && (
                        <button
                          onClick={() => handleEdit(region)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit region"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {canDeactivate && region.status === 'Active' && (
                        <button
                          onClick={() => handleDeactivate(region)}
                          className="text-red-600 hover:text-red-900"
                          title="Deactivate region"
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
          <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingRegion ? 'Edit Region' : 'Add New Region'}
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Region Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.regionCode}
                      onChange={(e) => setFormData({ ...formData, regionCode: e.target.value.toUpperCase() })}
                      className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                        formErrors.regionCode ? 'border-red-300' : 'border-gray-300'
                      } focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="e.g., NORDIC, WESTERN_EU"
                      disabled={!!editingRegion}
                    />
                    {formErrors.regionCode && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.regionCode}</p>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Region Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.regionName}
                    onChange={(e) => setFormData({ ...formData, regionName: e.target.value })}
                    className={`mt-1 block w-full border rounded-md px-3 py-2 ${
                      formErrors.regionName ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="e.g., Nordic Countries, Western Europe"
                  />
                  {formErrors.regionName && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.regionName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Assigned Countries <span className="text-red-500">*</span>
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (Select at least one country)
                    </span>
                  </label>
                  <div className="border border-gray-300 rounded-md p-4 max-h-40 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {availableCountries.map((country) => (
                        <label key={country.code} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.assignedCountries.includes(country.code)}
                            onChange={() => handleCountryToggle(country.code)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-900">
                            {country.code} - {country.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {formErrors.assignedCountries && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.assignedCountries}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {formData.assignedCountries.length} countries
                  </p>
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
                      {editingRegion ? 'Update' : 'Create'}
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
      {isViewModalOpen && viewingRegion && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Region Details</h3>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Region Code</label>
                    <p className="mt-1 text-sm text-gray-900">{viewingRegion.regionCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      viewingRegion.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewingRegion.status}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Region Name</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingRegion.regionName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assigned Countries ({viewingRegion.countryNames.length})
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {viewingRegion.countryNames.map((country, index) => (
                      <span 
                        key={index}
                        className="inline-flex px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                      >
                        {viewingRegion.assignedCountries[index]} - {country}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created Date</label>
                    <p className="mt-1 text-sm text-gray-900">{viewingRegion.createdDate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Modified</label>
                    <p className="mt-1 text-sm text-gray-900">{viewingRegion.lastModified}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Modified By</label>
                  <p className="mt-1 text-sm text-gray-900">{viewingRegion.modifiedBy}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionTab;
