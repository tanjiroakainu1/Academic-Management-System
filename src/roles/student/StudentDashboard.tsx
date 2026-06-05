import { BookOpen, Calendar, Upload, FileText, Award, TrendingUp, Bell } from 'lucide-react'
import { DashboardShell } from '../../components/common/DashboardUI'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { computeGpa, useCurrentStudent, useStudentCourses } from '../../hooks/useRoleData'

const links = [
  { label: 'Enroll in Courses', path: 'enrollment', icon: BookOpen, color: 'bg-gradient-to-br from-amber-500 to-orange-500', description: 'Browse & enroll' },
  { label: 'Class Schedules', path: 'schedules', icon: Calendar, color: 'bg-gradient-to-br from-blue-500 to-blue-600', description: 'Your timetable' },
  { label: 'Learning Materials', path: 'materials', icon: Upload, color: 'bg-gradient-to-br from-violet-500 to-purple-600', description: 'Course resources' },
  { label: 'Submit Assignments', path: 'assignments', icon: FileText, color: 'bg-gradient-to-br from-emerald-500 to-teal-600', description: 'Upload work' },
  { label: 'Grades & Records', path: 'grades', icon: Award, color: 'bg-gradient-to-br from-rose-500 to-pink-600', description: 'View scores' },
  { label: 'Academic Progress', path: 'progress', icon: TrendingUp, color: 'bg-gradient-to-br from-indigo-500 to-blue-600', description: 'Track graduation' },
  { label: 'Notifications', path: 'notifications', icon: Bell, color: 'bg-gradient-to-br from-slate-600 to-slate-800', description: 'Alerts & updates' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const { assignments, grades, notifications } = useData()
  const student = useCurrentStudent()
  const enrolledCourses = useStudentCourses(student?.id)
  const enrolledCodes = enrolledCourses.map((c) => c.code)
  const myAssignments = assignments.filter((a) => a.status === 'published' && enrolledCodes.includes(a.courseCode))
  const myNotifications = notifications.filter((n) => !n.studentId || n.studentId === student?.id)
  const unread = myNotifications.filter((n) => !n.read).length
  const gpa = student ? computeGpa(student.id, grades) : 0

  return (
    <DashboardShell
      title="Student Dashboard"
      greeting={`Hello, ${user?.name?.split(' ')[0] ?? 'Student'}`}
      subtitle="Track your courses, assignments, grades, and academic progress in one place."
      accent="from-amber-500 via-orange-500 to-orange-600"
      stats={[
        { label: 'Enrolled Courses', value: enrolledCourses.length, icon: <BookOpen className="h-5 w-5" /> },
        { label: 'Current GPA', value: gpa.toFixed(2), icon: <Award className="h-5 w-5" /> },
        { label: 'Active Assignments', value: myAssignments.length, icon: <FileText className="h-5 w-5" /> },
        { label: 'Unread Notifications', value: unread, icon: <Bell className="h-5 w-5" /> },
      ]}
      links={links}
      basePath="/student"
    />
  )
}
