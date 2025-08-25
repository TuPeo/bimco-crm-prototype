'use client';

import React, { useState, useMemo } from 'react';
import { TicketType, DiscountCode, CoursePaymentSettings } from '@/types';
import {
  CurrencyDollarIcon,
  TicketIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CreditCardIcon,
  BanknotesIcon,
  GiftIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface EventPaymentProcessorProps {
  paymentSettings: CoursePaymentSettings;
  onUpdatePaymentSettings: (settings: CoursePaymentSettings) => void;
  readOnly?: boolean;
}

export default function EventPaymentProcessor({
  paymentSettings,
  onUpdatePaymentSettings,
  readOnly = false
}: EventPaymentProcessorProps) {
  const [activeTab, setActiveTab] = useState<'tickets' | 'discounts' | 'settings'>('tickets');
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null);
  const [editingDiscount, setEditingDiscount] = useState<DiscountCode | null>(null);
  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);

  const revenueStats = useMemo(() => {
    const stats = {
      totalTickets: 0,
      soldTickets: 0,
      availableTickets: 0,
      totalRevenue: 0,
      potentialRevenue: 0,
      discountsUsed: 0,
      discountAmount: 0,
    };

    paymentSettings.ticketTypes.forEach(ticket => {
      stats.totalTickets += ticket.maxQuantity || 0;
      stats.soldTickets += ticket.soldQuantity;
      stats.availableTickets += (ticket.maxQuantity || 0) - ticket.soldQuantity;
      stats.totalRevenue += ticket.soldQuantity * ticket.price;
      stats.potentialRevenue += (ticket.maxQuantity || 0) * ticket.price;
    });

    paymentSettings.discountCodes.forEach(discount => {
      stats.discountsUsed += discount.usedCount;
      // Estimate discount amount (simplified calculation)
      const avgTicketPrice = stats.potentialRevenue / (stats.totalTickets || 1);
      if (discount.type === 'percentage') {
        stats.discountAmount += discount.usedCount * avgTicketPrice * (discount.value / 100);
      } else {
        stats.discountAmount += discount.usedCount * discount.value;
      }
    });

    return stats;
  }, [paymentSettings]);

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

  const getTicketAvailabilityStatus = (ticket: TicketType) => {
    if (ticket.availability === 'sold_out') return 'Sold Out';
    if (ticket.availability === 'coming_soon') return 'Coming Soon';
    
    const remaining = (ticket.maxQuantity || 0) - ticket.soldQuantity;
    if (remaining <= 0) return 'Sold Out';
    if (remaining <= 5) return 'Limited';
    return 'Available';
  };

  const getTicketStatusColor = (ticket: TicketType) => {
    const status = getTicketAvailabilityStatus(ticket);
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Limited':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sold Out':
        return 'bg-red-100 text-red-800';
      case 'Coming Soon':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDiscountStatus = (discount: DiscountCode) => {
    const now = new Date();
    const validFrom = new Date(discount.validFrom);
    const validUntil = new Date(discount.validUntil);
    
    if (now < validFrom) return { status: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
    if (now > validUntil) return { status: 'Expired', color: 'bg-red-100 text-red-800' };
    if (discount.maxUses && discount.usedCount >= discount.maxUses) return { status: 'Used Up', color: 'bg-red-100 text-red-800' };
    return { status: 'Active', color: 'bg-green-100 text-green-800' };
  };

  const handleUpdateTicketType = (ticketType: TicketType) => {
    const updatedTicketTypes = editingTicket
      ? paymentSettings.ticketTypes.map(t => t.id === ticketType.id ? ticketType : t)
      : [...paymentSettings.ticketTypes, ticketType];
    
    onUpdatePaymentSettings({
      ...paymentSettings,
      ticketTypes: updatedTicketTypes
    });
    
    setEditingTicket(null);
    setIsAddingTicket(false);
  };

  const handleDeleteTicketType = (ticketId: string) => {
    if (readOnly) return;
    const updatedTicketTypes = paymentSettings.ticketTypes.filter(t => t.id !== ticketId);
    onUpdatePaymentSettings({
      ...paymentSettings,
      ticketTypes: updatedTicketTypes
    });
  };

  const handleUpdateDiscountCode = (discountCode: DiscountCode) => {
    const updatedDiscountCodes = editingDiscount
      ? paymentSettings.discountCodes.map(d => d.id === discountCode.id ? discountCode : d)
      : [...paymentSettings.discountCodes, discountCode];
    
    onUpdatePaymentSettings({
      ...paymentSettings,
      discountCodes: updatedDiscountCodes
    });
    
    setEditingDiscount(null);
    setIsAddingDiscount(false);
  };

  const handleDeleteDiscountCode = (discountId: string) => {
    if (readOnly) return;
    const updatedDiscountCodes = paymentSettings.discountCodes.filter(d => d.id !== discountId);
    onUpdatePaymentSettings({
      ...paymentSettings,
      discountCodes: updatedDiscountCodes
    });
  };

  // Ticket Types Tab
  const TicketTypesTab = () => (
    <div className="space-y-6">
      {/* Action Bar */}
      {!readOnly && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddingTicket(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Ticket Type
          </button>
        </div>
      )}

      {/* Ticket Types List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paymentSettings.ticketTypes.map((ticket) => (
          <div key={ticket.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <TicketIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">{ticket.name}</h3>
              </div>
              {!readOnly && (
                <div className="flex space-x-1">
                  <button
                    onClick={() => setEditingTicket(ticket)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTicketType(ticket.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{formatCurrency(ticket.price)}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTicketStatusColor(ticket)}`}>
                  {getTicketAvailabilityStatus(ticket)}
                </span>
              </div>

              {ticket.description && (
                <p className="text-sm text-gray-600">{ticket.description}</p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Sold: {ticket.soldQuantity}</span>
                {ticket.maxQuantity && (
                  <span>Max: {ticket.maxQuantity}</span>
                )}
              </div>

              {ticket.maxQuantity && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(ticket.soldQuantity / ticket.maxQuantity) * 100}%` }}
                  ></div>
                </div>
              )}

              <div className="text-sm font-medium text-gray-900">
                Revenue: {formatCurrency(ticket.soldQuantity * ticket.price)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentSettings.ticketTypes.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <TicketIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No ticket types</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first ticket type.
          </p>
          {!readOnly && (
            <div className="mt-6">
              <button
                onClick={() => setIsAddingTicket(true)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Ticket Type
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Discount Codes Tab
  const DiscountCodesTab = () => (
    <div className="space-y-6">
      {/* Action Bar */}
      {!readOnly && (
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddingDiscount(true)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Discount Code
          </button>
        </div>
      )}

      {/* Discount Codes List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Period
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentSettings.discountCodes.map((discount) => {
              const status = getDiscountStatus(discount);
              return (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TagIcon className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                        {discount.code}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {discount.type === 'percentage' 
                        ? `${discount.value}% off` 
                        : formatCurrency(discount.value)
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {discount.usedCount}
                      {discount.maxUses && ` / ${discount.maxUses}`}
                    </div>
                    {discount.maxUses && (
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-green-600 h-1 rounded-full" 
                          style={{ width: `${(discount.usedCount / discount.maxUses) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{formatDate(discount.validFrom)}</div>
                    <div>to {formatDate(discount.validUntil)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                      {status.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    {!readOnly && (
                      <>
                        <button
                          onClick={() => setEditingDiscount(discount)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDiscountCode(discount.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paymentSettings.discountCodes.length === 0 && (
          <div className="text-center py-12">
            <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No discount codes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create discount codes to offer promotions to your participants.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Payment Settings Tab
  const PaymentSettingsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {['Credit Card', 'Bank Transfer', 'PayPal', 'Invoice'].map(method => (
              <label key={method} className="flex items-center">
                <input
                  type="checkbox"
                  checked={paymentSettings.paymentMethods.includes(method)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...paymentSettings.paymentMethods, method]
                      : paymentSettings.paymentMethods.filter(m => m !== method);
                    onUpdatePaymentSettings({
                      ...paymentSettings,
                      paymentMethods: updated
                    });
                  }}
                  disabled={readOnly}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Refund Policy */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Refund Policy
          </label>
          <textarea
            value={paymentSettings.refundPolicy || ''}
            onChange={(e) => onUpdatePaymentSettings({
              ...paymentSettings,
              refundPolicy: e.target.value
            })}
            disabled={readOnly}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            placeholder="Enter your refund policy..."
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Revenue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
              <p className="text-lg font-bold text-blue-900">
                {formatCurrency(revenueStats.totalRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <TicketIcon className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-green-600 font-medium">Tickets Sold</p>
              <p className="text-lg font-bold text-green-900">
                {revenueStats.soldTickets} / {revenueStats.totalTickets}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <GiftIcon className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Discounts Used</p>
              <p className="text-lg font-bold text-yellow-900">
                {revenueStats.discountsUsed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <ChartBarIcon className="h-5 w-5 text-purple-600 mr-2" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Potential Revenue</p>
              <p className="text-lg font-bold text-purple-900">
                {formatCurrency(revenueStats.potentialRevenue)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'tickets', name: 'Ticket Types', icon: TicketIcon },
              { key: 'discounts', name: 'Discount Codes', icon: TagIcon },
              { key: 'settings', name: 'Payment Settings', icon: CreditCardIcon },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'tickets' && <TicketTypesTab />}
          {activeTab === 'discounts' && <DiscountCodesTab />}
          {activeTab === 'settings' && <PaymentSettingsTab />}
        </div>
      </div>
    </div>
  );
}
