import { useState } from 'react'
import { FeaturePage, ActionButton, AlertMessage } from '../../../components/common/RoleLayout'
import { ContentCard } from '../../../components/common/DashboardUI'
import { useData } from '../../../context/DataContext'
import { Database, Upload, Clock, HardDrive } from 'lucide-react'

export default function BackupRestore() {
  const { backups, setBackups } = useData()
  const [message, setMessage] = useState('')

  const handleBackup = () => {
    const now = new Date()
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    setBackups([{ id: String(Date.now()), date: dateStr, size: '246 MB', type: 'Full Backup' }, ...backups])
    setMessage('System backup completed successfully!')
    setTimeout(() => setMessage(''), 5000)
  }

  const handleRestore = (date: string) => {
    if (confirm(`Restore system to backup from ${date}?`)) {
      setMessage(`Restoring from ${date}...`)
      setTimeout(() => setMessage('System restored successfully!'), 2000)
      setTimeout(() => setMessage(''), 5000)
    }
  }

  return (
    <FeaturePage title="Backup & Restore" description="Manage system data backup and recovery operations.">
      {message && <AlertMessage type="success" message={message} />}
      <div className="flex flex-wrap gap-3">
        <ActionButton onClick={handleBackup}>
          <span className="flex items-center gap-2"><Database className="h-4 w-4" /> Create Backup</span>
        </ActionButton>
        <ActionButton variant="secondary">
          <span className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload Backup</span>
        </ActionButton>
      </div>
      <div className="space-y-3">
        {backups.map((b) => (
          <ContentCard key={b.id} className="flex flex-wrap items-center justify-between gap-4 !p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 p-3 text-white shadow-md">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-800">{b.type}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> {b.date} · {b.size}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <ActionButton variant="secondary" onClick={() => alert(`Downloading backup from ${b.date}`)}>Download</ActionButton>
              <ActionButton variant="danger" onClick={() => handleRestore(b.date)}>Restore</ActionButton>
            </div>
          </ContentCard>
        ))}
      </div>
    </FeaturePage>
  )
}
