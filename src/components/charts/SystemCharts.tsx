import type { ReactNode } from 'react'
import { useSystemAnalytics } from '../../hooks/useSystemAnalytics'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const tooltipStyle = {
  backgroundColor: 'rgba(15, 23, 42, 0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '10px 14px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div style={tooltipStyle}>
      {label && <p className="mb-1 text-xs font-bold text-slate-400">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-semibold text-white">
          <span style={{ color: p.color }}>{p.name}: </span>
          {p.value}
        </p>
      ))}
    </div>
  )
}

export function ChartCard({
  title,
  subtitle,
  children,
  className = '',
  accent = 'from-emerald-500 to-teal-600',
}: {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
  accent?: string
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm ring-1 ring-slate-100/80 transition-all duration-300 hover:shadow-lg sm:p-5 ${className}`}>
      <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${accent} opacity-[0.07] blur-2xl transition-opacity group-hover:opacity-[0.12]`} />
      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        <div className={`rounded-xl bg-gradient-to-br ${accent} p-2 text-white shadow-md`}>
          <TrendingUp className="h-4 w-4" />
        </div>
      </div>
      <div className="relative h-[220px] w-full sm:h-[260px]">{children}</div>
    </div>
  )
}

export function UsersByRoleChart({ data }: { data: { role: string; count: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          {data.map((d, i) => (
            <linearGradient key={d.role} id={`roleGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={d.fill} stopOpacity={1} />
              <stop offset="100%" stopColor={d.fill} stopOpacity={0.5} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="role" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="count" name="Users" radius={[8, 8, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => (
            <Cell key={i} fill={`url(#roleGrad${i})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function EnrollmentStatusPie({ data }: { data: { status: string; count: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={4}
          dataKey="count"
          nameKey="status"
          strokeWidth={0}
        >
          {data.map((entry) => (
            <Cell key={entry.status} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function ActivityTrendChart({ data }: { data: { month: string; enrollments: number; assignments: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="assignGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="enrollments" name="Enrollments" stroke="#059669" strokeWidth={2.5} fill="url(#enrollGrad)" />
        <Area type="monotone" dataKey="assignments" name="Assignments" stroke="#14b8a6" strokeWidth={2.5} fill="url(#assignGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function DepartmentRadarChart({ data }: { data: { name: string; faculty: number; courses: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
        <PolarRadiusAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} />
        <Radar name="Faculty" dataKey="faculty" stroke="#059669" fill="#059669" fillOpacity={0.35} strokeWidth={2} />
        <Radar name="Courses" dataKey="courses" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.35} strokeWidth={2} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Tooltip content={<ChartTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export function CourseUtilizationChart({ data }: { data: { code: string; utilization: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
        <RadialBar background={{ fill: '#f1f5f9' }} dataKey="utilization" name="Utilization %" cornerRadius={8}>
          {data.map((entry) => (
            <Cell key={entry.code} fill={entry.fill} />
          ))}
        </RadialBar>
        <Tooltip content={<ChartTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export function GpaDistributionChart({ data }: { data: { range: string; count: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="range" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={72} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="count" name="Students" radius={[0, 8, 8, 0]} maxBarSize={20}>
          {data.map((entry) => (
            <Cell key={entry.range} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function StudentsByProgramChart({ data }: { data: { program: string; count: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          dataKey="count"
          nameKey="program"
          strokeWidth={2}
          stroke="#fff"
          label={(props) => {
            const name = (props as { program?: string; percent?: number }).program ?? ''
            const pct = ((props as { percent?: number }).percent ?? 0) * 100
            return `${name} ${pct.toFixed(0)}%`
          }}
          labelLine={{ stroke: '#94a3b8' }}
        >
          {data.map((entry) => (
            <Cell key={entry.program} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function FacultyWorkloadChart({ data }: { data: { name: string; courses: number; fill: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} />
        <Line type="monotone" dataKey="courses" name="Courses" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }} activeDot={{ r: 7, fill: '#059669' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function GradeDistributionChart({ data }: { data: { grade: string; count: number; fill: string }[] }) {
  if (!data.length) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        No grade data yet
      </div>
    )
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="grade" tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<ChartTooltip />} />
        <Bar dataKey="count" name="Records" radius={[8, 8, 0, 0]} maxBarSize={40}>
          {data.map((entry) => (
            <Cell key={entry.grade} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function AttendanceDonutChart({ data }: { data: { status: string; count: number; fill: string }[] }) {
  const total = data.reduce((s, d) => s + d.count, 0)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="45%" innerRadius={50} outerRadius={78} paddingAngle={5} dataKey="count" nameKey="status" strokeWidth={0}>
          {data.map((entry) => (
            <Cell key={entry.status} fill={entry.fill} />
          ))}
        </Pie>
        <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-800 text-xl font-extrabold" style={{ fontSize: 22, fontWeight: 800, fill: '#1e293b' }}>
          {total}
        </text>
        <text x="50%" y="54%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 11, fill: '#94a3b8' }}>
          records
        </text>
        <Tooltip content={<ChartTooltip />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 4 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function SystemUtilizationGauge({ value }: { value: number }) {
  const gaugeData = [{ name: 'Utilization', value, fill: value > 80 ? '#f43f5e' : value > 60 ? '#f59e0b' : '#10b981' }]
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadialBarChart cx="50%" cy="65%" innerRadius="55%" outerRadius="95%" barSize={18} data={gaugeData} startAngle={180} endAngle={0}>
        <RadialBar background={{ fill: '#f1f5f9' }} dataKey="value" cornerRadius={12} />
        <text x="50%" y="58%" textAnchor="middle" style={{ fontSize: 32, fontWeight: 800, fill: '#1e293b' }}>
          {value}%
        </text>
        <text x="50%" y="72%" textAnchor="middle" style={{ fontSize: 12, fill: '#64748b' }}>
          Seat Utilization
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  )
}

export function DashboardChartsPreview() {
  const analytics = useSystemAnalytics()
  const trend = analytics.activityTrend.length
    ? analytics.activityTrend
    : [{ month: 'N/A', enrollments: 0, assignments: 0 }]

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Users by Role" subtitle="Live account distribution" accent="from-emerald-500 to-teal-600">
        <UsersByRoleChart data={analytics.usersByRole} />
      </ChartCard>
      <ChartCard title="Enrollment Pipeline" subtitle="Approval status breakdown" accent="from-emerald-500 to-teal-600">
        <EnrollmentStatusPie data={analytics.enrollmentByStatus} />
      </ChartCard>
      <ChartCard title="Activity Trend" subtitle="Enrollments & assignments over time" accent="from-teal-500 to-green-600" className="lg:col-span-2">
        <ActivityTrendChart data={trend} />
      </ChartCard>
    </div>
  )
}

export function SystemAnalyticsDashboard() {
  const analytics = useSystemAnalytics()
  const { summary } = analytics
  const trend = analytics.activityTrend.length
    ? analytics.activityTrend
    : [{ month: 'N/A', enrollments: 0, assignments: 0 }]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {[
          { label: 'Avg GPA', value: summary.avgGpa, accent: 'from-emerald-500 to-teal-600' },
          { label: 'Seat Use', value: `${summary.systemUtilization}%`, accent: 'from-green-500 to-emerald-600' },
          { label: 'Approved', value: summary.approvedEnrollments, accent: 'from-emerald-500 to-teal-600' },
          { label: 'Pending', value: summary.pendingEnrollments, accent: 'from-teal-500 to-cyan-600' },
          { label: 'Faculty', value: summary.totalFaculty, accent: 'from-teal-500 to-green-600' },
          { label: 'Depts', value: summary.totalDepartments, accent: 'from-cyan-500 to-teal-600' },
        ].map((item) => (
          <div key={item.label} className={`rounded-2xl bg-gradient-to-br ${item.accent} p-[1px] shadow-sm`}>
            <div className="rounded-[calc(1rem-1px)] bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">{item.label}</p>
              <p className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Users by Role" subtitle="Account distribution across portals" accent="from-emerald-500 to-teal-600">
          <UsersByRoleChart data={analytics.usersByRole} />
        </ChartCard>
        <ChartCard title="Enrollment Status" subtitle="Pending · Approved · Rejected" accent="from-emerald-500 to-teal-600">
          <EnrollmentStatusPie data={analytics.enrollmentByStatus} />
        </ChartCard>
        <ChartCard title="Activity Trend" subtitle="Monthly enrollments vs assignments" accent="from-teal-500 to-green-600" className="lg:col-span-2">
          <ActivityTrendChart data={trend} />
        </ChartCard>
        <ChartCard title="Department Radar" subtitle="Faculty & course count per department" accent="from-cyan-500 to-teal-600">
          <DepartmentRadarChart data={analytics.departmentStats} />
        </ChartCard>
        <ChartCard title="Course Utilization" subtitle="Seat fill rate by course" accent="from-green-500 to-emerald-600">
          <CourseUtilizationChart data={analytics.courseUtilization} />
        </ChartCard>
        <ChartCard title="GPA Distribution" subtitle="Student performance bands" accent="from-emerald-500 to-green-600">
          <GpaDistributionChart data={analytics.gpaBuckets} />
        </ChartCard>
        <ChartCard title="Students by Program" subtitle="Enrollment per degree program" accent="from-emerald-600 to-teal-700">
          <StudentsByProgramChart data={analytics.studentsByProgram} />
        </ChartCard>
        <ChartCard title="Grade Distribution" subtitle="Letter grades across all records" accent="from-emerald-600 to-teal-700">
          <GradeDistributionChart data={analytics.gradeDistribution} />
        </ChartCard>
        <ChartCard title="Faculty Workload" subtitle="Assigned courses per instructor" accent="from-teal-500 to-emerald-600">
          <FacultyWorkloadChart data={analytics.facultyWorkload} />
        </ChartCard>
        <ChartCard title="Attendance Overview" subtitle="Present · Late · Absent" accent="from-teal-500 to-emerald-600">
          <AttendanceDonutChart data={analytics.attendanceBreakdown} />
        </ChartCard>
        <ChartCard title="System Utilization" subtitle="Overall seat capacity usage" accent="from-emerald-600 to-green-700">
          <SystemUtilizationGauge value={summary.systemUtilization} />
        </ChartCard>
        <ChartCard title="Student Status" subtitle="Enrolled · Graduated · Inactive" accent="from-emerald-500 to-cyan-600">
          <EnrollmentStatusPie data={analytics.studentStatus.map((s) => ({ status: s.status, count: s.count, fill: s.fill }))} />
        </ChartCard>
      </div>
    </div>
  )
}
