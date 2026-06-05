import { FeaturePage, DataTable, ActionButton } from '../../../components/common/RoleLayout'
import { ContentCard, EmptyState } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'
import { useCurrentStudent } from '../../../hooks/useRoleData'

export default function GradesRecords() {
  const { grades } = useData()
  const student = useCurrentStudent()
  const myGrades = grades.filter((g) => g.studentId === student?.id)

  return (
    <FeaturePage title="Grades & Academic Records" description="View your grades and academic performance records.">
      {myGrades.length === 0 ? (
        <EmptyState title="No grades recorded" description="Your grades will appear here once posted by faculty." />
      ) : (
        <DataTable headers={['Course', 'Score', 'Letter Grade', 'Percentage']} rows={myGrades.map((g) => [g.courseCode, `${g.score}/${g.maxScore}`, g.letterGrade, `${((g.score / g.maxScore) * 100).toFixed(1)}%`])} />
      )}
      <ContentCard className="mt-6 flex flex-wrap gap-3 !p-5">
        <ActionButton onClick={() => alert('Transcript request submitted')}>Request Transcript</ActionButton>
        <ActionButton variant="secondary" onClick={() => alert('Certificate request submitted')}>Request Certificate</ActionButton>
      </ContentCard>
    </FeaturePage>
  )
}
