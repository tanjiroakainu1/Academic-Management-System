import { useState } from 'react'
import { ActionButton, AlertMessage, FeaturePage, FormField, inputClass } from '../../../components/common/RoleLayout'
import { ContentCard, EmptyState } from '../../../components/common/DashboardUI'
import { useAuth } from '../../../context/AuthContext'
import { useData } from '../../../context/DataContext'
import { useFacultyCourses } from '../../../hooks/useRoleData'
import { Upload, File } from 'lucide-react'

export default function LearningMaterials() {
  const { user } = useAuth()
  const { materials, setMaterials } = useData()
  const myCourses = useFacultyCourses(user?.name)
  const myMaterials = materials.filter((m) => myCourses.some((c) => c.code === m.courseCode))
  const [form, setForm] = useState({ name: '', courseCode: myCourses[0]?.code ?? '' })
  const [message, setMessage] = useState('')

  const upload = () => {
    if (!form.name || !form.courseCode) return
    setMaterials([
      ...materials,
      {
        id: String(Date.now()),
        name: form.name,
        courseCode: form.courseCode,
        uploadedBy: user?.name ?? 'Faculty',
        date: new Date().toISOString().split('T')[0],
      },
    ])
    setForm({ ...form, name: '' })
    setMessage('Learning material uploaded successfully')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Learning Materials" description="Upload and share course materials with students.">
      {message && <AlertMessage type="success" message={message} />}
      <ContentCard title="Upload Material" description="Share files with students enrolled in your courses.">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="File Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="lecture-notes.pdf" /></FormField>
          <FormField label="Course">
            <select className={inputClass} value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })}>
              {myCourses.map((c) => <option key={c.id} value={c.code}>{c.code} — {c.title}</option>)}
            </select>
          </FormField>
        </div>
        <ActionButton onClick={upload}><span className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload</span></ActionButton>
      </ContentCard>
      {myMaterials.length === 0 ? (
        <EmptyState title="No materials uploaded" description="Upload your first course material above." />
      ) : (
        <div className="space-y-3">
          {myMaterials.map((m) => (
            <ContentCard key={m.id} className="flex flex-wrap items-center justify-between gap-4 !p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-3 text-white shadow-md shadow-emerald-200/50"><File className="h-5 w-5" /></div>
                <div><p className="font-bold text-slate-800">{m.name}</p><p className="text-sm text-slate-500">{m.courseCode} · {m.date}</p></div>
              </div>
              <ActionButton variant="danger" onClick={() => setMaterials(materials.filter((x) => x.id !== m.id))}>Remove</ActionButton>
            </ContentCard>
          ))}
        </div>
      )}
    </FeaturePage>
  )
}
