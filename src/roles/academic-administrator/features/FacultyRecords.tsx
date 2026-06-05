import { useState } from 'react'
import { ActionButton, AlertMessage, ConfirmModal, DataTable, FeaturePage, FormField, Modal, ModalField, ModalFooter, ModalFormGrid, StatusBadge, inputClass } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'
import type { Faculty } from '../../../types'

const emptyForm = { name: '', email: '', department: '', courses: 0, status: 'active' as Faculty['status'] }

export default function FacultyRecords() {
  const { faculty, setFaculty } = useData()
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
    const f = faculty[index]
    setEditIndex(index)
    setForm({ name: f.name, email: f.email, department: f.department, courses: f.courses, status: f.status })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return
    if (editIndex !== null) {
      const updated = [...faculty]
      updated[editIndex] = { ...updated[editIndex], ...form }
      setFaculty(updated)
      setMessage('Faculty updated successfully')
    } else {
      setFaculty([...faculty, { id: `F${String(faculty.length + 1).padStart(3, '0')}`, ...form }])
      setMessage('Faculty profile created')
    }
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    setFaculty(faculty.filter((_, i) => i !== deleteIndex))
    setMessage('Faculty record deleted')
    setConfirmOpen(false)
    setDeleteIndex(null)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Faculty Records" description="Add, edit, and delete faculty profiles." actions={<ActionButton onClick={openAdd}>+ Add Faculty</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable
        headers={['ID', 'Name', 'Email', 'Department', 'Courses', 'Status']}
        rows={faculty.map((f) => [f.id, f.name, f.email, f.department, f.courses, <StatusBadge key={f.id} status={f.status} />])}
        onRowEdit={openEdit}
        onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
      />
      <Modal
        open={modalOpen}
        size="lg"
        title={editIndex !== null ? 'Edit Faculty' : 'Add Faculty'}
        description="Add or update faculty member details and teaching load."
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid>
          <ModalField>
            <FormField label="Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Email"><input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Department"><input className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Courses"><input type="number" className={inputClass} value={form.courses} onChange={(e) => setForm({ ...form, courses: Number(e.target.value) })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Status">
              <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Faculty['status'] })}>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
              </select>
            </FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={handleSave}>{editIndex !== null ? 'Save Changes' : 'Add Faculty'}</ActionButton>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Faculty"
        message={deleteIndex !== null ? `Delete faculty "${faculty[deleteIndex]?.name}"?` : ''}
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteIndex(null) }}
      />
    </FeaturePage>
  )
}
