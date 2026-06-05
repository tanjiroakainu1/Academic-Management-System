import { useState } from 'react'
import { ActionButton, AlertMessage, ConfirmModal, DataTable, FeaturePage, FormField, Modal, ModalField, ModalFooter, ModalFormGrid, inputClass } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

const emptyForm = { code: '', title: '', units: 3, department: '', instructor: '', capacity: 40 }

export default function CourseOfferings() {
  const { courses, setCourses } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [message, setMessage] = useState('')

  const openAdd = () => {
    setEditIndex(null)
    setForm({ ...emptyForm })
    setModalOpen(true)
  }

  const openEdit = (index: number) => {
    const c = courses[index]
    setEditIndex(index)
    setForm({
      code: c.code,
      title: c.title,
      units: c.units,
      department: c.department,
      instructor: c.instructor ?? '',
      capacity: c.capacity ?? 40,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.code.trim() || !form.title.trim()) return
    if (editIndex !== null) {
      const updated = [...courses]
      updated[editIndex] = { ...updated[editIndex], ...form, enrolled: updated[editIndex].enrolled ?? 0 }
      setCourses(updated)
      setMessage('Course offering updated')
    } else {
      setCourses([...courses, { id: String(Date.now()), ...form, enrolled: 0 }])
      setMessage('Course offering created')
    }
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    setCourses(courses.filter((_, i) => i !== deleteIndex))
    setMessage('Course offering deleted')
    setConfirmOpen(false)
    setDeleteIndex(null)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Course Offerings" description="Create, edit, and delete course offerings for the semester." actions={<ActionButton onClick={openAdd}>+ New Offering</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable
        headers={['Code', 'Title', 'Department', 'Instructor', 'Enrolled', 'Capacity']}
        rows={courses.map((c) => [c.code, c.title, c.department, c.instructor ?? 'TBA', c.enrolled ?? 0, c.capacity ?? 0])}
        onRowEdit={openEdit}
        onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
      />
      <Modal
        open={modalOpen}
        size="lg"
        title={editIndex !== null ? 'Edit Offering' : 'Create Course Offering'}
        description="Set course details, instructor, and enrollment capacity for the semester."
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid>
          <ModalField>
            <FormField label="Course Code"><input className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="CS101" /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Units"><input type="number" className={inputClass} value={form.units} onChange={(e) => setForm({ ...form, units: Number(e.target.value) })} /></FormField>
          </ModalField>
          <ModalField span={2}>
            <FormField label="Title"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Introduction to Programming" /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Department"><input className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Instructor"><input className={inputClass} value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} placeholder="Dr. Smith" /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Capacity"><input type="number" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} /></FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={handleSave}>{editIndex !== null ? 'Save Changes' : 'Create Offering'}</ActionButton>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Course"
        message={deleteIndex !== null ? `Delete course "${courses[deleteIndex]?.code} — ${courses[deleteIndex]?.title}"?` : ''}
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteIndex(null) }}
      />
    </FeaturePage>
  )
}
