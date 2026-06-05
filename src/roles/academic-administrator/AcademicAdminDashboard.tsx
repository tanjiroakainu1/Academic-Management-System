import { Users, GraduationCap, BookOpen, Calendar, ClipboardList, BarChart3 } from 'lucide-react'
import { DashboardShell } from '../../components/common/DashboardUI'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'

const links = [
  { label: 'Student Records', path: 'students', icon: Users, color: 'bg-gradient-to-br from-blue-500 to-blue-600', description: 'Register & manage students' },
  { label: 'Faculty Records', path: 'faculty', icon: GraduationCap, color: 'bg-gradient-to-br from-violet-500 to-purple-600', description: 'Faculty profiles' },
  { label: 'Academic Programs', path: 'programs', icon: BookOpen, color: 'bg-gradient-to-br from-emerald-500 to-teal-600', description: 'Degree programs' },
  { label: 'Course Offerings', path: 'offerings', icon: BookOpen, color: 'bg-gradient-to-br from-indigo-500 to-blue-600', description: 'Semester offerings' },
  { label: 'Class Schedules', path: 'schedules', icon: Calendar, color: 'bg-gradient-to-br from-amber-500 to-orange-500', description: 'Rooms & timetables' },
  { label: 'Enrollment', path: 'enrollment', icon: ClipboardList, color: 'bg-gradient-to-br from-rose-500 to-pink-600', description: 'Approve enrollments' },
  { label: 'Reports', path: 'reports', icon: BarChart3, color: 'bg-gradient-to-br from-slate-600 to-slate-800', description: 'Academic reports' },
]

export default function AcademicAdminDashboard() {
  const { user } = useAuth()
  const { students, faculty, courses, enrollments } = useData()
  const pending = enrollments.filter((e) => e.status === 'pending').length

  return (
    <DashboardShell
      title="Academic Administrator Dashboard"
      greeting={`Good day, ${user?.name?.split(' ')[0] ?? 'Administrator'}`}
      subtitle="Oversee academic operations, student services, enrollment, and institutional reporting."
      accent="from-indigo-600 via-blue-600 to-blue-700"
      stats={[
        { label: 'Students', value: students.length, icon: <Users className="h-5 w-5" /> },
        { label: 'Faculty', value: faculty.length, icon: <GraduationCap className="h-5 w-5" /> },
        { label: 'Course Offerings', value: courses.length, icon: <BookOpen className="h-5 w-5" /> },
        { label: 'Pending Enrollments', value: pending, change: 'Requires action', icon: <ClipboardList className="h-5 w-5" /> },
      ]}
      links={links}
      basePath="/academic-administrator"
    />
  )
}
