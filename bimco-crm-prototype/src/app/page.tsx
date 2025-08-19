'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CompanyModal from '@/components/CompanyModal';
import ContactModal from '@/components/ContactModal';
import CompanyDistributionChart from '@/components/charts/CompanyDistributionChart';
import ContactRoleChart from '@/components/charts/ContactRoleChart';
import EventTrendChart from '@/components/charts/EventTrendChart';
import MembershipStatusChart from '@/components/charts/MembershipStatusChart';
import {
  mockDashboardStats,
  companyDistributionData,
  contactRoleData,
  eventTrendData,
  membershipStatusData,
  recentActivityData
} from '@/data/mockData';
import {
  BuildingOfficeIcon,
  UsersIcon,
  AcademicCapIcon,
  BellIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  EyeIcon,
  ChevronRightIcon,
  StarIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Dashboard() {
  // Modal states
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  // Favorites state
  const [favorites, setFavorites] = useState({
    companies: [] as any[],
    contacts: [] as any[]
  });

  // Helper function to safely format dates
  const formatLastAccessed = (lastAccessed: any) => {
    if (!lastAccessed) return 'Never';
    
    // If it's already a string like "Just now", return as is
    if (typeof lastAccessed === 'string' && !lastAccessed.includes('-') && !lastAccessed.includes('/')) {
      return lastAccessed;
    }
    
    try {
      const date = new Date(lastAccessed);
      if (isNaN(date.getTime())) {
        return 'Never';
      }
      return date.toLocaleDateString();
    } catch (error) {
      return 'Never';
    }
  };

  // Load favorites from localStorage and listen for changes
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = localStorage.getItem('bimco-crm-favorites');
        if (storedFavorites) {
          const favoritesData = JSON.parse(storedFavorites);
          setFavorites({
            companies: favoritesData.companies || [],
            contacts: favoritesData.contacts || []
          });
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    // Load favorites initially
    loadFavorites();

    // Listen for favorites changes from other pages
    const handleFavoritesChange = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, []);

  const statsCards = [
    {
      name: 'Total Companies',
      value: mockDashboardStats.totalCompanies.toLocaleString(),
      icon: BuildingOfficeIcon,
      change: '+4.75%',
      changeType: 'positive' as const,
      href: '/companies'
    },
    {
      name: 'Total Contacts',
      value: mockDashboardStats.totalContacts.toLocaleString(),
      icon: UsersIcon,
      change: '+8.2%',
      changeType: 'positive' as const,
      href: '/contacts'
    },
    {
      name: 'Active Courses',
      value: mockDashboardStats.totalCourses.toString(),
      icon: AcademicCapIcon,
      change: '+12.3%',
      changeType: 'positive' as const,
      href: '/courses'
    },
    {
      name: 'Pending Notifications',
      value: mockDashboardStats.pendingNotifications.toString(),
      icon: BellIcon,
      change: '-2.1%',
      changeType: 'negative' as const,
      href: '/notifications'
    }
  ];

  const formatActivityTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'company_update':
        return BuildingOfficeIcon;
      case 'contact_create':
        return UsersIcon;
      case 'course_registration':
      case 'course_update':
        return AcademicCapIcon;
      default:
        return ClockIcon;
    }
  };

  // Modal handlers
  const handleAddCompany = () => {
    setIsCompanyModalOpen(true);
  };

  const handleAddContact = () => {
    setIsContactModalOpen(true);
  };

  const handleCreateCourse = () => {
    // Navigate to course creation page
    window.location.href = '/courses';
  };

  const handleSaveCompany = (companyData: any) => {
    console.log('Company saved:', companyData);
    alert('Company created successfully!');
  };

  const handleSaveContact = (contactData: any) => {
    console.log('Contact saved:', contactData);
    alert('Contact created successfully!');
  };

  // Favorites handlers
  const handleRemoveFromFavorites = (type: 'companies' | 'contacts', id: string) => {
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  const handleAccessFavorite = (type: 'companies' | 'contacts', id: string) => {
    // Update access count and timestamp
    setFavorites(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id 
          ? { ...item, accessCount: item.accessCount + 1, lastAccessed: new Date().toISOString().split('T')[0] }
          : item
      )
    }));
    
    // Navigate to the item
    window.location.href = type === 'companies' ? `/companies/${id}` : `/contacts/${id}`;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Welcome to BIMCO CRM - Maritime Intelligence System
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((item) => (
            <Link key={item.name} href={item.href} className="group">
              <div className="bimco-stat-card group-hover:shadow-md transition-shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{item.value}</div>
                          <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                            item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.changeType === 'positive' ? (
                              <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4" />
                            ) : (
                              <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4" />
                            )}
                            <span className="ml-1">{item.change}</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                    <div className="flex-shrink-0">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Favorites Section */}
        <div className="bimco-card">
          <div className="bimco-card-header">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
              <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
              Favorites - Quick Access
            </h3>
            <p className="text-sm text-gray-600 mt-1">Your most frequently accessed companies and contacts</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Favorite Companies */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <BuildingOfficeIcon className="h-4 w-4 mr-2 text-blue-600" />
                Companies ({favorites.companies.length})
              </h4>
              <div className="space-y-2">
                {favorites.companies.slice(0, 4).map((company) => (
                  <div 
                    key={company.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer group"
                    onClick={() => handleAccessFavorite('companies', company.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <HeartIcon className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        <p className="text-sm font-medium text-gray-900 truncate">{company.name}</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mr-2 ${
                          company.type === 'A1' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {company.type}
                        </span>
                        <span>{company.accessCount || 0} visits</span>
                        <span className="mx-1">•</span>
                        <span>Last: {formatLastAccessed(company.lastAccessed)}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromFavorites('companies', company.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all ml-2"
                      title="Remove from favorites"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                {favorites.companies.length > 4 && (
                  <Link 
                    href="/companies" 
                    className="text-sm text-blue-600 hover:text-blue-500 block text-center py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    View all {favorites.companies.length} favorite companies →
                  </Link>
                )}
                {favorites.companies.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BuildingOfficeIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No favorite companies yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Favorite Contacts */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <UsersIcon className="h-4 w-4 mr-2 text-green-600" />
                Contacts ({favorites.contacts.length})
              </h4>
              <div className="space-y-2">
                {favorites.contacts.slice(0, 4).map((contact) => (
                  <div 
                    key={contact.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer group"
                    onClick={() => handleAccessFavorite('contacts', contact.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <HeartIcon className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                        <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        <div className="truncate">{contact.role} at {contact.company}</div>
                        <div className="flex items-center mt-0.5">
                          <span>{contact.accessCount || 0} visits</span>
                          <span className="mx-1">•</span>
                          <span>Last: {formatLastAccessed(contact.lastAccessed)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromFavorites('contacts', contact.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all ml-2"
                      title="Remove from favorites"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                {favorites.contacts.length > 4 && (
                  <Link 
                    href="/contacts" 
                    className="text-sm text-blue-600 hover:text-blue-500 block text-center py-2 border border-dashed border-gray-300 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    View all {favorites.contacts.length} favorite contacts →
                  </Link>
                )}
                {favorites.contacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <UsersIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No favorite contacts yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <div className="border-t pt-4 mt-6">
            <p className="text-xs text-gray-500 text-center">
              💡 Tip: Click the ❤️ icon on any company or contact page to add them to your favorites
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Company Distribution Chart */}
          <CompanyDistributionChart data={companyDistributionData} />

          {/* Membership Status Chart */}
          <MembershipStatusChart data={membershipStatusData} />

          {/* Contact Role Distribution Chart */}
          <ContactRoleChart data={contactRoleData} />

          {/* Event Trends Chart */}
          <EventTrendChart data={eventTrendData} />
        </div>

        {/* Bottom Section - Recent Activity, Quick Actions, and Favorites */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bimco-card">
              <div className="bimco-card-header">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
                  <Link href="/notifications" className="text-sm text-blue-600 hover:text-blue-500">
                    View all
                  </Link>
                </div>
              </div>
              
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {recentActivityData.slice(0, 8).map((activity, activityIdx) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== recentActivityData.slice(0, 8).length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-white">
                                <Icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                                  <span className="text-gray-600">{activity.action}</span>{' '}
                                  <span className="font-medium text-gray-900">{activity.target}</span>
                                </div>
                                <p className="mt-0.5 text-xs text-gray-500">
                                  {formatActivityTimestamp(activity.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bimco-card">
              <div className="bimco-card-header">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleAddCompany}
                  className="bimco-btn-primary w-full justify-center"
                >
                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                  Add New Company
                </button>
                
                <button 
                  onClick={handleAddContact}
                  className="bimco-btn-secondary w-full justify-center"
                >
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Add New Contact
                </button>
                
                <button 
                  onClick={handleCreateCourse}
                  className="bimco-btn-secondary w-full justify-center"
                >
                  <AcademicCapIcon className="h-4 w-4 mr-2" />
                  Create Course
                </button>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">System Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Database</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Dotdigital Sync</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">API Status</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Healthy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
        onSave={handleSaveCompany}
        company={undefined}
        mode="add"
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSave={handleSaveContact}
        contact={undefined}
        mode="add"
      />
    </Layout>
  );
}
