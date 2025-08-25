'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  TruckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { SearchResult } from '@/types';
import { mockCompanies, mockContacts, mockCourses, mockFleets } from '@/data/mockData';

interface GlobalSearchProps {
  placeholder?: string;
}

export default function GlobalSearch({ placeholder = "Search companies, contacts, courses... (⌘K)" }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('globalSearchRecent');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced search function
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    const searchTerm = searchQuery.toLowerCase().trim();
    const searchResults: SearchResult[] = [];

    // Search Companies
    mockCompanies.forEach(company => {
      let relevanceScore = 0;
      const matchedFields: string[] = [];

      if (company.name.toLowerCase().includes(searchTerm)) {
        relevanceScore += company.name.toLowerCase() === searchTerm ? 100 : 
                         company.name.toLowerCase().startsWith(searchTerm) ? 80 : 50;
        matchedFields.push('name');
      }

      if (company.registrationNumber.toLowerCase().includes(searchTerm)) {
        relevanceScore += 70;
        matchedFields.push('registration');
      }

      if (company.email.toLowerCase().includes(searchTerm)) {
        relevanceScore += 60;
        matchedFields.push('email');
      }

      if (company.address.country.toLowerCase().includes(searchTerm)) {
        relevanceScore += 30;
        matchedFields.push('country');
      }

      if (relevanceScore > 0) {
        searchResults.push({
          id: company.id,
          type: 'company',
          title: company.name,
          subtitle: `${company.type} • ${company.address.country}`,
          description: company.email,
          url: `/companies/${company.id}`,
          relevanceScore,
          matchedFields,
          metadata: { 
            status: company.status,
            employees: company.numberOfEmployees,
            registrationNumber: company.registrationNumber
          }
        });
      }
    });

    // Search Contacts
    mockContacts.forEach(contact => {
      let relevanceScore = 0;
      const matchedFields: string[] = [];

      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      if (fullName.includes(searchTerm)) {
        relevanceScore += fullName === searchTerm ? 100 : 
                         fullName.startsWith(searchTerm) ? 80 : 50;
        matchedFields.push('name');
      }

      if (contact.email.toLowerCase().includes(searchTerm)) {
        relevanceScore += 70;
        matchedFields.push('email');
      }

      if (contact.contactNumber.toLowerCase().includes(searchTerm)) {
        relevanceScore += 60;
        matchedFields.push('contactNumber');
      }

      if (contact.companyName.toLowerCase().includes(searchTerm)) {
        relevanceScore += 40;
        matchedFields.push('company');
      }

      if (contact.role?.toLowerCase().includes(searchTerm)) {
        relevanceScore += 30;
        matchedFields.push('role');
      }

      if (relevanceScore > 0) {
        searchResults.push({
          id: contact.id,
          type: 'contact',
          title: `${contact.firstName} ${contact.lastName}`,
          subtitle: `${contact.role || 'Contact'} at ${contact.companyName}`,
          description: contact.email,
          url: `/contacts/${contact.id}`,
          relevanceScore,
          matchedFields,
          metadata: { 
            status: contact.status,
            phone: contact.phone,
            contactNumber: contact.contactNumber
          }
        });
      }
    });

    // Search Courses
    mockCourses.forEach(course => {
      let relevanceScore = 0;
      const matchedFields: string[] = [];

      if (course.title.toLowerCase().includes(searchTerm)) {
        relevanceScore += course.title.toLowerCase() === searchTerm ? 100 : 
                         course.title.toLowerCase().startsWith(searchTerm) ? 80 : 50;
        matchedFields.push('title');
      }

      if (course.category.toLowerCase().includes(searchTerm)) {
        relevanceScore += 60;
        matchedFields.push('category');
      }

      if (course.location.toLowerCase().includes(searchTerm)) {
        relevanceScore += 50;
        matchedFields.push('location');
      }

      if (course.description?.toLowerCase().includes(searchTerm)) {
        relevanceScore += 30;
        matchedFields.push('description');
      }

      if (relevanceScore > 0) {
        searchResults.push({
          id: course.id,
          type: 'course',
          title: course.title,
          subtitle: `${course.category} • ${course.location}`,
          description: `${course.status} • ${new Date(course.startDate).toLocaleDateString()}`,
          url: `/courses/${course.id}`,
          relevanceScore,
          matchedFields,
          metadata: { 
            status: course.status,
            participants: course.participants.length,
            maxParticipants: course.maxParticipants
          }
        });
      }
    });

    // Search Fleets
    mockFleets.forEach(fleet => {
      let relevanceScore = 0;
      const matchedFields: string[] = [];

      if (fleet.name.toLowerCase().includes(searchTerm)) {
        relevanceScore += fleet.name.toLowerCase() === searchTerm ? 100 : 
                         fleet.name.toLowerCase().startsWith(searchTerm) ? 80 : 50;
        matchedFields.push('name');
      }

      if (fleet.registration.toLowerCase().includes(searchTerm)) {
        relevanceScore += 70;
        matchedFields.push('registration');
      }

      if (fleet.imoNumber?.toLowerCase().includes(searchTerm)) {
        relevanceScore += 70;
        matchedFields.push('imoNumber');
      }

      if (fleet.type.toLowerCase().includes(searchTerm)) {
        relevanceScore += 50;
        matchedFields.push('type');
      }

      if (fleet.companyName.toLowerCase().includes(searchTerm)) {
        relevanceScore += 40;
        matchedFields.push('company');
      }

      if (fleet.flag.toLowerCase().includes(searchTerm)) {
        relevanceScore += 30;
        matchedFields.push('flag');
      }

      if (relevanceScore > 0) {
        searchResults.push({
          id: fleet.id,
          type: 'fleet',
          title: fleet.name,
          subtitle: `${fleet.type} • ${fleet.flag}`,
          description: `${fleet.operationalStatus} • ${fleet.companyName}`,
          url: `/fleets/${fleet.id}`,
          relevanceScore,
          matchedFields,
          metadata: { 
            status: fleet.operationalStatus,
            registration: fleet.registration,
            imoNumber: fleet.imoNumber,
            yearBuilt: fleet.yearBuilt
          }
        });
      }
    });

    // Sort by relevance score and limit results
    const sortedResults = searchResults
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 10);

    setResults(sortedResults);
    setIsOpen(sortedResults.length > 0);
    setIsLoading(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'company':
        return <BuildingOfficeIcon className="h-4 w-4" />;
      case 'contact':
        return <UsersIcon className="h-4 w-4" />;
      case 'course':
        return <AcademicCapIcon className="h-4 w-4" />;
      case 'fleet':
        return <TruckIcon className="h-4 w-4" />;
      default:
        return <MagnifyingGlassIcon className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'company':
        return 'text-blue-600 bg-blue-50';
      case 'contact':
        return 'text-green-600 bg-green-50';
      case 'course':
        return 'text-purple-600 bg-purple-50';
      case 'fleet':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const newRecentSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem('globalSearchRecent', JSON.stringify(newRecentSearches));
    
    setIsOpen(false);
    setQuery('');
    router.push(result.url);
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
    // Trigger search for the recent term
    setTimeout(() => {
      performSearch(searchTerm);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && results.length === 1) {
      handleResultClick(results[0]);
    }
  };

  const handleInputFocus = () => {
    if (!query && recentSearches.length > 0) {
      setIsOpen(true);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative flex flex-1">
      <div className="relative w-full">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 pl-1"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          className="block h-full w-full border-0 py-0 pl-8 pr-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-transparent"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2"
            onClick={clearSearch}
          >
            <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {!query && recentSearches.length > 0 ? (
            // Show recent searches when no query
            <>
              <div className="p-3 border-b border-gray-100">
                <span className="text-xs font-medium text-gray-500">Recent Searches</span>
              </div>
              <div className="py-2">
                {recentSearches.map((searchTerm, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    onClick={() => handleRecentSearchClick(searchTerm)}
                  >
                    <div className="flex items-center space-x-3">
                      <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{searchTerm}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <MagnifyingGlassIcon className="h-6 w-6 mx-auto mb-2 animate-spin" />
              <p className="text-sm">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    {results.length} result{results.length !== 1 ? 's' : ''} found
                  </span>
                  <span className="text-xs text-gray-400">
                    Press Enter for first result
                  </span>
                </div>
              </div>
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-50 last:border-b-0"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 p-2 rounded-full ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getTypeColor(result.type)}`}>
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </p>
                        {result.description && (
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {result.description}
                          </p>
                        )}
                        {result.matchedFields.length > 0 && (
                          <div className="mt-1">
                            <span className="text-xs text-gray-400">
                              Matched: {result.matchedFields.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  View all results for "{query}" →
                </Link>
              </div>
            </>
          ) : query && results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MagnifyingGlassIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching by name, email, registration, or other identifiers
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
