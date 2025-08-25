'use client';

import { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CheckIcon, 
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { BellIcon as BellSolidIcon } from '@heroicons/react/24/solid';

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error' | 'task' | 'system';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'course' | 'contact' | 'fleet' | 'payment' | 'system' | 'user';
  actionUrl?: string;
  metadata?: {
    entityId?: string;
    entityType?: string;
    [key: string]: string | number | boolean | undefined;
  };
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (notificationId: string) => void;
  onClearAll: () => void;
}

export default function InternalNotificationCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | Notification['type']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'type'>('date');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XMarkIcon className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'task':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case 'system':
        return <AdjustmentsHorizontalIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.isRead;
      return notification.type === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {unreadCount > 0 ? (
          <BellSolidIcon className="w-6 h-6 text-blue-600" />
        ) : (
          <BellIcon className="w-6 h-6" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications ({unreadCount} unread)
                </h3>
                <div className="flex space-x-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={onClearAll}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex space-x-2 mt-3">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                  <option value="task">Task</option>
                  <option value="system">System</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'type')}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="date">Date</option>
                  <option value="priority">Priority</option>
                  <option value="type">Type</option>
                </select>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <BellIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No notifications to display</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 hover:bg-gray-50 transition-colors ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    } ${getPriorityColor(notification.priority)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${
                              !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500 ml-2">
                              {formatTimestamp(notification.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                notification.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {notification.priority}
                              </span>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {notification.category}
                              </span>
                            </div>
                            <div className="flex space-x-1">
                              {!notification.isRead && (
                                <button
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="text-gray-400 hover:text-blue-600"
                                  title="Mark as read"
                                >
                                  <EyeIcon className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => onDelete(notification.id)}
                                className="text-gray-400 hover:text-red-600"
                                title="Delete"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-800"
              >
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
