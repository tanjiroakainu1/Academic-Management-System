import { useState } from 'react'
import { FeaturePage, DataTable, StatusBadge, FormField, inputClass, ActionButton } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

export default function AcademicRecords() {
  const { students, grades } = useData()
  const [search, setSearch] = useState('')
  const filtered = students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))

  return (
    <FeaturePage title="Academic Records" description="View all student academic records and transcripts.">
      <div className="mb-4 flex gap-2">
        <FormField label="Search Student">
          <input className={inputClass} placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </FormField>
      </div>
      <h3 className="mb-3 font-semibold text-slate-700">Student Records</h3>
      <DataTable
        headers={['ID', 'Name', 'Program', 'Year', 'GPA', 'Status']}
        rows={filtered.map((s) => [s.id, s.name, s.program, s.year, s.gpa.toFixed(2), <StatusBadge key={s.id} status={s.status} />])}
      />
      <h3 className="mb-3 mt-8 font-semibold text-slate-700">Grade Records</h3>
      <DataTable
        headers={['Student', 'Course', 'Score', 'Grade']}
        rows={grades.map((g) => [g.studentName, g.courseCode, `${g.score}/${g.maxScore}`, g.letterGrade])}
      />
      <div className="mt-4">
        <ActionButton onClick={() => alert('Transcript report generated for selected students')}>Generate Transcript Report</ActionButton>
      </div>
    </FeaturePage>
  )
}
