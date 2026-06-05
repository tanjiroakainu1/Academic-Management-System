import { Users, Shield, Building2, FileText, BarChart3, Database, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DashboardShell, SectionHeader } from '../../components/common/DashboardUI'
import { ActionButton } from '../../components/common/RoleLayout'
import { DashboardChartsPreview } from '../../components/charts/SystemCharts'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { ArrowRight } from 'lucide-react'

const quickLinks = [
  { label: 'Manage Users', path: 'users', icon: Users, color: 'bg-gradient-to-br from-blue-500 to-blue-600', description: 'Accounts & registration' },
  { label: 'Manage Roles', path: 'roles', icon: Shield, color: 'bg-gradient-to-br from-violet-500 to-purple-600', description: 'Access control' },
  { label: 'Academic Settings', path: 'settings', icon: Settings, color: 'bg-gradient-to-br from-amber-500 to-orange-500', description: 'Semester & grading' },
  { label: 'Departments', path: 'departments', icon: Building2, color: 'bg-gradient-to-br from-emerald-500 to-teal-600', description: 'Departments & courses' },
  { label: 'Academic Records', path: 'records', icon: FileText, color: 'bg-gradient-to-br from-indigo-500 to-blue-600', description: 'Student transcripts' },
  { label: 'System Reports', path: 'reports', icon: BarChart3, color: 'bg-gradient-to-br from-rose-500 to-pink-600', description: 'Analytics & exports' },
  { label: 'Backup & Restore', path: 'backup', icon: Database, color: 'bg-gradient-to-br from-slate-600 to-slate-800', description: 'Data recovery' },
]

export default function SuperAdminDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { users, students, departments, courses } = useData()

  return (
    <div className="space-y-6 sm:space-y-8">
      <DashboardShell
        title="Super Admin Dashboard"
        greeting={`Welcome, ${user?.name?.split(' ')[0] ?? 'Admin'}`}
        subtitle="Full system access — manage users, academic structure, records, and system-wide operations."
        accent="from-red-600 via-rose-600 to-rose-700"
        stats={[
          { label: 'Total Users', value: users.length, icon: <Users className="h-5 w-5" /> },
          { label: 'Students', value: students.length, icon: <Users className="h-5 w-5" /> },
          { label: 'Departments', value: departments.length, icon: <Building2 className="h-5 w-5" /> },
          { label: 'Courses', value: courses.length, icon: <FileText className="h-5 w-5" /> },
        ]}
        links={quickLinks}
        basePath="/super-admin"
        hideDeveloperCredit
      />

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <SectionHeader title="Live Analytics" badge="Real-time charts" className="!mb-0" />
          <ActionButton onClick={() => navigate('/super-admin/reports')}>
            <span className="flex items-center gap-2">Full Reports <ArrowRight className="h-4 w-4" /></span>
          </ActionButton>
        </div>
        <DashboardChartsPreview />
      </div>
    </div>
  )
}
