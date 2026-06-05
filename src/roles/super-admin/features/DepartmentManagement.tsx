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
  TabGroup,
  inputClass,
} from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

export default function DepartmentManagement() {
  const { departments, setDepartments, courses, setCourses } = useData()
  const [tab, setTab] = useState('departments')
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [deptForm, setDeptForm] = useState({ name: '', head: '' })
  const [courseForm, setCourseForm] = useState({ code: '', title: '', units: 3, department: '' })

  const openAdd = () => {
    setEditIndex(null)
    setDeptForm({ name: '', head: '' })
    setCourseForm({ code: '', title: '', units: 3, department: '' })
    setModalOpen(true)
  }

  const openEdit = (index: number) => {
    setEditIndex(index)
    if (tab === 'departments') {
      const d = departments[index]
      setDeptForm({ name: d.name, head: d.head })
    } else {
      const c = courses[index]
      setCourseForm({ code: c.code, title: c.title, units: c.units, department: c.department })
    }
    setModalOpen(true)
  }

  const handleSave = () => {
    if (tab === 'departments') {
      if (!deptForm.name.trim()) return
      if (editIndex !== null) {
        const updated = [...departments]
        updated[editIndex] = { ...updated[editIndex], ...deptForm }
        setDepartments(updated)
        setMessage('Department updated')
      } else {
        setDepartments([...departments, { id: String(Date.now()), name: deptForm.name, head: deptForm.head, courses: 0, faculty: 0 }])
        setMessage('Department added')
      }
    } else {
      if (!courseForm.code.trim() || !courseForm.title.trim()) return
      if (editIndex !== null) {
        const updated = [...courses]
        updated[editIndex] = { ...updated[editIndex], ...courseForm }
        setCourses(updated)
        setMessage('Course updated')
      } else {
        setCourses([...courses, { id: String(Date.now()), ...courseForm }])
        setMessage('Course added to catalog')
      }
    }
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = () => {
    if (deleteIndex === null) return
    if (tab === 'departments') {
      setDepartments(departments.filter((_, i) => i !== deleteIndex))
      setMessage('Department deleted')
    } else {
      setCourses(courses.filter((_, i) => i !== deleteIndex))
      setMessage('Course deleted')
    }
    setConfirmOpen(false)
    setDeleteIndex(null)
    setTimeout(() => setMessage(''), 3000)
  }

  const deleteTarget = deleteIndex !== null
    ? tab === 'departments'
      ? departments[deleteIndex]?.name
      : `${courses[deleteIndex]?.code} — ${courses[deleteIndex]?.title}`
    : ''

  return (
    <FeaturePage
      title="Departments & Courses"
      description="Manage academic departments and course catalog."
      actions={
        <ActionButton onClick={openAdd}>
          + Add {tab === 'departments' ? 'Department' : 'Course'}
        </ActionButton>
      }
    >
      {message && <AlertMessage type="success" message={message} />}
      <TabGroup
        tabs={[
          { id: 'departments', label: 'Departments' },
          { id: 'courses', label: 'Courses' },
        ]}
        active={tab}
        onChange={setTab}
        accentClass="bg-red-600 text-white"
      />

      <div className="mt-5">
        {tab === 'departments' ? (
          <DataTable
            headers={['Department', 'Head', 'Courses', 'Faculty']}
            rows={departments.map((d) => [d.name, d.head, d.courses, d.faculty])}
            onRowEdit={openEdit}
            onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
          />
        ) : (
          <DataTable
            headers={['Code', 'Title', 'Units', 'Department']}
            rows={courses.map((c) => [c.code, c.title, c.units, c.department])}
            onRowEdit={openEdit}
            onRowDelete={(i) => { setDeleteIndex(i); setConfirmOpen(true) }}
          />
        )}
      </div>

      <Modal
        open={modalOpen}
        size="lg"
        title={
          editIndex !== null
            ? tab === 'departments' ? 'Edit Department' : 'Edit Course'
            : tab === 'departments' ? 'Add Department' : 'Add Course'
        }
        description={tab === 'departments' ? 'Manage department name and department head.' : 'Add or update course catalog entry.'}
        onClose={() => setModalOpen(false)}
      >
        {tab === 'departments' ? (
          <>
            <ModalFormGrid>
              <ModalField span={2}>
                <FormField label="Department Name"><input className={inputClass} value={deptForm.name} onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })} /></FormField>
              </ModalField>
              <ModalField span={2}>
                <FormField label="Department Head"><input className={inputClass} value={deptForm.head} onChange={(e) => setDeptForm({ ...deptForm, head: e.target.value })} /></FormField>
              </ModalField>
            </ModalFormGrid>
            <ModalFooter>
              <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
              <ActionButton onClick={handleSave}>Save</ActionButton>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalFormGrid>
              <ModalField>
                <FormField label="Course Code"><input className={inputClass} value={courseForm.code} onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })} /></FormField>
              </ModalField>
              <ModalField>
                <FormField label="Units"><input type="number" className={inputClass} value={courseForm.units} onChange={(e) => setCourseForm({ ...courseForm, units: Number(e.target.value) })} /></FormField>
              </ModalField>
              <ModalField span={2}>
                <FormField label="Title"><input className={inputClass} value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} /></FormField>
              </ModalField>
              <ModalField>
                <FormField label="Department"><input className={inputClass} value={courseForm.department} onChange={(e) => setCourseForm({ ...courseForm, department: e.target.value })} /></FormField>
              </ModalField>
            </ModalFormGrid>
            <ModalFooter>
              <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
              <ActionButton onClick={handleSave}>Save</ActionButton>
            </ModalFooter>
          </>
        )}
      </Modal>

      <ConfirmModal
        open={confirmOpen}
        title={`Delete ${tab === 'departments' ? 'Department' : 'Course'}`}
        message={`Are you sure you want to delete "${deleteTarget}"?`}
        onConfirm={handleDelete}
        onCancel={() => { setConfirmOpen(false); setDeleteIndex(null) }}
      />
    </FeaturePage>
  )
}
