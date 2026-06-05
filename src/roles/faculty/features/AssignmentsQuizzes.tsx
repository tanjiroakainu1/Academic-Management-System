import { useState } from 'react'
import { ActionButton, AlertMessage, DataTable, FeaturePage, FormField, Modal, ModalField, ModalFooter, ModalFormGrid, StatusBadge, inputClass } from '../../../components/common/RoleLayout'
import { useAuth } from '../../../context/AuthContext'
import { useData } from '../../../context/DataContext'
import { useFacultyCourses } from '../../../hooks/useRoleData'
import type { Assignment } from '../../../types'

export default function AssignmentsQuizzes() {
  const { user } = useAuth()
  const { assignments, setAssignments } = useData()
  const myCourses = useFacultyCourses(user?.name)
  const myCourseCodes = myCourses.map((c) => c.code)
  const myAssignments = assignments.filter((a) => myCourseCodes.includes(a.courseCode))
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ title: '', courseCode: myCourses[0]?.code ?? '', dueDate: '', status: 'draft' as Assignment['status'] })
  const [message, setMessage] = useState('')

  const create = () => {
    setAssignments([...assignments, { id: String(Date.now()), ...form, submissions: 0 }])
    setMessage('Assignment created')
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const publish = (id: string) => {
    setAssignments(assignments.map((a) => (a.id === id ? { ...a, status: 'published' } : a)))
    setMessage('Assignment published to students')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Assignments & Quizzes" description="Create assignments, quizzes, and examinations." actions={<ActionButton onClick={() => setModalOpen(true)}>+ Create Assignment</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable headers={['Title', 'Course', 'Due Date', 'Status', 'Submissions', 'Action']} rows={myAssignments.map((a) => [a.title, a.courseCode, a.dueDate, <StatusBadge key={a.id} status={a.status} />, a.submissions ?? 0, a.status === 'draft' ? <button key={`pub-${a.id}`} type="button" onClick={() => publish(a.id)} className="text-sm text-emerald-600">Publish</button> : 'Published'])} />
      <Modal open={modalOpen} title="Create Assignment" description="Publish a new assignment or quiz for your class." onClose={() => setModalOpen(false)}>
        <ModalFormGrid>
          <ModalField span={2}>
            <FormField label="Title"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Course">
              <select className={inputClass} value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })}>
                {myCourses.map((c) => <option key={c.id} value={c.code}>{c.code}</option>)}
              </select>
            </FormField>
          </ModalField>
          <ModalField>
            <FormField label="Due Date"><input type="date" className={inputClass} value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={create}>Create Assignment</ActionButton>
        </ModalFooter>
      </Modal>
    </FeaturePage>
  )
}
