import { useState } from 'react'
import { FeaturePage, AlertMessage } from '../../../components/common/RoleLayout'
import { MetricTile, ReportCard } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'

export default function AcademicReports() {
  const { students, faculty, courses } = useData()
  const [msg, setMsg] = useState('')
  const reports = [
    { title: 'Student Enrollment Report', desc: 'Enrollment trends by program' },
    { title: 'Faculty Workload Report', desc: 'Teaching load distribution' },
    { title: 'Course Utilization Report', desc: 'Capacity vs enrollment' },
    { title: 'Academic Performance Summary', desc: 'GPA and grade overview' },
  ]

  return (
    <FeaturePage title="Academic Reports" description="Generate enrollment, performance, and faculty reports.">
      {msg && <AlertMessage type="success" message={msg} />}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <MetricTile label="Students" value={students.length} />
        <MetricTile label="Faculty" value={faculty.length} />
        <MetricTile label="Courses" value={courses.length} />
      </div>
      <div className="space-y-3">
        {reports.map((r) => (
          <ReportCard key={r.title} title={r.title} description={r.desc} onGenerate={() => { setMsg(`${r.title} generated`); setTimeout(() => setMsg(''), 3000) }} />
        ))}
      </div>
    </FeaturePage>
  )
}
