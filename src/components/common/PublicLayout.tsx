import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { SYSTEM } from '../../constants/system'
import { DeveloperCredit } from './DeveloperCredit'
import { PublicHeaderNav } from './PublicButtons'

function AuthBackground() {
  return (
    <>
      <div className="auth-orb animate-float left-[8%] top-[12%] h-56 w-56 bg-emerald-500/25" />
      <div className="auth-orb animate-float-delayed right-[6%] top-[20%] h-64 w-64 bg-teal-500/20" />
      <div className="auth-orb animate-pulse-glow bottom-[8%] left-[35%] h-48 w-48 bg-emerald-500/15" />
    </>
  )
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="auth-mesh relative flex min-h-screen flex-col">
      <AuthBackground />

      <header className="relative z-20 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-3 sm:h-16 sm:gap-4 sm:px-6">
          <Link to="/" className="flex min-w-0 shrink items-center gap-2.5 transition hover:opacity-90 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm sm:h-10 sm:w-10">
              <GraduationCap className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-white">{SYSTEM.shortName}</p>
              <p className="truncate text-[10px] text-slate-400 sm:text-xs">{SYSTEM.fullName}</p>
            </div>
          </Link>

          <PublicHeaderNav />
        </div>
      </header>

      <main className="relative z-10 flex-1">{children}</main>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 sm:px-6">
        <DeveloperCredit variant="auth" />
      </footer>
    </div>
  )
}
