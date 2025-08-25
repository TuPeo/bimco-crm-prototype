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
                      {/* Content/Program Tab - placeholder for now */}
                      <div className="text-center py-8">
                        <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Content Management</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Rich text editor and file upload functionality will be implemented here.
                        </p>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      {/* Participants Tab - placeholder for now */}
                      <div className="text-center py-8">
                        <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Participant Management</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Participant registration and role management will be implemented here.
                        </p>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      {/* Logistics Tab - placeholder for now */}
                      <div className="text-center py-8">
                        <MapPinIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Logistics Management</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Venue, catering, and cost management will be implemented here.
                        </p>
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
