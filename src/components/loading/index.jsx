import styles from "./styles.module.css";
const Loading = () => (
  <div className={styles.loader} role="status" aria-label="Loading">
    <span />
  </div>
);
export default Loading;
