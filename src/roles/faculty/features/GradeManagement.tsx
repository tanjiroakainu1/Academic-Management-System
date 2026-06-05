import { useState } from 'react'
import { ActionButton, AlertMessage, DataTable, FeaturePage, FormField, Modal, ModalField, ModalFooter, ModalFormGrid, inputClass } from '../../../components/common/RoleLayout'
import { useAuth } from '../../../context/AuthContext'
import { useData } from '../../../context/DataContext'
import { useFacultyCourses, computeLetterGrade } from '../../../hooks/useRoleData'

export default function GradeManagement() {
  const { user } = useAuth()
  const { grades, setGrades, students } = useData()
  const myCourses = useFacultyCourses(user?.name)
  const myCourseCodes = myCourses.map((c) => c.code)
  const myGrades = grades.filter((g) => myCourseCodes.includes(g.courseCode))
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ studentId: students[0]?.id ?? '', studentName: students[0]?.name ?? '', courseCode: myCourses[0]?.code ?? '', score: 0, maxScore: 100 })
  const [message, setMessage] = useState('')

  const saveGrade = () => {
    const student = students.find((s) => s.id === form.studentId)
    const letterGrade = computeLetterGrade(form.score, form.maxScore)
    setGrades([
      ...grades,
      {
        id: String(Date.now()),
        studentId: form.studentId,
        studentName: student?.name ?? form.studentName,
        courseCode: form.courseCode,
        score: form.score,
        maxScore: form.maxScore,
        letterGrade,
      },
    ])
    setMessage(`Grade recorded: ${letterGrade}`)
    setModalOpen(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <FeaturePage title="Grade Management" description="Record, update, and compute student grades." actions={<ActionButton onClick={() => setModalOpen(true)}>+ Record Grade</ActionButton>}>
      {message && <AlertMessage type="success" message={message} />}
      <DataTable headers={['Student', 'Course', 'Score', 'Letter Grade']} rows={myGrades.map((g) => [g.studentName, g.courseCode, `${g.score}/${g.maxScore}`, g.letterGrade])} />
      <Modal open={modalOpen} title="Record Grade" description="Enter student score for an assigned course." onClose={() => setModalOpen(false)}>
        <ModalFormGrid>
          <ModalField>
            <FormField label="Student">
              <select className={inputClass} value={form.studentId} onChange={(e) => {
                const s = students.find((st) => st.id === e.target.value)
                setForm({ ...form, studentId: e.target.value, studentName: s?.name ?? '' })
              }}>
                {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </FormField>
          </ModalField>
          <ModalField>
            <FormField label="Course">
              <select className={inputClass} value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })}>
                {myCourses.map((c) => <option key={c.id} value={c.code}>{c.code}</option>)}
              </select>
            </FormField>
          </ModalField>
          <ModalField>
            <FormField label="Score"><input type="number" className={inputClass} value={form.score} onChange={(e) => setForm({ ...form, score: Number(e.target.value) })} /></FormField>
          </ModalField>
        </ModalFormGrid>
        <ModalFooter>
          <ActionButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</ActionButton>
          <ActionButton onClick={saveGrade}>Save Grade</ActionButton>
        </ModalFooter>
      </Modal>
    </FeaturePage>
  )
}
