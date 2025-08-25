'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import SmartConManagement from '@/components/SmartConManagement';
import type { SmartContract, ContractParty, ContractTerm, ContractDocument, ContractMilestone } from '@/components/SmartConManagement';

// Mock data for demonstration
const mockContracts: SmartContract[] = [
  {
    id: '1',
    name: 'Time Charter Party - MV Baltic Star',
    type: 'charter_party',
    template: 'BIMCO BALTIME 1939',
    status: 'active',
    parties: [
      {
        id: 'p1',
        name: 'Nordic Shipping AS',
        role: 'owner',
        contactId: '1',
        companyId: '1',
        signatureStatus: 'signed',
        signedAt: '2025-07-15T10:30:00Z'
      },
      {
        id: 'p2',
        name: 'Baltic Trading Ltd',
        role: 'charterer',
        contactId: '2',
        companyId: '2',
        signatureStatus: 'signed',
        signedAt: '2025-07-15T14:20:00Z'
      }
    ],
    value: 2500000,
    currency: 'USD',
    startDate: '2025-08-01T00:00:00Z',
    endDate: '2026-02-01T00:00:00Z',
    createdAt: '2025-07-01T09:00:00Z',
    updatedAt: '2025-08-20T15:30:00Z',
    createdBy: 'Contract Manager',
    assignedTo: 'Legal Team',
    terms: [
      {
        id: 't1',
        section: 'Payment Terms',
        title: 'Hire Payment',
        content: 'Hire shall be paid monthly in advance at USD 13,889 per day',
        isStandard: true,
        riskLevel: 'low',
        complianceRequired: true,
        lastReviewed: '2025-07-10T10:00:00Z'
      },
      {
        id: 't2',
        section: 'Performance',
        title: 'Speed and Consumption',
        content: 'Vessel shall maintain 12.5 knots consumption 28 MT/day',
        isStandard: true,
        riskLevel: 'medium',
        complianceRequired: true
      }
    ],
    documents: [
      {
        id: 'd1',
        name: 'Charter Party Agreement.pdf',
        type: 'original',
        url: '/documents/charter-party-1.pdf',
        size: 2500000,
        uploadedAt: '2025-07-15T16:00:00Z',
        uploadedBy: 'Legal Team',
        version: '1.0',
        isLatest: true
      }
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Vessel Delivery',
        description: 'Vessel delivery at Hamburg port',
        dueDate: '2025-08-01T08:00:00Z',
        status: 'completed',
        completedAt: '2025-08-01T07:45:00Z',
        assignedTo: 'Operations Team',
        linkedTerms: ['t2']
      },
      {
        id: 'm2',
        title: 'First Hire Payment',
        description: 'First monthly hire payment due',
        dueDate: '2025-08-01T23:59:59Z',
        status: 'completed',
        completedAt: '2025-07-31T14:30:00Z',
        assignedTo: 'Finance Team',
        linkedTerms: ['t1']
      }
    ],
    complianceStatus: 'compliant',
    riskScore: 25,
    autoRenewal: false,
    tags: ['time-charter', 'bulk-carrier', 'long-term']
  },
  {
    id: '2',
    name: 'Ship Management Agreement - MV Ocean Pride',
    type: 'management',
    template: 'SHIPMAN 2009',
    status: 'under_review',
    parties: [
      {
        id: 'p3',
        name: 'Maritime Holdings Inc',
        role: 'owner',
        signatureStatus: 'signed',
        signedAt: '2025-08-20T11:00:00Z'
      },
      {
        id: 'p4',
        name: 'ProShip Management',
        role: 'service_provider',
        signatureStatus: 'pending'
      }
    ],
    value: 180000,
    currency: 'USD',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2026-08-31T23:59:59Z',
    createdAt: '2025-08-15T10:00:00Z',
    updatedAt: '2025-08-24T09:15:00Z',
    createdBy: 'Ship Manager',
    terms: [
      {
        id: 't3',
        section: 'Management Fee',
        title: 'Monthly Management Fee',
        content: 'Management fee of USD 15,000 per month payable in advance',
        isStandard: true,
        riskLevel: 'low',
        complianceRequired: true
      }
    ],
    documents: [
      {
        id: 'd2',
        name: 'Management Agreement Draft.pdf',
        type: 'original',
        url: '/documents/management-agreement-2.pdf',
        size: 1800000,
        uploadedAt: '2025-08-20T12:00:00Z',
        uploadedBy: 'Ship Manager',
        version: '2.1',
        isLatest: true
      }
    ],
    milestones: [
      {
        id: 'm3',
        title: 'Contract Execution',
        description: 'Final contract signing by all parties',
        dueDate: '2025-08-30T23:59:59Z',
        status: 'pending',
        assignedTo: 'Legal Team',
        linkedTerms: []
      }
    ],
    complianceStatus: 'pending_review',
    riskScore: 45,
    autoRenewal: true,
    renewalDate: '2026-06-01T00:00:00Z',
    tags: ['ship-management', 'technical', 'annual']
  }
];

export default function SmartConPage() {
  const [contracts, setContracts] = useState<SmartContract[]>(mockContracts);

  const handleCreateContract = (contract: Omit<SmartContract, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContract: SmartContract = {
      ...contract,
      id: `contract_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setContracts(prev => [...prev, newContract]);
  };

  const handleUpdateContract = (contractId: string, contract: Partial<SmartContract>) => {
    setContracts(prev => 
      prev.map(c => 
        c.id === contractId 
          ? { ...c, ...contract, updatedAt: new Date().toISOString() } 
          : c
      )
    );
  };

  const handleDeleteContract = (contractId: string) => {
    setContracts(prev => prev.filter(c => c.id !== contractId));
  };

  const handleDuplicateContract = (contractId: string) => {
    const contract = contracts.find(c => c.id === contractId);
    if (contract) {
      const duplicatedContract: SmartContract = {
        ...contract,
        id: `contract_${Date.now()}`,
        name: `${contract.name} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parties: contract.parties.map(p => ({ ...p, signatureStatus: 'pending', signedAt: undefined }))
      };
      setContracts(prev => [...prev, duplicatedContract]);
    }
  };

  const handleExportContract = (contractId: string) => {
    // In a real implementation, this would generate and download the contract
    console.log(`Exporting contract ${contractId}`);
    alert(`Contract export functionality would be implemented here`);
  };

  return (
    <Layout>
      <SmartConManagement
        contracts={contracts}
        onCreateContract={handleCreateContract}
        onUpdateContract={handleUpdateContract}
        onDeleteContract={handleDeleteContract}
        onDuplicateContract={handleDuplicateContract}
        onExportContract={handleExportContract}
      />
    </Layout>
  );
}
