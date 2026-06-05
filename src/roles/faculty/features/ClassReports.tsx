import { useState } from 'react'
import { FeaturePage, AlertMessage } from '../../../components/common/RoleLayout'
import { ReportCard } from '../../../components/common/DashboardUI'
import { useAuth } from '../../../context/AuthContext'
import { useFacultyCourses } from '../../../hooks/useRoleData'

export default function ClassReports() {
  const { user } = useAuth()
  const myCourses = useFacultyCourses(user?.name)
  const courseList = myCourses.map((c) => c.code).join(', ') || 'No courses'
  const [msg, setMsg] = useState('')
  const reports = [
    { title: 'Attendance Summary', desc: 'Daily and weekly attendance rates' },
    { title: 'Grade Distribution', desc: 'Score breakdown by course' },
    { title: 'Assignment Completion', desc: 'Submission rates and deadlines' },
    { title: 'Class Performance', desc: 'Overall class analytics' },
  ]

  return (
    <FeaturePage title="Class Reports" description="Generate reports for your assigned classes.">
      {msg && <AlertMessage type="success" message={msg} />}
      <div className="space-y-3">
        {reports.map((r) => (
          <ReportCard key={r.title} title={r.title} description={r.desc} onGenerate={() => { setMsg(`${r.title} generated for ${courseList}`); setTimeout(() => setMsg(''), 3000) }} />
        ))}
      </div>
    </FeaturePage>
  )
}
