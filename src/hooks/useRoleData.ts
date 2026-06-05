import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'
import type { Course, Enrollment, Student, Faculty } from '../types'

export function useCurrentStudent(): Student | undefined {
  const { user } = useAuth()
  const { students } = useData()
  if (!user) return undefined
  return students.find((s) => s.email.toLowerCase() === user.email.toLowerCase())
}

export function useCurrentFaculty(): Faculty | undefined {
  const { user } = useAuth()
  const { faculty } = useData()
  if (!user) return undefined
  return faculty.find((f) => f.email.toLowerCase() === user.email.toLowerCase())
}

export function useStudentEnrollments(studentId?: string, approvedOnly = true): Enrollment[] {
  const { enrollments } = useData()
  return enrollments.filter(
    (e) =>
      e.studentId === studentId &&
      (!approvedOnly || e.status === 'approved'),
  )
}

export function useStudentCourses(studentId?: string): Course[] {
  const { courses } = useData()
  const codes = useStudentEnrollments(studentId).map((e) => e.courseCode)
  return courses.filter((c) => codes.includes(c.code))
}

export function useFacultyCourses(instructorName?: string): Course[] {
  const { courses } = useData()
  if (!instructorName) return []
  return courses.filter((c) => c.instructor === instructorName)
}

export function computeGpa(studentId: string, grades: { studentId: string; score: number; maxScore: number }[]): number {
  const studentGrades = grades.filter((g) => g.studentId === studentId)
  if (!studentGrades.length) return 0
  const avg =
    studentGrades.reduce((sum, g) => sum + g.score / g.maxScore, 0) / studentGrades.length
  return avg * 4
}

export function computeLetterGrade(score: number, max: number): string {
  const pct = (score / max) * 100
  if (pct >= 90) return 'A'
  if (pct >= 85) return 'B+'
  if (pct >= 80) return 'B'
  if (pct >= 75) return 'C+'
  if (pct >= 70) return 'C'
  return 'D'
}
