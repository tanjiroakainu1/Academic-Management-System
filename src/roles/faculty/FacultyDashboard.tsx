import { BookOpen, ClipboardCheck, Upload, FileText, Award, TrendingUp, BarChart3 } from 'lucide-react'
import { DashboardShell } from '../../components/common/DashboardUI'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { useFacultyCourses } from '../../hooks/useRoleData'

const links = [
  { label: 'My Courses', path: 'courses', icon: BookOpen, color: 'bg-gradient-to-br from-emerald-500 to-teal-600', description: 'Assigned classes' },
  { label: 'Attendance', path: 'attendance', icon: ClipboardCheck, color: 'bg-gradient-to-br from-blue-500 to-blue-600', description: 'Track presence' },
  { label: 'Materials', path: 'materials', icon: Upload, color: 'bg-gradient-to-br from-violet-500 to-purple-600', description: 'Upload resources' },
  { label: 'Assignments', path: 'assignments', icon: FileText, color: 'bg-gradient-to-br from-amber-500 to-orange-500', description: 'Quizzes & tasks' },
  { label: 'Grades', path: 'grades', icon: Award, color: 'bg-gradient-to-br from-rose-500 to-pink-600', description: 'Record scores' },
  { label: 'Performance', path: 'performance', icon: TrendingUp, color: 'bg-gradient-to-br from-indigo-500 to-blue-600', description: 'Student analytics' },
  { label: 'Class Reports', path: 'reports', icon: BarChart3, color: 'bg-gradient-to-br from-slate-600 to-slate-800', description: 'Generate reports' },
]

export default function FacultyDashboard() {
  const { user } = useAuth()
  const { assignments } = useData()
  const myCourses = useFacultyCourses(user?.name)
  const myCourseCodes = myCourses.map((c) => c.code)
  const myAssignments = assignments.filter((a) => myCourseCodes.includes(a.courseCode))

  return (
    <DashboardShell
      title="Faculty Dashboard"
      greeting={`Welcome back, ${user?.name?.split(' ').slice(-1)[0] ?? 'Professor'}`}
      subtitle="Manage your classes, learning materials, assessments, and student performance."
      accent="from-emerald-600 via-teal-600 to-teal-700"
      stats={[
        { label: 'Assigned Courses', value: myCourses.length, icon: <BookOpen className="h-5 w-5" /> },
        { label: 'Total Students', value: myCourses.reduce((a, c) => a + (c.enrolled ?? 0), 0), icon: <TrendingUp className="h-5 w-5" /> },
        { label: 'Active Assignments', value: myAssignments.filter((a) => a.status === 'published').length, icon: <FileText className="h-5 w-5" /> },
        { label: 'Total Submissions', value: myAssignments.reduce((a, b) => a + (b.submissions ?? 0), 0), icon: <ClipboardCheck className="h-5 w-5" /> },
      ]}
      links={links}
      basePath="/faculty"
    />
  )
}
