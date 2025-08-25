'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import RBACPermissionManager from '@/components/RBACPermissionManager';
import type { Permission, Role, User as RBACUser, AccessLog } from '@/components/RBACPermissionManager';

// Mock data for demonstration
const mockPermissions: Permission[] = [
  {
    id: 'perm_1',
    name: 'View Courses',
    description: 'Can view course information and schedules',
    resource: 'courses',
    action: 'read',
    scope: 'global',
    category: 'courses',
    isSystem: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'perm_2',
    name: 'Create Courses',
    description: 'Can create new courses and training programs',
    resource: 'courses',
    action: 'create',
    scope: 'department',
    category: 'courses',
    isSystem: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'perm_3',
    name: 'Manage Contacts',
    description: 'Full access to contact management',
    resource: 'contacts',
    action: 'manage',
    scope: 'department',
    category: 'contacts',
    isSystem: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'perm_4',
    name: 'View Reports',
    description: 'Can access system reports and analytics',
    resource: 'reports',
    action: 'read',
    scope: 'limited',
    category: 'reports',
    isSystem: true,
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'perm_5',
    name: 'System Administration',
    description: 'Full system administration privileges',
    resource: 'system',
    action: 'manage',
    scope: 'global',
    category: 'admin',
    isSystem: true,
    createdAt: '2025-01-01T00:00:00Z'
  }
];

const mockRoles: Role[] = [
  {
    id: 'role_1',
    name: 'System Administrator',
    description: 'Full system access with all administrative privileges',
    color: 'bg-red-100 text-red-800',
    permissions: ['perm_1', 'perm_2', 'perm_3', 'perm_4', 'perm_5'],
    userCount: 2,
    isSystem: true,
    isActive: true,
    level: 'admin',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'role_2',
    name: 'Course Manager',
    description: 'Manage courses, training programs, and participants',
    color: 'bg-blue-100 text-blue-800',
    permissions: ['perm_1', 'perm_2', 'perm_4'],
    userCount: 5,
    isSystem: false,
    isActive: true,
    level: 'manager',
    department: 'Training',
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2025-07-20T00:00:00Z'
  },
  {
    id: 'role_3',
    name: 'Contact Manager',
    description: 'Manage customer contacts and relationships',
    color: 'bg-green-100 text-green-800',
    permissions: ['perm_1', 'perm_3', 'perm_4'],
    userCount: 8,
    isSystem: false,
    isActive: true,
    level: 'manager',
    department: 'Sales',
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2025-06-10T00:00:00Z'
  },
  {
    id: 'role_4',
    name: 'Viewer',
    description: 'Read-only access to courses and basic information',
    color: 'bg-gray-100 text-gray-800',
    permissions: ['perm_1', 'perm_4'],
    userCount: 15,
    isSystem: false,
    isActive: true,
    level: 'readonly',
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-04-01T00:00:00Z'
  }
];

const mockUsers: RBACUser[] = [
  {
    id: 'user_1',
    name: 'John Administrator',
    email: 'john.admin@bimco.org',
    roles: ['role_1'],
    directPermissions: [],
    status: 'active',
    lastLogin: '2025-08-25T06:30:00Z',
    department: 'IT',
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'user_2',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@bimco.org',
    roles: ['role_2'],
    directPermissions: ['perm_3'],
    status: 'active',
    lastLogin: '2025-08-24T15:45:00Z',
    department: 'Training',
    manager: 'user_1',
    createdAt: '2025-02-15T00:00:00Z'
  },
  {
    id: 'user_3',
    name: 'Pierre Dubois',
    email: 'pierre.dubois@bimco.org',
    roles: ['role_3'],
    directPermissions: [],
    status: 'active',
    lastLogin: '2025-08-23T09:20:00Z',
    department: 'Sales',
    manager: 'user_1',
    createdAt: '2025-03-01T00:00:00Z'
  },
  {
    id: 'user_4',
    name: 'Li Wei',
    email: 'li.wei@bimco.org',
    roles: ['role_4'],
    directPermissions: [],
    status: 'inactive',
    lastLogin: '2025-08-15T11:10:00Z',
    department: 'Operations',
    createdAt: '2025-04-01T00:00:00Z'
  }
];

const mockAccessLogs: AccessLog[] = [
  {
    id: 'log_1',
    userId: 'user_2',
    userName: 'Maria Rodriguez',
    action: 'create_course',
    resource: 'courses',
    resourceId: 'course_123',
    result: 'allowed',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    timestamp: '2025-08-25T06:45:00Z'
  },
  {
    id: 'log_2',
    userId: 'user_3',
    userName: 'Pierre Dubois',
    action: 'delete_contact',
    resource: 'contacts',
    resourceId: 'contact_456',
    result: 'allowed',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    timestamp: '2025-08-25T05:30:00Z'
  },
  {
    id: 'log_3',
    userId: 'user_4',
    userName: 'Li Wei',
    action: 'create_course',
    resource: 'courses',
    result: 'denied',
    reason: 'Insufficient permissions',
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
    timestamp: '2025-08-24T14:20:00Z'
  }
];

export default function RBACPage() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [users, setUsers] = useState<RBACUser[]>(mockUsers);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>(mockAccessLogs);

  const handleCreateRole = (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'userCount'>) => {
    const newRole: Role = {
      ...role,
      id: `role_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userCount: 0
    };
    setRoles(prev => [...prev, newRole]);
  };

  const handleUpdateRole = (roleId: string, role: Partial<Role>) => {
    setRoles(prev => 
      prev.map(r => 
        r.id === roleId 
          ? { ...r, ...role, updatedAt: new Date().toISOString() } 
          : r
      )
    );
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role && !role.isSystem) {
      setRoles(prev => prev.filter(r => r.id !== roleId));
      // Also remove role from users
      setUsers(prev => 
        prev.map(u => ({
          ...u,
          roles: u.roles.filter(r => r !== roleId)
        }))
      );
    } else {
      alert('Cannot delete system role');
    }
  };

  const handleAssignRole = (userId: string, roleId: string) => {
    setUsers(prev => 
      prev.map(u => 
        u.id === userId 
          ? { ...u, roles: [...u.roles, roleId] }
          : u
      )
    );
    
    // Update role user count
    setRoles(prev => 
      prev.map(r => 
        r.id === roleId 
          ? { ...r, userCount: r.userCount + 1 }
          : r
      )
    );
  };

  const handleRevokeRole = (userId: string, roleId: string) => {
    setUsers(prev => 
      prev.map(u => 
        u.id === userId 
          ? { ...u, roles: u.roles.filter(r => r !== roleId) }
          : u
      )
    );
    
    // Update role user count
    setRoles(prev => 
      prev.map(r => 
        r.id === roleId 
          ? { ...r, userCount: Math.max(0, r.userCount - 1) }
          : r
      )
    );
  };

  const handleGrantPermission = (userId: string, permissionId: string) => {
    setUsers(prev => 
      prev.map(u => 
        u.id === userId 
          ? { ...u, directPermissions: [...u.directPermissions, permissionId] }
          : u
      )
    );
  };

  const handleRevokePermission = (userId: string, permissionId: string) => {
    setUsers(prev => 
      prev.map(u => 
        u.id === userId 
          ? { ...u, directPermissions: u.directPermissions.filter(p => p !== permissionId) }
          : u
      )
    );
  };

  const handleCreatePermission = (permission: Omit<Permission, 'id' | 'createdAt'>) => {
    const newPermission: Permission = {
      ...permission,
      id: `perm_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setPermissions(prev => [...prev, newPermission]);
  };

  return (
    <Layout>
      <RBACPermissionManager
        permissions={permissions}
        roles={roles}
        users={users}
        accessLogs={accessLogs}
        onCreateRole={handleCreateRole}
        onUpdateRole={handleUpdateRole}
        onDeleteRole={handleDeleteRole}
        onAssignRole={handleAssignRole}
        onRevokeRole={handleRevokeRole}
        onGrantPermission={handleGrantPermission}
        onRevokePermission={handleRevokePermission}
        onCreatePermission={handleCreatePermission}
      />
    </Layout>
  );
}
