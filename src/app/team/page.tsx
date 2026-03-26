'use client'
import { useState } from 'react'
import { Users, Plus, Shield, MessageSquare, BarChart2, Settings, Phone, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '@/components/crm/AppLayout'

const teamMembers = [
  { id: 1, name: 'Raju Sharma', role: 'owner', phone: '+91 98765 43210', active: true, leads: 24, replies: 45, lastActive: 'Now', permissions: { inbox: true, pipeline: true, reports: true, settings: true } },
  { id: 2, name: 'Suman Das', role: 'manager', phone: '+91 87654 32109', active: true, leads: 18, replies: 32, lastActive: '5m ago', permissions: { inbox: true, pipeline: true, reports: true, settings: false } },
  { id: 3, name: 'Puja Mondal', role: 'agent', phone: '+91 76543 21098', active: true, leads: 12, replies: 28, lastActive: '1h ago', permissions: { inbox: true, pipeline: true, reports: false, settings: false } },
  { id: 4, name: 'Rahim Sheikh', role: 'agent', phone: '+91 65432 10987', active: false, leads: 6, replies: 11, lastActive: 'Yesterday', permissions: { inbox: true, pipeline: false, reports: false, settings: false } },
]

const roleColors: Record<string, string> = {
  owner: 'var(--purple)',
  manager: 'var(--amber)',
  agent: 'var(--blue)',
}

const permissionIcons: Record<string, any> = {
  inbox: MessageSquare,
  pipeline: BarChart2,
  reports: BarChart2,
  settings: Settings,
}

export default function TeamPage() {
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', role: 'agent' })

  const addMember = async () => {
    if (!form.name || !form.phone) return toast.error('Name and phone required')
    await new Promise(r => setTimeout(r, 800))
    toast.success(`${form.name} added! Invite sent via WhatsApp.`)
    setShowAdd(false)
    setForm({ name: '', phone: '', role: 'agent' })
  }

  return (
    <AppLayout>
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Team Collaboration</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Manage staff, assign leads, control permissions
            </p>
          </div>
          <button
            className="btn-wa flex items-center gap-1.5 text-sm"
            onClick={() => setShowAdd(!showAdd)}
          >
            <Plus size={14} /> Add Member
          </button>
        </div>

        {showAdd && (
          <div className="card p-4 mb-5 slide-up">
            <div className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Add Team Member</div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { key: 'name', placeholder: 'Full name', label: 'Name' },
                { key: 'phone', placeholder: '+91 98765 43210', label: 'WhatsApp' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>{f.label}</label>
                  <input
                    value={(form as any)[f.key]}
                    onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
              ))}
              <div>
                <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--bg-tertiary)', border: '0.5px solid var(--border)', color: 'var(--text-primary)' }}
                >
                  <option value="agent">Agent</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-wa text-sm" onClick={addMember}>Send WhatsApp Invite</button>
              <button className="btn-ghost text-sm" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total Members', value: teamMembers.length, color: 'var(--blue)' },
            { label: 'Active Now', value: teamMembers.filter(m => m.active).length, color: 'var(--green)' },
            { label: 'Leads Today', value: teamMembers.reduce((s, m) => s + m.leads, 0), color: 'var(--amber)' },
            { label: 'Auto-Replies', value: teamMembers.reduce((s, m) => s + m.replies, 0), color: 'var(--purple)' },
          ].map(s => (
            <div key={s.label} className="card p-4">
              <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Team table */}
        <div className="card">
          <div className="p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
            <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Team Members</div>
          </div>
          {teamMembers.map(member => (
            <div key={member.id} className="p-4" style={{ borderBottom: '0.5px solid var(--border)' }}>
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="flex items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      width: 40, height: 40,
                      background: `${roleColors[member.role]}20`,
                      color: roleColors[member.role],
                    }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {member.active && (
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                      style={{ background: 'var(--green)', borderColor: 'var(--bg-secondary)' }}
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{member.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                      style={{
                        background: `${roleColors[member.role]}15`,
                        color: roleColors[member.role],
                      }}
                    >
                      {member.role}
                    </span>
                    {!member.active && (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Inactive</span>
                    )}
                  </div>
                  <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                    {member.phone} · Last active: {member.lastActive}
                  </div>

                  {/* Permissions */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {Object.entries(member.permissions).map(([perm, allowed]) => (
                      <span
                        key={perm}
                        className="text-xs px-1.5 py-0.5 rounded capitalize flex items-center gap-1"
                        style={{
                          background: allowed ? 'var(--green-dim)' : 'var(--bg-card)',
                          color: allowed ? 'var(--green)' : 'var(--text-muted)',
                        }}
                      >
                        {allowed ? '✓' : '✗'} {perm}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{member.leads}</span> leads today</span>
                    <span><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{member.replies}</span> replies</span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    className="px-3 py-1.5 rounded-lg text-xs"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' }}
                    onClick={() => toast.success(`Edit permissions for ${member.name}`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
