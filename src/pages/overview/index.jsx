import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiClock, FiFileText, FiPlus, FiRefreshCw, FiShield, FiUsers, FiArrowRight } from 'react-icons/fi'
import { money, date, today } from '../../utils/format.js'
import styles from './styles.module.css'

export default function Overview({data,openForm,openDetail,updateRecord,showToast}){
  const premium=data.policies.reduce((sum,item)=>sum+Number(item.premium||0),0)
  const activePolicies=data.policies.filter((item)=>item.status==='Active').length
  const openRequests=data.requests.filter((item)=>item.status!=='Completed').length
  const sorted=data.renewals.slice().sort((a,b)=>a.due.localeCompare(b.due))
  const near=sorted.slice(0,4)
  const days=(value)=>Math.ceil((new Date(`${value}T12:00:00`)-new Date(`${today}T12:00:00`))/86400000)
  const markComplete=(item)=>{const completed=item.completed.length===item.checklist.length;updateRecord('renewal',item.id,{stage:completed?'Bound':'Proposal'});showToast(completed?'Renewal marked bound':'Renewal advanced','The renewal stage has been updated.')}
  return <div className={styles.page}>
    <div className={styles.welcome}><div><p className={styles.date}>MONDAY, OCTOBER 11, 2026 <span>•</span> BROKER DESK</p><h1>Good morning, Jordan</h1><p className={styles.subtitle}>Your renewal book is moving. Here is what needs your attention today.</p></div><button className={styles.newButton} onClick={()=>openForm('account')}><FiPlus/> Add client</button></div>
    <section className={styles.hero}><div className={styles.heroText}><span className={styles.heroLabel}><FiShield/> RENEWAL DESK</span><h2>Protect the relationships<br/>behind every policy.</h2><p>Four client renewals are on the desk. Keep the details moving and make every placement count.</p><Link to="/renewals" className={styles.heroLink}>Open renewal schedule <FiArrowUpRight/></Link></div><div className={styles.heroPhoto}><img src="/insurance-broker-workspace/insurance-policy.jpg" alt="Magnifying glass reviewing an insurance policy document"/><span>Coverage review, made clear</span></div></section>
    <section className={styles.metricGrid} aria-label="Portfolio summary">
      <Link to="/accounts" className={styles.metric}><span className={styles.metricIcon}><FiUsers/></span><span className={styles.metricLabel}>Client accounts</span><strong>{data.accounts.length}</strong><small>Across your active book <FiArrowUpRight/></small></Link>
      <Link to="/policies" className={styles.metric}><span className={`${styles.metricIcon} ${styles.blue}`}><FiFileText/></span><span className={styles.metricLabel}>Policies in force</span><strong>{activePolicies}</strong><small>{data.policies.length} total placements <FiArrowUpRight/></small></Link>
      <Link to="/policies" className={styles.metric}><span className={`${styles.metricIcon} ${styles.gold}`}><FiShield/></span><span className={styles.metricLabel}>Premium managed</span><strong>{money(premium)}</strong><small>Annual written premium <FiArrowUpRight/></small></Link>
      <Link to="/service" className={styles.metric}><span className={`${styles.metricIcon} ${styles.coral}`}><FiClock/></span><span className={styles.metricLabel}>Open service items</span><strong>{openRequests}</strong><small>Requests need a next step <FiArrowUpRight/></small></Link>
    </section>
    <div className={styles.workGrid}><section className={styles.renewals}><div className={styles.sectionHead}><div><h2>Renewals on deck</h2><p>The next dates on your calendar</p></div><Link to="/renewals">View all <FiArrowRight/></Link></div>
      <div className={styles.timeline}>{near.map((item,index)=>{const remaining=days(item.due);const account=data.accounts.find((account)=>account.name===item.account);return <article className={styles.renewalRow} key={item.id}><div className={styles.timelineMark}><i className={index===0?styles.current:''}/><span/></div><div className={styles.renewalContent}><div className={styles.renewalTop}><div><button className={styles.recordLink} onClick={()=>openDetail('renewal',item)}>{item.account}</button><span className={styles.coverage}>{item.policy} · {account?.location||'Client account'}</span></div><span className={`${styles.stage} ${styles[item.stage.toLowerCase().replaceAll(' ','')]}`}>{item.stage}</span></div><div className={styles.renewalBottom}><span><FiClock/> {remaining<0?`${Math.abs(remaining)} days overdue`:remaining===0?'Due today':`${remaining} days left`} · {date(item.due)}</span><span>{item.completed.length}/{item.checklist.length} ready</span></div><div className={styles.progress}><i style={{width:`${item.completed.length/item.checklist.length*100}%`}}/></div></div></article>})}</div>
      <Link to="/renewals" className={styles.allRenewals}>See full renewal calendar <FiArrowUpRight/></Link>
    </section><section className={styles.servicePanel}><div className={styles.sectionHead}><div><h2>Service queue</h2><p>Client requests, in motion</p></div><Link to="/service">Open desk <FiArrowRight/></Link></div><div className={styles.queue}>{data.requests.filter((item)=>item.status!=='Completed').slice(0,4).map((item)=><button className={styles.queueItem} key={item.id} onClick={()=>openDetail('request',item)}><span className={styles.ticket}>{item.id}</span><strong>{item.subject}</strong><span className={styles.queueMeta}>{item.account} <i/> {item.owner}</span><span className={`${styles.priority} ${styles[item.priority.toLowerCase()]}`}>{item.priority}</span></button>)}</div><button className={styles.createRequest} onClick={()=>openForm('request')}><FiPlus/> Log a service request</button></section></div>
    <section className={styles.portfolioStrip}><div><span className={styles.stripIcon}><FiRefreshCw/></span><div><strong>Stay ahead of the next renewal</strong><span>Prepare exposure details, loss runs, and carrier submissions in one place.</span></div></div><Link to="/renewals">Review renewal book <FiArrowUpRight/></Link></section>
  </div>
}

