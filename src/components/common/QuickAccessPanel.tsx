import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Shield, User, UserCog } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { SYSTEM } from '../../constants/system'
import { allRoles, DEMO_PASSWORD, getDashboardPath, getDemoAccounts, roleLabels } from '../../utils/auth'
import type { UserRole } from '../../types'

const roleIcons: Record<UserRole, typeof Shield> = {
  'super-admin': Shield,
  'academic-administrator': UserCog,
  faculty: BookOpen,
  student: User,
}

interface QuickAccessPanelProps {
  onError?: (message: string) => void
  showRoleGrid?: boolean
  compact?: boolean
}

export function QuickAccessPanel({ onError, showRoleGrid = true, compact = false }: QuickAccessPanelProps) {
  const { quickLogin } = useAuth()
  const { users } = useData()
  const navigate = useNavigate()
  const accounts = getDemoAccounts(users)

  const handleQuickAccess = (accountEmail: string) => {
    const user = quickLogin(accountEmail)
    if (user) navigate(getDashboardPath(user.role))
    else onError?.('Unable to sign in with this account.')
  }

  return (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      <div>
        <h2 className="text-lg font-bold text-white">{SYSTEM.shortName} Quick Access</h2>
        <p className="mt-1 text-sm text-slate-400">
          Jump into any {SYSTEM.fullName} role dashboard — demo password:{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-emerald-300">{DEMO_PASSWORD}</code>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {accounts.map((account, i) => {
          const Icon = roleIcons[account.role]
          return (
            <button
              key={account.id}
              type="button"
              onClick={() => handleQuickAccess(account.email)}
              className={`card-shine glass-dark group flex items-start gap-4 rounded-2xl border border-white/10 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:shadow-xl stagger-${Math.min(i + 1, 4)} animate-fade-in`}
            >
              <div className={`rounded-xl bg-gradient-to-br ${account.gradient} p-3 text-white shadow-lg shadow-black/20 transition-transform group-hover:scale-105`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white">{account.roleLabel}</p>
                <p className="truncate text-sm text-slate-300">{account.name}</p>
                <p className="truncate text-xs text-slate-500">{account.email}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
            </button>
          )
        })}
      </div>

      {showRoleGrid && (
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">One-click by role</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {allRoles.map((role) => {
              const account = accounts.find((a) => a.role === role)!
              const Icon = roleIcons[role]
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleQuickAccess(account.email)}
                  className={`card-shine group flex flex-col items-center rounded-2xl bg-gradient-to-br ${account.gradient} p-4 text-white shadow-xl ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]`}
                >
                  <Icon className="mb-2 h-5 w-5" />
                  <span className="text-center text-xs font-bold leading-tight">{roleLabels[role]}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
