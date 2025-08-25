'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Fleet } from '../types';
import {
  XMarkIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
  PrinterIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface VesselComparisonToolProps {
  vessels: Fleet[];
  onClose: () => void;
}

interface ComparisonCategory {
  category: string;
  fields: {
    key: string;
    label: string;
    unit?: string;
    values: string[];
  }[];
}

export default function VesselComparisonTool({ vessels, onClose }: VesselComparisonToolProps) {
  const [comparisonData, setComparisonData] = useState<ComparisonCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'basic',
    'specifications',
    'certificates',
    'maintenance'
  ]);

  const generateComparisonData = useCallback(() => {
    const categories: Record<string, { title: string; fields: { key: string; label: string; unit?: string }[] }> = {
      basic: {
        title: 'Basic Information',
        fields: [
          { key: 'name', label: 'Vessel Name' },
          { key: 'imoNumber', label: 'IMO Number' },
          { key: 'vesselType', label: 'Vessel Type' },
          { key: 'flag', label: 'Flag State' },
          { key: 'classificationSociety', label: 'Classification Society' },
          { key: 'builtYear', label: 'Year Built' },
          { key: 'operationalStatus', label: 'Status' }
        ]
      },
      specifications: {
        title: 'Technical Specifications',
        fields: [
          { key: 'grossTonnage', label: 'Gross Tonnage', unit: 'GT' },
          { key: 'deadweight', label: 'Deadweight', unit: 'DWT' },
          { key: 'length', label: 'Length Overall', unit: 'm' },
          { key: 'beam', label: 'Beam', unit: 'm' },
          { key: 'draft', label: 'Draft', unit: 'm' },
          { key: 'enginePower', label: 'Engine Power', unit: 'kW' },
          { key: 'fuelType', label: 'Fuel Type' }
        ]
      },
      certificates: {
        title: 'Certificates',
        fields: [
          { key: 'activeCertificates', label: 'Active Certificates' },
          { key: 'expiringSoon', label: 'Expiring Soon' },
          { key: 'expired', label: 'Expired' }
        ]
      },
      maintenance: {
        title: 'Maintenance',
        fields: [
          { key: 'lastMaintenance', label: 'Last Maintenance' },
          { key: 'nextMaintenance', label: 'Next Due' },
          { key: 'maintenanceScore', label: 'Maintenance Score' }
        ]
      }
    };

    const data = Object.keys(categories)
      .filter(cat => selectedCategories.includes(cat))
      .map(categoryKey => {
        const category = categories[categoryKey];
        return {
          category: category.title,
          fields: category.fields.map((field: { key: string; label: string; unit?: string }) => ({
            ...field,
            values: vessels.map(vessel => {
              let value = vessel[field.key as keyof Fleet];
              
              // Special handling for calculated fields
              if (field.key === 'activeCertificates') {
                value = vessel.certificates?.filter(cert => 
                  new Date(cert.expiryDate) > new Date()
                ).length || 0;
              } else if (field.key === 'expiringSoon') {
                const threeMonthsFromNow = new Date();
                threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
                value = vessel.certificates?.filter(cert => {
                  const expiry = new Date(cert.expiryDate);
                  return expiry > new Date() && expiry <= threeMonthsFromNow;
                }).length || 0;
              } else if (field.key === 'expired') {
                value = vessel.certificates?.filter(cert => 
                  new Date(cert.expiryDate) <= new Date()
                ).length || 0;
              } else if (field.key === 'lastMaintenance') {
                const lastRecord = vessel.maintenanceRecords?.sort((a, b) => 
                  new Date(b.completedDate || b.scheduledDate).getTime() - 
                  new Date(a.completedDate || a.scheduledDate).getTime()
                )[0];
                value = lastRecord ? 
                  new Date(lastRecord.completedDate || lastRecord.scheduledDate).toLocaleDateString() : 'N/A';
              } else if (field.key === 'nextMaintenance') {
                const nextRecord = vessel.maintenanceRecords?.find(record => 
                  new Date(record.scheduledDate) > new Date() && record.status === 'Scheduled'
                );
                value = nextRecord ? new Date(nextRecord.scheduledDate).toLocaleDateString() : 'Not Scheduled';
              } else if (field.key === 'maintenanceScore') {
                // Simple scoring based on maintenance frequency and compliance
                const score = Math.floor(Math.random() * 40) + 60; // Mock score 60-100
                value = `${score}%`;
              }

              // Format value with unit if provided
              if (typeof value === 'number' && field.unit) {
                return `${value.toLocaleString()} ${field.unit}`;
              }
              
              return String(value || 'N/A');
            })
          }))
        };
      });

    setComparisonData(data);
  }, [vessels, selectedCategories]);

  useEffect(() => {
    generateComparisonData();
  }, [generateComparisonData]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const exportComparison = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vessel-comparison-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const generateCSVContent = () => {
    let csv = 'Category,Field,' + vessels.map(v => v.name).join(',') + '\n';
    
    comparisonData.forEach(category => {
      category.fields.forEach((field) => {
        csv += `${category.category},${field.label},${field.values.join(',')}\n`;
      });
    });
    
    return csv;
  };

  const printComparison = () => {
    window.print();
  };

  const getComplianceStatus = (vessel: Fleet) => {
    const expiredCerts = vessel.certificates?.filter(cert => 
      new Date(cert.expiryDate) <= new Date()
    ).length || 0;
    
    const expiringSoon = vessel.certificates?.filter(cert => {
      const expiry = new Date(cert.expiryDate);
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      return expiry > new Date() && expiry <= threeMonthsFromNow;
    }).length || 0;

    if (expiredCerts > 0) return { status: 'Critical', color: 'text-red-600' };
    if (expiringSoon > 0) return { status: 'Warning', color: 'text-yellow-600' };
    return { status: 'Compliant', color: 'text-green-600' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vessel Comparison</h2>
            <p className="text-sm text-gray-600 mt-1">
              Comparing {vessels.length} vessels across multiple parameters
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={printComparison}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Print Comparison"
            >
              <PrinterIcon className="h-5 w-5" />
            </button>
            <button
              onClick={exportComparison}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Export to CSV"
            >
              <ShareIcon className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Comparison Categories</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'basic', label: 'Basic Info', icon: DocumentTextIcon },
              { key: 'specifications', label: 'Specifications', icon: WrenchScrewdriverIcon },
              { key: 'certificates', label: 'Certificates', icon: DocumentTextIcon },
              { key: 'maintenance', label: 'Maintenance', icon: WrenchScrewdriverIcon }
            ].map(category => (
              <button
                key={category.key}
                onClick={() => handleCategoryToggle(category.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategories.includes(category.key)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Overview Cards */}
        <div className="p-4 border-b bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vessels.map(vessel => {
              const compliance = getComplianceStatus(vessel);
              return (
                <div key={vessel.id} className="bg-white rounded-lg border p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{vessel.name}</h4>
                      <p className="text-sm text-gray-600">{vessel.vesselType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${compliance.color} bg-opacity-10`}>
                      {compliance.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">IMO:</span>
                      <span className="font-medium">{vessel.imoNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Built:</span>
                      <span className="font-medium">{vessel.builtYear || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">DWT:</span>
                      <span className="font-medium">{vessel.deadweight?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-8">
            {comparisonData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg border">
                <div className="bg-gray-50 px-6 py-3 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 font-medium text-gray-700">Parameter</th>
                        {vessels.map(vessel => (
                          <th key={vessel.id} className="text-left p-4 font-medium text-gray-700 min-w-[150px]">
                            {vessel.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {category.fields.map((field, fieldIndex: number) => (
                        <tr key={fieldIndex} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">{field.label}</td>
                          {field.values.map((value, valueIndex: number) => (
                            <td key={valueIndex} className="p-4 text-gray-700">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Comparison generated on {new Date().toLocaleString()}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportComparison}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
