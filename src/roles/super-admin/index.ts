import type { NavItem } from '../../types'

export const superAdminNav: NavItem[] = [
  { label: 'Users', path: 'users' },
  { label: 'Roles', path: 'roles' },
  { label: 'Settings', path: 'settings' },
  { label: 'Departments', path: 'departments' },
  { label: 'Records', path: 'records' },
  { label: 'Reports', path: 'reports' },
  { label: 'Backup', path: 'backup' },
]

export { default as SuperAdminDashboard } from './SuperAdminDashboard'
export { default as UserManagement } from './features/UserManagement'
export { default as RoleManagement } from './features/RoleManagement'
export { default as AcademicSettings } from './features/AcademicSettings'
export { default as DepartmentManagement } from './features/DepartmentManagement'
export { default as AcademicRecords } from './features/AcademicRecords'
export { default as SystemReports } from './features/SystemReports'
export { default as BackupRestore } from './features/BackupRestore'
