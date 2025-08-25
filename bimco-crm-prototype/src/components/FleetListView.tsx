'use client';

import { useState } from 'react';
import { Fleet } from '../types';
import VesselComparisonTool from './VesselComparisonTool';
import Link from 'next/link';
import {
  TruckIcon,
  EyeIcon,
  ScaleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  ArrowsUpDownIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface FleetListViewProps {
  fleets: Fleet[];
  onFleetSelect?: (fleet: Fleet) => void;
  onScheduleMaintenance?: (fleet: Fleet) => void;
  showComparison?: boolean;
}

interface FleetFilters {
  search: string;
  vesselType: string;
  flag: string;
  operationalStatus: string;
  classification: string;
  ageRange: string;
}

export default function FleetListView({ 
  fleets, 
  onFleetSelect,
  showComparison = true 
}: FleetListViewProps) {
  const [filters, setFilters] = useState<FleetFilters>({
    search: '',
    vesselType: '',
    flag: '',
    operationalStatus: '',
    classification: '',
    ageRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'age' | 'status'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedFleets, setSelectedFleets] = useState<string[]>([]);
  const [showComparisonTool, setShowComparisonTool] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter and sort fleets
  const filteredFleets = fleets.filter(fleet => {
    const matchesSearch = !filters.search || 
      fleet.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      (fleet.imoNumber && fleet.imoNumber.toLowerCase().includes(filters.search.toLowerCase())) ||
      (fleet.vesselType && fleet.vesselType.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesVesselType = !filters.vesselType || fleet.vesselType === filters.vesselType;
    const matchesFlag = !filters.flag || fleet.flag === filters.flag;
    const matchesStatus = !filters.operationalStatus || fleet.operationalStatus === filters.operationalStatus;
    const matchesClassification = !filters.classification || fleet.classificationSociety === filters.classification;
    
    let matchesAge = true;
    if (filters.ageRange && fleet.builtYear) {
      const age = new Date().getFullYear() - fleet.builtYear;
      switch (filters.ageRange) {
        case '0-5':
          matchesAge = age <= 5;
          break;
        case '6-15':
          matchesAge = age >= 6 && age <= 15;
          break;
        case '16-25':
          matchesAge = age >= 16 && age <= 25;
          break;
        case '25+':
          matchesAge = age > 25;
          break;
      }
    }
    
    return matchesSearch && matchesVesselType && matchesFlag && matchesStatus && matchesClassification && matchesAge;
  }).sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'type':
        aValue = a.vesselType?.toLowerCase() || '';
        bValue = b.vesselType?.toLowerCase() || '';
        break;
      case 'age':
        aValue = a.builtYear || 0;
        bValue = b.builtYear || 0;
        break;
      case 'status':
        aValue = a.operationalStatus?.toLowerCase() || '';
        bValue = b.operationalStatus?.toLowerCase() || '';
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleFleetSelection = (fleetId: string, selected: boolean) => {
    if (selected) {
      setSelectedFleets(prev => [...prev, fleetId]);
    } else {
      setSelectedFleets(prev => prev.filter(id => id !== fleetId));
    }
  };

  const handleCompareFleets = () => {
    if (selectedFleets.length >= 2) {
      setShowComparisonTool(true);
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      vesselType: '',
      flag: '',
      operationalStatus: '',
      classification: '',
      ageRange: ''
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
      case 'In Service':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'Under Maintenance':
      case 'Dry Dock':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'Laid Up':
      case 'Out of Service':
        return <XMarkIcon className="h-5 w-5 text-red-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getVesselAge = (builtYear: number) => {
    if (!builtYear) return 'Unknown';
    const age = new Date().getFullYear() - builtYear;
    return `${age} years`;
  };

  // Get unique values for filters
  const vesselTypes = [...new Set(fleets.map(f => f.vesselType).filter(Boolean))];
  const flags = [...new Set(fleets.map(f => f.flag).filter(Boolean))];
  const operationalStatuses = [...new Set(fleets.map(f => f.operationalStatus).filter(Boolean))];
  const classifications = [...new Set(fleets.map(f => f.classificationSociety).filter(Boolean))];

  if (showComparisonTool && selectedFleets.length >= 2) {
    const selectedFleetData = fleets.filter(f => selectedFleets.includes(f.id));
    return (
      <VesselComparisonTool
        vessels={selectedFleetData}
        onClose={() => setShowComparisonTool(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Fleet Overview</h2>
          <p className="text-sm text-gray-600">
            {filteredFleets.length} of {fleets.length} vessels
            {selectedFleets.length > 0 && ` • ${selectedFleets.length} selected`}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Table
            </button>
          </div>

          {/* Compare Button */}
          {showComparison && (
            <button
              onClick={handleCompareFleets}
              disabled={selectedFleets.length < 2}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                selectedFleets.length >= 2
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ScaleIcon className="h-4 w-4 mr-2" />
              Compare ({selectedFleets.length})
            </button>
          )}

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md ${
              showFilters
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Vessels
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name, IMO, Type..."
                />
              </div>
            </div>

            {/* Vessel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vessel Type
              </label>
              <select
                value={filters.vesselType}
                onChange={(e) => setFilters(prev => ({ ...prev, vesselType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {vesselTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Flag */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flag State
              </label>
              <select
                value={filters.flag}
                onChange={(e) => setFilters(prev => ({ ...prev, flag: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Flags</option>
                {flags.map(flag => (
                  <option key={flag} value={flag}>{flag}</option>
                ))}
              </select>
            </div>

            {/* Operational Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.operationalStatus}
                onChange={(e) => setFilters(prev => ({ ...prev, operationalStatus: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                {operationalStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Classification Society */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classification
              </label>
              <select
                value={filters.classification}
                onChange={(e) => setFilters(prev => ({ ...prev, classification: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Classifications</option>
                {classifications.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vessel Age
              </label>
              <select
                value={filters.ageRange}
                onChange={(e) => setFilters(prev => ({ ...prev, ageRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Ages</option>
                <option value="0-5">0-5 years</option>
                <option value="6-15">6-15 years</option>
                <option value="16-25">16-25 years</option>
                <option value="25+">25+ years</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <div className="flex space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "name" | "type" | "age" | "status")}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                  <option value="age">Age</option>
                  <option value="status">Status</option>
                </select>
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <ArrowsUpDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fleet List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFleets.map((fleet) => (
            <div key={fleet.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                {/* Selection Checkbox */}
                {showComparison && (
                  <div className="flex justify-between items-start mb-3">
                    <input
                      type="checkbox"
                      checked={selectedFleets.includes(fleet.id)}
                      onChange={(e) => handleFleetSelection(fleet.id, e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex items-center">
                      {getStatusIcon(fleet.operationalStatus || '')}
                    </div>
                  </div>
                )}

                {/* Vessel Info */}
                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{fleet.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        {fleet.vesselType && (
                          <div className="flex items-center">
                            <TruckIcon className="h-4 w-4 mr-2" />
                            {fleet.vesselType}
                          </div>
                        )}
                        {fleet.imoNumber && (
                          <p>IMO: {fleet.imoNumber}</p>
                        )}
                        {fleet.flag && (
                          <p>Flag: {fleet.flag}</p>
                        )}
                        {fleet.builtYear && (
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Built {fleet.builtYear} ({getVesselAge(fleet.builtYear)})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                {fleet.operationalStatus && (
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      fleet.operationalStatus === 'Active' || fleet.operationalStatus === 'In Service'
                        ? 'bg-green-100 text-green-800'
                        : fleet.operationalStatus === 'Under Maintenance' || fleet.operationalStatus === 'Dry Dock'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {fleet.operationalStatus}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <Link
                    href={`/fleets/${fleet.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                    onClick={() => onFleetSelect?.(fleet)}
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View Details
                  </Link>

                  {fleet.classificationSociety && (
                    <span className="text-xs text-gray-500">
                      {fleet.classificationSociety}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {showComparison && (
                    <th className="w-12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFleets(filteredFleets.map(f => f.id));
                          } else {
                            setSelectedFleets([]);
                          }
                        }}
                        checked={selectedFleets.length === filteredFleets.length && filteredFleets.length > 0}
                        ref={(el) => {
                          if (el) {
                            el.indeterminate = selectedFleets.length > 0 && selectedFleets.length < filteredFleets.length;
                          }
                        }}
                      />
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vessel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Flag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Built
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classification
                  </th>
                  <th className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFleets.map((fleet) => (
                  <tr key={fleet.id} className="hover:bg-gray-50">
                    {showComparison && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedFleets.includes(fleet.id)}
                          onChange={(e) => handleFleetSelection(fleet.id, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{fleet.name}</div>
                        {fleet.imoNumber && (
                          <div className="text-sm text-gray-500">IMO: {fleet.imoNumber}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fleet.vesselType || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(fleet.operationalStatus || '')}
                        <span className="ml-2 text-sm text-gray-900">
                          {fleet.operationalStatus || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fleet.flag || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fleet.builtYear ? `${fleet.builtYear} (${getVesselAge(fleet.builtYear)})` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fleet.classificationSociety || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/fleets/${fleet.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => onFleetSelect?.(fleet)}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredFleets.length === 0 && (
        <div className="text-center py-12">
          <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No vessels found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
