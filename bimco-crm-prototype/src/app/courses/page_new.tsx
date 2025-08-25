'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CourseCalendar from '@/components/CourseCalendar';
import CourseEventList from '@/components/CourseEventList';
import CourseEventDetailCard from '@/components/CourseEventDetailCard';
import AddCourseModal from '@/components/AddCourseModal';
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
  AcademicCapIcon,
  ListBulletIcon,
  CurrencyDollarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

type ViewMode = 'list' | 'calendar';

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [editingCourse, setEditingCourse] = useState<Course>();
  const [viewingCourse, setViewingCourse] = useState<Course>();

  const handleAddCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `course_${Date.now()}`,
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
  };

  const handleUpdateCourse = (courseData: Course) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === courseData.id ? courseData : course
      )
    );
  };

  const handleViewCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setViewingCourse(course);
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsAddModalOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Courses & Events</h1>
                <p className="mt-2 text-gray-600">
                  Manage training courses, events, and educational programs with enhanced finance tracking
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Course
              </button>
            </div>

            {/* View Toggle */}
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex rounded-md shadow-sm">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <ListBulletIcon className="h-4 w-4 mr-2 inline" />
                  List View
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 text-sm font-medium border rounded-r-md ${
                    viewMode === 'calendar'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <CalendarIcon className="h-4 w-4 mr-2 inline" />
                  Calendar View
                </button>
              </div>

              <div className="text-sm text-gray-600">
                {courses.length} courses total
              </div>
            </div>
          </div>

          {/* Main Content */}
          {viewMode === 'list' ? (
            <CourseEventList
              courses={courses}
              onEditCourse={handleEditCourse}
              onViewCourse={handleViewCourse}
            />
          ) : (
            <div className="bg-white rounded-lg shadow">
              <CourseCalendar
                courses={courses}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                onSelectEvent={(event: { id: string }) => {
                  const course = courses.find(c => c.id === event.id);
                  if (course) setViewingCourse(course);
                }}
              />
            </div>
          )}
        </div>

        {/* Modals */}
        <AddCourseModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingCourse(undefined);
            setSelectedDate(undefined);
          }}
          onSave={handleAddCourse}
          initialDate={selectedDate}
        />

        {editingCourse && (
          <CourseEventDetailCard
            isOpen={!!editingCourse}
            onClose={() => setEditingCourse(undefined)}
            course={editingCourse}
            onSave={handleUpdateCourse}
          />
        )}

        {viewingCourse && (
          <CourseEventDetailCard
            isOpen={!!viewingCourse}
            onClose={() => setViewingCourse(undefined)}
            course={viewingCourse}
            onSave={handleUpdateCourse}
            readOnly
          />
        )}
      </div>
    </Layout>
  );
}
