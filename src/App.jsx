import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Header from './components/header/index.jsx'
import Sidebar from './components/sidebar/index.jsx'
import Footer from './components/footer/index.jsx'
import Dialog from './components/dialog/index.jsx'
import Toast from './components/toast/index.jsx'
import { seedData, brokers, policyStatuses, renewalStages, requestStatuses } from './data/seed.js'
import { nextId } from './utils/format.js'

const Overview = lazy(() => import('./pages/overview/index.jsx'))
const Accounts = lazy(() => import('./pages/accounts/index.jsx'))
const Policies = lazy(() => import('./pages/policies/index.jsx'))
const Renewals = lazy(() => import('./pages/renewals/index.jsx'))
const Service = lazy(() => import('./pages/service/index.jsx'))
const NotFound = lazy(() => import('./pages/notFound/index.jsx'))

const typeConfig = {
  account: { key: 'accounts', prefix: 'AC', title: 'client account', fields: [
    { name: 'name', label: 'Business name', required: true }, { name: 'contact', label: 'Primary contact', required: true }, { name: 'email', label: 'Email', type: 'email', required: true }, { name: 'phone', label: 'Phone' }, { name: 'industry', label: 'Industry', required: true }, { name: 'location', label: 'Location', required: true }, { name: 'premium', label: 'Annual premium ($)', type: 'number', required: true }, { name: 'renewalDate', label: 'Next renewal', type: 'date', required: true }, { name: 'risk', label: 'Risk profile', type: 'select', options: ['Low', 'Moderate', 'High'], required: true }, { name: 'notes', label: 'Account notes', type: 'textarea', wide: true },
  ] },
  policy: { key: 'policies', prefix: 'PL', title: 'policy', fields: (data) => [
    { name: 'account', label: 'Client account', type: 'select', options: data.accounts.map((item) => item.name), required: true }, { name: 'type', label: 'Coverage type', required: true }, { name: 'carrier', label: 'Carrier', required: true }, { name: 'premium', label: 'Annual premium ($)', type: 'number', required: true }, { name: 'status', label: 'Status', type: 'select', options: policyStatuses, required: true }, { name: 'owner', label: 'Account manager', type: 'select', options: brokers, required: true }, { name: 'effective', label: 'Effective date', type: 'date', required: true }, { name: 'expires', label: 'Expiration date', type: 'date', required: true }, { name: 'limit', label: 'Coverage limit', required: true },
  ] },
  renewal: { key: 'renewals', prefix: 'RN', title: 'renewal', fields: (data) => [
    { name: 'account', label: 'Client account', type: 'select', options: data.accounts.map((item) => item.name), required: true }, { name: 'policy', label: 'Coverage type', type: 'select', options: [...new Set(data.policies.map((item) => item.type))], required: true }, { name: 'due', label: 'Renewal date', type: 'date', required: true }, { name: 'stage', label: 'Renewal stage', type: 'select', options: renewalStages, required: true }, { name: 'owner', label: 'Account manager', type: 'select', options: brokers, required: true }, { name: 'premium', label: 'Current premium ($)', type: 'number', required: true },
  ] },
  request: { key: 'requests', prefix: 'SR', title: 'service request', fields: (data) => [
    { name: 'account', label: 'Client account', type: 'select', options: data.accounts.map((item) => item.name), required: true }, { name: 'subject', label: 'Request summary', required: true }, { name: 'type', label: 'Request type', type: 'select', options: ['Certificate of insurance', 'Certificate / endorsement', 'Policy change', 'Document request', 'Coverage question', 'Claim assistance'], required: true }, { name: 'priority', label: 'Priority', type: 'select', options: ['Normal', 'High', 'Urgent'], required: true }, { name: 'status', label: 'Status', type: 'select', options: requestStatuses, required: true }, { name: 'owner', label: 'Assigned to', type: 'select', options: brokers, required: true },
  ] },
}

function Workspace() {
  const [data, setData] = useState(seedData)
  const [dialog, setDialog] = useState(null)
  const [toast, setToast] = useState(null)
  const [mobileNav, setMobileNav] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  const showToast = useCallback((title, message = '', type = 'success') => setToast({ title, message, type }), [])
  const records = useMemo(() => data, [data])

  const openForm = (entity, item = null) => {
    const config = typeConfig[entity]
    const fields = typeof config.fields === 'function' ? config.fields(data) : config.fields
    setDialog({ kind: 'form', entity, item, title: `${item ? 'Edit' : 'New'} ${config.title}`, description: item ? 'Update the record details below.' : 'Add the details to your brokerage workspace.', fields, initial: item || (entity === 'request' ? { priority: 'Normal', status: 'New', owner: brokers[0] } : entity === 'renewal' ? { stage: 'Preparation', owner: brokers[0] } : entity === 'policy' ? { status: 'Active', owner: brokers[0] } : {}), submitLabel: item ? 'Save updates' : `Create ${config.title}` })
  }
  const openDetail = (entity, item) => {
    const rows = Object.entries(item).filter(([key]) => !['id', 'checklist', 'completed', 'accountId', 'notes'].includes(key))
    const content = <><div className="detailGrid">{rows.map(([key, value]) => <div key={key}><span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())}</span><strong>{String(value)}</strong></div>)}</div>{item.notes && <div className="detailNote"><strong>Account notes</strong><br/>{item.notes}</div>}{entity === 'renewal' && <div className="detailNote">Submission checklist: {item.completed.length} of {item.checklist.length} items complete.</div>}</>
    setDialog({ kind: 'detail', title: item.name || item.subject || `${entity[0].toUpperCase()}${entity.slice(1)} details`, description: `${entity[0].toUpperCase()}${entity.slice(1)} · ${item.id}`, content, actions: <><button className="secondary" onClick={() => openForm(entity, item)}>Edit record</button><button className="primary" onClick={() => setDialog(null)}>Done</button></> })
  }
  const handleSubmit = (values) => {
    const { entity, item } = dialog
    const config = typeConfig[entity]
    const key = config.key
    let next = { ...values }
    if (entity === 'account') { next.premium = Number(values.premium); next.policies = item?.policies ?? 0 }
    if (entity === 'policy') { next.premium = Number(values.premium); next.accountId = data.accounts.find((account) => account.name === values.account)?.id || ''; }
    if (entity === 'renewal') { next.premium = Number(values.premium); next.checklist = item?.checklist || ['Exposure data', 'Loss runs', 'Carrier submission']; next.completed = item?.completed || []; }
    if (item) {
      setData((current) => ({ ...current, [key]: current[key].map((record) => record.id === item.id ? { ...record, ...next } : record) }))
      showToast(`${config.title[0].toUpperCase()}${config.title.slice(1)} updated`, `${item.id} has been updated.`)
    } else {
      const created = { id: nextId(config.prefix, data[key]), ...next }
      if (entity === 'request') created.received = '2026-10-11'
      setData((current) => ({ ...current, [key]: [created, ...current[key]] }))
      showToast(`${config.title[0].toUpperCase()}${config.title.slice(1)} created`, `${created.id} is now in your workspace.`)
    }
    setDialog(null)
  }
  const confirmDelete = (entity, item) => {
    const config = typeConfig[entity]
    setDialog({ kind: 'confirm', title: `Delete ${config.title}?`, message: `This will permanently remove ${item.id} from this session. ${entity === 'account' ? 'Linked policies, renewals, and service requests for this account will also be removed.' : ''} This action cannot be undone.`, confirmLabel: 'Delete record', onConfirm: () => {
      if (entity === 'account') setData((current) => ({ ...current, accounts: current.accounts.filter((record) => record.id !== item.id), policies: current.policies.filter((record) => record.accountId !== item.id), renewals: current.renewals.filter((record) => record.account !== item.name), requests: current.requests.filter((record) => record.account !== item.name) }))
      else if (entity === 'policy') setData((current) => ({ ...current, policies: current.policies.filter((record) => record.id !== item.id), renewals: current.renewals.filter((record) => !(record.account === item.account && record.policy === item.type)) }))
      else setData((current) => ({ ...current, [config.key]: current[config.key].filter((record) => record.id !== item.id) }))
      setDialog(null); showToast(`${config.title[0].toUpperCase()}${config.title.slice(1)} deleted`, `${item.id} has been removed.`)
    } })
  }
  const updateRecord = (entity, id, changes) => setData((current) => ({ ...current, [typeConfig[entity].key]: current[typeConfig[entity].key].map((item) => item.id === id ? { ...item, ...changes } : item) }))
  const openNotifications = () => setDialog({ kind: 'notice', title: 'Renewal reminders', description: 'Upcoming client work that may need attention.', content: <div className="reminderList">{data.renewals.slice().sort((a,b)=>a.due.localeCompare(b.due)).slice(0,4).map((item)=><button key={item.id} onClick={()=>{setDialog(null);navigate('/renewals')}}><strong>{item.account}</strong><span>{item.policy} · due {item.due}</span></button>)}</div> })
  const shared = { data: records, search, openForm, openDetail, confirmDelete, updateRecord, showToast }
  return <div className="appShell"><Header onCreate={openForm} onNotify={openNotifications}/><Sidebar requests={data.requests} open={mobileNav} close={()=>setMobileNav(false)}/>
    <button className="mobileMenuTrigger" onClick={()=>setMobileNav(true)} aria-label="Open workspace navigation">☰</button>
    <main className="workspaceMain"><Suspense fallback={<div className="routeLoader"><span/></div>}><Routes location={location} key={location.pathname}><Route path="/" element={<Overview {...shared}/>} /><Route path="/accounts" element={<Accounts {...shared}/>} /><Route path="/policies" element={<Policies {...shared}/>} /><Route path="/renewals" element={<Renewals {...shared}/>} /><Route path="/service" element={<Service {...shared}/>} /><Route path="*" element={<NotFound/>}/></Routes></Suspense></main>
    <Footer/><Dialog dialog={dialog} onClose={()=>setDialog(null)} onSubmit={handleSubmit}/><Toast toast={toast} onClose={()=>setToast(null)}/>
  </div>
}
export default function App(){return <BrowserRouter basename="/insurance-broker-workspace"><Workspace/></BrowserRouter>}
