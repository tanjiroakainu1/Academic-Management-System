import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { initialSystemData } from '../data/mockData'
import type {
  AcademicProgram,
  Assignment,
  AttendanceRecord,
  BackupRecord,
  Course,
  Department,
  Enrollment,
  Faculty,
  Grade,
  LearningMaterial,
  Notification,
  Student,
  SystemData,
  SystemRole,
  User,
  AcademicSettings,
} from '../types'

const STORAGE_KEY = 'academic_system_data'

function loadStoredData(): SystemData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as SystemData
  } catch {
    /* use initial data */
  }
  return structuredClone(initialSystemData)
}

interface DataContextValue extends SystemData {
  setUsers: (users: User[]) => void
  setStudents: (students: Student[]) => void
  setFaculty: (faculty: Faculty[]) => void
  setCourses: (courses: Course[]) => void
  setDepartments: (departments: Department[]) => void
  setEnrollments: (enrollments: Enrollment[]) => void
  setAssignments: (assignments: Assignment[]) => void
  setGrades: (grades: Grade[]) => void
  setNotifications: (notifications: Notification[]) => void
  setAttendance: (attendance: AttendanceRecord[]) => void
  setMaterials: (materials: LearningMaterial[]) => void
  setPrograms: (programs: AcademicProgram[]) => void
  setRoles: (roles: SystemRole[]) => void
  setBackups: (backups: BackupRecord[]) => void
  setSettings: (settings: AcademicSettings) => void
  updateData: (partial: Partial<SystemData>) => void
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SystemData>(loadStoredData)

  const persist = useCallback((next: SystemData) => {
    setData(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const updateData = useCallback(
    (partial: Partial<SystemData>) => {
      persist({ ...data, ...partial })
    },
    [data, persist],
  )

  const setUsers = useCallback((users: User[]) => updateData({ users }), [updateData])
  const setStudents = useCallback((students: Student[]) => updateData({ students }), [updateData])
  const setFaculty = useCallback((faculty: Faculty[]) => updateData({ faculty }), [updateData])
  const setCourses = useCallback((courses: Course[]) => updateData({ courses }), [updateData])
  const setDepartments = useCallback((departments: Department[]) => updateData({ departments }), [updateData])
  const setEnrollments = useCallback((enrollments: Enrollment[]) => updateData({ enrollments }), [updateData])
  const setAssignments = useCallback((assignments: Assignment[]) => updateData({ assignments }), [updateData])
  const setGrades = useCallback((grades: Grade[]) => updateData({ grades }), [updateData])
  const setNotifications = useCallback((notifications: Notification[]) => updateData({ notifications }), [updateData])
  const setAttendance = useCallback((attendance: AttendanceRecord[]) => updateData({ attendance }), [updateData])
  const setMaterials = useCallback((materials: LearningMaterial[]) => updateData({ materials }), [updateData])
  const setPrograms = useCallback((programs: AcademicProgram[]) => updateData({ programs }), [updateData])
  const setRoles = useCallback((roles: SystemRole[]) => updateData({ roles }), [updateData])
  const setBackups = useCallback((backups: BackupRecord[]) => updateData({ backups }), [updateData])
  const setSettings = useCallback((settings: AcademicSettings) => updateData({ settings }), [updateData])

  const value = useMemo(
    () => ({
      ...data,
      setUsers,
      setStudents,
      setFaculty,
      setCourses,
      setDepartments,
      setEnrollments,
      setAssignments,
      setGrades,
      setNotifications,
      setAttendance,
      setMaterials,
      setPrograms,
      setRoles,
      setBackups,
      setSettings,
      updateData,
    }),
    [
      data,
      setUsers,
      setStudents,
      setFaculty,
      setCourses,
      setDepartments,
      setEnrollments,
      setAssignments,
      setGrades,
      setNotifications,
      setAttendance,
      setMaterials,
      setPrograms,
      setRoles,
      setBackups,
      setSettings,
      updateData,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
