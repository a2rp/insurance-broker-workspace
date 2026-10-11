import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return <span className={styles.scrollToTop} aria-hidden="true" />;
};
export default ScrollToTop;
