'use client';

import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer, Views, Event, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Course } from '@/types';

const localizer = momentLocalizer(moment);

interface CalendarEvent extends Event {
  id: string;
  resource: Course;
}

interface CourseCalendarProps {
  courses: Course[];
  onSelectEvent?: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}

export default function CourseCalendar({ courses, onSelectEvent, onSelectSlot }: CourseCalendarProps) {
  // State for calendar navigation - start with current date (August 19, 2025)
  const [date, setDate] = useState(new Date(2025, 7, 19)); // Month is 0-indexed, so 7 = August
  const [view, setView] = useState<View>(Views.MONTH);

  // Navigation handlers
  const onNavigate = useCallback((newDate: Date) => {
    setDate(newDate);
  }, []);

  const onView = useCallback((newView: View) => {
    setView(newView);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const today = new Date(2025, 7, 19); // August 19, 2025
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setDate(prev => {
          const newDate = new Date(prev);
          if (view === Views.MONTH) {
            newDate.setMonth(prev.getMonth() - 1);
          } else if (view === Views.WEEK) {
            newDate.setDate(prev.getDate() - 7);
          } else if (view === Views.DAY) {
            newDate.setDate(prev.getDate() - 1);
          }
          return newDate;
        });
        break;
      case 'ArrowRight':
        event.preventDefault();
        setDate(prev => {
          const newDate = new Date(prev);
          if (view === Views.MONTH) {
            newDate.setMonth(prev.getMonth() + 1);
          } else if (view === Views.WEEK) {
            newDate.setDate(prev.getDate() + 7);
          } else if (view === Views.DAY) {
            newDate.setDate(prev.getDate() + 1);
          }
          return newDate;
        });
        break;
      case 'Home':
        event.preventDefault();
        setDate(today);
        break;
    }
  }, [view]);
  // Transform courses to calendar events
  const events: CalendarEvent[] = courses.map((course) => ({
    id: course.id,
    title: course.title,
    start: new Date(course.startDate),
    end: new Date(course.endDate),
    resource: course,
  }));

  // Custom event style getter
  const eventStyleGetter = (event: CalendarEvent) => {
    const course = event.resource;
    let backgroundColor = '#3174ad'; // Default BIMCO blue
    
    switch (course.status) {
      case 'Upcoming':
        backgroundColor = '#2563eb'; // Blue
        break;
      case 'Ongoing':
        backgroundColor = '#f59e0b'; // Amber/Orange
        break;
      case 'Completed':
        backgroundColor = '#059669'; // Green
        break;
      case 'Cancelled':
        backgroundColor = '#dc2626'; // Red
        break;
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
      },
    };
  };

  // Custom event component
  const EventComponent = ({ event }: { event: CalendarEvent }) => {
    const course = event.resource;
    const startTime = moment(event.start).format('HH:mm');
    const isAllDay = moment(event.start).format('HH:mm') === '00:00' && 
                     moment(event.end).format('HH:mm') === '00:00';
    
    return (
      <div className="text-xs cursor-pointer">
        <div className="font-semibold truncate" title={course.title}>
          {course.title}
        </div>
        <div className="text-white/90 truncate" title={course.location}>
          {course.location}
        </div>
        {!isAllDay && (
          <div className="text-white/80 text-[10px]">
            {startTime}
          </div>
        )}
        <div className="text-white/70 text-[10px] truncate">
          {course.participants.length} participants
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Calendar Legend */}
      <div className="flex flex-wrap gap-4 justify-center bg-white rounded-lg p-3 border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#2563eb' }}></div>
          <span className="text-sm text-gray-600">Upcoming</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
          <span className="text-sm text-gray-600">Ongoing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#059669' }}></div>
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#dc2626' }}></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
      </div>

      {/* Navigation Info */}
      <div className="bg-white rounded-lg p-3 border border-gray-200">
        <div className="text-center text-sm text-gray-600">
          <span className="font-medium">Current View:</span> {view.charAt(0).toUpperCase() + view.slice(1)} | 
          <span className="font-medium ml-2">Date:</span> {moment(date).format('MMMM YYYY')} | 
          <span className="font-medium ml-2">Keyboard:</span> ← → arrows to navigate, Home for today
        </div>
      </div>

      <div 
        className="h-[600px] bg-white rounded-lg p-4 border border-gray-200"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <style jsx global>{`
        .rbc-calendar {
          font-family: inherit;
        }
        .rbc-header {
          padding: 8px;
          font-weight: 600;
          color: var(--bimco-dark-blue-800);
          background-color: var(--bimco-light-blue-50);
          border-bottom: 1px solid var(--bimco-light-blue-200);
        }
        .rbc-month-view {
          border: 1px solid var(--bimco-light-blue-200);
        }
        .rbc-day-bg {
          border-right: 1px solid var(--bimco-light-blue-200);
        }
        .rbc-date-cell {
          padding: 8px;
          text-align: right;
          color: var(--bimco-dark-blue-700);
        }
        .rbc-today {
          background-color: var(--bimco-light-blue-50);
        }
        .rbc-toolbar {
          margin-bottom: 16px;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .rbc-btn-group {
          display: flex;
          gap: 2px;
        }
        .rbc-toolbar button {
          color: var(--bimco-dark-blue-800);
          border: 1px solid var(--bimco-light-blue-300);
          background-color: white;
          padding: 8px 16px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .rbc-toolbar button:hover {
          background-color: var(--bimco-light-blue-50);
          border-color: var(--bimco-light-blue-400);
        }
        .rbc-toolbar button:focus {
          outline: 2px solid var(--bimco-light-blue-500);
          outline-offset: 2px;
        }
        .rbc-toolbar button.rbc-active {
          background-color: var(--bimco-light-blue-600);
          color: white;
          border-color: var(--bimco-light-blue-600);
        }
        .rbc-toolbar button:first-child {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .rbc-toolbar button:last-child:not(:first-child) {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border-left: none;
        }
        .rbc-toolbar button:not(:first-child):not(:last-child) {
          border-radius: 0;
          border-left: none;
        }
        .rbc-toolbar-label {
          font-size: 18px;
          font-weight: 600;
          color: var(--bimco-dark-blue-800);
        }
        .rbc-event {
          padding: 2px 4px;
          font-size: 12px;
        }
        .rbc-slot-selection {
          background-color: var(--bimco-light-blue-200);
        }
        .rbc-show-more {
          background-color: var(--bimco-light-blue-100);
          color: var(--bimco-dark-blue-800);
          font-weight: 500;
          border-radius: 2px;
          padding: 2px 4px;
        }
      `}</style>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 550 }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventComponent,
        }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        view={view}
        date={date}
        onNavigate={onNavigate}
        onView={onView}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable={true}
        popup={true}
        popupOffset={{ x: 30, y: 20 }}
        step={60}
        showMultiDayTimes
        dayLayoutAlgorithm="no-overlap"
        messages={{
          next: 'Next',
          previous: 'Previous',
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          agenda: 'Agenda',
          date: 'Date',
          time: 'Time',
          event: 'Event',
          showMore: (total: number) => `+${total} more`,
          noEventsInRange: 'No courses scheduled for this period.',
          allDay: 'All Day',
        }}
      />
      </div>
    </div>
  );
}
