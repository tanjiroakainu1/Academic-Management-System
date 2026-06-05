export type UserRole =
  | 'super-admin'
  | 'academic-administrator'
  | 'faculty'
  | 'student'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  status: 'active' | 'inactive'
}

export interface Student {
  id: string
  name: string
  email: string
  program: string
  year: number
  status: 'enrolled' | 'graduated' | 'inactive'
  gpa: number
}

export interface Faculty {
  id: string
  name: string
  email: string
  department: string
  courses: number
  status: 'active' | 'on-leave'
}

export interface Course {
  id: string
  code: string
  title: string
  units: number
  department: string
  instructor?: string
  schedule?: string
  room?: string
  enrolled?: number
  capacity?: number
}

export interface Department {
  id: string
  name: string
  head: string
  courses: number
  faculty: number
}

export interface Enrollment {
  id: string
  studentId: string
  studentName: string
  courseCode: string
  courseTitle: string
  status: 'pending' | 'approved' | 'rejected'
  date: string
}

export interface Assignment {
  id: string
  title: string
  courseCode: string
  dueDate: string
  status: 'draft' | 'published'
  submissions?: number
}

export interface Grade {
  id: string
  studentId: string
  studentName: string
  courseCode: string
  score: number
  maxScore: number
  letterGrade: string
}

export interface Notification {
  id: string
  studentId?: string
  title: string
  message: string
  type: 'enrollment' | 'assignment' | 'grade' | 'announcement'
  date: string
  read: boolean
}

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  courseCode?: string
  date: string
  status: 'present' | 'absent' | 'late'
}

export interface LearningMaterial {
  id: string
  name: string
  courseCode: string
  uploadedBy: string
  date: string
}

export interface AcademicProgram {
  id: string
  code: string
  name: string
  years: number
  units: number
}

export interface SystemRole {
  id: string
  name: string
  permissions: string
}

export interface BackupRecord {
  id: string
  date: string
  size: string
  type: string
}

export interface AcademicSettings {
  semester: string
  enrollmentStart: string
  enrollmentEnd: string
  gradingScale: string
  maxUnits: number
  minGpa: number
}

export interface NavItem {
  label: string
  path: string
  icon?: string
}

export interface RoleTheme {
  label: string
  accent: string
  accentLight: string
  accentText: string
  gradient: string
}

export interface SystemData {
  users: User[]
  students: Student[]
  faculty: Faculty[]
  courses: Course[]
  departments: Department[]
  enrollments: Enrollment[]
  assignments: Assignment[]
  grades: Grade[]
  notifications: Notification[]
  attendance: AttendanceRecord[]
  materials: LearningMaterial[]
  programs: AcademicProgram[]
  roles: SystemRole[]
  backups: BackupRecord[]
  settings: AcademicSettings
}
