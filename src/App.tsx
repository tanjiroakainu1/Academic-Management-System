import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { RoleLayout } from './components/common/RoleLayout'
import { LoginPage, RegisterPage, ProfilePage } from './pages/AuthPages'
import HomePage from './pages/HomePage'
import { getDashboardPath } from './utils/auth'
import {
  superAdminNav,
  SuperAdminDashboard,
  UserManagement,
  RoleManagement,
  AcademicSettings,
  DepartmentManagement,
  AcademicRecords,
  SystemReports,
  BackupRestore,
} from './roles/super-admin'
import {
  academicAdminNav,
  AcademicAdminDashboard,
  StudentRecords,
  FacultyRecords,
  AcademicPrograms,
  CourseOfferings,
  ClassSchedules as AdminClassSchedules,
  EnrollmentProcesses,
  AcademicReports,
} from './roles/academic-administrator'
import {
  facultyNav,
  FacultyDashboard,
  AssignedCourses,
  ClassAttendance,
  LearningMaterials as FacultyMaterials,
  AssignmentsQuizzes,
  GradeManagement,
  StudentPerformance,
  ClassReports,
} from './roles/faculty'
import {
  studentNav,
  StudentDashboard,
  CourseEnrollment,
  ClassSchedules as StudentClassSchedules,
  LearningMaterials as StudentMaterials,
  AssignmentSubmission,
  GradesRecords,
  AcademicProgress,
  Notifications,
} from './roles/student'
import type { UserRole } from './types'

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  if (user) return <Navigate to={getDashboardPath(user.role)} replace />
  return <>{children}</>
}

function ProtectedRoute({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to={getDashboardPath(user.role)} replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <HomePage />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      <Route
        path="/super-admin"
        element={
          <ProtectedRoute role="super-admin">
            <RoleLayout role="super-admin" basePath="/super-admin" navItems={superAdminNav} />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="roles" element={<RoleManagement />} />
        <Route path="settings" element={<AcademicSettings />} />
        <Route path="departments" element={<DepartmentManagement />} />
        <Route path="records" element={<AcademicRecords />} />
        <Route path="reports" element={<SystemReports />} />
        <Route path="backup" element={<BackupRestore />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/academic-administrator"
        element={
          <ProtectedRoute role="academic-administrator">
            <RoleLayout role="academic-administrator" basePath="/academic-administrator" navItems={academicAdminNav} />
          </ProtectedRoute>
        }
      >
        <Route index element={<AcademicAdminDashboard />} />
        <Route path="students" element={<StudentRecords />} />
        <Route path="faculty" element={<FacultyRecords />} />
        <Route path="programs" element={<AcademicPrograms />} />
        <Route path="offerings" element={<CourseOfferings />} />
        <Route path="schedules" element={<AdminClassSchedules />} />
        <Route path="enrollment" element={<EnrollmentProcesses />} />
        <Route path="reports" element={<AcademicReports />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/faculty"
        element={
          <ProtectedRoute role="faculty">
            <RoleLayout role="faculty" basePath="/faculty" navItems={facultyNav} />
          </ProtectedRoute>
        }
      >
        <Route index element={<FacultyDashboard />} />
        <Route path="courses" element={<AssignedCourses />} />
        <Route path="attendance" element={<ClassAttendance />} />
        <Route path="materials" element={<FacultyMaterials />} />
        <Route path="assignments" element={<AssignmentsQuizzes />} />
        <Route path="grades" element={<GradeManagement />} />
        <Route path="performance" element={<StudentPerformance />} />
        <Route path="reports" element={<ClassReports />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <RoleLayout role="student" basePath="/student" navItems={studentNav} />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="enrollment" element={<CourseEnrollment />} />
        <Route path="schedules" element={<StudentClassSchedules />} />
        <Route path="materials" element={<StudentMaterials />} />
        <Route path="assignments" element={<AssignmentSubmission />} />
        <Route path="grades" element={<GradesRecords />} />
        <Route path="progress" element={<AcademicProgress />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
