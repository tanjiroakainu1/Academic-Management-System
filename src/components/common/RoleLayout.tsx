import type { ReactNode } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  ClipboardList,
  Database,
  FileText,
  FolderOpen,
  GraduationCap,
  Layers,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  PenLine,
  Settings,
  AlertTriangle,
  Shield,
  TrendingUp,
  User,
  UserCheck,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DeveloperCredit } from './DeveloperCredit'
import { roleThemes } from '../../data/mockData'
import { useAuth } from '../../context/AuthContext'
import type { NavItem, UserRole } from '../../types'

interface RoleLayoutProps {
  role: UserRole
  basePath: string
  navItems: NavItem[]
}

const pathIcons: Record<string, LucideIcon> = {
  users: Users,
  roles: Shield,
  settings: Settings,
  departments: Building2,
  records: FileText,
  reports: BarChart3,
  backup: Database,
  students: Users,
  faculty: GraduationCap,
  programs: BookOpen,
  offerings: Layers,
  schedules: Calendar,
  enrollment: ClipboardList,
  courses: BookOpen,
  attendance: UserCheck,
  materials: FolderOpen,
  assignments: PenLine,
  grades: Award,
  performance: TrendingUp,
  progress: LineChart,
  notifications: Bell,
}

function SidebarNavLink({
  to,
  end,
  children,
  onClick,
  gradient,
}: {
  to: string
  end?: boolean
  children: ReactNode
  onClick?: () => void
  gradient: string
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 ${
          isActive
            ? `bg-gradient-to-r ${gradient} text-white shadow-lg shadow-black/10 ring-1 ring-white/20`
            : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm'
        }`
      }
    >
      {children}
    </NavLink>
  )
}

export function RoleLayout({ role, basePath, navItems }: RoleLayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const theme = roleThemes[role]

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const closeSidebar = () => setSidebarOpen(false)

  const sidebarContent = (
    <>
      <div className={`relative overflow-hidden bg-gradient-to-br ${theme.gradient} px-4 py-5 text-white lg:px-5`}>
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-xl bg-white/20 p-2.5 shadow-lg ring-1 ring-white/25 backdrop-blur-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold leading-tight tracking-tight">Academic MS</p>
              <p className="truncate text-xs font-medium text-white/85">{theme.label}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
          Menu
        </p>
        <SidebarNavLink to={basePath} end gradient={theme.gradient} onClick={closeSidebar}>
          <LayoutDashboard className="h-4 w-4 shrink-0 opacity-90" />
          <span>Dashboard</span>
        </SidebarNavLink>
        {navItems.map((item) => {
          const Icon = pathIcons[item.path] ?? FileText
          return (
            <SidebarNavLink
              key={item.path}
              to={`${basePath}/${item.path}`}
              gradient={theme.gradient}
              onClick={closeSidebar}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
              <span className="truncate">{item.label}</span>
            </SidebarNavLink>
          )
        })}
      </nav>

      <DeveloperCredit variant="sidebar" gradient={theme.gradient} />

      <div className="border-t border-slate-200/80 bg-slate-50/50 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-slate-200/60 bg-white px-3 py-2.5 shadow-sm">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${theme.gradient} text-xs font-bold text-white`}>
            {user?.name?.charAt(0) ?? 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            closeSidebar()
            navigate(`${basePath}/profile`)
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <User className="h-4 w-4" /> Profile
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="page-mesh flex min-h-screen">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          aria-label="Close menu overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col border-r border-slate-200/80 bg-slate-50/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 lg:shadow-none xl:w-72 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {sidebarContent}
      </aside>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/80 shadow-sm shadow-slate-200/40 backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between gap-3 px-3 sm:h-16 sm:px-4 lg:px-6">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:shadow lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="min-w-0 lg:hidden">
                <p className="truncate text-sm font-bold text-slate-900">{theme.label}</p>
                <p className="truncate text-xs text-slate-500">Academic MS</p>
              </div>
              <div className="hidden min-w-0 lg:block">
                <p className="text-sm font-semibold text-slate-800">{theme.label} Portal</p>
                <p className="text-xs text-slate-500">Academic Management System</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-sm shadow-sm transition hover:bg-slate-50 sm:px-3 sm:py-2"
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${theme.gradient} text-xs font-bold text-white`}>
                    {user?.name?.charAt(0) ?? 'U'}
                  </div>
                  <span className="hidden max-w-[100px] truncate md:inline lg:max-w-[140px]">{user?.name}</span>
                </button>
                {userMenuOpen && (
                  <div className="animate-scale-in absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-slate-800">{user?.name}</p>
                      <p className="truncate text-xs text-slate-500">{user?.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false)
                        navigate(`${basePath}/profile`)
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-slate-50"
                    >
                      <User className="h-4 w-4 text-slate-400" /> Profile
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>

        <DeveloperCredit variant="footer" gradient={theme.gradient} />
      </div>
    </div>
  )
}

interface FeaturePageProps {
  title: string
  description: string
  children: ReactNode
  actions?: ReactNode
}

export function FeaturePage({ title, description, children, actions }: FeaturePageProps) {
  return (
    <div className="animate-fade-in space-y-4 sm:space-y-6">
      <div className="accent-bar relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/50 [--accent-from:#3b82f6] [--accent-to:#8b5cf6] sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/5 blur-2xl" />
        <div className="relative min-w-0 flex-1 pl-3 sm:pl-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{description}</p>
        </div>
        {actions && <div className="relative flex w-full flex-wrap gap-2 sm:w-auto sm:shrink-0">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

const statAccents = [
  'from-blue-500 to-blue-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-500',
]

interface StatCardProps {
  label: string
  value: string | number
  change?: string
  icon?: ReactNode
  accent?: string
}

export function StatCard({ label, value, change, icon, accent }: StatCardProps) {
  const gradient = accent ?? statAccents[Math.abs(label.length) % statAccents.length]

  return (
    <div className="card-shine group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 sm:p-5">
      <div className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${gradient} opacity-[0.08] blur-2xl transition-opacity group-hover:opacity-[0.14]`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{label}</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-2 sm:text-3xl">{value}</p>
          {change && (
            <p className={`mt-1 text-xs font-medium sm:mt-2 ${change.includes('action') || change.includes('Requires') ? 'text-amber-600' : 'text-emerald-600'}`}>
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div className={`shrink-0 rounded-xl bg-gradient-to-br ${gradient} p-2.5 text-white shadow-lg shadow-black/10 transition group-hover:scale-105 sm:p-3`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

const modalSizes: Record<ModalSize, string> = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
  xl: 'sm:max-w-3xl',
}

function useModalEffects(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
}

interface ModalProps {
  open: boolean
  title: string
  description?: string
  onClose: () => void
  children: ReactNode
  size?: ModalSize
}

export function Modal({ open, title, description, onClose, children, size = 'md' }: ModalProps) {
  useModalEffects(open, onClose)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/75 backdrop-blur-md"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`modal-panel animate-modal-up relative z-10 flex max-h-[min(92vh,900px)] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl shadow-slate-900/25 ring-1 ring-slate-200/80 sm:max-h-[90vh] sm:rounded-3xl ${modalSizes[size]}`}
      >
        <div className="flex shrink-0 justify-center pt-3 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>

        <div className="relative shrink-0 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 px-4 py-4 sm:px-6 sm:py-5">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-violet-500 sm:w-1.5" />
          <div className="flex items-start justify-between gap-3 pl-3 sm:pl-4">
            <div className="min-w-0 flex-1">
              <h3 id="modal-title" className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-xl border border-slate-200 bg-white p-2 text-slate-400 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ModalFormGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}>
      {children}
    </div>
  )
}

export function ModalField({ children, span = 1 }: { children: ReactNode; span?: 1 | 2 }) {
  return <div className={span === 2 ? 'sm:col-span-2' : ''}>{children}</div>
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 -mx-4 mt-5 flex flex-col-reverse gap-2.5 border-t border-slate-100 bg-gradient-to-t from-white via-white to-white/90 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:flex-row sm:justify-end sm:gap-3 sm:px-6">
      {children}
    </div>
  )
}

interface ActionButtonProps {
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  children: ReactNode
  type?: 'button' | 'submit'
}

export function ActionButton({
  onClick,
  variant = 'primary',
  children,
  type = 'button',
}: ActionButtonProps) {
  const styles = {
    primary:
      'card-shine bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white shadow-lg shadow-slate-900/25 hover:from-slate-700 hover:via-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]',
    secondary:
      'border border-slate-200/80 bg-white text-slate-700 shadow-sm ring-1 ring-slate-100 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97]',
    danger:
      'card-shine bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white shadow-lg shadow-rose-900/25 hover:from-red-500 hover:via-rose-500 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 sm:w-auto ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

interface DataTableProps {
  headers: string[]
  rows: (string | number | ReactNode)[][]
  onRowEdit?: (index: number) => void
  onRowDelete?: (index: number) => void
  onRowAction?: (index: number) => void
  editLabel?: string
  deleteLabel?: string
  actionLabel?: string
}

export function RowActions({
  onEdit,
  onDelete,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
}: {
  onEdit?: () => void
  onDelete?: () => void
  editLabel?: string
  deleteLabel?: string
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      {onEdit && (
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-xs font-bold text-blue-700 shadow-sm ring-1 ring-blue-200/80 transition-all duration-200 hover:from-blue-100 hover:to-indigo-100 hover:shadow-md hover:-translate-y-0.5 sm:text-sm"
        >
          {editLabel}
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 px-3 py-1.5 text-xs font-bold text-red-700 shadow-sm ring-1 ring-red-200/80 transition-all duration-200 hover:from-red-100 hover:to-rose-100 hover:shadow-md hover:-translate-y-0.5 sm:text-sm"
        >
          {deleteLabel}
        </button>
      )}
    </div>
  )
}

export function DataTable({
  headers,
  rows,
  onRowEdit,
  onRowDelete,
  onRowAction,
  editLabel,
  deleteLabel = 'Delete',
  actionLabel = 'Edit',
}: DataTableProps) {
  const handleEdit = onRowEdit ?? onRowAction
  const showActions = handleEdit || onRowDelete
  const resolvedEditLabel = editLabel ?? actionLabel

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50 ring-1 ring-slate-100/80 md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100/80">
                {headers.map((h) => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5 lg:py-3.5">
                    {h}
                  </th>
                ))}
                {showActions && (
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-5 lg:py-3.5">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={headers.length + (showActions ? 1 : 0)} className="px-5 py-12 text-center text-slate-400">
                    No records found
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-100 transition last:border-0 hover:bg-blue-50/40 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-slate-700 lg:px-5 lg:py-3.5">{cell}</td>
                    ))}
                    {showActions && (
                      <td className="px-4 py-3 lg:px-5 lg:py-3.5">
                        <RowActions
                          onEdit={handleEdit ? () => handleEdit(i) : undefined}
                          onDelete={onRowDelete ? () => onRowDelete(i) : undefined}
                          editLabel={resolvedEditLabel}
                          deleteLabel={deleteLabel}
                        />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-400">
            No records found
          </div>
        ) : (
          rows.map((row, i) => (
            <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm ring-1 ring-slate-100/60 transition hover:shadow-md">
              {headers.map((h, j) => (
                <div key={h} className="flex items-start justify-between gap-3 border-b border-slate-100 py-2.5 last:border-0">
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-400">{h}</span>
                  <span className="min-w-0 text-right text-sm text-slate-700">{row[j]}</span>
                </div>
              ))}
              {showActions && (
                <div className="mt-3 flex justify-end border-t border-slate-100 pt-3">
                  <RowActions
                    onEdit={handleEdit ? () => handleEdit(i) : undefined}
                    onDelete={onRowDelete ? () => onRowDelete(i) : undefined}
                    editLabel={resolvedEditLabel}
                    deleteLabel={deleteLabel}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  )
}

interface ConfirmModalProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useModalEffects(open, onCancel)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/75 backdrop-blur-md"
        aria-label="Close dialog"
        onClick={onCancel}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        className="modal-panel animate-modal-up relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl shadow-slate-900/25 ring-1 ring-slate-200/80 sm:rounded-3xl"
      >
        <div className="flex shrink-0 justify-center pt-3 sm:hidden">
          <div className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>
        <div className="border-b border-slate-100 bg-gradient-to-r from-red-50/80 via-white to-rose-50/40 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-200/50">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="pt-1.5 text-base font-extrabold text-slate-900 sm:text-lg">{title}</h3>
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-slate-600">{message}</p>
          <ModalFooter>
            <ActionButton variant="secondary" onClick={onCancel}>Cancel</ActionButton>
            <ActionButton variant="danger" onClick={onConfirm}>{confirmLabel}</ActionButton>
          </ModalFooter>
        </div>
      </div>
    </div>
  )
}

const statusDot: Record<string, string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-slate-400',
  enrolled: 'bg-blue-500',
  graduated: 'bg-purple-500',
  pending: 'bg-amber-500',
  approved: 'bg-emerald-500',
  rejected: 'bg-red-500',
  published: 'bg-emerald-500',
  submitted: 'bg-emerald-500',
  draft: 'bg-slate-400',
  present: 'bg-emerald-500',
  absent: 'bg-red-500',
  late: 'bg-amber-500',
  'on-leave': 'bg-orange-500',
}

export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
    inactive: 'bg-slate-100 text-slate-600 ring-slate-200/80',
    enrolled: 'bg-blue-50 text-blue-700 ring-blue-200/80',
    graduated: 'bg-purple-50 text-purple-700 ring-purple-200/80',
    pending: 'bg-amber-50 text-amber-700 ring-amber-200/80',
    approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
    rejected: 'bg-red-50 text-red-700 ring-red-200/80',
    published: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
    submitted: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
    draft: 'bg-slate-100 text-slate-600 ring-slate-200/80',
    present: 'bg-emerald-50 text-emerald-700 ring-emerald-200/80',
    absent: 'bg-red-50 text-red-700 ring-red-200/80',
    late: 'bg-amber-50 text-amber-700 ring-amber-200/80',
    'on-leave': 'bg-orange-50 text-orange-700 ring-orange-200/80',
  }
  const dot = statusDot[status] ?? 'bg-slate-400'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold capitalize ring-1 ring-inset ${colors[status] ?? 'bg-slate-100 text-slate-600 ring-slate-200/80'}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  )
}

export function FormField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-slate-800 shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 sm:text-sm'

export const selectClass = inputClass

export function AlertMessage({ type, message }: { type: 'success' | 'error'; message: string }) {
  const styles =
    type === 'success'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 ring-emerald-500/10'
      : 'bg-red-50 text-red-800 border-red-200 ring-red-500/10'
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm font-medium ring-1 ring-inset ${styles}`}>
      {message}
    </div>
  )
}

export function TabGroup({
  tabs,
  active,
  onChange,
  accentClass = 'bg-slate-900 text-white',
}: {
  tabs: { id: string; label: string }[]
  active: string
  onChange: (id: string) => void
  accentClass?: string
}) {
  return (
    <div className="w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="inline-flex min-w-full rounded-xl border border-slate-200 bg-slate-100/80 p-1 shadow-inner sm:min-w-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200 sm:px-4 sm:text-sm ${
              active === tab.id ? `${accentClass} shadow-md` : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
