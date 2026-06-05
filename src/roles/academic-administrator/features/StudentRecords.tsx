import { useState } from 'react'
import { ActionButton, AlertMessage, ConfirmModal, DataTable, FeaturePage, FormField, Modal, ModalField, ModalFooter, ModalFormGrid, StatusBadge, inputClass } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'
import type { Student } from '../../../types'

const emptyForm = { name: '', email: '', program: '', year: 1, gpa: 0, status: 'enrolled' as Student['status'] }

export default function StudentRecords() {
  const { students, setStudents } = useData()
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
    const s = students[index]
    setEditIndex(index)
    setForm({ name: s.name, email: s.email, program: s.program, year: s.year, gpa: s.gpa, status: s.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return
    if (editIndex !== null) {
      const updated = [...students]
      updated[editIndex] = { ...updated[editIndex], ...form }
      setStudents(updated)
      setMessage('Student updated successfully')
    } else {
      setStudents([...students, { id: `S${String(students.length + 1).padStart(3, '0')}`, ...form }])
      setMessage('Student registered successfully')
    }
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    setStudents(students.filter((_, i) => i !== deleteIndex))
    setMessage('Student record deleted')
    setConfirmOpen(false)
    setDeleteIndex(null)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Student Records" description="Register, edit, and delete student profiles." actions={<ActionButton onClick={openAdd}>+ Register Student</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable
        headers={['ID', 'Name', 'Email', 'Program', 'Year', 'GPA', 'Status']}
        rows={students.map((s) => [s.id, s.name, s.email, s.program, s.year, s.gpa.toFixed(2), <StatusBadge key={s.id} status={s.status} />])}
        onRowEdit={openEdit}
        onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
      />
      <Modal
        open={modalOpen}
        size="lg"
        title={editIndex !== null ? 'Edit Student' : 'Register Student'}
        description="Manage student profile, program enrollment, and academic status."
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid>
          <ModalField>
            <FormField label="Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Email"><input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></FormField>
          </ModalField>
          <ModalField span={2}>
            <FormField label="Program"><input className={inputClass} value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Year"><input type="number" className={inputClass} value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="GPA"><input type="number" step="0.01" className={inputClass} value={form.gpa} onChange={(e) => setForm({ ...form, gpa: Number(e.target.value) })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Status">
              <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Student['status'] })}>
                <option value="enrolled">Enrolled</option>
                <option value="graduated">Graduated</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={handleSave}>{editIndex !== null ? 'Save Changes' : 'Register Student'}</ActionButton>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Student"
        message={deleteIndex !== null ? `Delete student "${students[deleteIndex]?.name}"?` : ''}
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteIndex(null) }}
      />
    </FeaturePage>
  )
}
