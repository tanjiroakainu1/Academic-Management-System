import { ActionButton, FeaturePage } from '../../../components/common/RoleLayout'
import { ContentCard, EmptyState } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'
import { useCurrentStudent, useStudentCourses } from '../../../hooks/useRoleData'
import { File, Download } from 'lucide-react'

export default function LearningMaterials() {
  const { materials } = useData()
  const student = useCurrentStudent()
  const enrolled = useStudentCourses(student?.id)
  const enrolledCodes = enrolled.map((c) => c.code)
  const myMaterials = materials.filter((m) => enrolledCodes.includes(m.courseCode))

  return (
    <FeaturePage title="Learning Materials" description="Access course materials uploaded by your instructors.">
      {myMaterials.length === 0 ? (
        <EmptyState title="No materials yet" description="Materials for your enrolled courses will appear here." />
      ) : (
        <div className="space-y-3">
          {myMaterials.map((m) => (
            <ContentCard key={m.id} className="flex flex-wrap items-center justify-between gap-4 !p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 p-3 text-white shadow-md shadow-amber-200/50">
                  <File className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{m.name}</p>
                  <p className="text-sm text-slate-500">{m.courseCode} · {m.uploadedBy} · {m.date}</p>
                </div>
              </div>
              <ActionButton onClick={() => alert(`Downloading ${m.name}`)}>
                <span className="flex items-center gap-2"><Download className="h-4 w-4" /> Download</span>
              </ActionButton>
            </ContentCard>
          ))}
        </div>
      )}
    </FeaturePage>
  )
}
