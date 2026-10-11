import { useMemo, useState } from "react";
import {
  FiDownload,
  FiPlus,
  FiSearch,
  FiMoreHorizontal,
  FiArrowUpRight,
  FiSliders,
  FiUsers,
  FiMapPin,
  FiFileText,
} from "react-icons/fi";
import { money, date, initials } from "../../utils/format.js";
import styles from "./styles.module.css";

const Accounts = ({ data, search, openForm, openDetail, confirmDelete, showToast }) => {
  const [query, setQuery] = useState(search);
  const [industry, setIndustry] = useState("All industries");
  const [sort, setSort] = useState("name");
  const industries = [
    "All industries",
    ...new Set(data.accounts.map((item) => item.industry)),
  ];
  const filtered = useMemo(
    () =>
      data.accounts
        .filter(
          (item) =>
            `${item.name} ${item.contact} ${item.email} ${item.location} ${item.id}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (industry === "All industries" || item.industry === industry),
        )
        .sort((a, b) =>
          sort === "premium"
            ? Number(a.premium) - Number(b.premium)
            : String(a[sort] || "").localeCompare(String(b[sort] || "")),
        ),
    [data.accounts, query, industry, sort],
  );
  const exportCsv = () => {
    const csv = [
      [
        "Account ID",
        "Business",
        "Contact",
        "Email",
        "Industry",
        "Location",
        "Annual premium",
        "Next renewal",
        "Risk",
      ],
      ...filtered.map((x) => [
        x.id,
        x.name,
        x.contact,
        x.email,
        x.industry,
        x.location,
        x.premium,
        x.renewalDate,
        x.risk,
      ]),
    ]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "aster-client-accounts.csv";
    link.click();
    URL.revokeObjectURL(link.href);
    showToast("Account export ready", `${filtered.length} client accounts downloaded as CSV.`);
  };
  const total = filtered.reduce(
    (sum, item) => sum + Number(item.premium || 0),
    0,
  );
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <div>
          <p className={styles.breadcrumb}>BROKERAGE / CLIENTS</p>
          <h1>Client accounts</h1>
          <p>Keep relationships, coverage, and renewal dates together.</p>
        </div>
        <button className={styles.add} onClick={() => openForm("account")}>
          <FiPlus /> Add account
        </button>
      </div>
      <div className={styles.summary}>
        <div>
          <span className={styles.summaryIcon}>
            <FiUsers />
          </span>
          <span>
            <small>Accounts in view</small>
            <strong>{filtered.length}</strong>
          </span>
        </div>
        <div>
          <span className={`${styles.summaryIcon} ${styles.alt}`}>
            <FiFileText />
          </span>
          <span>
            <small>Annual premium</small>
            <strong>{money(total)}</strong>
          </span>
        </div>
        <div className={styles.summaryNote}>
          Account teams keep all client records current for a smoother renewal
          season.
        </div>
      </div>
      <div className={styles.toolbar}>
        <label className={styles.search}>
          <FiSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find a client, contact, or ID"
            aria-label="Search accounts"
          />
        </label>
        <label className={styles.filter}>
          <FiSliders />
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            aria-label="Filter industry"
          >
            {industries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className={styles.sort}>
          Sort by{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Business name</option>
            <option value="premium">Premium</option>
            <option value="renewalDate">Renewal date</option>
          </select>
        </label>
        <button className={styles.export} onClick={exportCsv}>
          <FiDownload /> Export
        </button>
      </div>
      <section className={styles.list}>
        <div className={styles.listHead}>
          <h2>
            Account book <span>{filtered.length}</span>
          </h2>
          <p>Updated for the current renewal cycle</p>
        </div>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <FiUsers />
            <strong>No accounts match those filters</strong>
            <span>Try a different client name or industry.</span>
            <button
              onClick={() => {
                setQuery("");
                setIndustry("All industries");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.rows}>
            <div className={styles.columnHead}>
              <span>BUSINESS</span>
              <span>INDUSTRY / LOCATION</span>
              <span>ANNUAL PREMIUM</span>
              <span>NEXT RENEWAL</span>
              <span>RISK</span>
              <span />
            </div>
            {filtered.map((item) => (
              <article className={styles.row} key={item.id}>
                <button
                  className={styles.account}
                  onClick={() => openDetail("account", item)}
                >
                  <span className={styles.avatar}>{initials(item.name)}</span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>
                      {item.contact} · {item.id}
                    </small>
                  </span>
                </button>
                <div className={styles.industry}>
                  {item.industry}
                  <small>
                    <FiMapPin />
                    {item.location}
                  </small>
                </div>
                <strong className={styles.premium}>
                  {money(item.premium)}
                </strong>
                <span className={styles.renewal}>{date(item.renewalDate)}</span>
                <span
                  className={`${styles.risk} ${styles[item.risk.toLowerCase()]}`}
                >
                  {item.risk}
                </span>
                <div className={styles.rowActions}>
                  <button
                    onClick={() => openDetail("account", item)}
                    aria-label={`View ${item.name}`}
                    title="View details"
                  >
                    <FiArrowUpRight />
                  </button>
                  <button
                    onClick={() => openForm("account", item)}
                    aria-label={`Edit ${item.name}`}
                    title="Edit account"
                  >
                    <FiMoreHorizontal />
                  </button>
                  <button
                    onClick={() => confirmDelete("account", item)}
                    aria-label={`Delete ${item.name}`}
                    title="Delete account"
                  >
                    ×
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      <p className={styles.footnote}>
        Client and premium figures are sample workspace data.
      </p>
    </div>
  );
};

export default Accounts;
