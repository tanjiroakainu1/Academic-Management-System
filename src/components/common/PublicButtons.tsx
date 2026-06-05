import type { LucideIcon } from 'lucide-react'
import { ChevronRight, Home, LogIn, UserPlus } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

type PublicButtonVariant =
  | 'home'
  | 'signIn'
  | 'register'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'submit'
  | 'submitRegister'

type ButtonSurface = 'dark' | 'light'

const darkVariantStyles: Record<PublicButtonVariant, string> = {
  home:
    'border border-white/20 bg-white text-slate-800 shadow-lg shadow-black/25 ring-1 ring-white/40 hover:bg-slate-50 hover:text-slate-900 hover:shadow-xl hover:-translate-y-0.5',
  signIn:
    'border-2 border-white/40 bg-white/5 text-white shadow-md shadow-black/15 backdrop-blur-sm hover:border-white/60 hover:bg-white/12 hover:shadow-lg hover:-translate-y-0.5',
  register:
    'border border-violet-400/30 bg-gradient-to-r from-blue-600 via-violet-600 to-violet-600 text-white shadow-xl shadow-violet-900/40 ring-1 ring-white/15 hover:from-blue-500 hover:via-violet-500 hover:to-violet-500 hover:shadow-2xl hover:-translate-y-0.5',
  primary:
    'border border-slate-700/50 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-900 text-white shadow-lg shadow-slate-900/30 hover:from-slate-700 hover:via-slate-800 hover:shadow-xl hover:-translate-y-0.5',
  secondary:
    'border border-slate-200/80 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:-translate-y-0.5',
  ghost:
    'text-slate-300 hover:bg-white/10 hover:text-white',
  submit:
    'w-full border border-slate-700/50 bg-gradient-to-r from-slate-800 via-slate-900 to-black text-white shadow-xl shadow-slate-900/40 hover:from-slate-700 hover:via-slate-800 hover:shadow-2xl',
  submitRegister:
    'w-full border border-violet-400/30 bg-gradient-to-r from-violet-600 via-blue-600 to-indigo-600 text-white shadow-xl shadow-violet-900/35 hover:from-violet-500 hover:via-blue-500 hover:to-indigo-500 hover:shadow-2xl',
}

const lightVariantOverrides: Partial<Record<PublicButtonVariant, string>> = {
  home:
    'border border-slate-200 bg-white text-slate-700 shadow-sm ring-1 ring-slate-100 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:-translate-y-0.5',
  signIn:
    'border-2 border-blue-200 bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-100/80 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900 hover:shadow-md hover:-translate-y-0.5',
  ghost:
    'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
}

const shineVariants: PublicButtonVariant[] = ['register', 'primary', 'submit', 'submitRegister']

function getVariantStyle(variant: PublicButtonVariant, surface: ButtonSurface) {
  if (surface === 'light' && lightVariantOverrides[variant]) {
    return lightVariantOverrides[variant]!
  }
  return darkVariantStyles[variant]
}

const focusRingStyles: Record<ButtonSurface, string> = {
  dark: 'focus-visible:ring-white/50',
  light: 'focus-visible:ring-blue-500/35',
}

const sizeStyles = {
  xs: 'min-h-[36px] gap-1.5 px-2.5 py-2 text-[11px] font-bold leading-none sm:min-h-[40px] sm:px-3.5 sm:text-xs',
  sm: 'min-h-[38px] gap-1.5 px-3 py-2 text-xs font-bold sm:min-h-[40px] sm:px-4 sm:text-sm',
  md: 'min-h-[44px] gap-2 px-4 py-2.5 text-sm font-bold sm:px-5',
  lg: 'min-h-[48px] gap-2 px-4 py-3 text-sm font-bold sm:min-h-[50px] sm:px-6 sm:text-base',
}

interface PublicButtonProps {
  variant?: PublicButtonVariant
  /** Use `light` on white/glass cards; `dark` (default) on mesh/gradient backgrounds */
  surface?: ButtonSurface
  size?: keyof typeof sizeStyles
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  icon?: LucideIcon
  children: ReactNode
  className?: string
  fullWidth?: boolean
  active?: boolean
  /** Accessible name when label is visually hidden */
  ariaLabel?: string
}

export function PublicButton({
  variant = 'primary',
  surface = 'dark',
  size = 'md',
  to,
  onClick,
  type = 'button',
  icon: Icon,
  children,
  className = '',
  fullWidth = false,
  active = false,
  ariaLabel,
}: PublicButtonProps) {
  const activeRing =
    surface === 'light'
      ? active
        ? 'ring-2 ring-blue-400/60 ring-offset-2 ring-offset-white'
        : ''
      : active
        ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-slate-900/50'
        : ''

  const shine = shineVariants.includes(variant) ? 'card-shine' : ''

  const classes = `${shine} group relative inline-flex items-center justify-center overflow-hidden rounded-xl transition-all duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 ${focusRingStyles[surface]} ${sizeStyles[size]} ${getVariantStyle(variant, surface)} ${
    fullWidth ? 'w-full' : 'w-auto'
  } ${activeRing} ${className}`

  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />}
      <span className="truncate">{children}</span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  )
}

type ButtonRowLayout = 'pair' | 'stack'

/** Equal-width button row — `pair` keeps 2 cols on mobile; `stack` stacks on small screens */
export function PublicButtonRow({
  children,
  className = '',
  layout = 'pair',
}: {
  children: ReactNode
  className?: string
  layout?: ButtonRowLayout
}) {
  const grid =
    layout === 'stack'
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-2'

  return (
    <div className={`grid ${grid} gap-2 sm:gap-2.5 ${className}`}>
      {children}
    </div>
  )
}

const headerNavItems = [
  { to: '/', label: 'Home', icon: Home, accent: false },
  { to: '/login', label: 'Sign In', icon: LogIn, accent: false },
  { to: '/register', label: 'Register', icon: UserPlus, accent: true },
] as const

/** Compact segmented nav — icon-only on narrow screens, labels from sm+ */
export function PublicHeaderNav() {
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Main navigation"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-xl border border-white/15 bg-black/25 p-0.5 backdrop-blur-md sm:gap-1 sm:p-1"
    >
      {headerNavItems.map(({ to, label, icon: Icon, accent }) => {
        const active = pathname === to

        if (accent) {
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={`inline-flex min-h-[36px] min-w-[36px] items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-all duration-200 active:scale-[0.97] sm:min-h-[38px] sm:min-w-0 sm:px-3.5 sm:text-sm ${
                active
                  ? 'bg-gradient-to-r from-blue-500 via-violet-500 to-violet-500 text-white shadow-lg ring-2 ring-white/25'
                  : 'bg-gradient-to-r from-blue-600 via-violet-600 to-violet-600 text-white shadow-md hover:from-blue-500 hover:via-violet-500 hover:to-violet-500 hover:shadow-lg'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          )
        }

        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex min-h-[36px] min-w-[36px] items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-bold transition-all duration-200 active:scale-[0.97] sm:min-h-[38px] sm:min-w-0 sm:px-3.5 sm:text-sm ${
              active
                ? 'bg-white/20 text-white ring-1 ring-white/30'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

/** Compact breadcrumb — avoids duplicating the header nav buttons */
export function AuthPageNav({ page }: { page: 'login' | 'register' }) {
  const current = page === 'login' ? 'Sign In' : 'Create Account'

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-400 sm:mb-8"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-medium transition hover:bg-white/10 hover:text-white"
      >
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-600" aria-hidden />
      <span className="rounded-lg bg-white/10 px-2.5 py-1 font-bold text-white ring-1 ring-white/15">
        {current}
      </span>
    </nav>
  )
}
