export const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value) || 0)
export const date = (value) => new Date(`${value}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
export const initials = (name = '') => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
export const nextId = (prefix, records) => `${prefix}-${String(Math.max(0, ...records.map((item) => Number(item.id.split('-')[1]) || 0)) + 1).padStart(4, '0')}`
export const today = '2026-10-11'
