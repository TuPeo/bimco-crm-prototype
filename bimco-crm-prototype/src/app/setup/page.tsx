'use client';

import React, { useState } from 'react';
import { Settings, Globe, MapPin } from 'lucide-react';
import Layout from '@/components/Layout';
import CountryTab from '@/components/setup/CountryTab';
import RegionTab from '@/components/setup/RegionTab';

type TabKey = 'countries' | 'regions';

interface Tab {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

export default function SetupPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('countries');

  // Mock user role - in real app this would come from auth context
  const userRole: 'Admin' | 'Manager' | 'Staff' = 'Admin';

  const tabs: Tab[] = [
    {
      key: 'countries',
      label: 'Countries',
      icon: <Globe className="w-4 h-4" />,
      component: <CountryTab userRole={userRole} />
    },
    {
      key: 'regions',
      label: 'Regions',
      icon: <MapPin className="w-4 h-4" />,
      component: <RegionTab userRole={userRole} />
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Setup</h1>
                <p className="text-sm text-gray-600">
                  Manage master data and system codes used across CRM modules
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            {tabs.find(tab => tab.key === activeTab)?.component}
          </div>
        </div>
      </div>
    </Layout>
  );
}
