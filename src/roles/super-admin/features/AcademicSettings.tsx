import { useState } from 'react'
import {
  ActionButton,
  AlertMessage,
  FeaturePage,
  FormField,
  inputClass,
} from '../../../components/common/RoleLayout'
import { ContentCard } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'

export default function AcademicSettings() {
  const { settings, setSettings } = useData()
  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <FeaturePage title="Academic Settings" description="Configure semester, enrollment periods, and grading policies.">
      {saved && <AlertMessage type="success" message="Academic settings saved successfully!" />}
      <ContentCard className="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-5">
          <FormField label="Current Semester">
            <input className={inputClass} value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} />
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Enrollment Start">
              <input type="date" className={inputClass} value={form.enrollmentStart} onChange={(e) => setForm({ ...form, enrollmentStart: e.target.value })} />
            </FormField>
            <FormField label="Enrollment End">
              <input type="date" className={inputClass} value={form.enrollmentEnd} onChange={(e) => setForm({ ...form, enrollmentEnd: e.target.value })} />
            </FormField>
          </div>
          <FormField label="Grading Scale">
            <select className={inputClass} value={form.gradingScale} onChange={(e) => setForm({ ...form, gradingScale: e.target.value })}>
              <option>4.0 Scale</option>
              <option>5.0 Scale</option>
              <option>Percentage</option>
            </select>
          </FormField>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Max Units">
              <input type="number" className={inputClass} value={form.maxUnits} onChange={(e) => setForm({ ...form, maxUnits: Number(e.target.value) })} />
            </FormField>
            <FormField label="Minimum GPA">
              <input type="number" step="0.1" className={inputClass} value={form.minGpa} onChange={(e) => setForm({ ...form, minGpa: Number(e.target.value) })} />
            </FormField>
          </div>
          <ActionButton type="submit">Save Settings</ActionButton>
        </form>
      </ContentCard>
    </FeaturePage>
  )
}
