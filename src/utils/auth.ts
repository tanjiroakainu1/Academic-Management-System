import { roleThemes } from '../data/mockData'
import type { User, UserRole } from '../types'

export const DEMO_PASSWORD = 'password123'

export const roleDashboardPaths: Record<UserRole, string> = {
  'super-admin': '/super-admin',
  'academic-administrator': '/academic-administrator',
  faculty: '/faculty',
  student: '/student',
}

export const allRoles: UserRole[] = [
  'super-admin',
  'academic-administrator',
  'faculty',
  'student',
]

export const roleLabels: Record<UserRole, string> = {
  'super-admin': roleThemes['super-admin'].label,
  'academic-administrator': roleThemes['academic-administrator'].label,
  faculty: roleThemes.faculty.label,
  student: roleThemes.student.label,
}

export interface DemoAccount extends User {
  password: string
  roleLabel: string
  dashboardPath: string
  gradient: string
}

export function getDemoAccounts(users: User[]): DemoAccount[] {
  return users.map((user) => ({
    ...user,
    password: DEMO_PASSWORD,
    roleLabel: roleThemes[user.role].label,
    dashboardPath: roleDashboardPaths[user.role],
    gradient: roleThemes[user.role].gradient,
  }))
}

export function getDashboardPath(role: UserRole): string {
  return roleDashboardPaths[role]
}

export function findUserByEmail(email: string, users: User[]): User | undefined {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function findDemoAccountByRole(role: UserRole, users: User[]): DemoAccount | undefined {
  return getDemoAccounts(users).find((a) => a.role === role)
}
