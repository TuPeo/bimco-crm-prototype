'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface CourseEventListProps {
  courses: Course[];
  onEditCourse: (course: Course) => void;
  onViewCourse: (courseId: string) => void;
}

type SortField = keyof Course | 'revenue' | 'participants';
type SortDirection = 'asc' | 'desc';

export default function CourseEventList({ 
  courses, 
  onEditCourse, 
  onViewCourse 
}: CourseEventListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('startDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Get unique categories and statuses
  const categories = useMemo(() => 
    Array.from(new Set(courses.map(c => c.category))).sort(),
    [courses]
  );

  const statuses = useMemo(() =>
    Array.from(new Set(courses.map(c => c.status))).sort(),
    [courses]
  );

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.group.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });

    // Sort courses
    return filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'revenue':
          aValue = a.revenue?.totalRevenue || 0;
          bValue = b.revenue?.totalRevenue || 0;
          break;
        case 'participants':
          aValue = a.participants.length;
          bValue = b.participants.length;
          break;
        default:
          aValue = a[sortField];
          bValue = b[sortField];
      }

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? result : -result;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [courses, searchTerm, statusFilter, categoryFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusIcon = (status: Course['status']) => {
    switch (status) {
      case 'Completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'Ongoing':
        return <ChartBarIcon className="h-4 w-4 text-blue-500" />;
      case 'Cancelled':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <CalendarIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRevenueStatus = (course: Course) => {
    if (!course.revenue) return { status: 'No data', color: 'text-gray-500' };
    
    const { totalRevenue, paidAmount } = course.revenue;
    const percentage = totalRevenue > 0 ? (paidAmount / totalRevenue) * 100 : 0;
    
    if (percentage >= 90) return { status: 'Excellent', color: 'text-green-600' };
    if (percentage >= 70) return { status: 'Good', color: 'text-blue-600' };
    if (percentage >= 50) return { status: 'Fair', color: 'text-yellow-600' };
    return { status: 'Poor', color: 'text-red-600' };
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Results Count */}
          <div className="flex items-center text-sm text-gray-600">
            {filteredAndSortedCourses.length} courses found
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('title')}
              >
                Course / Event
                {sortField === 'title' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('startDate')}
              >
                Date & Time
                {sortField === 'startDate' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('participants')}
              >
                Participants
                {sortField === 'participants' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('status')}
              >
                Status
                {sortField === 'status' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('revenue')}
              >
                Finance
                {sortField === 'revenue' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedCourses.map((course) => {
              const revenueStatus = getRevenueStatus(course);
              
              return (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {course.location}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {course.category} • {course.group}
                          {course.bimcoLegalEntity && ` • ${course.bimcoLegalEntity}`}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(course.startDate)}
                    </div>
                    <div className="text-sm text-gray-500">
                      to {formatDate(course.endDate)}
                    </div>
                    {course.timezone && (
                      <div className="text-xs text-gray-400 mt-1">
                        {course.timezone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UsersIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {course.participants.length}
                        {course.maxParticipants && ` / ${course.maxParticipants}`}
                      </span>
                    </div>
                    {course.revenue && (
                      <div className="text-xs text-gray-500 mt-1">
                        {course.revenue.ticketsSold} tickets sold
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {getStatusIcon(course.status)}
                      <span className="ml-1">{course.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {course.revenue ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          {formatCurrency(course.revenue.totalRevenue)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatCurrency(course.revenue.paidAmount)} paid
                        </div>
                        <div className={`text-xs font-medium ${revenueStatus.color}`}>
                          {revenueStatus.status}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        No finance data
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => onViewCourse(course.id)}
                      className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                      title="View Details"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEditCourse(course)}
                      className="text-gray-600 hover:text-gray-900 inline-flex items-center"
                      title="Edit Course"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredAndSortedCourses.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
