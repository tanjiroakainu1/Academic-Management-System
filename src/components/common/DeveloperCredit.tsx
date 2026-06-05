import { Code2, Heart, Sparkles } from 'lucide-react'
import { DEVELOPER } from '../../constants/developer'

type DeveloperCreditVariant = 'sidebar' | 'footer' | 'auth' | 'inline' | 'card'

interface DeveloperCreditProps {
  variant?: DeveloperCreditVariant
  gradient?: string
  className?: string
}

function DeveloperAvatar({ size = 'md', gradient }: { size?: 'sm' | 'md' | 'lg'; gradient?: string }) {
  const sizes = {
    sm: 'h-8 w-8 text-[10px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-12 w-12 text-sm',
  }
  const grad = gradient ?? 'from-blue-600 via-violet-600 to-fuchsia-600'

  return (
    <div className={`relative shrink-0 ${sizes[size]}`}>
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${grad} opacity-75 blur-[3px]`} />
      <div className={`relative flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br ${grad} font-extrabold text-white shadow-lg ring-2 ring-white/30`}>
        {DEVELOPER.initials}
      </div>
      <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-amber-400 drop-shadow" />
    </div>
  )
}

export function DeveloperCredit({ variant = 'inline', gradient, className = '' }: DeveloperCreditProps) {
  if (variant === 'sidebar') {
    return (
      <div className={`mx-3 mb-3 ${className}`}>
        <div className="developer-glow card-shine group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm ring-1 ring-slate-100/80 transition-all duration-300 hover:shadow-md">
          <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-violet-500/10 blur-xl transition-opacity group-hover:opacity-100" />
          <div className="relative flex items-center gap-3">
            <DeveloperAvatar size="md" gradient={gradient} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{DEVELOPER.role}</p>
              <p className="truncate bg-gradient-to-r from-slate-800 via-blue-700 to-violet-700 bg-clip-text text-sm font-extrabold text-transparent">
                {DEVELOPER.name}
              </p>
              <p className="truncate text-[10px] font-medium text-slate-400">{DEVELOPER.tagline}</p>
            </div>
            <Code2 className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-violet-500" />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <footer className={`border-t border-slate-200/60 bg-white/60 px-3 py-4 backdrop-blur-sm sm:px-6 ${className}`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <DeveloperAvatar size="sm" gradient={gradient} />
            <div className="text-center sm:text-left">
              <p className="text-xs text-slate-500">
                Academic Management System · © {DEVELOPER.year}
              </p>
              <p className="text-sm font-bold text-slate-700">
                Developed by{' '}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  {DEVELOPER.name}
                </span>
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500 ring-1 ring-slate-200/80">
            <Heart className="h-3 w-3 fill-rose-400 text-rose-400" />
            Built with passion
          </div>
        </div>
      </footer>
    )
  }

  if (variant === 'auth') {
    return (
      <div className={`text-center ${className}`}>
        <div className="glass-dark mx-auto inline-flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/10 px-5 py-4 backdrop-blur-md sm:flex-row sm:gap-4 sm:text-left">
          <DeveloperAvatar size="lg" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Lead {DEVELOPER.role}</p>
            <p className="text-lg font-extrabold text-white">{DEVELOPER.name}</p>
            <p className="text-xs text-slate-400">{DEVELOPER.tagline}</p>
          </div>
          <div className="hidden h-10 w-px bg-white/10 sm:block" />
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Code2 className="h-4 w-4 text-violet-400" />
            <span>TypeScript · React · Tailwind</span>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={`relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 p-5 shadow-sm ring-1 ring-slate-100/80 ${className}`}>
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
          <DeveloperAvatar size="lg" gradient={gradient} />
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">System Developer</p>
            <p className="mt-0.5 text-xl font-extrabold text-slate-900">{DEVELOPER.name}</p>
            <p className="mt-1 text-sm text-slate-500">{DEVELOPER.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Tailwind CSS', 'Vite'].map((tech) => (
                <span key={tech} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex items-center justify-center gap-2 text-xs text-slate-400 ${className}`}>
      <Code2 className="h-3.5 w-3.5 text-violet-500" />
      <span>
        Developed by{' '}
        <span className="font-bold text-slate-600">{DEVELOPER.name}</span>
      </span>
    </div>
  )
}

export function DeveloperBadge({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600/10 to-violet-600/10 px-2.5 py-1 text-[10px] font-bold text-violet-700 ring-1 ring-violet-200/80 ${className}`}>
      <Sparkles className="h-3 w-3" />
      {DEVELOPER.name}
    </span>
  )
}
