'use client';

import React, { useMemo } from 'react';
import { CourseRevenue, TicketType, CourseParticipant } from '@/types';
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  ChartPieIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowPathIcon,
  BanknotesIcon,
  CreditCardIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

interface RevenueDataDisplayProps {
  courseRevenue?: CourseRevenue;
  ticketTypes: TicketType[];
  participants: CourseParticipant[];
  startDate: string;
  endDate: string;
  courseName: string;
  showCharts?: boolean;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

export default function RevenueDataDisplay({
  courseRevenue,
  ticketTypes,
  participants,
  startDate,
  endDate,
  courseName,
  showCharts = true
}: RevenueDataDisplayProps) {
  const revenueAnalysis = useMemo(() => {
    const analysis = {
      totalRevenue: courseRevenue?.totalRevenue || 0,
      paidAmount: courseRevenue?.paidAmount || 0,
      pendingAmount: courseRevenue?.pendingAmount || 0,
      refundedAmount: courseRevenue?.refundedAmount || 0,
      ticketsSold: courseRevenue?.ticketsSold || 0,
      ticketsAvailable: courseRevenue?.ticketsAvailable || 0,
      averageTicketPrice: 0,
      revenueByTicketType: [] as Array<{ name: string; revenue: number; sold: number; percentage: number }>,
      paymentStatusBreakdown: [] as Array<{ name: string; value: number; count: number }>,
      dailyRevenue: [] as Array<{ date: string; revenue: number; participants: number }>,
      conversionRate: 0,
      projectedRevenue: 0,
      revenueGrowthRate: 0,
    };

    // Calculate revenue by ticket type
    let totalPotentialRevenue = 0;
    ticketTypes.forEach(ticket => {
      const revenue = ticket.soldQuantity * ticket.price;
      const maxRevenue = (ticket.maxQuantity || 0) * ticket.price;
      totalPotentialRevenue += maxRevenue;
      
      analysis.revenueByTicketType.push({
        name: ticket.name,
        revenue,
        sold: ticket.soldQuantity,
        percentage: analysis.totalRevenue > 0 ? (revenue / analysis.totalRevenue) * 100 : 0
      });
    });

    // Calculate average ticket price
    if (analysis.ticketsSold > 0) {
      analysis.averageTicketPrice = analysis.totalRevenue / analysis.ticketsSold;
    }

    // Payment status breakdown
    const paymentCounts = {
      paid: participants.filter(p => p.paymentStatus === 'paid').length,
      pending: participants.filter(p => p.paymentStatus === 'pending').length,
      refunded: participants.filter(p => p.paymentStatus === 'refunded').length,
      cancelled: participants.filter(p => p.paymentStatus === 'cancelled').length,
    };

    analysis.paymentStatusBreakdown = [
      { name: 'Paid', value: analysis.paidAmount, count: paymentCounts.paid },
      { name: 'Pending', value: analysis.pendingAmount, count: paymentCounts.pending },
      { name: 'Refunded', value: analysis.refundedAmount, count: paymentCounts.refunded },
    ];

    // Daily revenue simulation (simplified)
    const courseStart = new Date(startDate);
    const courseEnd = new Date(endDate);
    const daysDiff = Math.ceil((courseEnd.getTime() - courseStart.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= Math.min(daysDiff, 30); i++) {
      const date = new Date(courseStart);
      date.setDate(date.getDate() + i);
      
      // Simulate daily revenue growth
      const progress = i / daysDiff;
      const dailyRevenue = analysis.totalRevenue * (progress + (Math.random() * 0.1 - 0.05));
      const dailyParticipants = Math.floor(analysis.ticketsSold * progress);
      
      analysis.dailyRevenue.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.max(0, dailyRevenue),
        participants: dailyParticipants
      });
    }

    // Calculate conversion rate
    const totalInterested = analysis.ticketsSold + analysis.ticketsAvailable;
    if (totalInterested > 0) {
      analysis.conversionRate = (analysis.ticketsSold / totalInterested) * 100;
    }

    // Projected revenue
    analysis.projectedRevenue = totalPotentialRevenue;

    return analysis;
  }, [courseRevenue, ticketTypes, participants, startDate, endDate]);

  const formatCurrency = (amount: number, compact = false) => {
    if (compact && amount >= 1000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getRevenueHealthStatus = () => {
    const collectionRate = revenueAnalysis.totalRevenue > 0 
      ? (revenueAnalysis.paidAmount / revenueAnalysis.totalRevenue) * 100 
      : 0;
    
    if (collectionRate >= 90) return { status: 'Excellent', color: 'text-green-600', icon: CheckCircleIcon };
    if (collectionRate >= 70) return { status: 'Good', color: 'text-blue-600', icon: ArrowTrendingUpIcon };
    if (collectionRate >= 50) return { status: 'Fair', color: 'text-yellow-600', icon: ClockIcon };
    return { status: 'Needs Attention', color: 'text-red-600', icon: ExclamationTriangleIcon };
  };

  const revenueHealth = getRevenueHealthStatus();
  const RevenueIcon = revenueHealth.icon;

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
              <p className="text-xl font-bold text-blue-900">
                {formatCurrency(revenueAnalysis.totalRevenue)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {revenueAnalysis.ticketsSold} tickets sold
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-green-600 font-medium">Paid Amount</p>
              <p className="text-xl font-bold text-green-900">
                {formatCurrency(revenueAnalysis.paidAmount)}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {revenueAnalysis.totalRevenue > 0 
                  ? formatPercentage((revenueAnalysis.paidAmount / revenueAnalysis.totalRevenue) * 100)
                  : '0%'
                } collected
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <ClockIcon className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Pending</p>
              <p className="text-xl font-bold text-yellow-900">
                {formatCurrency(revenueAnalysis.pendingAmount)}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                Awaiting payment
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Projected Total</p>
              <p className="text-xl font-bold text-purple-900">
                {formatCurrency(revenueAnalysis.projectedRevenue)}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Full capacity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Health & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Health */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Revenue Health
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <RevenueIcon className={`h-6 w-6 mr-2 ${revenueHealth.color}`} />
              <div>
                <p className={`text-sm font-medium ${revenueHealth.color}`}>
                  {revenueHealth.status}
                </p>
                <p className="text-xs text-gray-500">
                  Collection Rate: {formatPercentage(
                    revenueAnalysis.totalRevenue > 0 
                      ? (revenueAnalysis.paidAmount / revenueAnalysis.totalRevenue) * 100 
                      : 0
                  )}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Average Ticket</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(revenueAnalysis.averageTicketPrice)}
              </p>
            </div>
          </div>

          {/* Progress bar for collection rate */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Payment Progress</span>
              <span>
                {formatCurrency(revenueAnalysis.paidAmount)} / {formatCurrency(revenueAnalysis.totalRevenue)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${Math.min(100, revenueAnalysis.totalRevenue > 0 
                    ? (revenueAnalysis.paidAmount / revenueAnalysis.totalRevenue) * 100 
                    : 0)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Conversion Rate:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatPercentage(revenueAnalysis.conversionRate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Refunded Amount:</span>
              <span className="text-sm font-medium text-red-600">
                {formatCurrency(revenueAnalysis.refundedAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Available Tickets:</span>
              <span className="text-sm font-medium text-gray-900">
                {revenueAnalysis.ticketsAvailable}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Revenue per Day:</span>
              <span className="text-sm font-medium text-gray-900">
                {formatCurrency(revenueAnalysis.totalRevenue / Math.max(1, revenueAnalysis.dailyRevenue.length))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showCharts && (
        <>
          {/* Revenue by Ticket Type */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ChartPieIcon className="h-5 w-5 mr-2" />
              Revenue by Ticket Type
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueAnalysis.revenueByTicketType}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label={(entry) => `${entry.name}: ${formatCurrency(entry.revenue, true)}`}
                    >
                      {revenueAnalysis.revenueByTicketType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Details */}
              <div className="space-y-3">
                {revenueAnalysis.revenueByTicketType.map((ticket, index) => (
                  <div key={ticket.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">{ticket.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(ticket.revenue)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {ticket.sold} sold • {formatPercentage(ticket.percentage)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Status Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CreditCardIcon className="h-5 w-5 mr-2" />
              Payment Status Breakdown
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueAnalysis.paymentStatusBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => formatCurrency(value, true)} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CalendarDaysIcon className="h-5 w-5 mr-2" />
              Revenue Timeline
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueAnalysis.dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tickFormatter={(value) => formatCurrency(value, true)} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Action Items */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
          <ExclamationTriangleIcon className="h-5 w-5 text-orange-600 mr-2" />
          Recommended Actions
        </h3>
        <div className="space-y-2">
          {revenueAnalysis.pendingAmount > 0 && (
            <div className="flex items-center text-sm">
              <ArrowPathIcon className="h-4 w-4 text-orange-600 mr-2" />
              <span className="text-gray-700">
                Follow up on {formatCurrency(revenueAnalysis.pendingAmount)} in pending payments
              </span>
            </div>
          )}
          {revenueAnalysis.ticketsAvailable > 0 && (
            <div className="flex items-center text-sm">
              <ArrowTrendingUpIcon className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-gray-700">
                {revenueAnalysis.ticketsAvailable} tickets still available - consider marketing push
              </span>
            </div>
          )}
          {revenueAnalysis.conversionRate < 50 && (
            <div className="flex items-center text-sm">
              <ChartBarIcon className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-gray-700">
                Low conversion rate ({formatPercentage(revenueAnalysis.conversionRate)}) - review pricing strategy
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
