'use client';

import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { Course, CourseParticipant, TicketType, DiscountCode } from '@/types';
import {
  XMarkIcon,
  InformationCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  UsersIcon,
  MapPinIcon,
  PlusIcon,
  CalendarIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  PaperClipIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  CakeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface CourseEventDetailCardProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  onSave: (course: Course) => void;
  readOnly?: boolean;
}

const BIMCO_LEGAL_ENTITIES = [
  'BIMCO Copenhagen',
  'BIMCO Singapore',
  'BIMCO London',
  'BIMCO USA',
  'BIMCO Education',
  'BIMCO Training',
];

const TIMEZONES = [
  'UTC',
  'Europe/Copenhagen',
  'Europe/London', 
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function CourseEventDetailCard({
  isOpen,
  onClose,
  course,
  onSave,
  readOnly = false
}: CourseEventDetailCardProps) {
  const [editedCourse, setEditedCourse] = useState<Course>(course);
  const [activeTab, setActiveTab] = useState(0);

  const handleSave = () => {
    onSave(editedCourse);
    onClose();
  };

  const updateCourse = (updates: Partial<Course>) => {
    setEditedCourse(prev => ({ ...prev, ...updates }));
  };

  const tabs = [
    { name: 'General Info', icon: InformationCircleIcon },
    { name: 'Schedule', icon: ClockIcon },
    { name: 'Content/Program', icon: DocumentTextIcon },
    { name: 'Participants', icon: UsersIcon },
    { name: 'Logistics', icon: MapPinIcon },
  ];

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // General Info Tab Content
  const GeneralInfoTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Title *
            </label>
            <input
              type="text"
              value={editedCourse.title}
              onChange={(e) => updateCourse({ title: e.target.value })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={editedCourse.category}
              onChange={(e) => updateCourse({ category: e.target.value })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="Maritime Training">Maritime Training</option>
              <option value="Safety & Security">Safety & Security</option>
              <option value="Environmental">Environmental</option>
              <option value="Legal & Regulatory">Legal & Regulatory</option>
              <option value="Technology">Technology</option>
              <option value="Leadership">Leadership</option>
              <option value="Commercial">Commercial</option>
              <option value="Technical">Technical</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group/Department
            </label>
            <input
              type="text"
              value={editedCourse.group}
              onChange={(e) => updateCourse({ group: e.target.value })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BIMCO Legal Entity
            </label>
            <select
              value={editedCourse.bimcoLegalEntity || ''}
              onChange={(e) => updateCourse({ bimcoLegalEntity: e.target.value })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="">Select Entity</option>
              {BIMCO_LEGAL_ENTITIES.map(entity => (
                <option key={entity} value={entity}>{entity}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status and Capacity */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={editedCourse.status}
              onChange={(e) => updateCourse({ status: e.target.value as Course['status'] })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Participants
            </label>
            <input
              type="number"
              value={editedCourse.maxParticipants || ''}
              onChange={(e) => updateCourse({ maxParticipants: parseInt(e.target.value) || undefined })}
              disabled={readOnly}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={editedCourse.location}
              onChange={(e) => updateCourse({ location: e.target.value })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          {/* Current Statistics */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Current Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Registered:</span>
                <span className="ml-2 font-medium">{editedCourse.participants.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Available:</span>
                <span className="ml-2 font-medium">
                  {editedCourse.maxParticipants ? editedCourse.maxParticipants - editedCourse.participants.length : '∞'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={editedCourse.description || ''}
          onChange={(e) => updateCourse({ description: e.target.value })}
          disabled={readOnly}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          placeholder="Describe the course objectives, target audience, and key benefits..."
        />
      </div>
    </div>
  );

  // Schedule Tab Content
  const ScheduleTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date & Time */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time *
            </label>
            <input
              type="datetime-local"
              value={editedCourse.startDate ? new Date(editedCourse.startDate).toISOString().slice(0, 16) : ''}
              onChange={(e) => updateCourse({ startDate: new Date(e.target.value).toISOString() })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date & Time *
            </label>
            <input
              type="datetime-local"
              value={editedCourse.endDate ? new Date(editedCourse.endDate).toISOString().slice(0, 16) : ''}
              onChange={(e) => updateCourse({ endDate: new Date(e.target.value).toISOString() })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              value={editedCourse.timezone || 'UTC'}
              onChange={(e) => updateCourse({ timezone: e.target.value })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              {TIMEZONES.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Recurrence */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recurrence Pattern
            </label>
            <select
              value={editedCourse.recurrence?.type || 'none'}
              onChange={(e) => updateCourse({ 
                recurrence: { 
                  ...editedCourse.recurrence, 
                  type: e.target.value as 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly',
                  interval: 1
                } 
              })}
              disabled={readOnly}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            >
              <option value="none">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {editedCourse.recurrence?.type !== 'none' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat Every
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={editedCourse.recurrence?.interval || 1}
                    onChange={(e) => updateCourse({ 
                      recurrence: { 
                        ...editedCourse.recurrence!, 
                        interval: parseInt(e.target.value) || 1
                      } 
                    })}
                    disabled={readOnly}
                    min="1"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                  />
                  <span className="text-sm text-gray-600">
                    {editedCourse.recurrence?.type === 'daily' && 'day(s)'}
                    {editedCourse.recurrence?.type === 'weekly' && 'week(s)'}
                    {editedCourse.recurrence?.type === 'monthly' && 'month(s)'}
                    {editedCourse.recurrence?.type === 'yearly' && 'year(s)'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recurrence End Date
                </label>
                <input
                  type="date"
                  value={editedCourse.recurrence?.endDate ? editedCourse.recurrence.endDate.split('T')[0] : ''}
                  onChange={(e) => updateCourse({ 
                    recurrence: { 
                      ...editedCourse.recurrence!, 
                      endDate: e.target.value ? new Date(e.target.value).toISOString() : undefined
                    } 
                  })}
                  disabled={readOnly}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Schedule Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Schedule Summary
        </h4>
        <div className="text-sm text-blue-800 space-y-1">
          <div><strong>Start:</strong> {formatDateTime(editedCourse.startDate)}</div>
          <div><strong>End:</strong> {formatDateTime(editedCourse.endDate)}</div>
          <div><strong>Timezone:</strong> {editedCourse.timezone || 'UTC'}</div>
          {editedCourse.recurrence?.type !== 'none' && editedCourse.recurrence && (
            <div>
              <strong>Recurrence:</strong> Every {editedCourse.recurrence.interval} {editedCourse.recurrence.type}
              {editedCourse.recurrence.endDate && ` until ${formatDateTime(editedCourse.recurrence.endDate)}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      {readOnly ? 'Course Details' : 'Edit Course'}
                    </Dialog.Title>
                    <p className="text-sm text-gray-500 mt-1">
                      {editedCourse.title}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Tabs */}
                <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                  <Tab.List className="flex space-x-1 border-b border-gray-200 px-6">
                    {tabs.map((tab, index) => (
                      <Tab
                        key={tab.name}
                        className={({ selected }) =>
                          classNames(
                            'flex items-center px-4 py-3 text-sm font-medium focus:outline-none',
                            selected
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-500 hover:text-gray-700'
                          )
                        }
                      >
                        <tab.icon className="h-4 w-4 mr-2" />
                        {tab.name}
                      </Tab>
                    ))}
                  </Tab.List>

                  <Tab.Panels className="p-6">
                    <Tab.Panel>
                      <GeneralInfoTab />
                    </Tab.Panel>
                    <Tab.Panel>
                      <ScheduleTab />
                    </Tab.Panel>
                    <Tab.Panel>
                      {/* Content/Program Tab */}
                      <div className="p-6 space-y-6">
                        {/* Agenda/Program Section */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Agenda / Program
                          </label>
                          <textarea
                            rows={8}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter the course agenda, program outline, or schedule details..."
                            value={editedCourse.content?.program || ''}
                            onChange={(e) => updateCourse({
                              content: {
                                ...editedCourse.content,
                                program: e.target.value
                              }
                            })}
                            disabled={readOnly}
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Rich text formatting and file upload will be available in future versions
                          </p>
                        </div>

                        {/* Materials Section */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Course Materials
                            </label>
                            {!readOnly && (
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
                              >
                                <PlusIcon className="h-3 w-3 mr-1" />
                                Add File
                              </button>
                            )}
                          </div>
                          
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            {editedCourse.content?.materials && editedCourse.content.materials.length > 0 ? (
                              <div className="space-y-2">
                                {editedCourse.content.materials.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      <PaperClipIcon className="h-4 w-4 text-gray-400 mr-2" />
                                      <span className="text-sm text-gray-900">{file.name}</span>
                                      <span className="ml-2 text-xs text-gray-500">
                                        ({Math.round(file.size / 1024)}KB)
                                      </span>
                                    </div>
                                    {!readOnly && (
                                      <button
                                        type="button"
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <XMarkIcon className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center">
                                <PaperClipIcon className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">No materials uploaded</p>
                                <p className="text-xs text-gray-500">
                                  {readOnly ? 'No files available for this course' : 'Click "Add File" to upload course materials'}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description Section */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Description
                          </label>
                          <textarea
                            rows={6}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Detailed description of the course objectives, target audience, and learning outcomes..."
                            value={editedCourse.description || ''}
                            onChange={(e) => updateCourse({ description: e.target.value })}
                            disabled={readOnly}
                          />
                        </div>

                        {/* Learning Objectives */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Learning Objectives
                          </label>
                          <div className="space-y-2">
                            {editedCourse.content?.objectives?.map((objective, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{objective}</span>
                                {!readOnly && (
                                  <button
                                    type="button"
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <XMarkIcon className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            )) || (
                              <p className="text-sm text-gray-500 italic">No learning objectives defined</p>
                            )}
                            {!readOnly && (
                              <button
                                type="button"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                              >
                                <PlusIcon className="h-3 w-3 mr-1" />
                                Add Objective
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Prerequisites */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Prerequisites
                          </label>
                          <div className="space-y-2">
                            {editedCourse.content?.prerequisites?.map((prereq, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{prereq}</span>
                                {!readOnly && (
                                  <button
                                    type="button"
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <XMarkIcon className="h-3 w-3" />
                                  </button>
                                )}
                              </div>
                            )) || (
                              <p className="text-sm text-gray-500 italic">No prerequisites defined</p>
                            )}
                            {!readOnly && (
                              <button
                                type="button"
                                className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                              >
                                <PlusIcon className="h-3 w-3 mr-1" />
                                Add Prerequisite
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      {/* Participants Tab */}
                      <div className="p-6 space-y-6">
                        {/* Add Participant Section */}
                        {!readOnly && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">Add Participants</h3>
                                <p className="text-xs text-gray-500">Search and add contacts to this course</p>
                              </div>
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Add Participant
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Participants Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <UsersIcon className="h-5 w-5 text-blue-600" />
                              <span className="ml-2 text-sm font-medium text-blue-900">Total Participants</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-2xl font-bold text-blue-900">{editedCourse.participants.length}</span>
                              {editedCourse.maxParticipants && (
                                <span className="text-sm text-blue-600 ml-1">/ {editedCourse.maxParticipants}</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <CheckCircleIcon className="h-5 w-5 text-green-600" />
                              <span className="ml-2 text-sm font-medium text-green-900">Confirmed</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-2xl font-bold text-green-900">
                                {editedCourse.participants.filter(p => p.paymentStatus === 'paid' || p.paymentStatus === 'complimentary').length}
                              </span>
                            </div>
                          </div>

                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 text-yellow-600" />
                              <span className="ml-2 text-sm font-medium text-yellow-900">Pending</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-2xl font-bold text-yellow-900">
                                {editedCourse.participants.filter(p => p.paymentStatus === 'pending').length}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Participants List */}
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-gray-900">Participant List</h3>
                            <div className="text-xs text-gray-500">
                              Click on participant names to view contact details
                            </div>
                          </div>

                          {editedCourse.participants.length > 0 ? (
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                              <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Participant
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Contact
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Payment Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Registration Date
                                    </th>
                                    {!readOnly && (
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                      </th>
                                    )}
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {editedCourse.participants.map((participant, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                          type="button"
                                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                          title="Click to view contact details"
                                        >
                                          {participant.contactName}
                                        </button>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                          participant.role === 'Instructor' 
                                            ? 'bg-purple-100 text-purple-800'
                                            : participant.role === 'Organizer'
                                            ? 'bg-blue-100 text-blue-800'
                                            : participant.role === 'Speaker'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {participant.role}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div>
                                          <div>{participant.email}</div>
                                          {/* Phone would be added from contact details */}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                          participant.paymentStatus === 'paid' || participant.paymentStatus === 'complimentary'
                                            ? 'bg-green-100 text-green-800'
                                            : participant.paymentStatus === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : participant.paymentStatus === 'cancelled'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {participant.paymentStatus.charAt(0).toUpperCase() + participant.paymentStatus.slice(1)}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(participant.registrationDate).toLocaleDateString()}
                                      </td>
                                      {!readOnly && (
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                          <button
                                            type="button"
                                            className="text-red-600 hover:text-red-800"
                                            title="Remove participant (confirmation required)"
                                          >
                                            Remove
                                          </button>
                                        </td>
                                      )}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                              <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <h3 className="mt-2 text-sm font-medium text-gray-900">No participants yet</h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {readOnly ? 'No participants registered for this course' : 'Start by adding participants to this course'}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Special Requirements Summary */}
                        {editedCourse.participants.some(p => p.specialRequirements && p.specialRequirements.length > 0) && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Special Requirements</h3>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                              <div className="space-y-2">
                                {editedCourse.participants
                                  .filter(p => p.specialRequirements && p.specialRequirements.length > 0)
                                  .map((participant, index) => (
                                    <div key={index} className="text-sm">
                                      <span className="font-medium">{participant.contactName}:</span>
                                      <span className="ml-2 text-gray-700">
                                        {participant.specialRequirements?.join(', ')}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      {/* Logistics Tab */}
                      <div className="p-6 space-y-6">
                        {/* Venue Details Section */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Venue Information</h3>
                          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Venue Name
                                </label>
                                <input
                                  type="text"
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                  placeholder="Enter venue name"
                                  value={editedCourse.logistics?.venue?.name || ''}
                                  onChange={(e) => updateCourse({
                                    logistics: {
                                      ...editedCourse.logistics,
                                      venue: {
                                        ...editedCourse.logistics?.venue,
                                        name: e.target.value,
                                        address: editedCourse.logistics?.venue?.address || '',
                                        capacity: editedCourse.logistics?.venue?.capacity || 0,
                                        facilities: editedCourse.logistics?.venue?.facilities || []
                                      }
                                    }
                                  })}
                                  disabled={readOnly}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Capacity
                                </label>
                                <input
                                  type="number"
                                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                  placeholder="Max capacity"
                                  value={editedCourse.logistics?.venue?.capacity || ''}
                                  onChange={(e) => updateCourse({
                                    logistics: {
                                      ...editedCourse.logistics,
                                      venue: {
                                        ...editedCourse.logistics?.venue,
                                        name: editedCourse.logistics?.venue?.name || '',
                                        address: editedCourse.logistics?.venue?.address || '',
                                        capacity: parseInt(e.target.value) || 0,
                                        facilities: editedCourse.logistics?.venue?.facilities || []
                                      }
                                    }
                                  })}
                                  disabled={readOnly}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                              </label>
                              <textarea
                                rows={3}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Full venue address"
                                value={editedCourse.logistics?.venue?.address || ''}
                                onChange={(e) => updateCourse({
                                  logistics: {
                                    ...editedCourse.logistics,
                                    venue: {
                                      ...editedCourse.logistics?.venue,
                                      name: editedCourse.logistics?.venue?.name || '',
                                      address: e.target.value,
                                      capacity: editedCourse.logistics?.venue?.capacity || 0,
                                      facilities: editedCourse.logistics?.venue?.facilities || []
                                    }
                                  }
                                })}
                                disabled={readOnly}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contact Information
                              </label>
                              <input
                                type="text"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Venue contact person or phone"
                                value={editedCourse.logistics?.venue?.contactInfo || ''}
                                onChange={(e) => updateCourse({
                                  logistics: {
                                    ...editedCourse.logistics,
                                    venue: {
                                      ...editedCourse.logistics?.venue,
                                      name: editedCourse.logistics?.venue?.name || '',
                                      address: editedCourse.logistics?.venue?.address || '',
                                      capacity: editedCourse.logistics?.venue?.capacity || 0,
                                      facilities: editedCourse.logistics?.venue?.facilities || [],
                                      contactInfo: e.target.value
                                    }
                                  }
                                })}
                                disabled={readOnly}
                              />
                            </div>

                            {/* Facilities */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Facilities
                              </label>
                              <div className="space-y-2">
                                {['WiFi', 'Projector', 'Sound System', 'Air Conditioning', 'Parking', 'Catering Kitchen', 'Breakout Rooms'].map((facility) => (
                                  <label key={facility} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                      checked={editedCourse.logistics?.venue?.facilities?.includes(facility) || false}
                                      onChange={(e) => {
                                        const currentFacilities = editedCourse.logistics?.venue?.facilities || [];
                                        const newFacilities = e.target.checked
                                          ? [...currentFacilities, facility]
                                          : currentFacilities.filter(f => f !== facility);
                                        updateCourse({
                                          logistics: {
                                            ...editedCourse.logistics,
                                            venue: {
                                              ...editedCourse.logistics?.venue,
                                              name: editedCourse.logistics?.venue?.name || '',
                                              address: editedCourse.logistics?.venue?.address || '',
                                              capacity: editedCourse.logistics?.venue?.capacity || 0,
                                              facilities: newFacilities
                                            }
                                          }
                                        });
                                      }}
                                      disabled={readOnly}
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{facility}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Catering Section */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Catering & Facilities</h3>
                          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                            <div>
                              <label className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  checked={editedCourse.logistics?.catering?.included || false}
                                  onChange={(e) => updateCourse({
                                    logistics: {
                                      ...editedCourse.logistics,
                                      catering: {
                                        ...editedCourse.logistics?.catering,
                                        included: e.target.checked
                                      }
                                    }
                                  })}
                                  disabled={readOnly}
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">Catering Included</span>
                              </label>
                            </div>

                            {editedCourse.logistics?.catering?.included && (
                              <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Catering Type
                                    </label>
                                    <select
                                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                      value={editedCourse.logistics?.catering?.type || ''}
                                      onChange={(e) => updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          catering: {
                                            ...editedCourse.logistics?.catering,
                                            type: e.target.value as any
                                          }
                                        }
                                      })}
                                      disabled={readOnly}
                                    >
                                      <option value="">Select catering type</option>
                                      <option value="breakfast">Breakfast</option>
                                      <option value="lunch">Lunch</option>
                                      <option value="dinner">Dinner</option>
                                      <option value="coffee">Coffee Breaks</option>
                                      <option value="full">Full Catering</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Cost per Person
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                      <input
                                        type="number"
                                        className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="0.00"
                                        value={editedCourse.logistics?.catering?.cost || ''}
                                        onChange={(e) => updateCourse({
                                          logistics: {
                                            ...editedCourse.logistics,
                                            catering: {
                                              ...editedCourse.logistics?.catering,
                                              cost: parseFloat(e.target.value) || 0
                                            }
                                          }
                                        })}
                                        disabled={readOnly}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dietary Restrictions
                                  </label>
                                  <div className="space-y-2">
                                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Nut Allergies', 'Dairy-Free'].map((restriction) => (
                                      <label key={restriction} className="flex items-center">
                                        <input
                                          type="checkbox"
                                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                          checked={editedCourse.logistics?.catering?.dietaryRestrictions?.includes(restriction) || false}
                                          onChange={(e) => {
                                            const currentRestrictions = editedCourse.logistics?.catering?.dietaryRestrictions || [];
                                            const newRestrictions = e.target.checked
                                              ? [...currentRestrictions, restriction]
                                              : currentRestrictions.filter(r => r !== restriction);
                                            updateCourse({
                                              logistics: {
                                                ...editedCourse.logistics,
                                                catering: {
                                                  ...editedCourse.logistics?.catering,
                                                  dietaryRestrictions: newRestrictions
                                                }
                                              }
                                            });
                                          }}
                                          disabled={readOnly}
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{restriction}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Equipment Section */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Equipment & Resources</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-2">
                              {['Laptops/Tablets', 'Training Materials', 'Certificates', 'Name Tags', 'Folders/Notebooks', 'Pens/Stationery', 'Extension Cords'].map((equipment) => (
                                <label key={equipment} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={editedCourse.logistics?.equipment?.includes(equipment) || false}
                                    onChange={(e) => {
                                      const currentEquipment = editedCourse.logistics?.equipment || [];
                                      const newEquipment = e.target.checked
                                        ? [...currentEquipment, equipment]
                                        : currentEquipment.filter(eq => eq !== equipment);
                                      updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          equipment: newEquipment
                                        }
                                      });
                                    }}
                                    disabled={readOnly}
                                  />
                                  <span className="ml-2 text-sm text-gray-700">{equipment}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Costs Summary */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Venue Cost
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                  <input
                                    type="number"
                                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="0.00"
                                    value={editedCourse.logistics?.costs?.venue || ''}
                                    onChange={(e) => {
                                      const venue = parseFloat(e.target.value) || 0;
                                      const costs = editedCourse.logistics?.costs || { venue: 0, catering: 0, materials: 0, instructor: 0, other: 0, total: 0 };
                                      const newTotal = venue + costs.catering + costs.materials + costs.instructor + costs.other;
                                      updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          costs: { ...costs, venue, total: newTotal }
                                        }
                                      });
                                    }}
                                    disabled={readOnly}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Catering Cost
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                  <input
                                    type="number"
                                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="0.00"
                                    value={editedCourse.logistics?.costs?.catering || ''}
                                    onChange={(e) => {
                                      const catering = parseFloat(e.target.value) || 0;
                                      const costs = editedCourse.logistics?.costs || { venue: 0, catering: 0, materials: 0, instructor: 0, other: 0, total: 0 };
                                      const newTotal = costs.venue + catering + costs.materials + costs.instructor + costs.other;
                                      updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          costs: { ...costs, catering, total: newTotal }
                                        }
                                      });
                                    }}
                                    disabled={readOnly}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Materials Cost
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                  <input
                                    type="number"
                                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="0.00"
                                    value={editedCourse.logistics?.costs?.materials || ''}
                                    onChange={(e) => {
                                      const materials = parseFloat(e.target.value) || 0;
                                      const costs = editedCourse.logistics?.costs || { venue: 0, catering: 0, materials: 0, instructor: 0, other: 0, total: 0 };
                                      const newTotal = costs.venue + costs.catering + materials + costs.instructor + costs.other;
                                      updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          costs: { ...costs, materials, total: newTotal }
                                        }
                                      });
                                    }}
                                    disabled={readOnly}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Instructor Cost
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                  <input
                                    type="number"
                                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="0.00"
                                    value={editedCourse.logistics?.costs?.instructor || ''}
                                    onChange={(e) => {
                                      const instructor = parseFloat(e.target.value) || 0;
                                      const costs = editedCourse.logistics?.costs || { venue: 0, catering: 0, materials: 0, instructor: 0, other: 0, total: 0 };
                                      const newTotal = costs.venue + costs.catering + costs.materials + instructor + costs.other;
                                      updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          costs: { ...costs, instructor, total: newTotal }
                                        }
                                      });
                                    }}
                                    disabled={readOnly}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Other Costs
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                  <input
                                    type="number"
                                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="0.00"
                                    value={editedCourse.logistics?.costs?.other || ''}
                                    onChange={(e) => {
                                      const other = parseFloat(e.target.value) || 0;
                                      const costs = editedCourse.logistics?.costs || { venue: 0, catering: 0, materials: 0, instructor: 0, other: 0, total: 0 };
                                      const newTotal = costs.venue + costs.catering + costs.materials + costs.instructor + other;
                                      updateCourse({
                                        logistics: {
                                          ...editedCourse.logistics,
                                          costs: { ...costs, other, total: newTotal }
                                        }
                                      });
                                    }}
                                    disabled={readOnly}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Total Cost
                                </label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                                  <input
                                    type="number"
                                    className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-sm"
                                    value={editedCourse.logistics?.costs?.total || ''}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>

                {/* Footer */}
                {!readOnly && (
                  <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                    <button
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
