import type { NavItem } from '../../types'

export const facultyNav: NavItem[] = [
  { label: 'Courses', path: 'courses' },
  { label: 'Attendance', path: 'attendance' },
  { label: 'Materials', path: 'materials' },
  { label: 'Assignments', path: 'assignments' },
  { label: 'Grades', path: 'grades' },
  { label: 'Performance', path: 'performance' },
  { label: 'Reports', path: 'reports' },
]

export { default as FacultyDashboard } from './FacultyDashboard'
export { default as AssignedCourses } from './features/AssignedCourses'
export { default as ClassAttendance } from './features/ClassAttendance'
export { default as LearningMaterials } from './features/LearningMaterials'
export { default as AssignmentsQuizzes } from './features/AssignmentsQuizzes'
export { default as GradeManagement } from './features/GradeManagement'
export { default as StudentPerformance } from './features/StudentPerformance'
export { default as ClassReports } from './features/ClassReports'
