import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  GraduationCap,
  Home,
  Shield,
  UserCog,
  BookOpen,
  User,
  Sparkles,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  CheckCircle2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AuthPageBranding } from '../components/common/AuthPageBranding'
import { PublicLayout } from '../components/common/PublicLayout'
import { QuickAccessPanel } from '../components/common/QuickAccessPanel'
import { AuthPageNav, PublicButton, PublicButtonRow } from '../components/common/PublicButtons'
import { SYSTEM } from '../constants/system'
import {
  AlertMessage,
  FeaturePage,
  FormField,
  inputClass,
  ActionButton,
} from '../components/common/RoleLayout'
import { ContentCard } from '../components/common/DashboardUI'
import { DeveloperCredit } from '../components/common/DeveloperCredit'
import {
  allRoles,
  DEMO_PASSWORD,
  getDashboardPath,
  roleLabels,
} from '../utils/auth'
import type { UserRole } from '../types'

const roleIcons: Record<UserRole, typeof Shield> = {
  'super-admin': Shield,
  'academic-administrator': UserCog,
  faculty: BookOpen,
  student: User,
}

const registerBenefits = [
  `Join ${SYSTEM.fullName} with the role that fits you`,
  'Choose Student, Faculty, Administrator, or Super Admin',
  'Instant access to your personalized dashboard after registration',
  'Profile management and live data synced in your browser',
]

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const user = login(email, password)
    if (user) navigate(getDashboardPath(user.role))
    else setError('Invalid email or password.')
  }

  return (
    <PublicLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <AuthPageNav page="login" />

        <AuthPageBranding page="login" className="mb-8 sm:mb-10" />

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="glass-card animate-fade-in rounded-3xl border border-white/20 p-5 shadow-2xl shadow-black/30 sm:p-8"
            >
              <AuthPageBranding variant="card" page="login" />

              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-100">
                <Sparkles className="h-3.5 w-3.5" />
                Manual Sign In
              </div>

              {error && (
                <div className="mb-4">
                  <AlertMessage type="error" message={error} />
                </div>
              )}

              <div className="space-y-4">
                <FormField label="Email">
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputClass} pl-10`}
                      placeholder="you@academy.edu"
                      required
                    />
                  </div>
                </FormField>
                <FormField label="Password">
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClass} pl-10`}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </FormField>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500 ring-1 ring-slate-100">
                Demo password: <code className="font-mono font-bold text-slate-700">{DEMO_PASSWORD}</code>
              </div>

              <div className="mt-6">
                <PublicButton type="submit" variant="submit" size="lg" icon={ArrowRight} fullWidth>
                  Sign In
                </PublicButton>
              </div>

              <PublicButtonRow className="mt-5" layout="stack">
                <PublicButton to="/" variant="home" surface="light" icon={Home} size="sm" fullWidth>
                  Home
                </PublicButton>
                <PublicButton to="/register" variant="register" icon={UserPlus} size="sm" fullWidth>
                  Register
                </PublicButton>
              </PublicButtonRow>
            </form>
          </div>

          <div className="animate-fade-in lg:col-span-3">
            <QuickAccessPanel onError={setError} />
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [department, setDepartment] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const user = register(name, email, password, role, department || undefined)
    if (user) navigate(getDashboardPath(user.role))
    else setError('Registration failed. Email may already exist or password must be at least 6 characters.')
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <AuthPageNav page="register" />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="animate-fade-in">
            <AuthPageBranding page="register" className="mb-8" />

            <p className="text-sm leading-relaxed text-slate-400 lg:max-w-md">
              Create your {SYSTEM.shortName} account — registration is separate from sign in. You&apos;ll be routed to your role dashboard immediately.
            </p>

            <div className="mt-8 space-y-4">
              {registerBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <p className="text-sm text-slate-300">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="glass-dark mt-8 rounded-2xl border border-white/10 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {SYSTEM.shortName} registration flow
              </p>
              <ol className="mt-3 space-y-2 text-sm text-slate-300">
                <li><span className="font-bold text-white">1.</span> Select your role</li>
                <li><span className="font-bold text-white">2.</span> Enter your details</li>
                <li><span className="font-bold text-white">3.</span> Submit — you&apos;re routed to your dashboard</li>
              </ol>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-emerald-400 hover:text-emerald-300">
                Sign in here
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-card animate-fade-in h-fit rounded-3xl border border-white/20 p-5 shadow-2xl shadow-black/30 sm:p-8"
          >
            <AuthPageBranding variant="card" page="register" />

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700 ring-1 ring-teal-100">
              <GraduationCap className="h-3.5 w-3.5" />
              Join {SYSTEM.fullName}
            </div>

            {error && <AlertMessage type="error" message={error} />}

            <FormField label="Select Role">
              <div className="grid grid-cols-2 gap-2">
                {allRoles.map((r) => {
                  const Icon = roleIcons[r]
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`card-shine flex flex-col items-center rounded-xl border-2 p-3 text-center transition-all duration-300 ${
                        role === r
                          ? 'border-emerald-600 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 text-white shadow-xl ring-2 ring-emerald-400/40'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      <Icon className="mb-1.5 h-5 w-5" />
                      <span className="text-xs font-bold leading-tight">{roleLabels[r]}</span>
                    </button>
                  )
                })}
              </div>
            </FormField>

            <div className="mt-5 space-y-4">
              <FormField label="Full Name">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
              </FormField>
              <FormField label="Email">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
              </FormField>
              <FormField label="Password">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} minLength={6} placeholder="Minimum 6 characters" required />
              </FormField>
              <FormField label="Department (optional)">
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass} placeholder="e.g. Computer Science" />
              </FormField>
            </div>

            <div className="mt-4 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50 px-4 py-3 text-xs text-slate-500 ring-1 ring-slate-100">
              Registering as <strong className="text-slate-800">{roleLabels[role]}</strong> — you&apos;ll go straight to your dashboard.
            </div>

            <div className="mt-6">
              <PublicButton type="submit" variant="submitRegister" size="lg" icon={ArrowRight} fullWidth>
                Register & Continue
              </PublicButton>
            </div>

            <PublicButtonRow className="mt-5" layout="stack">
              <PublicButton to="/" variant="home" surface="light" icon={Home} size="sm" fullWidth>
                Home
              </PublicButton>
              <PublicButton to="/login" variant="signIn" surface="light" icon={LogIn} size="sm" fullWidth>
                Sign In
              </PublicButton>
            </PublicButtonRow>
          </form>
        </div>
      </div>
    </PublicLayout>
  )
}

export function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [department, setDepartment] = useState(user?.department ?? '')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, email, department })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <FeaturePage title="Profile Settings" description="Manage your personal information and account details.">
      {saved && <AlertMessage type="success" message="Profile updated successfully!" />}
      <ContentCard className="max-w-xl" title="Account Details" description="Update your profile information below.">
        <form onSubmit={handleSave} className="space-y-5">
          <FormField label="Full Name">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </FormField>
          <FormField label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </FormField>
          <FormField label="Department">
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass} />
          </FormField>
          <FormField label="Role">
            <input type="text" value={user?.role ? roleLabels[user.role] : ''} className={`${inputClass} bg-slate-50 text-slate-500`} disabled />
          </FormField>
          <ActionButton type="submit">Save Changes</ActionButton>
        </form>
      </ContentCard>

      <DeveloperCredit variant="card" />
    </FeaturePage>
  )
}
