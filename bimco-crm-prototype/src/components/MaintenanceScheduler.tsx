'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Fleet, MaintenanceRecord } from '../types';
import {
  CalendarIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface MaintenanceSchedulerProps {
  fleet: Fleet;
  onSchedule: (maintenanceData: Partial<MaintenanceRecord>) => void;
  onUpdate?: (id: string, maintenanceData: Partial<MaintenanceRecord>) => void;
  onClose?: () => void;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'maintenance' | 'inspection' | 'survey' | 'repair';
  status: 'scheduled' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  record?: MaintenanceRecord;
}

export default function MaintenanceScheduler({
  fleet,
  onSchedule,
  onUpdate,
  onClose
}: MaintenanceSchedulerProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'timeline'>('month');
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const generateCalendarEvents = useCallback(() => {
    const calendarEvents: CalendarEvent[] = [];

    // Convert maintenance records to calendar events
    fleet.maintenanceRecords?.forEach(record => {
      calendarEvents.push({
        id: record.id,
        title: record.type,
        date: new Date(record.scheduledDate),
        type: 'maintenance',
        status: record.status.toLowerCase() as 'scheduled' | 'in-progress' | 'completed' | 'overdue',
        priority: getPriorityFromType(record.type),
        record
      });
    });

    // Add upcoming routine maintenance (mock data)
    const routineMaintenance = [
      { type: 'Engine Inspection', interval: 90, priority: 'high' as const },
      { type: 'Safety Equipment Check', interval: 30, priority: 'medium' as const },
      { type: 'Hull Inspection', interval: 180, priority: 'medium' as const },
      { type: 'Certificate Renewal', interval: 365, priority: 'critical' as const }
    ];

    routineMaintenance.forEach(maintenance => {
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + maintenance.interval);
      
      calendarEvents.push({
        id: `routine-${maintenance.type.toLowerCase().replace(/\s+/g, '-')}`,
        title: maintenance.type,
        date: nextDate,
        type: 'maintenance',
        status: 'scheduled',
        priority: maintenance.priority
      });
    });

    setEvents(calendarEvents.sort((a, b) => a.date.getTime() - b.date.getTime()));
  }, [fleet.maintenanceRecords]);

  useEffect(() => {
    generateCalendarEvents();
  }, [generateCalendarEvents]);

  const getPriorityFromType = (type: string): 'low' | 'medium' | 'high' | 'critical' => {
    const highPriorityTypes = ['engine', 'safety', 'structural'];
    const criticalTypes = ['emergency', 'critical', 'safety critical'];
    
    const lowerType = type.toLowerCase();
    
    if (criticalTypes.some(t => lowerType.includes(t))) return 'critical';
    if (highPriorityTypes.some(t => lowerType.includes(t))) return 'high';
    if (lowerType.includes('routine') || lowerType.includes('inspection')) return 'medium';
    return 'low';
  };

  const getEventColor = (event: CalendarEvent) => {
    const colors = {
      scheduled: {
        critical: 'bg-red-100 text-red-800 border-red-200',
        high: 'bg-orange-100 text-orange-800 border-orange-200',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        low: 'bg-green-100 text-green-800 border-green-200'
      },
      'in-progress': {
        critical: 'bg-red-200 text-red-900 border-red-300',
        high: 'bg-orange-200 text-orange-900 border-orange-300',
        medium: 'bg-yellow-200 text-yellow-900 border-yellow-300',
        low: 'bg-green-200 text-green-900 border-green-300'
      },
      completed: {
        critical: 'bg-gray-100 text-gray-600 border-gray-200',
        high: 'bg-gray-100 text-gray-600 border-gray-200',
        medium: 'bg-gray-100 text-gray-600 border-gray-200',
        low: 'bg-gray-100 text-gray-600 border-gray-200'
      },
      overdue: {
        critical: 'bg-red-200 text-red-900 border-red-400',
        high: 'bg-red-200 text-red-900 border-red-400',
        medium: 'bg-red-200 text-red-900 border-red-400',
        low: 'bg-red-200 text-red-900 border-red-400'
      }
    };
    
    return colors[event.status]?.[event.priority] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarMonth = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 bg-gray-50 border border-gray-200" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`h-32 border border-gray-200 p-1 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-200' : ''
          } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-blue-600' : 'text-gray-900'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded border truncate ${getEventColor(event)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 px-2">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {/* Day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-100 p-3 text-center font-medium text-gray-700 border-b border-gray-200">
            {day}
          </div>
        ))}
        {/* Calendar days */}
        {days}
      </div>
    );
  };

  const renderTimeline = () => {
    const sortedEvents = events.filter(event => event.date >= new Date());
    
    return (
      <div className="space-y-4">
        {sortedEvents.length > 0 ? (
          sortedEvents.map(event => (
            <div
              key={event.id}
              className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                event.status === 'overdue' ? 'border-red-300' : 'border-gray-200'
              }`}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <WrenchScrewdriverIcon className="h-4 w-4" />
                  <span>{event.title}</span>
                </h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getPriorityColor(event.priority)
                  }`}>
                    {event.priority.toUpperCase()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(event.status)
                  }`}>
                    {event.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{event.date.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{getDaysUntil(event.date)} days</span>
                </div>
              </div>
              {event.record && (
                <div className="mt-2 text-sm text-gray-600">
                  {event.record.description}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Maintenance</h3>
            <p className="text-gray-600">All maintenance tasks are up to date.</p>
          </div>
        )}
      </div>
    );
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDaysUntil = (date: Date) => {
    const diff = date.getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const handleScheduleNew = (eventData: {
    type: string;
    description: string;
    scheduledDate: string;
    vendor?: string;
    cost?: string;
    notes?: string;
  }) => {
    const newMaintenance: Partial<MaintenanceRecord> = {
      type: eventData.type,
      description: eventData.description,
      scheduledDate: eventData.scheduledDate,
      status: 'Scheduled',
      vendor: eventData.vendor,
      cost: eventData.cost ? parseInt(eventData.cost) : undefined,
      notes: eventData.notes
    };
    
    onSchedule(newMaintenance);
    setShowNewEventModal(false);
    generateCalendarEvents(); // Refresh events
  };

  const NewEventModal = () => {
    const [formData, setFormData] = useState({
      type: '',
      description: '',
      scheduledDate: '',
      vendor: '',
      cost: '',
      notes: ''
    });

    const maintenanceTypes = [
      'Engine Maintenance',
      'Hull Inspection',
      'Safety Equipment Check',
      'Electrical Systems',
      'Navigation Equipment',
      'Communication Systems',
      'Life Saving Equipment',
      'Fire Fighting Systems',
      'Deck Equipment',
      'Structural Maintenance',
      'Other'
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Schedule Maintenance</h3>
            <button
              onClick={() => setShowNewEventModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maintenance Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select type...</option>
                {maintenanceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Describe the maintenance work..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheduled Date
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor (Optional)
              </label>
              <input
                type="text"
                value={formData.vendor}
                onChange={(e) => setFormData({...formData, vendor: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Vendor name..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Cost (Optional)
              </label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                placeholder="Additional notes..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t">
            <button
              onClick={() => setShowNewEventModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleScheduleNew(formData)}
              disabled={!formData.type || !formData.description || !formData.scheduledDate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Maintenance Scheduler</h2>
          <p className="text-sm text-gray-600 mt-1">
            {fleet.name} - Maintenance planning and scheduling
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg">
            {(['month', 'timeline'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode === 'month' ? 'Calendar' : 'Timeline'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNewEventModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Schedule</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {viewMode === 'month' && (
        <>
          {/* Calendar Navigation */}
          <div className="flex items-center justify-between p-6 border-b">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Calendar */}
          <div className="p-6">
            {renderCalendarMonth()}
          </div>
        </>
      )}

      {viewMode === 'timeline' && (
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Maintenance</h3>
            <p className="text-sm text-gray-600">
              {events.filter(e => e.date >= new Date()).length} upcoming tasks
            </p>
          </div>
          {renderTimeline()}
        </div>
      )}

      {/* Modals */}
      {showNewEventModal && <NewEventModal />}

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Maintenance Details</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedEvent.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedEvent.record?.description || 'Routine maintenance task'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-sm text-gray-500">Scheduled Date:</span>
                  <span className="text-sm font-medium">{selectedEvent.date.toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Priority:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedEvent.priority)}`}>
                    {selectedEvent.priority.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEvent.status)}`}>
                    {selectedEvent.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {selectedEvent.record?.vendor && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Vendor:</span>
                    <span className="text-sm font-medium">{selectedEvent.record.vendor}</span>
                  </div>
                )}

                {selectedEvent.record?.cost && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-500">Cost:</span>
                    <span className="text-sm font-medium">${selectedEvent.record.cost.toLocaleString()}</span>
                  </div>
                )}

                {selectedEvent.record?.notes && (
                  <div className="pt-2 border-t">
                    <h5 className="text-sm font-medium text-gray-900 mb-1">Notes:</h5>
                    <p className="text-sm text-gray-600">{selectedEvent.record.notes}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {onUpdate && selectedEvent.record && (
                <button
                  onClick={() => {
                    // Handle update functionality
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
