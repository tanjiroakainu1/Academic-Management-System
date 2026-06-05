import { useState } from 'react'
import { ActionButton, AlertMessage, DataTable, FeaturePage } from '../../../components/common/RoleLayout'
import { useData } from '../../../context/DataContext'
import { useCurrentStudent, useStudentCourses } from '../../../hooks/useRoleData'

export default function CourseEnrollment() {
  const { courses, enrollments, setEnrollments } = useData()
  const student = useCurrentStudent()
  const enrolledCourses = useStudentCourses(student?.id)
  const enrolledCodes = enrolledCourses.map((c) => c.code)
  const pendingCodes = enrollments.filter((e) => e.studentId === student?.id && e.status === 'pending').map((e) => e.courseCode)
  const [message, setMessage] = useState('')

  const available = courses.filter((c) => !enrolledCodes.includes(c.code) && !pendingCodes.includes(c.code))

  const enroll = (code: string, title: string) => {
    if (!student) return
    setEnrollments([
      ...enrollments,
      {
        id: String(Date.now()),
        studentId: student.id,
        studentName: student.name,
        courseCode: code,
        courseTitle: title,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
      },
    ])
    setMessage(`Enrollment request submitted for ${code}`)
    setTimeout(() => setMessage(''), 3000)
  }

  const drop = (code: string) => {
    setEnrollments(enrollments.filter((e) => !(e.studentId === student?.id && e.courseCode === code)))
    setMessage(`Dropped ${code}`)
    setTimeout(() => setMessage(''), 3000)
  }

  if (!student) {
    return (
      <FeaturePage title="Course Enrollment" description="Browse the course catalog and enroll in courses.">
        <p className="text-slate-500">No student profile linked to your account.</p>
      </FeaturePage>
    )
  }

  return (
    <FeaturePage title="Course Enrollment" description="Browse the course catalog and enroll in courses.">
      {message && <AlertMessage type="success" message={message} />}
      <h3 className="mb-3 font-semibold text-slate-700">My Enrolled Courses</h3>
      <DataTable headers={['Code', 'Title', 'Schedule', 'Action']} rows={enrolledCourses.map((c) => [c.code, c.title, c.schedule ?? 'TBA', <button key={c.code} type="button" onClick={() => drop(c.code)} className="text-sm text-red-600">Drop</button>])} />
      {pendingCodes.length > 0 && (
        <>
          <h3 className="mb-3 mt-8 font-semibold text-slate-700">Pending Approval</h3>
          <DataTable headers={['Code', 'Status']} rows={pendingCodes.map((code) => [code, 'Pending'])} />
        </>
      )}
      <h3 className="mb-3 mt-8 font-semibold text-slate-700">Available Courses</h3>
      <DataTable headers={['Code', 'Title', 'Units', 'Slots', 'Action']} rows={available.map((c) => [c.code, c.title, c.units, `${c.enrolled}/${c.capacity}`, <ActionButton key={c.code} onClick={() => enroll(c.code, c.title)}>Enroll</ActionButton>])} />
    </FeaturePage>
  )
}
