import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiFileText,
  FiGithub,
  FiGrid,
  FiInbox,
  FiMenu,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import styles from "./styles.module.css";

const nav = [
  { to: "/", label: "Overview", Icon: FiGrid },
  { to: "/accounts", label: "Accounts", Icon: FiUsers },
  { to: "/policies", label: "Policies", Icon: FiFileText },
  { to: "/renewals", label: "Renewals", Icon: FiRefreshCw },
  { to: "/service", label: "Service desk", Icon: FiInbox },
];
const Header = ({ onCreate, onNotify }) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const input = [
          ...document.querySelectorAll(
            'input[aria-label="Search accounts or contacts"]',
          ),
        ].find((item) => item.getClientRects().length);
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);
  const submit = (event) => {
    event.preventDefault();
    navigate(`/accounts?search=${encodeURIComponent(query)}`);
    setMenuOpen(false);
  };
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Aster overview">
        <span className={styles.mark}>
          <FiShield />
        </span>
        <span>
          aster<span className={styles.dot}>.</span>
          <small>insurance, in good hands</small>
        </span>
      </Link>
      <form className={styles.search} onSubmit={submit}>
        <FiSearch />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search accounts or contacts"
          aria-label="Search accounts or contacts"
        />
        <kbd>Ctrl K</kbd>
      </form>
      <div className={styles.actions}>
        <button
          className={styles.iconButton}
          onClick={onNotify}
          aria-label="Notifications"
          data-tooltip-id="header-tip"
          data-tooltip-content="Renewal reminders"
        >
          <FiBell />
          <i />
        </button>
        <a
          className={styles.repo}
          href="https://github.com/a2rp/insurance-broker-workspace"
          target="_blank"
          rel="noreferrer"
        >
          <FiGithub />
          <span>Repository</span>
        </a>
        <button className={styles.create} onClick={() => onCreate("request")}>
          <FiPlus /> New request
        </button>
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <Tooltip id="header-tip" className={styles.tooltip} />
      {menuOpen && (
        <div className={styles.mobileSearch}>
          <form onSubmit={submit}>
            <FiSearch />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search accounts or contacts"
              aria-label="Search accounts or contacts"
            />
            <button aria-label="Search">
              <FiSearch />
            </button>
          </form>
          <nav>
            {nav.map(({ to, label, Icon }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
                <Icon />
                {label}
              </Link>
            ))}
          </nav>
          <button
            className={styles.mobileNotify}
            onClick={() => {
              setMenuOpen(false);
              onNotify();
            }}
          >
            <FiBell />
            Renewal reminders
          </button>
          <a
            className={styles.mobileRepo}
            href="https://github.com/a2rp/insurance-broker-workspace"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
            Repository
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
