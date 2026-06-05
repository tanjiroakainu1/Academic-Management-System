import { FeaturePage, DataTable } from '../../../components/common/RoleLayout'
import { ContentCard, EmptyState } from '../../../components/common/DashboardUI'
import { useCurrentStudent, useStudentCourses } from '../../../hooks/useRoleData'

export default function ClassSchedules() {
  const student = useCurrentStudent()
  const enrolled = useStudentCourses(student?.id)

  return (
    <FeaturePage title="Class Schedules" description="View your weekly class schedule and room assignments.">
      {enrolled.length === 0 ? (
        <EmptyState title="No enrolled courses" description="Enroll in courses to see your schedule here." />
      ) : (
        <>
          <DataTable headers={['Course', 'Title', 'Schedule', 'Room', 'Instructor']} rows={enrolled.map((c) => [c.code, c.title, c.schedule ?? 'TBA', c.room ?? 'TBA', c.instructor ?? 'TBA'])} />
          <ContentCard className="mt-6" title="Weekly Overview" description="Your classes at a glance.">
            <div className="space-y-2">
              {enrolled.map((c) => (
                <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-white px-4 py-3 text-sm transition hover:border-slate-200 hover:shadow-sm">
                  <span className="font-bold text-slate-800">{c.code}</span>
                  <span className="text-slate-500">{c.schedule ?? 'TBA'} · {c.room ?? 'TBA'}</span>
                </div>
              ))}
            </div>
          </ContentCard>
        </>
      )}
    </FeaturePage>
  )
}
