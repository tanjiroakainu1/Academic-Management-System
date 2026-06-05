import { useState } from 'react'
import { BarChart3 } from 'lucide-react'
import { FeaturePage, AlertMessage } from '../../../components/common/RoleLayout'
import { MetricTile, ReportCard } from '../../../components/common/DashboardUI'
import { SystemAnalyticsDashboard } from '../../../components/charts/SystemCharts'
import { useData } from '../../../context/DataContext'
import { useSystemAnalytics } from '../../../hooks/useSystemAnalytics'

const reportTypes = [
  { label: 'Enrollment Report', desc: 'Course enrollment statistics' },
  { label: 'Academic Performance', desc: 'GPA and grade distribution' },
  { label: 'Faculty Workload', desc: 'Instructor assignments and load' },
  { label: 'Course Analytics', desc: 'Course capacity and utilization' },
]

export default function SystemReports() {
  const { students, enrollments, courses } = useData()
  const { summary } = useSystemAnalytics()
  const [generated, setGenerated] = useState<string | null>(null)

  return (
    <FeaturePage
      title="System Reports"
      description="Live analytics dashboards and exportable system-wide academic reports."
      actions={
        <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-2 text-xs font-bold text-white shadow-md sm:text-sm">
          <BarChart3 className="h-4 w-4" />
          {summary.totalStudents} students tracked
        </div>
      }
    >
      {generated && <AlertMessage type="success" message={`${generated} generated successfully! Download ready.`} />}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <MetricTile label="Total Students" value={students.length} accent="from-blue-500 to-indigo-600" />
        <MetricTile label="Active Enrollments" value={enrollments.filter((e) => e.status === 'approved').length} accent="from-emerald-500 to-teal-600" />
        <MetricTile label="Courses Offered" value={courses.length} accent="from-violet-500 to-purple-600" />
        <MetricTile label="Pending Enrollments" value={enrollments.filter((e) => e.status === 'pending').length} accent="from-amber-500 to-orange-500" />
      </div>

      <SystemAnalyticsDashboard />

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-slate-900 sm:text-lg">
          <span className="h-6 w-1 rounded-full bg-gradient-to-b from-rose-500 to-pink-600" />
          Generate Reports
        </h3>
        <div className="space-y-3">
          {reportTypes.map((r) => (
            <ReportCard
              key={r.label}
              title={r.label}
              description={r.desc}
              onGenerate={() => {
                setGenerated(r.label)
                setTimeout(() => setGenerated(null), 4000)
              }}
            />
          ))}
        </div>
      </div>
    </FeaturePage>
  )
}
