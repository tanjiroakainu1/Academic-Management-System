import type { NavItem } from '../../types'

export const academicAdminNav: NavItem[] = [
  { label: 'Students', path: 'students' },
  { label: 'Faculty', path: 'faculty' },
  { label: 'Programs', path: 'programs' },
  { label: 'Offerings', path: 'offerings' },
  { label: 'Schedules', path: 'schedules' },
  { label: 'Enrollment', path: 'enrollment' },
  { label: 'Reports', path: 'reports' },
]

export { default as AcademicAdminDashboard } from './AcademicAdminDashboard'
export { default as StudentRecords } from './features/StudentRecords'
export { default as FacultyRecords } from './features/FacultyRecords'
export { default as AcademicPrograms } from './features/AcademicPrograms'
export { default as CourseOfferings } from './features/CourseOfferings'
export { default as ClassSchedules } from './features/ClassSchedules'
export { default as EnrollmentProcesses } from './features/EnrollmentProcesses'
export { default as AcademicReports } from './features/AcademicReports'
