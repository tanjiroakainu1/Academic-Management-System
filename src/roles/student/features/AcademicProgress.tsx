import { FeaturePage } from '../../../components/common/RoleLayout'
import { ContentCard, MetricTile } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'
import { computeGpa, useCurrentStudent } from '../../../hooks/useRoleData'

export default function AcademicProgress() {
  const { grades, programs } = useData()
  const student = useCurrentStudent()
  const studentGrades = grades.filter((g) => g.studentId === student?.id)
  const avg = studentGrades.length ? studentGrades.reduce((a, g) => a + (g.score / g.maxScore) * 100, 0) / studentGrades.length : 0
  const program = programs.find((p) => student?.program.includes(p.name.replace('BS ', '')) || student?.program.includes(p.code))
  const totalUnits = program?.units ?? 144
  const completedUnits = Math.round((student?.year ?? 1) * (totalUnits / (program?.years ?? 4)))
  const gpa = student ? computeGpa(student.id, grades) : 0
  const progress = Math.min((completedUnits / totalUnits) * 100, 100)

  return (
    <FeaturePage title="Academic Progress" description="Track your progress toward graduation.">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        <MetricTile label="Overall Average" value={`${avg.toFixed(1)}%`} />
        <MetricTile label="Current GPA" value={gpa.toFixed(2)} />
        <MetricTile label="Year Level" value={student?.year ? `${student.year}${student.year === 1 ? 'st' : student.year === 2 ? 'nd' : student.year === 3 ? 'rd' : 'th'}` : '—'} />
      </div>
      <ContentCard>
        <h3 className="font-semibold text-slate-800">{student?.program ?? 'Program Progress'}</h3>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm">
          <span className="font-medium text-slate-700">{progress.toFixed(0)}% complete</span>
          <span className="text-slate-500">{completedUnits} / {totalUnits} units · {Math.max(totalUnits - completedUnits, 0)} remaining</span>
        </div>
      </ContentCard>
    </FeaturePage>
  )
}
