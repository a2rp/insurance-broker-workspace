import { useEffect } from 'react'
import { FiCheckCircle, FiAlertCircle, FiX, FiInfo } from 'react-icons/fi'
import styles from './styles.module.css'
const icons={success:FiCheckCircle,error:FiAlertCircle,info:FiInfo}
export default function Toast({toast,onClose}){useEffect(()=>{if(!toast)return;const timer=setTimeout(onClose,4200);return()=>clearTimeout(timer)},[toast,onClose]);if(!toast)return null;const Icon=icons[toast.type]||FiCheckCircle;return <div className={`${styles.toast} ${styles[toast.type||'success']}`} role="status"><Icon/><div><strong>{toast.title}</strong>{toast.message&&<span>{toast.message}</span>}</div><button onClick={onClose} aria-label="Dismiss notification"><FiX/></button></div>}
