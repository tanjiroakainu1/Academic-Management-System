import { useState } from 'react'
import {
  ActionButton,
  AlertMessage,
  ConfirmModal,
  DataTable,
  FeaturePage,
  FormField,
  Modal,
  ModalField,
  ModalFooter,
  ModalFormGrid,
  inputClass,
} from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

export default function RoleManagement() {
  const { roles, setRoles } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', permissions: '' })
  const [message, setMessage] = useState('')

  const openAdd = () => {
    setEditIndex(null)
    setForm({ name: '', permissions: '' })
    setModalOpen(true)
  }

  const openEdit = (index: number) => {
    setEditIndex(index)
    setForm({ name: roles[index].name, permissions: roles[index].permissions })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim()) return
    if (editIndex !== null) {
      const updated = [...roles]
      updated[editIndex] = { ...updated[editIndex], ...form }
      setRoles(updated)
      setMessage('Role updated successfully')
    } else {
      setRoles([...roles, { id: String(Date.now()), ...form }])
      setMessage('Role created successfully')
    }
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    setRoles(roles.filter((_, i) => i !== deleteIndex))
    setMessage('Role deleted')
    setConfirmOpen(false)
    setDeleteIndex(null)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage
      title="Role Management"
      description="Configure role-based access control and permissions."
      actions={<ActionButton onClick={openAdd}>+ Add Role</ActionButton>}
    >
      {message && <AlertMessage type="success" message={message} />}
      <DataTable
        headers={['Role', 'Permissions']}
        rows={roles.map((r) => [r.name, r.permissions])}
        onRowEdit={openEdit}
        onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
      />
      <Modal
        open={modalOpen}
        title={editIndex !== null ? 'Edit Role' : 'Add Role'}
        description="Configure role name and permission scope."
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid className="grid-cols-1">
          <ModalField span={2}>
            <FormField label="Role Name">
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </FormField>
          </ModalField>
          <ModalField span={2}>
            <FormField label="Permissions">
              <textarea className={`${inputClass} min-h-[100px] resize-y`} rows={3} value={form.permissions} onChange={(e) => setForm({ ...form, permissions: e.target.value })} />
            </FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={handleSave}>{editIndex !== null ? 'Save Changes' : 'Add Role'}</ActionButton>
        </ModalFooter>
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        title="Delete Role"
        message={deleteIndex !== null ? `Delete role "${roles[deleteIndex]?.name}"?` : ''}
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteIndex(null) }}
      />
    </FeaturePage>
  )
}
