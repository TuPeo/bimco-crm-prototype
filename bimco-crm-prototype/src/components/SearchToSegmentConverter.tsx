'use client';

import { useState } from 'react';
import { PowerSearchQuery, UserPermissions, Segment, Company, Contact } from '@/types';
import {
  RectangleStackIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  TruckIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface SearchToSegmentConverterProps {
  searchQuery: PowerSearchQuery | null;
  searchResults: any[];
  userPermissions: UserPermissions;
  onCreateSegment: (segment: Omit<Segment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  isLoading?: boolean;
}

interface SegmentPreview {
  name: string;
  description: string;
  entityType: 'company' | 'contact' | 'course' | 'fleet';
  criteria: string[];
  estimatedCount: number;
  selectedItems: string[];
}

export default function SearchToSegmentConverter({
  searchQuery,
  searchResults,
  userPermissions,
  onCreateSegment,
  isLoading = false
}: SearchToSegmentConverterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [segmentPreview, setSegmentPreview] = useState<SegmentPreview | null>(null);
  const [step, setStep] = useState<'preview' | 'customize' | 'confirm'>('preview');
  const [customSegmentName, setCustomSegmentName] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState<string>('');
  const [includeCriteria, setIncludeCriteria] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleStartConversion = () => {
    if (!searchQuery || searchResults.length === 0) return;

    // Determine primary entity type from search
    const entityTypes = searchQuery.filters.entityTypes || [];
    const primaryEntityType = entityTypes.length === 1 ? entityTypes[0] : 'company';

    // Generate segment name based on search criteria
    const generateSegmentName = () => {
      if (searchQuery.query) {
        return `Search: ${searchQuery.query}`;
      }
      
      const criteria = [];
      if (searchQuery.filters.status?.length) {
        criteria.push(searchQuery.filters.status.join(', '));
      }
      if (searchQuery.filters.countries?.length) {
        criteria.push(searchQuery.filters.countries.join(', '));
      }
      if (searchQuery.filters.companyTypes?.length) {
        criteria.push(searchQuery.filters.companyTypes.join(', '));
      }
      
      return criteria.length > 0 
        ? `Segment: ${criteria.join(' • ')}` 
        : `Custom Segment ${new Date().toLocaleDateString()}`;
    };

    // Generate criteria description
    const generateCriteria = () => {
      const criteria = [];
      
      if (searchQuery.query) {
        criteria.push(`Contains: "${searchQuery.query}"`);
      }
      
      if (searchQuery.filters.entityTypes?.length) {
        criteria.push(`Entity Types: ${searchQuery.filters.entityTypes.join(', ')}`);
      }
      
      if (searchQuery.filters.status?.length) {
        criteria.push(`Status: ${searchQuery.filters.status.join(', ')}`);
      }
      
      if (searchQuery.filters.countries?.length) {
        criteria.push(`Countries: ${searchQuery.filters.countries.join(', ')}`);
      }
      
      if (searchQuery.filters.companyTypes?.length) {
        criteria.push(`Company Types: ${searchQuery.filters.companyTypes.join(', ')}`);
      }
      
      if (searchQuery.filters.classifications?.length) {
        criteria.push(`Classifications: ${searchQuery.filters.classifications.join(', ')}`);
      }
      
      if (searchQuery.filters.categories?.length) {
        criteria.push(`Categories: ${searchQuery.filters.categories.join(', ')}`);
      }
      
      if (searchQuery.filters.vesselTypes?.length) {
        criteria.push(`Vessel Types: ${searchQuery.filters.vesselTypes.join(', ')}`);
      }
      
      if (searchQuery.filters.dateRange) {
        criteria.push(`Date Range: ${searchQuery.filters.dateRange.start} to ${searchQuery.filters.dateRange.end}`);
      }
      
      return criteria;
    };

    const preview: SegmentPreview = {
      name: generateSegmentName(),
      description: `Segment created from search results on ${new Date().toLocaleDateString()}`,
      entityType: primaryEntityType as any,
      criteria: generateCriteria(),
      estimatedCount: searchResults.length,
      selectedItems: searchResults.slice(0, 100).map(item => item.id) // Limit to first 100 items
    };

    setSegmentPreview(preview);
    setCustomSegmentName(preview.name);
    setCustomDescription(preview.description);
    setSelectedEntityType(preview.entityType);
    setIncludeCriteria(preview.criteria);
    setSelectedItems(preview.selectedItems);
    setIsOpen(true);
    setStep('preview');
  };

  const handleCustomize = () => {
    setStep('customize');
  };

  const handleConfirm = () => {
    setStep('confirm');
  };

  const handleCreateSegment = () => {
    if (!segmentPreview || !userPermissions.canCreateSegments) return;

    const newSegment: Omit<Segment, 'id' | 'createdAt' | 'updatedAt'> = {
      name: customSegmentName.trim(),
      description: customDescription.trim(),
      type: selectedEntityType as any,
      criteria: {
        searchQuery: searchQuery!,
        includedItemIds: selectedItems,
        createdFromSearch: true
      },
      count: selectedItems.length,
      isActive: true,
      lastUsed: new Date(),
      tags: []
    };

    onCreateSegment(newSegment);
    setIsOpen(false);
    resetState();
  };

  const resetState = () => {
    setSegmentPreview(null);
    setStep('preview');
    setCustomSegmentName('');
    setCustomDescription('');
    setSelectedEntityType('');
    setIncludeCriteria([]);
    setSelectedItems([]);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'company':
        return <BuildingOfficeIcon className="h-5 w-5" />;
      case 'contact':
        return <UserGroupIcon className="h-5 w-5" />;
      case 'course':
        return <AcademicCapIcon className="h-5 w-5" />;
      case 'fleet':
        return <TruckIcon className="h-5 w-5" />;
      default:
        return <RectangleStackIcon className="h-5 w-5" />;
    }
  };

  const getEntityTypeLabel = (entityType: string) => {
    const labels = {
      company: 'Companies',
      contact: 'Contacts',
      course: 'Courses',
      fleet: 'Fleets'
    };
    return labels[entityType as keyof typeof labels] || entityType;
  };

  // Don't show if no search or no permission
  if (!searchQuery || !userPermissions.canCreateSegments) {
    return null;
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleStartConversion}
        disabled={!searchResults.length || isLoading}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RectangleStackIcon className="h-4 w-4 mr-2" />
        Create Segment ({searchResults.length} results)
        <ChevronRightIcon className="h-4 w-4 ml-2" />
      </button>

      {/* Modal */}
      {isOpen && segmentPreview && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <RectangleStackIcon className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Create Segment from Search
                  </h3>
                  <p className="text-sm text-gray-600">
                    Convert your search results into a reusable segment
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 'preview' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600'
                }`}>
                  {step !== 'preview' ? <CheckIcon className="h-5 w-5" /> : '1'}
                </div>
                <div className="w-12 h-1 bg-gray-200">
                  <div className={`h-1 ${step !== 'preview' ? 'bg-green-600' : 'bg-gray-200'}`} />
                </div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 'customize' ? 'bg-green-600 text-white' : 
                  step === 'confirm' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step === 'confirm' ? <CheckIcon className="h-5 w-5" /> : '2'}
                </div>
                <div className="w-12 h-1 bg-gray-200">
                  <div className={`h-1 ${step === 'confirm' ? 'bg-green-600' : 'bg-gray-200'}`} />
                </div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step === 'confirm' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {step === 'preview' && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <InformationCircleIcon className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Segment Preview</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Review the segment that will be created from your current search results.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      {getEntityIcon(segmentPreview.entityType)}
                      <div className="ml-3">
                        <h5 className="font-medium text-gray-900">{segmentPreview.name}</h5>
                        <p className="text-sm text-gray-600">{segmentPreview.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Entity Type:</span>
                        <span className="ml-2 text-gray-900">{getEntityTypeLabel(segmentPreview.entityType)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Estimated Count:</span>
                        <span className="ml-2 text-gray-900">{segmentPreview.estimatedCount.toLocaleString()}</span>
                      </div>
                    </div>

                    {segmentPreview.criteria.length > 0 && (
                      <div className="mt-4">
                        <span className="font-medium text-gray-700 text-sm">Search Criteria:</span>
                        <ul className="mt-2 space-y-1">
                          {segmentPreview.criteria.map((criterion, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {criterion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {segmentPreview.estimatedCount > 1000 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-900">Large Segment</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            This segment contains over 1,000 items. Consider refining your search criteria for better performance.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'customize' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Segment Name *
                    </label>
                    <input
                      type="text"
                      value={customSegmentName}
                      onChange={(e) => setCustomSegmentName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Enter segment name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={customDescription}
                      onChange={(e) => setCustomDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows={3}
                      placeholder="Optional description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Entity Type
                    </label>
                    <select
                      value={selectedEntityType}
                      onChange={(e) => setSelectedEntityType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="company">Companies</option>
                      <option value="contact">Contacts</option>
                      <option value="course">Courses</option>
                      <option value="fleet">Fleets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Include Criteria ({includeCriteria.length} selected)
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                      {segmentPreview.criteria.map((criterion, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={includeCriteria.includes(criterion)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setIncludeCriteria(prev => [...prev, criterion]);
                              } else {
                                setIncludeCriteria(prev => prev.filter(c => c !== criterion));
                              }
                            }}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-2"
                          />
                          <span className="text-sm text-gray-700">{criterion}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-green-900">Ready to Create</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your segment is ready to be created with the following configuration:
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <span className="ml-2 text-gray-900">{customSegmentName}</span>
                    </div>
                    
                    {customDescription && (
                      <div>
                        <span className="font-medium text-gray-700">Description:</span>
                        <span className="ml-2 text-gray-900">{customDescription}</span>
                      </div>
                    )}
                    
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <span className="ml-2 text-gray-900">{getEntityTypeLabel(selectedEntityType)}</span>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Items:</span>
                      <span className="ml-2 text-gray-900">{selectedItems.length.toLocaleString()}</span>
                    </div>

                    {includeCriteria.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Criteria:</span>
                        <ul className="mt-1 ml-2">
                          {includeCriteria.map((criterion, index) => (
                            <li key={index} className="text-sm text-gray-600">• {criterion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Cancel
              </button>

              <div className="flex space-x-3">
                {step === 'preview' && (
                  <button
                    onClick={handleCustomize}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Customize
                  </button>
                )}

                {step === 'customize' && (
                  <button
                    onClick={handleConfirm}
                    disabled={!customSegmentName.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                )}

                {step === 'confirm' && (
                  <button
                    onClick={handleCreateSegment}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Create Segment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
