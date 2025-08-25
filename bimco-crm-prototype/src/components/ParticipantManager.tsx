'use client';

import React, { useState, useMemo } from 'react';
import { CourseParticipant } from '@/types';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  UsersIcon,
  AcademicCapIcon,
  UserIcon,
  MicrophoneIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface ParticipantManagerProps {
  participants: CourseParticipant[];
  onUpdateParticipants: (participants: CourseParticipant[]) => void;
  maxParticipants?: number;
  readOnly?: boolean;
}

const PARTICIPANT_ROLES: CourseParticipant['role'][] = ['Attendee', 'Instructor', 'Organizer', 'Speaker'];

const PAYMENT_STATUSES: CourseParticipant['paymentStatus'][] = ['pending', 'paid', 'refunded', 'cancelled'];

export default function ParticipantManager({
  participants,
  onUpdateParticipants,
  maxParticipants,
  readOnly = false
}: ParticipantManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('contactName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [isAddingParticipant, setIsAddingParticipant] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState<CourseParticipant | null>(null);

  // Filter and sort participants
  const filteredAndSortedParticipants = useMemo(() => {
    let filtered = participants.filter(participant => {
      const matchesSearch = 
        participant.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || participant.role === roleFilter;
      const matchesPayment = paymentFilter === 'all' || participant.paymentStatus === paymentFilter;
      
      return matchesSearch && matchesRole && matchesPayment;
    });

    return filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case 'contactName':
          aValue = a.contactName;
          bValue = b.contactName;
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        case 'registrationDate':
          aValue = new Date(a.registrationDate);
          bValue = new Date(b.registrationDate);
          break;
        case 'paymentStatus':
          aValue = a.paymentStatus;
          bValue = b.paymentStatus;
          break;
        case 'amountPaid':
          aValue = a.amountPaid || 0;
          bValue = b.amountPaid || 0;
          break;
        default:
          return 0;
      }

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? result : -result;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [participants, searchTerm, roleFilter, paymentFilter, sortField, sortDirection]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getRoleIcon = (role: CourseParticipant['role']) => {
    switch (role) {
      case 'Instructor':
        return <AcademicCapIcon className="h-4 w-4" />;
      case 'Organizer':
        return <BuildingOfficeIcon className="h-4 w-4" />;
      case 'Speaker':
        return <MicrophoneIcon className="h-4 w-4" />;
      default:
        return <UserIcon className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: CourseParticipant['role']) => {
    switch (role) {
      case 'Instructor':
        return 'bg-purple-100 text-purple-800';
      case 'Organizer':
        return 'bg-blue-100 text-blue-800';
      case 'Speaker':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusIcon = (status: CourseParticipant['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XMarkIcon className="h-4 w-4 text-red-500" />;
      case 'refunded':
        return <ExclamationTriangleIcon className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getPaymentStatusColor = (status: CourseParticipant['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleRemoveParticipant = (participantId: string) => {
    if (readOnly) return;
    const updatedParticipants = participants.filter(p => p.contactId !== participantId);
    onUpdateParticipants(updatedParticipants);
  };

  const handleUpdateParticipant = (updatedParticipant: CourseParticipant) => {
    if (readOnly) return;
    const updatedParticipants = participants.map(p => 
      p.contactId === updatedParticipant.contactId ? updatedParticipant : p
    );
    onUpdateParticipants(updatedParticipants);
    setEditingParticipant(null);
  };

  const handleBulkAction = (action: string) => {
    if (readOnly || selectedParticipants.length === 0) return;
    
    switch (action) {
      case 'remove':
        const updatedParticipants = participants.filter(p => !selectedParticipants.includes(p.contactId));
        onUpdateParticipants(updatedParticipants);
        setSelectedParticipants([]);
        break;
      case 'mark_paid':
        const paidParticipants = participants.map(p => 
          selectedParticipants.includes(p.contactId) 
            ? { ...p, paymentStatus: 'paid' as const } 
            : p
        );
        onUpdateParticipants(paidParticipants);
        setSelectedParticipants([]);
        break;
      // Add more bulk actions as needed
    }
  };

  const participantStats = useMemo(() => {
    const stats = {
      total: participants.length,
      byRole: {} as Record<string, number>,
      byPaymentStatus: {} as Record<string, number>,
      totalRevenue: 0,
      paidRevenue: 0,
    };

    participants.forEach(participant => {
      // Count by role
      stats.byRole[participant.role] = (stats.byRole[participant.role] || 0) + 1;
      
      // Count by payment status
      stats.byPaymentStatus[participant.paymentStatus] = (stats.byPaymentStatus[participant.paymentStatus] || 0) + 1;
      
      // Calculate revenue
      if (participant.amountPaid) {
        stats.totalRevenue += participant.amountPaid;
        if (participant.paymentStatus === 'paid') {
          stats.paidRevenue += participant.amountPaid;
        }
      }
    });

    return stats;
  }, [participants]);

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <UsersIcon className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Participants</p>
              <p className="text-lg font-bold text-blue-900">
                {participantStats.total}
                {maxParticipants && ` / ${maxParticipants}`}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-green-600 font-medium">Paid</p>
              <p className="text-lg font-bold text-green-900">
                {participantStats.byPaymentStatus['paid'] || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending</p>
              <p className="text-lg font-bold text-yellow-900">
                {participantStats.byPaymentStatus['pending'] || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <AcademicCapIcon className="h-5 w-5 text-purple-600 mr-2" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Revenue</p>
              <p className="text-lg font-bold text-purple-900">
                {formatCurrency(participantStats.paidRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              {PARTICIPANT_ROLES.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            {/* Payment Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Payment Status</option>
              {PAYMENT_STATUSES.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {selectedParticipants.length > 0 && !readOnly && (
              <>
                <button
                  onClick={() => handleBulkAction('mark_paid')}
                  className="px-3 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Mark Paid
                </button>
                <button
                  onClick={() => handleBulkAction('remove')}
                  className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-300 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove ({selectedParticipants.length})
                </button>
              </>
            )}
            {!readOnly && (
              <button
                onClick={() => setIsAddingParticipant(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Participant
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {!readOnly && (
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedParticipants.length === filteredAndSortedParticipants.length && filteredAndSortedParticipants.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedParticipants(filteredAndSortedParticipants.map(p => p.contactId));
                      } else {
                        setSelectedParticipants([]);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
              )}
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('contactName')}
              >
                Participant
                {sortField === 'contactName' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('role')}
              >
                Role
                {sortField === 'role' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('registrationDate')}
              >
                Registration Date
                {sortField === 'registrationDate' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('paymentStatus')}
              >
                Payment Status
                {sortField === 'paymentStatus' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('amountPaid')}
              >
                Amount
                {sortField === 'amountPaid' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedParticipants.map((participant) => (
              <tr key={participant.contactId} className="hover:bg-gray-50">
                {!readOnly && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedParticipants.includes(participant.contactId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedParticipants([...selectedParticipants, participant.contactId]);
                        } else {
                          setSelectedParticipants(selectedParticipants.filter(id => id !== participant.contactId));
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {participant.contactName}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <EnvelopeIcon className="h-3 w-3 mr-1" />
                        {participant.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(participant.role)}`}>
                    {getRoleIcon(participant.role)}
                    <span className="ml-1">{participant.role}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(participant.registrationDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(participant.paymentStatus)}`}>
                    {getPaymentStatusIcon(participant.paymentStatus)}
                    <span className="ml-1">{participant.paymentStatus.charAt(0).toUpperCase() + participant.paymentStatus.slice(1)}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {participant.amountPaid ? formatCurrency(participant.amountPaid) : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {!readOnly && (
                    <>
                      <button
                        onClick={() => setEditingParticipant(participant)}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                        title="Edit Participant"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveParticipant(participant.contactId)}
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                        title="Remove Participant"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedParticipants.length === 0 && (
          <div className="text-center py-12">
            <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No participants found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {participants.length === 0 
                ? "Start by adding participants to this course."
                : "Try adjusting your search criteria."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
