import type { SystemData } from '../types'

export const roleThemes = {
  'super-admin': {
    label: 'Super Admin',
    accent: 'bg-emerald-700',
    accentLight: 'bg-emerald-50',
    accentText: 'text-emerald-800',
    gradient: 'from-emerald-700 to-green-800',
  },
  'academic-administrator': {
    label: 'Academic Administrator',
    accent: 'bg-emerald-600',
    accentLight: 'bg-emerald-50',
    accentText: 'text-emerald-700',
    gradient: 'from-emerald-600 to-teal-700',
  },
  faculty: {
    label: 'Faculty / Instructor',
    accent: 'bg-teal-600',
    accentLight: 'bg-teal-50',
    accentText: 'text-teal-700',
    gradient: 'from-teal-600 to-emerald-700',
  },
  student: {
    label: 'Student',
    accent: 'bg-green-500',
    accentLight: 'bg-green-50',
    accentText: 'text-green-700',
    gradient: 'from-green-500 to-emerald-600',
  },
} as const

export const initialSystemData: SystemData = {
  users: [
    { id: '1', name: 'System Admin', email: 'admin@academy.edu', role: 'super-admin', status: 'active' },
    { id: '2', name: 'Jane Registrar', email: 'registrar@academy.edu', role: 'academic-administrator', department: 'Registrar', status: 'active' },
    { id: '3', name: 'Dr. John Smith', email: 'jsmith@academy.edu', role: 'faculty', department: 'Computer Science', status: 'active' },
    { id: '4', name: 'Alice Johnson', email: 'alice@student.edu', role: 'student', department: 'Computer Science', status: 'active' },
  ],
  students: [
    { id: 'S001', name: 'Alice Johnson', email: 'alice@student.edu', program: 'BS Computer Science', year: 3, status: 'enrolled', gpa: 3.75 },
    { id: 'S002', name: 'Bob Williams', email: 'bob@student.edu', program: 'BS Information Technology', year: 2, status: 'enrolled', gpa: 3.42 },
    { id: 'S003', name: 'Carol Davis', email: 'carol@student.edu', program: 'BS Computer Science', year: 4, status: 'enrolled', gpa: 3.91 },
    { id: 'S004', name: 'David Lee', email: 'david@student.edu', program: 'BS Data Science', year: 1, status: 'enrolled', gpa: 3.55 },
  ],
  faculty: [
    { id: 'F001', name: 'Dr. John Smith', email: 'jsmith@academy.edu', department: 'Computer Science', courses: 3, status: 'active' },
    { id: 'F002', name: 'Prof. Maria Garcia', email: 'mgarcia@academy.edu', department: 'Mathematics', courses: 2, status: 'active' },
    { id: 'F003', name: 'Dr. Robert Chen', email: 'rchen@academy.edu', department: 'Information Technology', courses: 4, status: 'on-leave' },
  ],
  courses: [
    { id: 'C001', code: 'CS101', title: 'Introduction to Programming', units: 3, department: 'Computer Science', instructor: 'Dr. John Smith', schedule: 'MWF 9:00-10:00', room: 'Lab 201', enrolled: 35, capacity: 40 },
    { id: 'C002', code: 'CS201', title: 'Data Structures', units: 3, department: 'Computer Science', instructor: 'Dr. John Smith', schedule: 'TTH 10:00-11:30', room: 'Room 305', enrolled: 28, capacity: 35 },
    { id: 'C003', code: 'MATH101', title: 'Calculus I', units: 4, department: 'Mathematics', instructor: 'Prof. Maria Garcia', schedule: 'MWF 11:00-12:00', room: 'Room 102', enrolled: 42, capacity: 45 },
    { id: 'C004', code: 'IT301', title: 'Network Security', units: 3, department: 'Information Technology', instructor: 'Dr. Robert Chen', schedule: 'TTH 1:00-2:30', room: 'Lab 105', enrolled: 22, capacity: 30 },
  ],
  departments: [
    { id: 'D001', name: 'Computer Science', head: 'Dr. John Smith', courses: 12, faculty: 8 },
    { id: 'D002', name: 'Mathematics', head: 'Prof. Maria Garcia', courses: 8, faculty: 6 },
    { id: 'D003', name: 'Information Technology', head: 'Dr. Robert Chen', courses: 10, faculty: 7 },
  ],
  enrollments: [
    { id: 'E001', studentId: 'S001', studentName: 'Alice Johnson', courseCode: 'CS101', courseTitle: 'Introduction to Programming', status: 'approved', date: '2026-01-15' },
    { id: 'E002', studentId: 'S001', studentName: 'Alice Johnson', courseCode: 'CS201', courseTitle: 'Data Structures', status: 'approved', date: '2026-01-15' },
    { id: 'E003', studentId: 'S002', studentName: 'Bob Williams', courseCode: 'CS201', courseTitle: 'Data Structures', status: 'pending', date: '2026-06-01' },
    { id: 'E004', studentId: 'S003', studentName: 'Carol Davis', courseCode: 'MATH101', courseTitle: 'Calculus I', status: 'approved', date: '2026-01-15' },
  ],
  assignments: [
    { id: 'A001', title: 'Programming Assignment 1', courseCode: 'CS101', dueDate: '2026-06-15', status: 'published', submissions: 28 },
    { id: 'A002', title: 'Data Structures Quiz', courseCode: 'CS201', dueDate: '2026-06-20', status: 'published', submissions: 15 },
    { id: 'A003', title: 'Final Project Proposal', courseCode: 'CS201', dueDate: '2026-07-01', status: 'draft', submissions: 0 },
  ],
  grades: [
    { id: 'G001', studentId: 'S001', studentName: 'Alice Johnson', courseCode: 'CS101', score: 92, maxScore: 100, letterGrade: 'A' },
    { id: 'G002', studentId: 'S001', studentName: 'Alice Johnson', courseCode: 'CS201', score: 88, maxScore: 100, letterGrade: 'B+' },
    { id: 'G003', studentId: 'S002', studentName: 'Bob Williams', courseCode: 'CS101', score: 78, maxScore: 100, letterGrade: 'C+' },
  ],
  notifications: [
    { id: 'N001', studentId: 'S001', title: 'Enrollment Approved', message: 'Your enrollment in CS201 has been approved.', type: 'enrollment', date: '2026-06-02', read: false },
    { id: 'N002', studentId: 'S001', title: 'Assignment Due Soon', message: 'Programming Assignment 1 is due in 3 days.', type: 'assignment', date: '2026-06-12', read: false },
    { id: 'N003', studentId: 'S001', title: 'Grade Posted', message: 'Your grade for CS101 midterm has been posted.', type: 'grade', date: '2026-05-28', read: true },
    { id: 'N004', title: 'Academic Announcement', message: 'Enrollment period for next semester opens June 10.', type: 'announcement', date: '2026-06-01', read: true },
  ],
  attendance: [
    { id: 'AT001', studentId: 'S001', studentName: 'Alice Johnson', courseCode: 'CS101', date: '2026-06-03', status: 'present' },
    { id: 'AT002', studentId: 'S002', studentName: 'Bob Williams', courseCode: 'CS101', date: '2026-06-03', status: 'late' },
    { id: 'AT003', studentId: 'S003', studentName: 'Carol Davis', courseCode: 'MATH101', date: '2026-06-03', status: 'absent' },
  ],
  materials: [
    { id: 'M001', name: 'Lecture 1 - Introduction.pdf', courseCode: 'CS101', uploadedBy: 'Dr. John Smith', date: '2026-06-01' },
    { id: 'M002', name: 'Week 2 Slides.pptx', courseCode: 'CS201', uploadedBy: 'Dr. John Smith', date: '2026-06-03' },
    { id: 'M003', name: 'Reading Assignment.docx', courseCode: 'CS101', uploadedBy: 'Dr. John Smith', date: '2026-06-05' },
  ],
  programs: [
    { id: 'P001', code: 'BSCS', name: 'BS Computer Science', years: 4, units: 144 },
    { id: 'P002', code: 'BSIT', name: 'BS Information Technology', years: 4, units: 144 },
    { id: 'P003', code: 'BSDS', name: 'BS Data Science', years: 4, units: 144 },
  ],
  roles: [
    { id: 'R001', name: 'Super Admin', permissions: 'Full system access, backup, audit logs' },
    { id: 'R002', name: 'Academic Administrator', permissions: 'Students, faculty, enrollment, reports' },
    { id: 'R003', name: 'Faculty / Instructor', permissions: 'Courses, grades, attendance, materials' },
    { id: 'R004', name: 'Student', permissions: 'Enrollment, schedules, assignments, grades' },
  ],
  backups: [
    { id: 'B001', date: '2026-06-04 23:00', size: '245 MB', type: 'Full Backup' },
    { id: 'B002', date: '2026-06-03 23:00', size: '243 MB', type: 'Full Backup' },
    { id: 'B003', date: '2026-06-02 23:00', size: '241 MB', type: 'Full Backup' },
  ],
  settings: {
    semester: 'First Semester 2026',
    enrollmentStart: '2026-06-01',
    enrollmentEnd: '2026-06-30',
    gradingScale: '4.0 Scale',
    maxUnits: 24,
    minGpa: 2.0,
  },
}

/** @deprecated use useData() from DataContext */
export const mockUsers = initialSystemData.users
export const mockStudents = initialSystemData.students
export const mockFaculty = initialSystemData.faculty
export const mockCourses = initialSystemData.courses
export const mockDepartments = initialSystemData.departments
export const mockEnrollments = initialSystemData.enrollments
export const mockAssignments = initialSystemData.assignments
export const mockGrades = initialSystemData.grades
export const mockNotifications = initialSystemData.notifications
export const mockAttendance = initialSystemData.attendance
export const academicSettings = initialSystemData.settings
