'use client';

import React, { useState } from 'react';
import { Fleet, FleetCertificate } from '@/types';
import { XMarkIcon, DocumentTextIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  fleet: Fleet;
}

export default function CertificatesModal({ isOpen, onClose, fleet }: CertificatesModalProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<FleetCertificate | null>(null);

  if (!isOpen) return null;

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'text-red-600 bg-red-100', text: 'Expired' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'critical', color: 'text-orange-600 bg-orange-100', text: 'Expires Soon' };
    } else if (daysUntilExpiry <= 90) {
      return { status: 'warning', color: 'text-yellow-600 bg-yellow-100', text: 'Renewal Due' };
    } else {
      return { status: 'valid', color: 'text-green-600 bg-green-100', text: 'Valid' };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Certificates - {fleet.name}
                </h3>
                <p className="text-sm text-gray-500">{fleet.type} • {fleet.registration}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            {fleet.certificates.length === 0 ? (
              <div className="text-center py-12">
                <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No certificates have been uploaded for this vessel yet.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <DocumentTextIcon className="-ml-1 mr-2 h-5 w-5" />
                    Add Certificate
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Certificate Summary */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Total Certificates</p>
                          <p className="text-2xl font-semibold text-gray-900">{fleet.certificates.length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm font-semibold">
                            {fleet.certificates.filter(cert => getExpiryStatus(cert.expiryDate).status === 'valid').length}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Valid</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {fleet.certificates.filter(cert => getExpiryStatus(cert.expiryDate).status === 'valid').length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600 text-sm font-semibold">
                            {fleet.certificates.filter(cert => ['warning', 'critical'].includes(getExpiryStatus(cert.expiryDate).status)).length}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {fleet.certificates.filter(cert => ['warning', 'critical'].includes(getExpiryStatus(cert.expiryDate).status)).length}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-sm font-semibold">
                            {fleet.certificates.filter(cert => getExpiryStatus(cert.expiryDate).status === 'expired').length}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-500">Expired</p>
                          <p className="text-2xl font-semibold text-gray-900">
                            {fleet.certificates.filter(cert => getExpiryStatus(cert.expiryDate).status === 'expired').length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate List */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-medium text-gray-900">Certificate Details</h4>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <DocumentTextIcon className="-ml-0.5 mr-2 h-4 w-4" />
                      Add New Certificate
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {fleet.certificates.map((certificate) => {
                      const expiryStatus = getExpiryStatus(certificate.expiryDate);
                      return (
                        <div
                          key={certificate.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => setSelectedCertificate(certificate)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                                <h5 className="text-sm font-medium text-gray-900">{certificate.type}</h5>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${expiryStatus.color}`}>
                                  {expiryStatus.text}
                                </span>
                              </div>
                              
                              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                                  <span>Issuer: {certificate.issuer}</span>
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  <span>Issued: {formatDate(certificate.issuedDate)}</span>
                                </div>
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-2" />
                                  <span>Expires: {formatDate(certificate.expiryDate)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {certificate.documentUrl && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle document view/download
                                    window.open(certificate.documentUrl, '_blank');
                                  }}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  View Document
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle edit certificate
                                }}
                                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
