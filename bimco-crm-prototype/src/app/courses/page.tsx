'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { mockCourses } from '@/data/mockData';
import { Course } from '@/types';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  MapPinIcon,
  UsersIcon,
  CalendarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof Course>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Get unique categories for filter
  const uniqueCategories = Array.from(new Set(courses.map(c => c.category)));

  // Filter courses based on search and filters
  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.group.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (sortField === 'startDate') {
        const aValue = new Date(a[sortField]).getTime();
        const bValue = new Date(b[sortField]).getTime();
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      } else {
        const aValue = a[sortField] as string;
        const bValue = b[sortField] as string;
        
        if (sortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      }
    });

  const handleSort = (field: keyof Course) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Courses & Events
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage and view all courses and events in the BIMCO CRM system.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button className="bimco-btn-primary flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Course/Event
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bimco-card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <div className="text-sm text-gray-500 flex items-center">
              Showing {filteredCourses.length} of {courses.length} courses
            </div>
          </div>
        </div>

        {/* Courses Grid/List Toggle could go here */}

        {/* Courses Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bimco-card hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                  <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {course.category}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{course.group}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                <Link href={`/courses/${course.id}`} className="hover:text-blue-600">
                  {course.title}
                </Link>
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(course.startDate).toLocaleDateString()} 
                    {course.startDate !== course.endDate && (
                      <span> - {new Date(course.endDate).toLocaleDateString()}</span>
                    )}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span>{course.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  <span>
                    {course.participants.length} participant{course.participants.length !== 1 ? 's' : ''}
                    {course.maxParticipants && (
                      <span className="text-gray-400"> / {course.maxParticipants} max</span>
                    )}
                  </span>
                </div>
              </div>

              {course.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
              )}

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Link href={`/courses/${course.id}`}>
                    <button className="text-blue-600 hover:text-blue-900 text-sm flex items-center">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </Link>
                  <Link href={`/courses/${course.id}/edit`}>
                    <button className="text-gray-600 hover:text-gray-900 text-sm flex items-center">
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  </Link>
                </div>
                
                {course.status === 'Upcoming' && (
                  <button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100">
                    Manage Participants
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No courses match your current search criteria.
            </p>
            <div className="mt-6">
              <button className="bimco-btn-primary">Create New Course</button>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="flex justify-end space-x-3">
          <button className="bimco-btn-secondary">Export CSV</button>
          <button className="bimco-btn-secondary">Export Excel</button>
        </div>
      </div>
    </Layout>
  );
}
