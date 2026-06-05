import { useState } from 'react'
import { ActionButton, AlertMessage, DataTable, FeaturePage, StatusBadge } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'
import type { Enrollment } from '../../../types'

export default function EnrollmentProcesses() {
  const { enrollments, setEnrollments } = useData()
  const [message, setMessage] = useState('')

  const updateStatus = (index: number, status: Enrollment['status']) => {
    const updated = [...enrollments]
    updated[index] = { ...updated[index], status }
    setEnrollments(updated)
    setMessage(`Enrollment ${status}`)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Enrollment Management" description="Process online enrollments, approvals, and enrollment history.">
      {message && <AlertMessage type="success" message={message} />}
      <DataTable
        headers={['Student', 'Course', 'Date', 'Status', 'Actions']}
        rows={enrollments.map((e, i) => [
          e.studentName,
          `${e.courseCode} - ${e.courseTitle}`,
          e.date,
          <StatusBadge key={e.id} status={e.status} />,
          e.status === 'pending' ? (
            <span key={`act-${e.id}`} className="flex gap-2">
              <button type="button" onClick={() => updateStatus(i, 'approved')} className="text-sm font-medium text-emerald-600 hover:text-emerald-800">Approve</button>
              <button type="button" onClick={() => updateStatus(i, 'rejected')} className="text-sm font-medium text-red-600 hover:text-red-800">Reject</button>
            </span>
          ) : '—',
        ])}
      />
      <div className="mt-4">
        <ActionButton onClick={() => alert('Enrollment report exported')}>Export Enrollment Report</ActionButton>
      </div>
    </FeaturePage>
  )
}
