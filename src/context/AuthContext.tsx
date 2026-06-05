import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useData } from './DataContext'
import { DEMO_PASSWORD } from '../utils/auth'
import type { User, UserRole } from '../types'

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => User | null
  quickLogin: (email: string) => User | null
  register: (name: string, email: string, password: string, role: UserRole, department?: string) => User | null
  logout: () => void
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'department'>>) => void
  syncSessionUser: (next: User) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const AUTH_KEY = 'academic_user'

function readStoredUser(): User | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    return stored ? (JSON.parse(stored) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { users, setUsers, students, setStudents, faculty, setFaculty } = useData()
  const [user, setUser] = useState<User | null>(readStoredUser)

  const persistUser = useCallback((next: User | null) => {
    setUser(next)
    if (next) localStorage.setItem(AUTH_KEY, JSON.stringify(next))
    else localStorage.removeItem(AUTH_KEY)
  }, [])

  const login = useCallback(
    (email: string, password: string): User | null => {
      if (password !== DEMO_PASSWORD) return null
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (!found) return null
      persistUser(found)
      return found
    },
    [users, persistUser],
  )

  const quickLogin = useCallback(
    (email: string): User | null => login(email, DEMO_PASSWORD),
    [login],
  )

  const register = useCallback(
    (name: string, email: string, password: string, role: UserRole, department?: string): User | null => {
      if (password.length < 6) return null
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) return null

      const newUser: User = {
        id: String(Date.now()),
        name,
        email,
        role,
        department: department || undefined,
        status: 'active',
      }

      setUsers([...users, newUser])

      if (role === 'student') {
        setStudents([
          ...students,
          {
            id: `S${String(students.length + 1).padStart(3, '0')}`,
            name,
            email,
            program: 'Undeclared',
            year: 1,
            status: 'enrolled',
            gpa: 0,
          },
        ])
      }

      if (role === 'faculty') {
        setFaculty([
          ...faculty,
          {
            id: `F${String(faculty.length + 1).padStart(3, '0')}`,
            name,
            email,
            department: department || 'General',
            courses: 0,
            status: 'active',
          },
        ])
      }

      persistUser(newUser)
      return newUser
    },
    [users, students, faculty, setUsers, setStudents, setFaculty, persistUser],
  )

  const logout = useCallback(() => persistUser(null), [persistUser])

  const updateProfile = useCallback(
    (updates: Partial<Pick<User, 'name' | 'email' | 'department'>>) => {
      if (!user) return
      const updated = { ...user, ...updates }
      setUsers(users.map((u) => (u.id === user.id ? updated : u)))

      if (user.role === 'student') {
        setStudents(
          students.map((s) =>
            s.email.toLowerCase() === user.email.toLowerCase() ? { ...s, ...updates, name: updates.name ?? s.name, email: updates.email ?? s.email } : s,
          ),
        )
      }

      if (user.role === 'faculty') {
        setFaculty(
          faculty.map((f) =>
            f.email.toLowerCase() === user.email.toLowerCase() ? { ...f, ...updates, name: updates.name ?? f.name, email: updates.email ?? f.email, department: updates.department ?? f.department } : f,
          ),
        )
      }

      persistUser(updated)
    },
    [user, users, students, faculty, setUsers, setStudents, setFaculty, persistUser],
  )

  const syncSessionUser = useCallback(
    (next: User) => {
      if (user?.id === next.id) persistUser(next)
    },
    [user, persistUser],
  )

  const value = useMemo(
    () => ({ user, login, quickLogin, register, logout, updateProfile, syncSessionUser }),
    [user, login, quickLogin, register, logout, updateProfile, syncSessionUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
