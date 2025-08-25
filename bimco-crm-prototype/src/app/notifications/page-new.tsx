'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  BellIcon, 
  BuildingOfficeIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'membership' | 'course' | 'contract' | 'invoice';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'membership',
    title: 'New Company Registration',
    message: 'Maritime Solutions Ltd has applied for membership.',
    timestamp: '2025-08-25T08:30:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'course',
    title: 'Course Registration',
    message: 'Maersk Group registered 25 employees for Maritime Law.',
    timestamp: '2025-08-25T07:45:00Z',
    read: false,
    priority: 'medium'
  }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
            <p className="mt-2 text-gray-600">Centralized notification management</p>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <BellIcon className="h-5 w-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-blue-600 text-sm hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          notification.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.priority}
                        </span>
                        <time className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
