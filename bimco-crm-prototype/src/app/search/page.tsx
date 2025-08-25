'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import PowerSearchPanel from '@/components/PowerSearchPanel';
import SavedSearchManager from '@/components/SavedSearchManager';
import SearchToSegmentConverter from '@/components/SearchToSegmentConverter';
import Link from 'next/link';
import { mockCompanies, mockContacts, mockCourses, mockFleets } from '@/data/mockData';
import { SearchResult, SavedSearch, PowerSearchQuery, UserPermissions, Segment } from '@/types';
import {
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  TruckIcon,
  EyeIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const globalQuery = searchParams.get('q') || '';
  
  const [currentQuery, setCurrentQuery] = useState<PowerSearchQuery | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  // Initialize with global search query if present
  useEffect(() => {
    if (globalQuery) {
      const initialQuery: PowerSearchQuery = {
        query: globalQuery,
        filters: {
          entityTypes: ['company', 'contact', 'course', 'fleet']
        },
        sorting: { field: 'relevance', direction: 'desc' },
        pagination: { page: 1, limit: 50 }
      };
      handleSearch(initialQuery);
    }
  }, [globalQuery]);

  // Mock user permissions - in real app, this would come from auth context
  const userPermissions: UserPermissions = {
    canViewAllCompanies: true,
    canViewAllContacts: true,
    canViewAllFleets: true,
    canViewAllCourses: true,
    canCreateSegments: true,
    canSaveSearches: true,
    allowedCountries: ['Denmark', 'Norway', 'Germany', 'Singapore'],
    allowedCompanyTypes: ['Member', 'Non-member', 'Supplier']
  };

  const handleSearch = async (query: PowerSearchQuery) => {
    setIsSearching(true);
    setCurrentQuery(query);

    // Simulate API call
    setTimeout(() => {
      const allResults: SearchResult[] = [];
      const searchTerm = query.query.toLowerCase();
      const entityTypes = query.filters.entityTypes || ['company', 'contact', 'course', 'fleet'];

      // Search companies
      if (entityTypes.includes('company')) {
        mockCompanies
          .filter(company => {
            let matches = !searchTerm || 
              company.name.toLowerCase().includes(searchTerm) ||
              company.registrationNumber.toLowerCase().includes(searchTerm) ||
              company.address.country.toLowerCase().includes(searchTerm);

            // Apply filters
            if (query.filters.status && !query.filters.status.includes(company.status)) {
              matches = false;
            }
            if (query.filters.countries && !query.filters.countries.includes(company.address.country)) {
              matches = false;
            }
            if (query.filters.companyTypes && !query.filters.companyTypes.includes(company.type)) {
              matches = false;
            }

            return matches;
          })
          .forEach(company => {
            allResults.push({
              id: company.id,
              type: 'company',
              title: company.name,
              subtitle: `${company.type} • ${company.address.country}`,
              description: `Registration: ${company.registrationNumber} • Status: ${company.status}`,
              url: `/companies/${company.id}`,
              relevanceScore: 0.9,
              matchedFields: ['name', 'registrationNumber', 'country']
            });
          });
      }

      // Search contacts
      if (entityTypes.includes('contact')) {
        mockContacts
          .filter(contact => {
            let matches = !searchTerm ||
              contact.firstName.toLowerCase().includes(searchTerm) ||
              contact.lastName.toLowerCase().includes(searchTerm) ||
              contact.email.toLowerCase().includes(searchTerm) ||
              (contact.role && contact.role.toLowerCase().includes(searchTerm));

            // Apply filters
            if (query.filters.status && !query.filters.status.includes(contact.status)) {
              matches = false;
            }

            return matches;
          })
          .forEach(contact => {
            allResults.push({
              id: contact.id,
              type: 'contact',
              title: `${contact.firstName} ${contact.lastName}`,
              subtitle: `${contact.role || 'Contact'} • ${contact.status}`,
              description: `Email: ${contact.email}`,
              url: `/contacts/${contact.id}`,
              relevanceScore: 0.8,
              matchedFields: ['firstName', 'lastName', 'email', 'role']
            });
          });
      }

      // Search courses
      if (entityTypes.includes('course')) {
        mockCourses
          .filter(course => {
            let matches = !searchTerm ||
              course.title.toLowerCase().includes(searchTerm) ||
              (course.description && course.description.toLowerCase().includes(searchTerm)) ||
              course.category.toLowerCase().includes(searchTerm) ||
              course.location.toLowerCase().includes(searchTerm);

            // Apply filters
            if (query.filters.categories && !query.filters.categories.includes(course.category)) {
              matches = false;
            }

            return matches;
          })
          .forEach(course => {
            allResults.push({
              id: course.id,
              type: 'course',
              title: course.title,
              subtitle: `${course.category} • ${course.location}`,
              description: course.description || 'Course description',
              url: `/courses/${course.id}`,
              relevanceScore: 0.7,
              matchedFields: ['title', 'description', 'category', 'location']
            });
          });
      }

      // Search fleets (using simplified fields for mock data)
      if (entityTypes.includes('fleet')) {
        mockFleets
          .filter(fleet => {
            const matches = !searchTerm ||
              fleet.name.toLowerCase().includes(searchTerm) ||
              fleet.id.toLowerCase().includes(searchTerm);

            return matches;
          })
          .forEach(fleet => {
            allResults.push({
              id: fleet.id,
              type: 'fleet',
              title: fleet.name,
              subtitle: `Fleet • ${fleet.id}`,
              description: `Fleet ID: ${fleet.id}`,
              url: `/fleets/${fleet.id}`,
              relevanceScore: 0.6,
              matchedFields: ['name', 'id']
            });
          });
      }

      // Sort by name or relevance
      allResults.sort((a, b) => {
        if (query.sorting.field === 'relevance') {
          return query.sorting.direction === 'desc' 
            ? b.relevanceScore - a.relevanceScore 
            : a.relevanceScore - b.relevanceScore;
        } else {
          return query.sorting.direction === 'desc' 
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        }
      });

      // Apply pagination
      const startIndex = (query.pagination.page - 1) * query.pagination.limit;
      const paginatedResults = allResults.slice(startIndex, startIndex + query.pagination.limit);

      setSearchResults(paginatedResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleLoadSavedSearch = (search: SavedSearch) => {
    handleSearch(search.query);
    setActiveTab('search');
  };

  const handleCreateSegment = (segment: Omit<Segment, 'id' | 'dateCreated' | 'lastUpdated'>) => {
    console.log('Creating segment:', segment);
    // In real app, this would call an API to create the segment
    alert(`Segment "${segment.name}" created successfully!`);
  };

  const handleDeleteSearch = (searchId: string) => {
    console.log('Deleting search:', searchId);
    // In real app, this would call an API to delete the search
  };

  const handleShareSearch = (search: SavedSearch) => {
    console.log('Sharing search:', search);
    // In real app, this would handle sharing functionality
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />;
      case 'contact':
        return <UsersIcon className="h-5 w-5 text-green-600" />;
      case 'course':
        return <AcademicCapIcon className="h-5 w-5 text-purple-600" />;
      case 'fleet':
        return <TruckIcon className="h-5 w-5 text-orange-600" />;
      default:
        return <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getEntityTypeLabel = (type: string) => {
    const labels = {
      company: 'Company',
      contact: 'Contact',
      course: 'Course',
      fleet: 'Fleet'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Search</h1>
          <p className="mt-1 text-sm text-gray-600">
            Search across companies, contacts, courses, and fleets with powerful filtering options
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('search')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Search
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'saved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Saved Searches
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Power Search Panel */}
            <PowerSearchPanel
              onSearch={handleSearch}
              userPermissions={userPermissions}
              isLoading={isSearching}
              initialQuery={globalQuery}
              initialFilters={{ entityTypes: ['company', 'contact', 'course', 'fleet'] }}
            />

            {/* Search Results */}
            {currentQuery && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Search Results</h2>
                    <p className="text-sm text-gray-600">
                      {searchResults.length} results found
                      {currentQuery.query && ` for "${currentQuery.query}"`}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    {searchResults.length > 0 && (
                      <>
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                          <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                          Export Results
                        </button>
                        <SearchToSegmentConverter
                          searchQuery={currentQuery}
                          searchResults={searchResults}
                          userPermissions={userPermissions}
                          onCreateSegment={handleCreateSegment}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Results List */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {isSearching ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                      <p className="text-gray-500">Searching...</p>
                    </div>
                  ) : searchResults.length === 0 && currentQuery ? (
                    <div className="p-8 text-center">
                      <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No results found for your search criteria.</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search terms.</p>
                    </div>
                  ) : (
                    searchResults.map((result) => (
                      <div key={`${result.type}-${result.id}`} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="flex-shrink-0 mt-1">
                              {getEntityIcon(result.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <Link
                                  href={result.url}
                                  className="text-base font-medium text-blue-600 hover:text-blue-800"
                                >
                                  {result.title}
                                </Link>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                  {getEntityTypeLabel(result.type)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-900 mb-1">{result.subtitle}</p>
                              <p className="text-sm text-gray-600">{result.description}</p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <Link
                              href={result.url}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              <EyeIcon className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <SavedSearchManager
            currentQuery={currentQuery}
            userPermissions={userPermissions}
            onLoadSearch={handleLoadSavedSearch}
            onDeleteSearch={handleDeleteSearch}
            onShareSearch={handleShareSearch}
          />
        )}
      </div>
    </Layout>
  );
}
