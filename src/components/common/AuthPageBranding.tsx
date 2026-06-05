import { GraduationCap, LogIn, UserPlus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SYSTEM } from '../../constants/system'

type AuthPageBrandingVariant = 'hero' | 'card'

interface AuthPageBrandingProps {
  variant?: AuthPageBrandingVariant
  page: 'login' | 'register'
  className?: string
}

const pageMeta: Record<
  AuthPageBrandingProps['page'],
  { icon: LucideIcon; title: string; subtitle: string }
> = {
  login: {
    icon: LogIn,
    title: 'Sign In',
    subtitle: 'Access your portal with email and password, or use quick access below.',
  },
  register: {
    icon: UserPlus,
    title: 'Create Account',
    subtitle: 'Join the system and go straight to your role dashboard after registration.',
  },
}

export function AuthPageBranding({ variant = 'hero', page, className = '' }: AuthPageBrandingProps) {
  const { icon: PageIcon, title, subtitle } = pageMeta[page]

  if (variant === 'card') {
    return (
      <div className={`mb-6 flex items-center gap-3.5 border-b border-slate-100 pb-5 ${className}`}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 text-white shadow-lg shadow-emerald-900/20 ring-2 ring-emerald-100">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600">
            {SYSTEM.shortName}
          </p>
          <p className="truncate text-sm font-extrabold text-slate-900 sm:text-base">{SYSTEM.fullName}</p>
          <p className="mt-0.5 text-xs font-semibold text-slate-500">{title}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`text-center lg:text-left ${className}`}>
      <div className="mx-auto mb-5 flex max-w-lg flex-col items-center gap-4 lg:mx-0 lg:flex-row lg:items-start lg:gap-5">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 opacity-40 blur-lg" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 text-white shadow-xl shadow-emerald-900/30 ring-2 ring-white/20 sm:h-[4.5rem] sm:w-[4.5rem]">
            <GraduationCap className="h-8 w-8 sm:h-9 sm:w-9" />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-400 sm:text-xs">
            {SYSTEM.shortName}
          </p>
          <h1 className="mt-1 text-balance text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
            {SYSTEM.fullName}
          </h1>
          <p className="mt-1.5 text-xs font-medium text-emerald-200/90 sm:text-sm">{SYSTEM.tagline}</p>
        </div>
      </div>

      <div className="mx-auto inline-flex max-w-lg items-center gap-2.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-md lg:mx-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <PageIcon className="h-4 w-4 text-emerald-300" />
        </div>
        <div className="min-w-0 text-left">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs leading-relaxed text-slate-400">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
