import { useState } from 'react'
import { ActionButton, AlertMessage, ConfirmModal, DataTable, FeaturePage, FormField, Modal, ModalField, ModalFooter, ModalFormGrid, inputClass } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

const emptyForm = { code: '', name: '', years: 4, units: 144 }

export default function AcademicPrograms() {
  const { programs, setPrograms } = useData()
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
    const p = programs[index]
    setEditIndex(index)
    setForm({ code: p.code, name: p.name, years: p.years, units: p.units })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.code.trim() || !form.name.trim()) return
    if (editIndex !== null) {
      const updated = [...programs]
      updated[editIndex] = { ...updated[editIndex], ...form }
      setPrograms(updated)
      setMessage('Program updated successfully')
    } else {
      setPrograms([...programs, { id: String(Date.now()), ...form }])
      setMessage('Academic program added')
    }
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    setPrograms(programs.filter((_, i) => i !== deleteIndex))
    setMessage('Program deleted')
    setConfirmOpen(false)
    setDeleteIndex(null)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Academic Programs" description="Manage degree programs and curriculum structure." actions={<ActionButton onClick={openAdd}>+ Add Program</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable
        headers={['Code', 'Program Name', 'Years', 'Total Units']}
        rows={programs.map((p) => [p.code, p.name, p.years, p.units])}
        onRowEdit={openEdit}
        onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
      />
      <Modal
        open={modalOpen}
        size="md"
        title={editIndex !== null ? 'Edit Program' : 'Add Program'}
        description="Define degree program code, duration, and unit requirements."
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid>
          <ModalField>
            <FormField label="Code"><input className={inputClass} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Years"><input type="number" className={inputClass} value={form.years} onChange={(e) => setForm({ ...form, years: Number(e.target.value) })} /></FormField>
          </ModalField>
          <ModalField span={2}>
            <FormField label="Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Total Units"><input type="number" className={inputClass} value={form.units} onChange={(e) => setForm({ ...form, units: Number(e.target.value) })} /></FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={handleSave}>{editIndex !== null ? 'Save Changes' : 'Add Program'}</ActionButton>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Program"
        message={deleteIndex !== null ? `Delete program "${programs[deleteIndex]?.name}"?` : ''}
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteIndex(null) }}
      />
    </FeaturePage>
  )
}
