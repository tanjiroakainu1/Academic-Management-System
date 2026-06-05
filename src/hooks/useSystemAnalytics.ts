import { useMemo } from 'react'
import { useData } from '../context/DataContext'
import { roleLabels } from '../utils/auth'
import type { UserRole } from '../types'

export const CHART_PALETTE = [
  '#3b82f6',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#f43f5e',
  '#06b6d4',
  '#6366f1',
  '#ec4899',
] as const

export function useSystemAnalytics() {
  const data = useData()

  return useMemo(() => {
    const { users, students, faculty, courses, departments, enrollments, grades, attendance, assignments } = data

    const usersByRole = (['super-admin', 'academic-administrator', 'faculty', 'student'] as UserRole[]).map((role) => ({
      role: roleLabels[role],
      count: users.filter((u) => u.role === role).length,
      fill: CHART_PALETTE[['super-admin', 'academic-administrator', 'faculty', 'student'].indexOf(role)],
    }))

    const enrollmentByStatus = [
      { status: 'Approved', count: enrollments.filter((e) => e.status === 'approved').length, fill: '#10b981' },
      { status: 'Pending', count: enrollments.filter((e) => e.status === 'pending').length, fill: '#f59e0b' },
      { status: 'Rejected', count: enrollments.filter((e) => e.status === 'rejected').length, fill: '#f43f5e' },
    ]

    const departmentStats = departments.map((d, i) => ({
      name: d.name.length > 12 ? `${d.name.slice(0, 12)}…` : d.name,
      fullName: d.name,
      faculty: d.faculty,
      courses: d.courses,
      fill: CHART_PALETTE[i % CHART_PALETTE.length],
    }))

    const courseUtilization = courses.map((c) => {
      const enrolled = c.enrolled ?? 0
      const capacity = c.capacity ?? 1
      return {
        code: c.code,
        enrolled,
        capacity,
        utilization: Math.round((enrolled / capacity) * 100),
        fill: CHART_PALETTE[courses.indexOf(c) % CHART_PALETTE.length],
      }
    })

    const gpaBuckets = [
      { range: '3.5 – 4.0', count: 0, fill: '#10b981' },
      { range: '3.0 – 3.5', count: 0, fill: '#3b82f6' },
      { range: '2.5 – 3.0', count: 0, fill: '#8b5cf6' },
      { range: 'Below 2.5', count: 0, fill: '#f59e0b' },
    ]
    students.forEach((s) => {
      if (s.gpa >= 3.5) gpaBuckets[0].count++
      else if (s.gpa >= 3.0) gpaBuckets[1].count++
      else if (s.gpa >= 2.5) gpaBuckets[2].count++
      else gpaBuckets[3].count++
    })

    const gradeMap = new Map<string, number>()
    grades.forEach((g) => gradeMap.set(g.letterGrade, (gradeMap.get(g.letterGrade) ?? 0) + 1))
    const gradeDistribution = Array.from(gradeMap.entries()).map(([grade, count], i) => ({
      grade,
      count,
      fill: CHART_PALETTE[i % CHART_PALETTE.length],
    }))

    const programMap = new Map<string, number>()
    students.forEach((s) => {
      const short = s.program.replace('BS ', '')
      programMap.set(short, (programMap.get(short) ?? 0) + 1)
    })
    const studentsByProgram = Array.from(programMap.entries()).map(([program, count], i) => ({
      program,
      count,
      fill: CHART_PALETTE[i % CHART_PALETTE.length],
    }))

    const monthMap = new Map<string, { enrollments: number; assignments: number }>()
    const addMonth = (date: string, key: 'enrollments' | 'assignments') => {
      const month = date.slice(0, 7)
      const entry = monthMap.get(month) ?? { enrollments: 0, assignments: 0 }
      entry[key]++
      monthMap.set(month, entry)
    }
    enrollments.forEach((e) => addMonth(e.date, 'enrollments'))
    assignments.forEach((a) => addMonth(a.dueDate, 'assignments'))
    const activityTrend = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, vals]) => ({
        month: new Date(`${month}-01`).toLocaleDateString('en', { month: 'short', year: '2-digit' }),
        enrollments: vals.enrollments,
        assignments: vals.assignments,
      }))

    const facultyWorkload = faculty.map((f, i) => ({
      name: f.name.split(' ').pop() ?? f.name,
      fullName: f.name,
      courses: f.courses,
      fill: CHART_PALETTE[i % CHART_PALETTE.length],
    }))

    const attendanceBreakdown = [
      { status: 'Present', count: attendance.filter((a) => a.status === 'present').length, fill: '#10b981' },
      { status: 'Late', count: attendance.filter((a) => a.status === 'late').length, fill: '#f59e0b' },
      { status: 'Absent', count: attendance.filter((a) => a.status === 'absent').length, fill: '#f43f5e' },
    ]

    const userStatus = [
      { status: 'Active', count: users.filter((u) => u.status === 'active').length, fill: '#10b981' },
      { status: 'Inactive', count: users.filter((u) => u.status === 'inactive').length, fill: '#94a3b8' },
    ]

    const studentStatus = [
      { status: 'Enrolled', count: students.filter((s) => s.status === 'enrolled').length, fill: '#3b82f6' },
      { status: 'Graduated', count: students.filter((s) => s.status === 'graduated').length, fill: '#8b5cf6' },
      { status: 'Inactive', count: students.filter((s) => s.status === 'inactive').length, fill: '#94a3b8' },
    ]

    const avgGpa = students.length
      ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)
      : '0.00'

    const totalCapacity = courses.reduce((sum, c) => sum + (c.capacity ?? 0), 0)
    const totalEnrolled = courses.reduce((sum, c) => sum + (c.enrolled ?? 0), 0)
    const systemUtilization = totalCapacity ? Math.round((totalEnrolled / totalCapacity) * 100) : 0

    return {
      usersByRole,
      enrollmentByStatus,
      departmentStats,
      courseUtilization,
      gpaBuckets,
      gradeDistribution,
      studentsByProgram,
      activityTrend,
      facultyWorkload,
      attendanceBreakdown,
      userStatus,
      studentStatus,
      summary: {
        totalUsers: users.length,
        totalStudents: students.length,
        totalFaculty: faculty.length,
        totalCourses: courses.length,
        totalDepartments: departments.length,
        pendingEnrollments: enrollments.filter((e) => e.status === 'pending').length,
        approvedEnrollments: enrollments.filter((e) => e.status === 'approved').length,
        avgGpa,
        systemUtilization,
      },
    }
  }, [data])
}
