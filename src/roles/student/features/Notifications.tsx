import { FeaturePage, StatusBadge, ActionButton } from '../../../components/common/RoleLayout'
import { EmptyState, ListCard } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'
import { useCurrentStudent } from '../../../hooks/useRoleData'
import { Bell } from 'lucide-react'

export default function Notifications() {
  const { notifications, setNotifications } = useData()
  const student = useCurrentStudent()
  const myNotifications = notifications.filter((n) => !n.studentId || n.studentId === student?.id)

  const markRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    setNotifications(
      notifications.map((n) =>
        !n.studentId || n.studentId === student?.id ? { ...n, read: true } : n,
      ),
    )
  }

  return (
    <FeaturePage
      title="Notifications"
      description="Enrollment updates, assignment reminders, grades, and announcements."
      actions={
        myNotifications.length > 0 ? (
          <ActionButton variant="secondary" onClick={markAllRead}>
            Mark all as read
          </ActionButton>
        ) : undefined
      }
    >
      {myNotifications.length === 0 ? (
        <EmptyState title="All caught up" description="You have no notifications at the moment." />
      ) : (
        <div className="space-y-3">
          {myNotifications.map((n) => (
            <ListCard key={n.id} onClick={() => markRead(n.id)} active={!n.read}>
              <div className="flex items-start gap-4">
                <div className={`rounded-xl p-2.5 shadow-sm ${n.read ? 'bg-slate-100 text-slate-400' : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-200/50'}`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`font-bold ${n.read ? 'text-slate-600' : 'text-slate-900'}`}>{n.title}</h4>
                    <StatusBadge status={n.type === 'enrollment' ? 'approved' : n.type === 'assignment' ? 'pending' : n.type === 'grade' ? 'published' : 'active'} />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{n.message}</p>
                  <p className="mt-2 text-xs font-medium text-slate-400">{n.date}</p>
                </div>
              </div>
            </ListCard>
          ))}
        </div>
      )}
    </FeaturePage>
  )
}
