import { Link } from 'react-router-dom'
import { FiArrowLeft, FiCompass, FiHome, FiSearch } from 'react-icons/fi'
import styles from './styles.module.css'
export default function NotFound(){return <div className={styles.page}><div className={styles.illustration}><span>4</span><div><FiCompass/></div><span>4</span></div><p className={styles.label}>PAGE NOT FOUND</p><h1>This path wandered off.</h1><p className={styles.description}>The page may have moved, or the address may be incomplete. Your client workspace is still right here.</p><div className={styles.actions}><Link to="/" className={styles.home}><FiHome/> Back to overview</Link><button onClick={()=>window.history.back()}><FiArrowLeft/> Go back</button><Link to="/accounts"><FiSearch/> Browse accounts</Link></div></div>}
