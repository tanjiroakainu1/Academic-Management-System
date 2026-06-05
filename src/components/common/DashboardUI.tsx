import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Inbox, Sparkles } from 'lucide-react'
import { DeveloperCredit } from './DeveloperCredit'
import { StatCard } from './RoleLayout'

interface StatItem {
  label: string
  value: string | number
  change?: string
  icon: ReactNode
  accent?: string
}

interface QuickLink {
  label: string
  path: string
  icon: LucideIcon
  color: string
  description?: string
}

interface DashboardShellProps {
  title: string
  subtitle: string
  greeting?: string
  stats: StatItem[]
  links: QuickLink[]
  basePath: string
  accent?: string
  hideDeveloperCredit?: boolean
}

export function DashboardShell({
  title,
  subtitle,
  greeting,
  stats,
  links,
  basePath,
  accent = 'from-blue-600 via-indigo-600 to-violet-600',
  hideDeveloperCredit = false,
}: DashboardShellProps) {
  return (
    <div className="animate-fade-in space-y-6 sm:space-y-8">
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-[1px] shadow-xl shadow-indigo-500/10`}>
        <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-white p-5 sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative">
            {greeting && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                <Sparkles className="h-3.5 w-3.5" />
                {greeting}
              </div>
            )}
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`stagger-${Math.min(i + 1, 8)} animate-fade-in`}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div>
        <SectionHeader title="Quick Access" badge={`${links.length} modules`} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {links.map((link, i) => (
            <div key={link.path} className={`stagger-${Math.min(i + 1, 8)} animate-fade-in`}>
              <QuickLinkCard {...link} to={`${basePath}/${link.path}`} />
            </div>
          ))}
        </div>
      </div>

      {!hideDeveloperCredit && <DeveloperCredit variant="inline" className="pt-2" />}
    </div>
  )
}

export function SectionHeader({ title, badge, className = '' }: { title: string; badge?: string; className?: string }) {
  return (
    <div className={`mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
      </div>
      {badge && (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200/80">
          {badge}
        </span>
      )}
    </div>
  )
}

export function QuickLinkCard({
  label,
  icon: Icon,
  color,
  description,
  to,
}: QuickLink & { to: string }) {
  return (
    <Link
      to={to}
      className="card-shine group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60 sm:gap-4 sm:p-5"
    >
      <div className={`shrink-0 rounded-xl ${color} p-3 text-white shadow-lg shadow-black/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-bold text-slate-800 transition-colors group-hover:text-blue-700">{label}</p>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500" />
        </div>
        {description && <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{description}</p>}
      </div>
    </Link>
  )
}

export function ContentCard({
  children,
  className = '',
  title,
  description,
}: {
  children: ReactNode
  className?: string
  title?: string
  description?: string
}) {
  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/40 ring-1 ring-slate-100/80 transition hover:shadow-md sm:p-6 ${className}`}>
      {(title || description) && (
        <div className="mb-5 border-b border-slate-100 pb-4">
          {title && <h3 className="font-bold text-slate-900">{title}</h3>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 ring-1 ring-slate-200">
        <Inbox className="h-6 w-6" />
      </div>
      <p className="font-semibold text-slate-700">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-slate-400">{description}</p>}
    </div>
  )
}

export function ReportCard({
  title,
  description,
  onGenerate,
}: {
  title: string
  description: string
  onGenerate: () => void
}) {
  return (
    <div className="card-shine group flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onGenerate}
        className="card-shine w-full rounded-xl bg-gradient-to-r from-slate-800 via-slate-900 to-black px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-all duration-300 hover:from-slate-700 hover:via-slate-800 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97] sm:w-auto"
      >
        Generate
      </button>
    </div>
  )
}

export function MetricTile({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  const gradient = accent ?? 'from-blue-500 to-indigo-600'
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
      <div className={`pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br ${gradient} opacity-10 blur-xl`} />
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:text-sm">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{value}</p>
    </div>
  )
}

export function ListCard({
  children,
  onClick,
  active = false,
}: {
  children: ReactNode
  onClick?: () => void
  active?: boolean
}) {
  const className = `w-full rounded-2xl border p-4 text-left shadow-sm transition-all duration-300 sm:p-5 ${
    active
      ? 'border-blue-200 bg-blue-50/50 shadow-blue-100/50 hover:shadow-md'
      : 'border-slate-200/80 bg-white hover:-translate-y-0.5 hover:shadow-md'
  }`

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    )
  }
  return <div className={className}>{children}</div>
}
