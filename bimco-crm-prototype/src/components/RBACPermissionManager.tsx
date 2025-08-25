'use client';

import { useState } from 'react';
import { 
  ShieldCheckIcon,
  UserGroupIcon,
  KeyIcon,
  UserIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  LockClosedIcon,
  LockOpenIcon,
  CogIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute' | 'approve';
  scope: 'global' | 'department' | 'team' | 'personal' | 'limited';
  category: 'courses' | 'contacts' | 'companies' | 'fleets' | 'contracts' | 'reports' | 'system' | 'admin';
  isSystem: boolean;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[]; // Permission IDs
  userCount: number;
  isSystem: boolean;
  isActive: boolean;
  level: 'admin' | 'manager' | 'user' | 'readonly' | 'custom';
  department?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[]; // Role IDs
  directPermissions: string[]; // Permission IDs granted directly
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin?: string;
  department?: string;
  manager?: string;
  createdAt: string;
}

export interface AccessLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  result: 'allowed' | 'denied';
  reason?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

interface RBACPermissionManagerProps {
  permissions: Permission[];
  roles: Role[];
  users: User[];
  accessLogs: AccessLog[];
  onCreateRole: (role: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'userCount'>) => void;
  onUpdateRole: (roleId: string, role: Partial<Role>) => void;
  onDeleteRole: (roleId: string) => void;
  onAssignRole: (userId: string, roleId: string) => void;
  onRevokeRole: (userId: string, roleId: string) => void;
  onGrantPermission: (userId: string, permissionId: string) => void;
  onRevokePermission: (userId: string, permissionId: string) => void;
  onCreatePermission: (permission: Omit<Permission, 'id' | 'createdAt'>) => void;
}

export default function RBACPermissionManager({
  permissions,
  roles,
  users,
  accessLogs,
  onCreateRole,
  onUpdateRole,
  onDeleteRole,
  onAssignRole,
  onRevokeRole,
  onGrantPermission,
  onRevokePermission,
  onCreatePermission
}: RBACPermissionManagerProps) {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions' | 'logs'>('roles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Role Management
  const RoleManager = () => {
    const filteredRoles = roles.filter(role =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleColor = (role: Role) => {
      if (role.color) return role.color;
      switch (role.level) {
        case 'admin': return 'bg-red-100 text-red-800';
        case 'manager': return 'bg-blue-100 text-blue-800';
        case 'user': return 'bg-green-100 text-green-800';
        case 'readonly': return 'bg-gray-100 text-gray-800';
        default: return 'bg-purple-100 text-purple-800';
      }
    };

    const getPermissionsByCategory = (rolePermissions: string[]) => {
      const categoryPermissions: Record<string, number> = {};
      rolePermissions.forEach(permId => {
        const permission = permissions.find(p => p.id === permId);
        if (permission) {
          categoryPermissions[permission.category] = (categoryPermissions[permission.category] || 0) + 1;
        }
      });
      return categoryPermissions;
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Roles Management</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredRoles.length} roles • {users.length} total users
            </p>
          </div>
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create Role</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            const categoryPermissions = getPermissionsByCategory(role.permissions);
            return (
              <div key={role.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{role.name}</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => setSelectedRole(role)}
                      className="text-gray-400 hover:text-blue-600"
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingRole(role);
                        setIsRoleModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-blue-600"
                      title="Edit"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    {!role.isSystem && (
                      <button
                        onClick={() => onDeleteRole(role.id)}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>

                {/* Metrics */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Users</span>
                    <span className="text-sm font-medium text-gray-900">
                      {role.userCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Permissions</span>
                    <span className="text-sm font-medium text-gray-900">
                      {role.permissions.length}
                    </span>
                  </div>
                </div>

                {/* Permission Categories */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(categoryPermissions).map(([category, count]) => (
                      <span key={category} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {category} ({count})
                      </span>
                    ))}
                  </div>
                </div>

                {/* Role Level and Status */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
                    {role.level.toUpperCase()}
                    {role.isSystem && <LockClosedIcon className="w-3 h-3 ml-1" />}
                  </span>
                  <div className="flex items-center space-x-1">
                    {role.isActive ? (
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    ) : (
                      <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {role.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <ShieldCheckIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
            <p className="text-gray-500">Create your first role to manage user permissions.</p>
          </div>
        )}
      </div>
    );
  };

  // User Manager
  const UserManager = () => {
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getUserRoles = (user: User): Role[] => {
      return user.roles.map(roleId => roles.find(r => r.id === roleId)).filter(Boolean) as Role[];
    };

    const getStatusColor = (status: User['status']) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800';
        case 'inactive':
          return 'bg-gray-100 text-gray-800';
        case 'suspended':
          return 'bg-red-100 text-red-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">User Permissions</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredUsers.length} users
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => {
                const userRoles = getUserRoles(user);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {userRoles.map((role) => (
                          <span key={role.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                            {role.name}
                          </span>
                        ))}
                        {user.directPermissions.length > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            +{user.directPermissions.length} direct
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.department || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <CogIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Permissions Manager
  const PermissionsManager = () => {
    const groupedPermissions = permissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);

    const getScopeColor = (scope: Permission['scope']) => {
      switch (scope) {
        case 'global': return 'bg-red-100 text-red-800';
        case 'department': return 'bg-blue-100 text-blue-800';
        case 'team': return 'bg-green-100 text-green-800';
        case 'personal': return 'bg-yellow-100 text-yellow-800';
        case 'limited': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Permissions Registry</h2>
            <p className="text-sm text-gray-500 mt-1">
              {permissions.length} permissions across {Object.keys(groupedPermissions).length} categories
            </p>
          </div>
          <button
            onClick={() => setIsPermissionModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Create Permission</span>
          </button>
        </div>

        {/* Permissions by Category */}
        <div className="space-y-6">
          {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
            <div key={category} className="bg-white border border-gray-200 rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 capitalize">{category} Permissions</h3>
                <p className="text-sm text-gray-500">{categoryPermissions.length} permissions</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{permission.name}</h4>
                          <p className="text-sm text-gray-500">{permission.description}</p>
                        </div>
                        {permission.isSystem && (
                          <LockClosedIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <span className="text-xs text-gray-500">
                          {permission.resource}:{permission.action}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScopeColor(permission.scope)}`}>
                          {permission.scope}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Access Logs
  const AccessLogs = () => {
    const recentLogs = accessLogs.slice(0, 100); // Show last 100 logs

    const getResultColor = (result: AccessLog['result']) => {
      return result === 'allowed' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800';
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Access Logs</h2>
            <p className="text-sm text-gray-500 mt-1">
              Recent access attempts and permissions checks
            </p>
          </div>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <ArrowPathIcon className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Logs Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                    <div className="text-sm text-gray-500">{log.ipAddress}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.resource}</div>
                    {log.resourceId && (
                      <div className="text-sm text-gray-500">ID: {log.resourceId}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getResultColor(log.result)}`}>
                      {log.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {recentLogs.length === 0 && (
            <div className="text-center py-12">
              <ClockIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No access logs</h3>
              <p className="text-gray-500">Access logs will appear here once users start accessing resources.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'roles', name: 'Roles', icon: ShieldCheckIcon },
            { id: 'users', name: 'Users', icon: UserGroupIcon },
            { id: 'permissions', name: 'Permissions', icon: KeyIcon },
            { id: 'logs', name: 'Access Logs', icon: ClockIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'roles' | 'users' | 'permissions' | 'logs')}
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
      {activeTab === 'roles' && <RoleManager />}
      {activeTab === 'users' && <UserManager />}
      {activeTab === 'permissions' && <PermissionsManager />}
      {activeTab === 'logs' && <AccessLogs />}
    </div>
  );
}
