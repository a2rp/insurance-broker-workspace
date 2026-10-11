import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiRefreshCw,
  FiInbox,
  FiLifeBuoy,
} from "react-icons/fi";
import styles from "./styles.module.css";

const links = [
  { to: "/", label: "Overview", icon: FiGrid, end: true },
  { to: "/accounts", label: "Accounts", icon: FiUsers },
  { to: "/policies", label: "Policies", icon: FiFileText },
  { to: "/renewals", label: "Renewals", icon: FiRefreshCw },
  { to: "/service", label: "Service desk", icon: FiInbox },
];

const Sidebar = ({ requests }) => (
  <aside className={styles.sidebar}>
    <div className={styles.groupLabel}>BROKERAGE</div>
    <nav>
      {links.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <Icon />
          <span>{label}</span>
          {label === "Service desk" && (
            <b>
              {requests.filter((item) => item.status !== "Completed").length}
            </b>
          )}
        </NavLink>
      ))}
    </nav>
    <div className={styles.bottom}>
      <div className={styles.helpIcon}>
        <FiLifeBuoy />
      </div>
      <div>
        <strong>Broker support</strong>
        <span>Workspace guide</span>
      </div>
      <span className={styles.online} />
    </div>
  </aside>
);

export default Sidebar;
