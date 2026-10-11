import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiBell, FiBriefcase, FiGithub, FiPlus, FiSearch, FiShield, FiMenu, FiX } from 'react-icons/fi'
import { Tooltip } from 'react-tooltip'
import styles from './styles.module.css'

export default function Header({ onCreate, onNotify }) {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const submit = (event) => { event.preventDefault(); navigate(`/accounts?search=${encodeURIComponent(query)}`); setMenuOpen(false) }
  return <header className={styles.header}>
    <Link to="/" className={styles.brand} aria-label="Aster overview"><span className={styles.mark}><FiShield /></span><span>aster<span className={styles.dot}>.</span><small>insurance, in good hands</small></span></Link>
    <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <FiX /> : <FiMenu />}</button>
    <form className={styles.search} onSubmit={submit}><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search accounts or policies" aria-label="Search accounts or policies" /><kbd>⌘ K</kbd></form>
    <div className={styles.actions}>
      <button className={styles.iconButton} onClick={onNotify} aria-label="Notifications" data-tooltip-id="header-tip" data-tooltip-content="Renewal reminders"><FiBell /><i /></button>
      <a className={styles.repo} href="https://github.com/a2rp/insurance-broker-workspace" target="_blank" rel="noreferrer"><FiGithub /> <span>Repository</span></a>
      <button className={styles.create} onClick={() => onCreate('request')}><FiPlus /> New request</button>
    </div>
    <Tooltip id="header-tip" className={styles.tooltip} />
    {menuOpen && <div className={styles.mobileSearch}><form onSubmit={submit}><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search accounts or policies" /><button aria-label="Search"><FiSearch /></button></form><button onClick={() => onCreate('request')}><FiPlus /> New service request</button><a href="https://github.com/a2rp/insurance-broker-workspace" target="_blank" rel="noreferrer"><FiGithub /> Repository</a></div>}
  </header>
}
