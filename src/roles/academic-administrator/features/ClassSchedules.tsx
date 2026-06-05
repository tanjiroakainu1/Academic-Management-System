import { useState } from 'react'
import { ActionButton, AlertMessage, DataTable, FeaturePage, FormField, Modal, ModalFooter, ModalFormGrid, ModalField, inputClass } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'

export default function ClassSchedules() {
  const { courses, setCourses } = useData()
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [form, setForm] = useState({ schedule: '', room: '' })
  const [message, setMessage] = useState('')

  const openEdit = (index: number) => {
    setSelected(index)
    setForm({ schedule: courses[index].schedule ?? '', room: courses[index].room ?? '' })
    setModalOpen(true)
  }

  const saveSchedule = () => {
    const updated = [...courses]
    updated[selected] = { ...updated[selected], ...form }
    setCourses(updated)
    setMessage('Class schedule updated')
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Class Schedules" description="Create and manage class schedules and section assignments.">
      {message && <AlertMessage type="success" message={message} />}
      <DataTable headers={['Course', 'Schedule', 'Room', 'Instructor']} rows={courses.map((c) => [c.code, c.schedule ?? 'Unscheduled', c.room ?? 'TBA', c.instructor ?? 'TBA'])} onRowEdit={openEdit} editLabel="Edit Schedule" />
      <Modal
        open={modalOpen}
        title="Edit Schedule"
        description={`Update timetable for ${courses[selected]?.code ?? 'course'}.`}
        onClose={() => setModalOpen(false)}
      >
        <ModalFormGrid>
          <ModalField>
            <FormField label="Schedule"><input className={inputClass} placeholder="MWF 9:00-10:00" value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} /></FormField>
          </ModalField>
          <ModalField>
            <FormField label="Room"><input className={inputClass} placeholder="Room 201" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} /></FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={saveSchedule}>Save Schedule</ActionButton>
        </ModalFooter>
      </Modal>
    </FeaturePage>
  )
}
