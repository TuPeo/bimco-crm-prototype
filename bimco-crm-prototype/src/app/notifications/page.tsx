'use client';

import Layout from '@/components/Layout';
import { BellIcon, EnvelopeIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const mockNotifications = [
  {
    id: '1',
    type: 'system',
    title: 'System Maintenance Scheduled',
    message: 'The system will undergo maintenance on August 25, 2024 from 02:00-04:00 Copenhagen time.',
    timestamp: '2024-08-19T10:00:00Z',
    read: false,
    priority: 'medium'
  },
  {
    id: '2',
    type: 'course',
    title: 'Course Registration Deadline',
    message: 'Registration for "Maritime Safety Management" closes in 3 days.',
    timestamp: '2024-08-19T09:30:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'email',
    title: 'Email Campaign Sent',
    message: 'Newsletter "Maritime Updates August 2024" has been sent to 1,247 recipients.',
    timestamp: '2024-08-19T08:15:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'system',
    title: 'New Contact Added',
    message: 'Contact "Maria Rodriguez" has been added to "CMA CGM Group".',
    timestamp: '2024-08-18T16:45:00Z',
    read: true,
    priority: 'low'
  }
];

export default function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return EnvelopeIcon;
      case 'course':
        return ExclamationTriangleIcon;
      default:
        return BellIcon;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-300 bg-red-50';
      case 'medium':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email':
        return 'bg-green-100 text-green-800';
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'system':
        return 'bg-purple-100 text-purple-800';
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
              Notifications
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage system notifications, email campaigns, and alerts.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-3">
            <button className="bimco-btn-secondary">Mark All as Read</button>
            <button className="bimco-btn-primary">Settings</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bimco-card">
            <div className="flex items-center">
              <BellIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Notifications</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockNotifications.filter(n => !n.read).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bimco-card">
            <div className="flex items-center">
              <EnvelopeIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Email Campaigns</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </div>
          
          <div className="bimco-card">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {mockNotifications.filter(n => n.priority === 'high').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bimco-card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {mockNotifications.map((notification) => {
              const IconComponent = getIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(notification.type)}`}>
                            {notification.type}
                          </span>
                          {notification.priority === 'high' && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                              High Priority
                            </span>
                          )}
                        </div>
                        <time className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </time>
                      </div>
                      <p className={`mt-1 text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <div className="mt-2 flex space-x-2">
                        {!notification.read && (
                          <button className="text-xs text-blue-600 hover:text-blue-500">
                            Mark as read
                          </button>
                        )}
                        <button className="text-xs text-gray-600 hover:text-gray-500">
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dotdigital Integration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bimco-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Dotdigital Campaign Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Newsletter August 2024</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  Sent
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Course Reminder Series</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Member Welcome Series</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Draft
                </span>
              </div>
            </div>
            <button className="mt-4 bimco-btn-secondary w-full">View All Campaigns</button>
          </div>

          <div className="bimco-card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mail Queue</h3>
            <div className="space-y-3">
              <div className="text-center text-gray-500">
                <EnvelopeIcon className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm">No emails in queue</p>
                <p className="text-xs text-gray-400">All emails have been processed</p>
              </div>
            </div>
            <button className="mt-4 bimco-btn-secondary w-full">View Queue History</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
