import {
  BarChart3,
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  LogIn,
  Shield,
  Sparkles,
  User,
  UserCog,
  UserPlus,
  Users,
} from 'lucide-react'
import { PublicLayout } from '../components/common/PublicLayout'
import { PublicButton, PublicButtonRow } from '../components/common/PublicButtons'
import { QuickAccessPanel } from '../components/common/QuickAccessPanel'
import { DeveloperBadge } from '../components/common/DeveloperCredit'
import { SYSTEM } from '../constants/system'
import { allRoles, roleLabels } from '../utils/auth'
import type { UserRole } from '../types'

const roleIcons: Record<UserRole, typeof Shield> = {
  'super-admin': Shield,
  'academic-administrator': UserCog,
  faculty: BookOpen,
  student: User,
}

const flowSteps = [
  {
    step: '01',
    title: 'Visit the Home Portal',
    description: `Explore how ${SYSTEM.fullName} works, who it serves, and what each role can do — no account required.`,
    icon: GraduationCap,
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    step: '02',
    title: 'Register or Sign In',
    description: 'New users create an account on the Register page. Returning users sign in with email and password on the dedicated Login page.',
    icon: UserPlus,
    color: 'from-teal-500 to-teal-600',
  },
  {
    step: '03',
    title: 'Enter Your Role Dashboard',
    description: 'After authentication, you are routed automatically to your role portal — Super Admin, Academic Administrator, Faculty, or Student.',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    step: '04',
    title: 'Manage Academics Live',
    description: 'Use the sidebar to access modules. All data is saved live in your browser — enrollments, grades, users, schedules, and more.',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-600',
  },
]

const roleDetails: Record<UserRole, { summary: string; features: string[]; gradient: string }> = {
  'super-admin': {
    summary: 'Full system control — users, roles, departments, records, reports, and backups.',
    features: ['User & role management', 'Academic settings', 'System reports', 'Backup & restore'],
    gradient: 'from-emerald-700 to-green-800',
  },
  'academic-administrator': {
    summary: 'Oversee students, faculty, programs, offerings, schedules, and enrollment workflows.',
    features: ['Student & faculty records', 'Course offerings', 'Class schedules', 'Enrollment approval'],
    gradient: 'from-emerald-600 to-teal-700',
  },
  faculty: {
    summary: 'Manage classes, attendance, materials, assignments, grades, and student performance.',
    features: ['Assigned courses', 'Attendance tracking', 'Learning materials', 'Grade management'],
    gradient: 'from-teal-600 to-emerald-700',
  },
  student: {
    summary: 'Enroll in courses, view schedules, submit work, track grades, and monitor progress.',
    features: ['Course enrollment', 'Assignment submission', 'Grades & records', 'Notifications'],
    gradient: 'from-green-500 to-emerald-600',
  },
}

const systemFeatures = [
  { icon: Users, label: 'Multi-Role Access', desc: 'Four dedicated portals with role-based permissions' },
  { icon: ClipboardList, label: 'Live Data', desc: 'Read and write shared academic data instantly' },
  { icon: Calendar, label: 'Schedules', desc: 'Class timetables and room assignments' },
  { icon: BookOpen, label: 'Course Management', desc: 'Programs, offerings, and enrollment flows' },
  { icon: BarChart3, label: 'Reports', desc: 'Analytics and export-ready summaries' },
  { icon: Shield, label: 'Secure Sessions', desc: 'Authenticated access with profile management' },
]

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            Welcome to {SYSTEM.fullName}
          </div>
          <h1 className="text-balance text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            One platform for every{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              academic role
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base lg:text-lg">
            {SYSTEM.description} Register a new account or sign in to access your personalized dashboard.
          </p>
          <div className="mt-5 flex justify-center">
            <DeveloperBadge />
          </div>

          <PublicButtonRow className="mx-auto mt-8 w-full max-w-sm sm:max-w-md">
            <PublicButton to="/login" variant="signIn" icon={LogIn} size="xs" fullWidth className="sm:min-h-[50px] sm:px-6 sm:text-base">
              Sign In
            </PublicButton>
            <PublicButton to="/register" variant="register" icon={UserPlus} size="xs" fullWidth className="sm:min-h-[50px] sm:px-6 sm:text-base">
              <span className="sm:hidden">Join</span>
              <span className="hidden sm:inline">Create Account</span>
            </PublicButton>
          </PublicButtonRow>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">How the system works</h2>
          <p className="mt-2 text-sm text-slate-400">Follow this flow from visitor to active user</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flowSteps.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className={`glass-dark card-shine relative overflow-hidden rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 stagger-${i + 1} animate-fade-in`}
              >
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${item.color} p-2.5 text-white shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Step {item.step}</p>
                <h3 className="mt-1 font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">Role portals</h2>
            <p className="mt-1 text-sm text-slate-400">Each role gets a dedicated dashboard and modules</p>
          </div>
          <div className="flex gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Login → Dashboard</span>
            <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Register → Dashboard</span>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {allRoles.map((role) => {
            const Icon = roleIcons[role]
            const detail = roleDetails[role]
            return (
              <div
                key={role}
                className="glass-dark overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/20"
              >
                <div className={`bg-gradient-to-r ${detail.gradient} px-5 py-4`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white/20 p-2.5 ring-1 ring-white/20">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-white">{roleLabels[role]}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-slate-300">{detail.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {detail.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">Platform features</h2>
          <p className="mt-2 text-sm text-slate-400">Everything aligned across all role portals</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {systemFeatures.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="glass-dark rounded-2xl border border-white/10 p-4 text-center transition hover:border-white/20"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-white">{label}</p>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="glass-dark rounded-3xl border border-white/10 p-6 sm:p-8">
          <QuickAccessPanel />
          <div className="mt-6 flex justify-center sm:justify-start">
            <PublicButton to="/login" variant="signIn" icon={LogIn} size="sm" className="w-full max-w-xs sm:w-auto">
              Sign in manually
            </PublicButton>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 p-8 text-center backdrop-blur-sm">
          <h3 className="text-lg font-extrabold text-white sm:text-xl">Ready to get started?</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-300">
            Registration and login are separate — create a new account or sign in to your existing one.
          </p>
          <PublicButtonRow className="mx-auto mt-6 w-full max-w-sm sm:max-w-md">
            <PublicButton to="/register" variant="secondary" icon={UserPlus} size="xs" fullWidth className="sm:min-h-[50px] sm:px-6 sm:text-base">
              Register
            </PublicButton>
            <PublicButton to="/login" variant="signIn" icon={LogIn} size="xs" fullWidth className="sm:min-h-[50px] sm:px-6 sm:text-base">
              Sign In
            </PublicButton>
          </PublicButtonRow>
        </div>
      </section>
    </PublicLayout>
  )
}
