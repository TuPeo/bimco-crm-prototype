'use client';

import React, { useState } from 'react';
import { mockFleets } from '../../data/mockData';
import { Fleet, MaintenanceRecord } from '../../types';
import FleetListView from '../../components/FleetListView';
import FleetDetailCard from '../../components/FleetDetailCard';
import MaintenanceScheduler from '../../components/MaintenanceScheduler';
import {
  ArrowLeftIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function FleetsPage() {
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'maintenance'>('list');
  const [selectedFleet, setSelectedFleet] = useState<Fleet | null>(null);

  const handleFleetSelect = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setCurrentView('detail');
  };

  const handleEditFleet = (fleet: Fleet) => {
    // Handle fleet editing - could open a modal or navigate to edit page
    console.log('Edit fleet:', fleet);
  };

  const handleScheduleMaintenance = (maintenanceData: Partial<MaintenanceRecord>) => {
    // Handle maintenance scheduling
    console.log('Schedule maintenance:', maintenanceData);
    // In a real app, you would save this to the backend
  };

  const handleMaintenanceScheduler = (fleet: Fleet) => {
    setSelectedFleet(fleet);
    setCurrentView('maintenance');
  };

  const renderBreadcrumb = () => {
    const items = [
      { label: 'Fleet Management', active: currentView === 'list' }
    ];

    if (currentView === 'detail' && selectedFleet) {
      items.push({ label: selectedFleet.name, active: true });
    }

    if (currentView === 'maintenance' && selectedFleet) {
      items.push(
        { label: selectedFleet.name, active: false },
        { label: 'Maintenance Scheduler', active: true }
      );
    }

    return (
      <nav className="flex items-center space-x-2 text-sm mb-6">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-gray-400">/</span>}
            <span className={item.active ? 'text-gray-900 font-medium' : 'text-gray-600'}>
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </nav>
    );
  };

  const renderListView = () => (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
            <p className="text-gray-600 mt-2">
              Manage your fleet of vessels with comprehensive tools for tracking, maintenance, and compliance.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white px-4 py-2 rounded-lg border text-sm">
              <span className="text-gray-500">Total Vessels:</span>
              <span className="font-semibold text-gray-900 ml-1">{mockFleets.length}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border text-sm">
              <span className="text-gray-500">Active:</span>
              <span className="font-semibold text-green-600 ml-1">
                {mockFleets.filter((f: Fleet) => f.operationalStatus === 'Active' || f.operationalStatus === 'In Service').length}
              </span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg border text-sm">
              <span className="text-gray-500">Maintenance:</span>
              <span className="font-semibold text-yellow-600 ml-1">
                {mockFleets.filter((f: Fleet) => f.operationalStatus === 'Under Maintenance' || f.operationalStatus === 'Maintenance').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <FleetListView
        fleets={mockFleets}
        onFleetSelect={handleFleetSelect}
        onScheduleMaintenance={handleMaintenanceScheduler}
      />
    </div>
  );

  const renderDetailView = () => {
    if (!selectedFleet) return null;

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('list')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Back to Fleet List</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('maintenance')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Maintenance Schedule</span>
            </button>
          </div>
        </div>

        <FleetDetailCard
          fleet={selectedFleet}
          onEdit={handleEditFleet}
          onMaintenanceSchedule={handleMaintenanceScheduler}
        />
      </div>
    );
  };

  const renderMaintenanceView = () => {
    if (!selectedFleet) return null;

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentView('detail')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Vessel Details</span>
          </button>
        </div>

        <MaintenanceScheduler
          fleet={selectedFleet}
          onSchedule={handleScheduleMaintenance}
          onClose={() => setCurrentView('detail')}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderBreadcrumb()}
        
        {currentView === 'list' && renderListView()}
        {currentView === 'detail' && renderDetailView()}
        {currentView === 'maintenance' && renderMaintenanceView()}
      </div>
    </div>
  );
}
