import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  StatusBadge,
  inputClass,
} from '../../../components/common/RoleLayout'
import { useAuth } from '../../../context/AuthContext'
import { useData } from '../../../context/DataContext'
import { roleLabels } from '../../../utils/auth'
import type { User, UserRole } from '../../../types'

const emptyForm = {
  name: '',
  email: '',
  department: '',
  role: 'student' as UserRole,
  status: 'active' as User['status'],
}

export default function UserManagement() {
  const { users, setUsers, students, setStudents, faculty, setFaculty } = useData()
  const { user: sessionUser, logout, syncSessionUser } = useAuth()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState({ ...emptyForm })

  const showMsg = (text: string, isError = false) => {
    if (isError) {
      setError(text)
      setMessage('')
      setTimeout(() => setError(''), 4000)
    } else {
      setMessage(text)
      setError('')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const syncLinkedRecords = (user: User, prevEmail?: string) => {
    const matchEmail = prevEmail?.toLowerCase() ?? user.email.toLowerCase()

    if (user.role === 'student') {
      const exists = students.some((s) => s.email.toLowerCase() === matchEmail)
      if (exists) {
        setStudents(
          students.map((s) =>
            s.email.toLowerCase() === matchEmail
              ? { ...s, name: user.name, email: user.email, status: user.status === 'active' ? 'enrolled' : 'inactive' }
              : s,
          ),
        )
      } else {
        setStudents([
          ...students,
          {
            id: `S${String(students.length + 1).padStart(3, '0')}`,
            name: user.name,
            email: user.email,
            program: 'Undeclared',
            year: 1,
            status: 'enrolled',
            gpa: 0,
          },
        ])
      }
    }

    if (user.role === 'faculty') {
      const exists = faculty.some((f) => f.email.toLowerCase() === matchEmail)
      if (exists) {
        setFaculty(
          faculty.map((f) =>
            f.email.toLowerCase() === matchEmail
              ? { ...f, name: user.name, email: user.email, department: user.department ?? f.department, status: user.status === 'active' ? 'active' : 'on-leave' }
              : f,
          ),
        )
      } else {
        setFaculty([
          ...faculty,
          {
            id: `F${String(faculty.length + 1).padStart(3, '0')}`,
            name: user.name,
            email: user.email,
            department: user.department ?? 'General',
            courses: 0,
            status: 'active',
          },
        ])
      }
    }
  }

  const removeLinkedRecords = (email: string) => {
    const lower = email.toLowerCase()
    setStudents(students.filter((s) => s.email.toLowerCase() !== lower))
    setFaculty(faculty.filter((f) => f.email.toLowerCase() !== lower))
  }

  const openAdd = () => {
    setEditIndex(null)
    setForm({ ...emptyForm })
    setModalOpen(true)
  }

  const openEdit = (index: number) => {
    const u = users[index]
    setEditIndex(index)
    setForm({
      name: u.name,
      email: u.email,
      department: u.department ?? '',
      role: u.role,
      status: u.status,
    })
    setModalOpen(true)
  }

  const openDelete = (index: number) => {
    setDeleteIndex(index)
    setConfirmOpen(true)
  }

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      showMsg('Name and email are required.', true)
      return
    }

    const emailTaken = users.some(
      (u, i) => u.email.toLowerCase() === form.email.toLowerCase() && i !== editIndex,
    )
    if (emailTaken) {
      showMsg('This email is already registered.', true)
      return
    }

    if (editIndex !== null) {
      const prev = users[editIndex]
      const updatedUser: User = {
        ...prev,
        name: form.name.trim(),
        email: form.email.trim(),
        department: form.department.trim() || undefined,
        role: form.role,
        status: form.status,
      }
      const updated = [...users]
      updated[editIndex] = updatedUser
      setUsers(updated)
      syncLinkedRecords(updatedUser, prev.email)

      if (sessionUser?.id === prev.id) {
        syncSessionUser(updatedUser)
      }
      showMsg('User updated successfully')
    } else {
      const newUser: User = {
        id: String(Date.now()),
        name: form.name.trim(),
        email: form.email.trim(),
        department: form.department.trim() || undefined,
        role: form.role,
        status: form.status,
      }
      setUsers([...users, newUser])
      syncLinkedRecords(newUser)
      showMsg('User created successfully')
    }
    setModalOpen(false)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    const target = users[deleteIndex]

    if (users.length <= 1) {
      showMsg('Cannot delete the last system user.', true)
      setConfirmOpen(false)
      return
    }

    setUsers(users.filter((_, i) => i !== deleteIndex))
    removeLinkedRecords(target.email)

    if (sessionUser?.id === target.id) {
      logout()
      navigate('/')
      return
    }

    showMsg(`${target.name} has been deleted`)
    setConfirmOpen(false)
    setDeleteIndex(null)
  }

  return (
    <FeaturePage
      title="User Management"
      description="Add, edit, and delete system users. Changes sync with student and faculty records."
      actions={<ActionButton onClick={openAdd}>+ Add User</ActionButton>}
    >
      {message && <AlertMessage type="success" message={message} />}
      {error && <AlertMessage type="error" message={error} />}

      <DataTable
        headers={['Name', 'Email', 'Role', 'Department', 'Status']}
        rows={users.map((u) => [
          u.name,
          u.email,
          roleLabels[u.role],
          u.department ?? '—',
          <StatusBadge key={u.id} status={u.status} />,
        ])}
        onRowEdit={openEdit}
        onRowDelete={openDelete}
      />

      <Modal
        open={modalOpen}
        size="lg"
        title={editIndex !== null ? 'Edit User' : 'Add User'}
        description="Manage user account, role assignment, and access status."
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid>
          <ModalField>
            <FormField label="Full Name">
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </FormField>
          </ModalField>
          <ModalField>
            <FormField label="Email">
              <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </FormField>
          </ModalField>
          <ModalField span={2}>
            <FormField label="Department">
              <input className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="Optional" />
            </FormField>
          </ModalField>
          <ModalField>
            <FormField label="Role">
              <select className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}>
                <option value="super-admin">Super Admin</option>
                <option value="academic-administrator">Academic Administrator</option>
                <option value="faculty">Faculty / Instructor</option>
                <option value="student">Student</option>
              </select>
            </FormField>
          </ModalField>
          <ModalField>
            <FormField label="Status">
              <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as User['status'] })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={handleSave}>{editIndex !== null ? 'Save Changes' : 'Create User'}</ActionButton>
        </ModalFooter>
      </Modal>

      <ConfirmModal
        open={confirmOpen}
        title="Delete User"
        message={
          deleteIndex !== null
            ? `Are you sure you want to delete "${users[deleteIndex]?.name}"? This will also remove linked student or faculty records.`
            : ''
        }
        confirmLabel="Delete User"
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false)
          setDeleteIndex(null)
        }}
      />
    </FeaturePage>
  )
}
