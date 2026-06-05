import { useState } from 'react'
import { ActionButton, AlertMessage, FeaturePage, FormField, StatusBadge, inputClass } from '../../../components/common/RoleLayout'
import { ContentCard, EmptyState } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'
import { useCurrentStudent, useStudentCourses } from '../../../hooks/useRoleData'
import { Upload, FileText } from 'lucide-react'

export default function AssignmentSubmission() {
  const { assignments } = useData()
  const student = useCurrentStudent()
  const enrolled = useStudentCourses(student?.id)
  const enrolledCodes = enrolled.map((c) => c.code)
  const myAssignments = assignments.filter((a) => a.status === 'published' && enrolledCodes.includes(a.courseCode))
  const [submitted, setSubmitted] = useState<string[]>([])
  const [selected, setSelected] = useState('')
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState('')

  const submit = () => {
    if (!selected || !fileName) return
    setSubmitted([...submitted, selected])
    setMessage(`Assignment submitted: ${fileName}`)
    setFileName('')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Assignment Submission" description="View and submit assignments for your enrolled courses.">
      {message && <AlertMessage type="success" message={message} />}
      {myAssignments.length === 0 ? (
        <EmptyState title="No assignments due" description="Published assignments for your courses will show here." />
      ) : (
        <div className="space-y-4">
          {myAssignments.map((a) => (
            <ContentCard key={a.id} className="!p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-3 text-white shadow-md shadow-emerald-200/50">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{a.title}</h4>
                    <p className="mt-0.5 text-sm text-slate-500">{a.courseCode} · Due {a.dueDate}</p>
                  </div>
                </div>
                <StatusBadge status={submitted.includes(a.id) ? 'submitted' : 'pending'} />
              </div>
              {!submitted.includes(a.id) && (
                <div className="mt-5 flex flex-wrap items-end gap-3 border-t border-slate-100 pt-5">
                  <FormField label="File Name">
                    <input className={inputClass} value={selected === a.id ? fileName : ''} onFocus={() => setSelected(a.id)} onChange={(e) => { setSelected(a.id); setFileName(e.target.value) }} placeholder="my-assignment.pdf" />
                  </FormField>
                  <ActionButton onClick={() => { setSelected(a.id); submit() }}><span className="flex items-center gap-2"><Upload className="h-4 w-4" /> Submit</span></ActionButton>
                </div>
              )}
            </ContentCard>
          ))}
        </div>
      )}
    </FeaturePage>
  )
}
