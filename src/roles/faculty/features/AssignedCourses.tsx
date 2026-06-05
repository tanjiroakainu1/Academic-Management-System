import { FeaturePage, DataTable } from '../../../components/common/RoleLayout'
import { useAuth } from '../../../context/AuthContext'
import { useFacultyCourses } from '../../../hooks/useRoleData'

export default function AssignedCourses() {
  const { user } = useAuth()
  const courses = useFacultyCourses(user?.name)

  return (
    <FeaturePage title="Assigned Courses" description="View and manage your assigned courses for the current semester.">
      <DataTable headers={['Code', 'Title', 'Schedule', 'Room', 'Enrolled', 'Capacity']} rows={courses.map((c) => [c.code, c.title, c.schedule ?? 'TBA', c.room ?? 'TBA', c.enrolled ?? 0, c.capacity ?? 0])} />
    </FeaturePage>
  )
}
