'use client';

import { useState } from 'react';
import { SearchFilters, PowerSearchQuery, UserPermissions } from '@/types';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

interface PowerSearchPanelProps {
  onSearch: (query: PowerSearchQuery) => void;
  userPermissions: UserPermissions;
  isLoading?: boolean;
  initialQuery?: string;
  initialFilters?: SearchFilters;
}

export default function PowerSearchPanel({
  onSearch,
  userPermissions,
  isLoading = false,
  initialQuery = '',
  initialFilters = {}
}: PowerSearchPanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [sorting, setSorting] = useState<{ field: string; direction: 'asc' | 'desc' }>({ field: 'relevance', direction: 'desc' });

  const handleSearch = () => {
    const searchQuery: PowerSearchQuery = {
      query: query.trim(),
      filters,
      sorting,
      pagination: { page: 1, limit: 50 }
    };
    
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    return value !== undefined && value !== null && value !== '';
  }).length;

  // Entity types based on permissions
  const entityTypes = [
    { value: 'company', label: 'Companies', available: userPermissions.canViewAllCompanies },
    { value: 'contact', label: 'Contacts', available: userPermissions.canViewAllContacts },
    { value: 'fleet', label: 'Fleets', available: userPermissions.canViewAllFleets },
    { value: 'course', label: 'Courses', available: userPermissions.canViewAllCourses }
  ].filter(type => type.available);

  const companyStatuses = ['Active', 'Inactive', 'Prospect', 'M1', 'M2'];
  const contactStatuses = ['Active', 'Inactive'];
  const companyTypes = ['Member', 'Non-member', 'Supplier', 'Partner'];
  const countries = ['Denmark', 'Norway', 'Germany', 'Singapore', 'United Kingdom', 'Greece', 'Netherlands'];
  const classifications = ['BI-ADM', 'BI-ASIA', 'BI-BD', 'BI-BS', 'BI-EUR', 'BI-AM', 'BI-AF', 'BI-MED', 'BI-TECH', 'BI-LEG'];
  const courseCategories = ['Maritime Training', 'Legal Training', 'Technical Training', 'Management Training'];
  const vesselTypes = ['Container Ship', 'Bulk Carrier', 'Tanker', 'General Cargo', 'Ro-Ro'];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Main Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="Search companies, contacts, courses, fleets..."
            />
          </div>
          
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Searching...
              </div>
            ) : (
              'Search'
            )}
          </button>
          
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-4 py-3 border rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center ${
              showAdvancedFilters 
                ? 'bg-blue-50 border-blue-200 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                {activeFilterCount}
              </span>
            )}
            {showAdvancedFilters ? (
              <ChevronUpIcon className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="space-y-6">
            {/* Entity Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Search In
              </label>
              <div className="flex flex-wrap gap-2">
                {entityTypes.map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.entityTypes?.includes(type.value) || false}
                      onChange={(e) => {
                        const current = filters.entityTypes || [];
                        if (e.target.checked) {
                          updateFilter('entityTypes', [...current, type.value]);
                        } else {
                          updateFilter('entityTypes', current.filter(t => t !== type.value));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Status Filter */}
              {(filters.entityTypes?.includes('company') || filters.entityTypes?.includes('contact')) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    multiple
                    value={filters.status || []}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      updateFilter('status', values);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    size={4}
                  >
                    {(filters.entityTypes?.includes('company') ? companyStatuses : contactStatuses).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Company Type Filter */}
              {filters.entityTypes?.includes('company') && userPermissions.canViewAllCompanies && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Type
                  </label>
                  <select
                    multiple
                    value={filters.companyTypes || []}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      updateFilter('companyTypes', values);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    size={4}
                  >
                    {companyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Countries Filter */}
              {(filters.entityTypes?.includes('company') || filters.entityTypes?.includes('course')) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Countries
                  </label>
                  <select
                    multiple
                    value={filters.countries || []}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      updateFilter('countries', values);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    size={4}
                  >
                    {(userPermissions.allowedCountries || countries).map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Contact Classifications */}
              {filters.entityTypes?.includes('contact') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Classifications
                  </label>
                  <select
                    multiple
                    value={filters.classifications || []}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      updateFilter('classifications', values);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    size={4}
                  >
                    {classifications.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Course Categories */}
              {filters.entityTypes?.includes('course') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Categories
                  </label>
                  <select
                    multiple
                    value={filters.categories || []}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      updateFilter('categories', values);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    size={4}
                  >
                    {courseCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Vessel Types */}
              {filters.entityTypes?.includes('fleet') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vessel Types
                  </label>
                  <select
                    multiple
                    value={filters.vesselTypes || []}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value);
                      updateFilter('vesselTypes', values);
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    size={4}
                  >
                    {vesselTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="space-y-2">
                  <input
                    type="date"
                    value={filters.dateRange?.start || ''}
                    onChange={(e) => updateFilter('dateRange', { 
                      ...filters.dateRange, 
                      start: e.target.value 
                    })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Start date"
                  />
                  <input
                    type="date"
                    value={filters.dateRange?.end || ''}
                    onChange={(e) => updateFilter('dateRange', { 
                      ...filters.dateRange, 
                      end: e.target.value 
                    })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="End date"
                  />
                </div>
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <div className="flex space-x-4">
                <select
                  value={sorting.field}
                  onChange={(e) => setSorting(prev => ({ ...prev, field: e.target.value }))}
                  className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name">Name</option>
                  <option value="dateCreated">Date Created</option>
                  <option value="lastUpdated">Last Updated</option>
                </select>
                
                <select
                  value={sorting.direction}
                  onChange={(e) => setSorting(prev => ({ ...prev, direction: e.target.value as 'asc' | 'desc' }))}
                  className="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear All Filters
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
