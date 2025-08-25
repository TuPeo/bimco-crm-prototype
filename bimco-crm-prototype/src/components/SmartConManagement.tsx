'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon,
  CogIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export interface SmartContract {
  id: string;
  name: string;
  type: 'charter_party' | 'sale_purchase' | 'shipbuilding' | 'management' | 'service' | 'insurance';
  template: string;
  status: 'draft' | 'under_review' | 'approved' | 'active' | 'completed' | 'terminated' | 'disputed';
  parties: ContractParty[];
  value?: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  assignedTo?: string;
  terms: ContractTerm[];
  documents: ContractDocument[];
  milestones: ContractMilestone[];
  complianceStatus: 'compliant' | 'non_compliant' | 'pending_review' | 'warning';
  riskScore: number; // 0-100
  autoRenewal: boolean;
  renewalDate?: string;
  tags: string[];
}

export interface ContractParty {
  id: string;
  name: string;
  role: 'owner' | 'charterer' | 'operator' | 'agent' | 'broker' | 'vendor' | 'service_provider';
  contactId?: string;
  companyId?: string;
  signatureStatus: 'pending' | 'signed' | 'declined';
  signedAt?: string;
}

export interface ContractTerm {
  id: string;
  section: string;
  title: string;
  content: string;
  isStandard: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  complianceRequired: boolean;
  lastReviewed?: string;
}

export interface ContractDocument {
  id: string;
  name: string;
  type: 'original' | 'amendment' | 'addendum' | 'supporting' | 'compliance';
  url: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  version: string;
  isLatest: boolean;
}

export interface ContractMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue' | 'cancelled';
  completedAt?: string;
  assignedTo?: string;
  linkedTerms: string[];
}

interface SmartConManagementProps {
  contracts: SmartContract[];
  onCreateContract: (contract: Omit<SmartContract, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateContract: (contractId: string, contract: Partial<SmartContract>) => void;
  onDeleteContract: (contractId: string) => void;
  onDuplicateContract: (contractId: string) => void;
  onExportContract: (contractId: string) => void;
}

export default function SmartConManagement({
  contracts,
  onCreateContract,
  onUpdateContract,
  onDeleteContract,
  onDuplicateContract,
  onExportContract
}: SmartConManagementProps) {
  const [activeTab, setActiveTab] = useState<'contracts' | 'templates' | 'compliance'>('contracts');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Contract Management
  const ContractManager = () => {
    const filteredContracts = contracts.filter(contract => {
      const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contract.parties.some(party => party.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
      const matchesType = typeFilter === 'all' || contract.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

    const getStatusColor = (status: SmartContract['status']) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800';
        case 'approved':
          return 'bg-blue-100 text-blue-800';
        case 'under_review':
          return 'bg-yellow-100 text-yellow-800';
        case 'draft':
          return 'bg-gray-100 text-gray-800';
        case 'completed':
          return 'bg-purple-100 text-purple-800';
        case 'terminated':
          return 'bg-red-100 text-red-800';
        case 'disputed':
          return 'bg-orange-100 text-orange-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getComplianceColor = (status: SmartContract['complianceStatus']) => {
      switch (status) {
        case 'compliant':
          return 'text-green-600';
        case 'non_compliant':
          return 'text-red-600';
        case 'warning':
          return 'text-yellow-600';
        default:
          return 'text-gray-600';
      }
    };

    const getRiskColor = (score: number) => {
      if (score >= 80) return 'text-red-600';
      if (score >= 60) return 'text-orange-600';
      if (score >= 40) return 'text-yellow-600';
      return 'text-green-600';
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Smart Contracts</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredContracts.length} contracts
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>New Contract</span>
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <ArrowUpTrayIcon className="w-4 h-4" />
              <span>Import</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="terminated">Terminated</option>
            <option value="disputed">Disputed</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="charter_party">Charter Party</option>
            <option value="sale_purchase">Sale & Purchase</option>
            <option value="shipbuilding">Shipbuilding</option>
            <option value="management">Management</option>
            <option value="service">Service</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>

        {/* Contracts Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contract.name}</div>
                      <div className="text-sm text-gray-500">
                        {contract.parties.filter(p => p.role === 'owner' || p.role === 'charterer').map(p => p.name).join(', ')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {contract.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {contract.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contract.value && contract.currency ? (
                      <div className="flex items-center space-x-1">
                        <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                        <span>{contract.currency} {contract.value.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center space-x-1 ${getComplianceColor(contract.complianceStatus)}`}>
                      {contract.complianceStatus === 'compliant' && <CheckCircleIcon className="w-4 h-4" />}
                      {contract.complianceStatus === 'non_compliant' && <ExclamationTriangleIcon className="w-4 h-4" />}
                      {contract.complianceStatus === 'warning' && <ExclamationTriangleIcon className="w-4 h-4" />}
                      {contract.complianceStatus === 'pending_review' && <ClockIcon className="w-4 h-4" />}
                      <span className="text-xs">
                        {contract.complianceStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getRiskColor(contract.riskScore)}`}>
                      {contract.riskScore}/100
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedContract(contract)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onExportContract(contract.id)}
                        className="text-green-600 hover:text-green-900"
                        title="Export"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteContract(contract.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
              <p className="text-gray-500">Get started by creating your first smart contract.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Contract Detail Modal
  const ContractDetailModal = () => {
    if (!selectedContract) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedContract.name}</h3>
                <p className="text-sm text-gray-500">Contract ID: {selectedContract.id}</p>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contract Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Status</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedContract.status)}`}>
                  {selectedContract.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Contract Value</h4>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedContract.value && selectedContract.currency 
                    ? `${selectedContract.currency} ${selectedContract.value.toLocaleString()}` 
                    : 'Not specified'
                  }
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Risk Score</h4>
                <p className={`text-lg font-semibold ${getRiskColor(selectedContract.riskScore)}`}>
                  {selectedContract.riskScore}/100
                </p>
              </div>
            </div>

            {/* Contract Parties */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Contract Parties</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedContract.parties.map((party) => (
                  <div key={party.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{party.name}</h5>
                      <span className="text-xs text-gray-500 capitalize">{party.role.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {party.signatureStatus === 'signed' && (
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      )}
                      {party.signatureStatus === 'pending' && (
                        <ClockIcon className="w-4 h-4 text-yellow-500" />
                      )}
                      {party.signatureStatus === 'declined' && (
                        <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                      )}
                      <span className="text-sm text-gray-600 capitalize">
                        {party.signatureStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract Milestones */}
            {selectedContract.milestones.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Milestones</h4>
                <div className="space-y-3">
                  {selectedContract.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      {milestone.status === 'completed' && (
                        <CheckCircleIcon className="w-5 h-5 text-green-500" />
                      )}
                      {milestone.status === 'pending' && (
                        <ClockIcon className="w-5 h-5 text-yellow-500" />
                      )}
                      {milestone.status === 'overdue' && (
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                      )}
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                        <p className="text-sm text-gray-500">{milestone.description}</p>
                        <p className="text-xs text-gray-400">Due: {new Date(milestone.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contract Documents */}
            {selectedContract.documents.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Documents</h4>
                <div className="space-y-2">
                  {selectedContract.documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                        <div>
                          <h5 className="font-medium text-gray-900">{document.name}</h5>
                          <p className="text-sm text-gray-500">
                            Version {document.version} • {(document.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Helper functions
  const getStatusColor = (status: SmartContract['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      case 'disputed':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'contracts', name: 'Contracts', icon: DocumentTextIcon },
            { id: 'templates', name: 'Templates', icon: DocumentCheckIcon },
            { id: 'compliance', name: 'Compliance', icon: CheckCircleIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'contracts' && <ContractManager />}
      {activeTab === 'templates' && (
        <div className="text-center py-12">
          <DocumentCheckIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Contract Templates</h3>
          <p className="text-gray-500">Template management system coming soon</p>
        </div>
      )}
      {activeTab === 'compliance' && (
        <div className="text-center py-12">
          <CheckCircleIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance Dashboard</h3>
          <p className="text-gray-500">Compliance monitoring and reporting coming soon</p>
        </div>
      )}

      {/* Contract Detail Modal */}
      {selectedContract && <ContractDetailModal />}
    </div>
  );
}
