'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
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
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Dashboard() {
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

        {/* Bottom Section - Recent Activity and Quick Actions */}
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

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bimco-card">
              <div className="bimco-card-header">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Link href="/companies/new" className="bimco-btn-primary w-full justify-center">
                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                  Add New Company
                </Link>
                
                <Link href="/contacts/new" className="bimco-btn-secondary w-full justify-center">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Add New Contact
                </Link>
                
                <Link href="/courses/new" className="bimco-btn-secondary w-full justify-center">
                  <AcademicCapIcon className="h-4 w-4 mr-2" />
                  Create Course
                </Link>
                
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
    </Layout>
  );
}
