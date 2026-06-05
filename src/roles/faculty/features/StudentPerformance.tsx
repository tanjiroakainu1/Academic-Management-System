import { FeaturePage, DataTable } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

export default function StudentPerformance() {
  const { students, grades } = useData()

  const performance = students.map((s) => {
    const studentGrades = grades.filter((g) => g.studentId === s.id)
    const avg = studentGrades.length ? studentGrades.reduce((a, g) => a + (g.score / g.maxScore) * 100, 0) / studentGrades.length : 0
    return [s.name, s.program, studentGrades.length, `${avg.toFixed(1)}%`, avg >= 85 ? 'Excellent' : avg >= 75 ? 'Good' : 'Needs Improvement']
  })

  return (
    <FeaturePage title="Student Performance" description="Monitor student academic performance across your classes.">
      <DataTable headers={['Student', 'Program', 'Graded Items', 'Average', 'Performance']} rows={performance} />
    </FeaturePage>
  )
}
