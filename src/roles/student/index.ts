import type { NavItem } from '../../types'

export const studentNav: NavItem[] = [
  { label: 'Enrollment', path: 'enrollment' },
  { label: 'Schedules', path: 'schedules' },
  { label: 'Materials', path: 'materials' },
  { label: 'Assignments', path: 'assignments' },
  { label: 'Grades', path: 'grades' },
  { label: 'Progress', path: 'progress' },
  { label: 'Notifications', path: 'notifications' },
]

export { default as StudentDashboard } from './StudentDashboard'
export { default as CourseEnrollment } from './features/CourseEnrollment'
export { default as ClassSchedules } from './features/ClassSchedules'
export { default as LearningMaterials } from './features/LearningMaterials'
export { default as AssignmentSubmission } from './features/AssignmentSubmission'
export { default as GradesRecords } from './features/GradesRecords'
export { default as AcademicProgress } from './features/AcademicProgress'
export { default as Notifications } from './features/Notifications'
