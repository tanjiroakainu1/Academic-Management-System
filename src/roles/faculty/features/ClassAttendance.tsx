import { useState } from 'react'
import { ActionButton, AlertMessage, DataTable, FeaturePage, StatusBadge } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'
import type { AttendanceRecord } from '../../../types'

export default function ClassAttendance() {
  const { attendance, setAttendance } = useData()
  const [message, setMessage] = useState('')

  const toggleStatus = (index: number) => {
    const order: AttendanceRecord['status'][] = ['present', 'late', 'absent']
    const updated = [...attendance]
    const current = order.indexOf(updated[index].status)
    updated[index] = { ...updated[index], status: order[(current + 1) % 3] }
    setAttendance(updated)
  }

  const saveAttendance = () => {
    setMessage('Attendance saved for today')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Class Attendance" description="Track and manage student attendance for your classes." actions={<ActionButton onClick={saveAttendance}>Save Attendance</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable headers={['Student', 'Course', 'Date', 'Status']} rows={attendance.map((r, i) => [r.studentName, r.courseCode ?? '—', r.date, <button key={r.id} type="button" onClick={() => toggleStatus(i)}><StatusBadge status={r.status} /></button>])} />
    </FeaturePage>
  )
}
