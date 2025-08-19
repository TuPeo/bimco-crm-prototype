'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { mockSearchResults, mockSavedSearches, mockCompanies, mockContacts, mockCourses, mockFleets } from '@/data/mockData';
import { SearchResult, SavedSearch } from '@/types';
import {
  MagnifyingGlassIcon,
  BookmarkIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  TruckIcon,
  StarIcon,
  TrashIcon,
  EyeIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [savedSearches] = useState<SavedSearch[]>(mockSavedSearches);
  const [entityFilter, setEntityFilter] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const allResults: SearchResult[] = [];

      // Search companies
      if (entityFilter === 'all' || entityFilter === 'company') {
        mockCompanies
          .filter(company => 
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.registrationNumber.toLowerCase().includes(query.toLowerCase()) ||
            company.address.country.toLowerCase().includes(query.toLowerCase())
          )
          .forEach(company => {
            allResults.push({
              id: company.id,
              type: 'company',
              title: company.name,
              subtitle: `${company.type} • ${company.address.country}`,
              description: `Registration: ${company.registrationNumber}`,
              url: `/companies/${company.id}`,
              relevanceScore: 0.9,
              matchedFields: ['name', 'country', 'registration']
            });
          });
      }

      // Search contacts
      if (entityFilter === 'all' || entityFilter === 'contact') {
        mockContacts
          .filter(contact => 
            `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
            contact.email.toLowerCase().includes(query.toLowerCase()) ||
            contact.companyName.toLowerCase().includes(query.toLowerCase())
          )
          .forEach(contact => {
            allResults.push({
              id: contact.id,
              type: 'contact',
              title: `${contact.firstName} ${contact.lastName}`,
              subtitle: `${contact.role || 'Contact'} • ${contact.companyName}`,
              description: contact.email,
              url: `/contacts/${contact.id}`,
              relevanceScore: 0.85,
              matchedFields: ['name', 'email', 'company']
            });
          });
      }

      // Search fleets
      if (entityFilter === 'all' || entityFilter === 'fleet') {
        mockFleets
          .filter(fleet => 
            fleet.name.toLowerCase().includes(query.toLowerCase()) ||
            fleet.registration.toLowerCase().includes(query.toLowerCase()) ||
            fleet.type.toLowerCase().includes(query.toLowerCase())
          )
          .forEach(fleet => {
            allResults.push({
              id: fleet.id,
              type: 'fleet',
              title: fleet.name,
              subtitle: `${fleet.type} • IMO ${fleet.registration}`,
              description: `Owner: ${fleet.companyName}`,
              url: `/fleets/${fleet.id}`,
              relevanceScore: 0.8,
              matchedFields: ['name', 'type', 'registration']
            });
          });
      }

      // Search courses
      if (entityFilter === 'all' || entityFilter === 'course') {
        mockCourses
          .filter(course => 
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.category.toLowerCase().includes(query.toLowerCase()) ||
            course.location.toLowerCase().includes(query.toLowerCase())
          )
          .forEach(course => {
            allResults.push({
              id: course.id,
              type: 'course',
              title: course.title,
              subtitle: `${course.category} • ${course.location}`,
              description: `${course.startDate} - ${course.endDate}`,
              url: `/courses/${course.id}`,
              relevanceScore: 0.75,
              matchedFields: ['title', 'category', 'location']
            });
          });
      }

      // Sort by relevance score
      allResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
      
      setSearchResults(allResults.slice(0, 50)); // Limit to 50 results
      setIsSearching(false);
    }, 500);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2) {
      handleSearch(value);
    } else if (value.length === 0) {
      setSearchResults([]);
    }
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'company': return BuildingOfficeIcon;
      case 'contact': return UsersIcon;
      case 'fleet': return TruckIcon;
      case 'course': return AcademicCapIcon;
      default: return MagnifyingGlassIcon;
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'company': return 'text-blue-600 bg-blue-100';
      case 'contact': return 'text-green-600 bg-green-100';
      case 'fleet': return 'text-purple-600 bg-purple-100';
      case 'course': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const groupedResults = searchResults.reduce((groups, result) => {
    const type = result.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(result);
    return groups;
  }, {} as Record<string, SearchResult[]>);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Global Search
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Search across companies, contacts, fleets, courses, and events
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('search')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MagnifyingGlassIcon className="h-4 w-4" />
                Search
              </div>
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'saved'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookmarkIcon className="h-4 w-4" />
                Saved Searches ({savedSearches.length})
              </div>
            </button>
          </nav>
        </div>

        {/* Search Tab */}
        {activeTab === 'search' && (
          <>
            {/* Search Bar */}
            <div className="bimco-card">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Input */}
                  <div className="flex-1">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search across all entities..."
                        value={searchQuery}
                        onChange={(e) => handleSearchInputChange(e.target.value)}
                        className="pl-10 w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {isSearching && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Entity Filter */}
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="h-4 w-4 text-gray-400" />
                    <select
                      value={entityFilter}
                      onChange={(e) => setEntityFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Types</option>
                      <option value="company">Companies</option>
                      <option value="contact">Contacts</option>
                      <option value="fleet">Fleets</option>
                      <option value="course">Courses & Events</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {searchQuery && (
                      <button className="bimco-btn-secondary">
                        <BookmarkIcon className="h-4 w-4 mr-2" />
                        Save Search
                      </button>
                    )}
                    {searchResults.length > 0 && (
                      <>
                        <button className="bimco-btn-secondary">
                          <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                          Export
                        </button>
                        <button className="bimco-btn-primary">
                          <RectangleGroupIcon className="h-4 w-4 mr-2" />
                          Create Segment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Search Results ({searchResults.length})
                  </h2>
                </div>

                {Object.entries(groupedResults).map(([type, results]) => {
                  const Icon = getEntityIcon(type);
                  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1) + 's';
                  
                  return (
                    <div key={type} className="bimco-card">
                      <div className="bimco-card-header">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-gray-400" />
                          <h3 className="text-lg font-medium text-gray-900">
                            {typeLabel} ({results.length})
                          </h3>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {results.map((result) => {
                          const EntityIcon = getEntityIcon(result.type);
                          return (
                            <div key={`${result.type}-${result.id}`} className="p-6 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                  <div className={`p-2 rounded-lg ${getEntityColor(result.type)}`}>
                                    <EntityIcon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <Link
                                      href={result.url}
                                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors block"
                                    >
                                      {result.title}
                                    </Link>
                                    <p className="text-sm text-gray-600 mt-1">{result.subtitle}</p>
                                    {result.description && (
                                      <p className="text-sm text-gray-500 mt-1">{result.description}</p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                      <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Relevance: {Math.round(result.relevanceScore * 100)}%</span>
                                      </div>
                                      <div className="flex items-center gap-1 text-xs text-gray-400">
                                        <span>Matched: {result.matchedFields.join(', ')}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Link
                                  href={result.url}
                                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors ml-4"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Empty State */}
            {searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="bimco-card">
                <div className="p-12 text-center">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters to find what you&apos;re looking for.
                  </p>
                </div>
              </div>
            )}

            {/* Search Tips */}
            {!searchQuery && (
              <div className="bimco-card">
                <div className="bimco-card-header">
                  <h3 className="text-lg font-medium text-gray-900">Search Tips</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Search Examples</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• &quot;Maersk&quot; - Find all entities related to Maersk</li>
                        <li>• &quot;IMO9321483&quot; - Search by vessel IMO number</li>
                        <li>• &quot;maritime training&quot; - Find courses and training</li>
                        <li>• &quot;Denmark&quot; - Find entities in Denmark</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Advanced Features</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Use filters to narrow down results by type</li>
                        <li>• Save frequently used searches</li>
                        <li>• Export search results to Excel/CSV</li>
                        <li>• Create segments from search results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Saved Searches Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Saved Searches</h2>
              <button className="bimco-btn-primary">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Saved Search
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {savedSearches.map((search) => (
                <div key={search.id} className="bimco-card">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-gray-900">{search.name}</h3>
                          {search.isPublic && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Public
                            </span>
                          )}
                        </div>
                        {search.description && (
                          <p className="text-sm text-gray-600 mt-1">{search.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />
                            Last used: {formatDate(search.lastUsed)}
                          </span>
                          <span>Entities: {search.entityTypes.join(', ')}</span>
                          <span>Query: {search.searchQuery}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => {
                            setActiveTab('search');
                            setSearchQuery(search.searchQuery.replace(/\w+:/g, '').trim());
                            handleSearch(search.searchQuery.replace(/\w+:/g, '').trim());
                          }}
                          className="p-2 text-blue-600 hover:text-blue-500 transition-colors"
                          title="Run Search"
                        >
                          <MagnifyingGlassIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-yellow-600 hover:text-yellow-500 transition-colors" title="Favorite">
                          <StarIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-500 transition-colors" title="Delete">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
