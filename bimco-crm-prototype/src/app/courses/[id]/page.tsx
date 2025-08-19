'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { mockCourses } from '@/data/mockData';
import { Course } from '@/types';
import { 
  PencilIcon,
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
  TagIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function CourseDetail() {
  const params = useParams();
  const courseId = params?.id as string;
  
  const [activeTab, setActiveTab] = useState<'general' | 'schedule' | 'participants' | 'content'>('general');
  const [isEditing, setIsEditing] = useState(false);

  const course = mockCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
          <p className="mt-2 text-gray-600">The requested course could not be found.</p>
          <Link href="/courses" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-500">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </div>
      </Layout>
    );
  }

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

  const tabs = [
    { id: 'general', name: 'General Info', icon: TagIcon },
    { id: 'schedule', name: 'Schedule', icon: CalendarIcon },
    { id: 'participants', name: 'Participants', icon: UsersIcon },
    { id: 'content', name: 'Content & Program', icon: ClockIcon },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/courses" className="text-gray-400 hover:text-gray-600">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                {course.title}
              </h1>
              <p className="text-sm text-gray-600">Course ID: {course.id}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`${isEditing ? 'bimco-btn-secondary' : 'bimco-btn-primary'} flex items-center`}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button className="bimco-btn-primary">Save Changes</button>
            )}
          </div>
        </div>

        {/* Status and Category Badges */}
        <div className="flex items-center space-x-4">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(course.status)}`}>
            Status: {course.status}
          </span>
          <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-purple-100 text-purple-800">
            Category: {course.category}
          </span>
          <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-gray-100 text-gray-800">
            Group: {course.group}
          </span>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bimco-card">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Start Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(course.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bimco-card">
            <div className="flex items-center">
              <MapPinIcon className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Location</p>
                <p className="text-lg font-semibold text-gray-900">{course.location}</p>
              </div>
            </div>
          </div>
          
          <div className="bimco-card">
            <div className="flex items-center">
              <UsersIcon className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Participants</p>
                <p className="text-lg font-semibold text-gray-900">
                  {course.participants.length}
                  {course.maxParticipants && (
                    <span className="text-sm text-gray-400"> / {course.maxParticipants}</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bimco-card">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Duration</p>
                <p className="text-lg font-semibold text-gray-900">
                  {course.startDate === course.endDate ? '1 day' : 
                   `${Math.ceil((new Date(course.endDate).getTime() - new Date(course.startDate).getTime()) / (1000 * 3600 * 24)) + 1} days`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'general' | 'schedule' | 'participants' | 'content')}
                className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon
                  className={`-ml-0.5 mr-2 h-5 w-5 ${
                    activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {tab.name}
                {tab.id === 'participants' && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs font-medium">
                    {course.participants.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Course Information</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Course ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.id}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.category}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Group</dt>
                    <dd className="mt-1 text-sm text-gray-900">{course.group}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
                {course.description ? (
                  <p className="text-sm text-gray-600">{course.description}</p>
                ) : (
                  <p className="text-sm text-gray-400 italic">No description available.</p>
                )}
                
                {course.maxParticipants && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Capacity</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(course.participants.length / course.maxParticipants) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {course.participants.length} / {course.maxParticipants}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="bimco-card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Information</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {new Date(course.startDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">End Date</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {new Date(course.endDate).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {course.location}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900 flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-400" />
                    {course.startDate === course.endDate ? '1 day' : 
                     `${Math.ceil((new Date(course.endDate).getTime() - new Date(course.startDate).getTime()) / (1000 * 3600 * 24)) + 1} days`}
                  </dd>
                </div>
              </dl>
            </div>
          )}

          {activeTab === 'participants' && (
            <div className="bimco-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Participants</h3>
                <button className="bimco-btn-primary flex items-center text-sm">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Participant
                </button>
              </div>
              
              {course.participants.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="bimco-table">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col">Contact Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Registration Date</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {course.participants.map((participant, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="font-medium text-blue-600">
                            <Link href={`/contacts/${participant.contactId}`}>
                              {participant.contactName}
                            </Link>
                          </td>
                          <td>
                            <a href={`mailto:${participant.email}`} className="text-blue-600 hover:text-blue-500 text-sm">
                              {participant.email}
                            </a>
                          </td>
                          <td>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              participant.role === 'Instructor' ? 'bg-purple-100 text-purple-800' :
                              participant.role === 'Organizer' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {participant.role}
                            </span>
                          </td>
                          <td className="text-gray-500">
                            {new Date(participant.registrationDate).toLocaleDateString()}
                          </td>
                          <td>
                            <button className="text-red-600 hover:text-red-900 text-sm">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No participants yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No participants have registered for this course yet.
                  </p>
                  <div className="mt-6">
                    <button className="bimco-btn-primary flex items-center">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add First Participant
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bimco-card">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Course Content & Program</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Agenda / Program</h4>
                    <div className="mt-2 p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        Course agenda and detailed program will be displayed here. 
                        This can include rich text content or uploaded files.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Materials</h4>
                    <div className="mt-2">
                      <div className="bg-gray-50 rounded-md p-4">
                        <p className="text-sm text-gray-600">No materials uploaded yet.</p>
                        <button className="mt-2 text-sm text-blue-600 hover:text-blue-500">
                          Upload Materials
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
