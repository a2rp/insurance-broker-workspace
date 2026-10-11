import { useMemo, useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiFileText,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { date, money, today } from "../../utils/format.js";
import { renewalStages } from "../../data/seed.js";
import styles from "./styles.module.css";

const Renewals = ({ data, openForm, openDetail, updateRecord, showToast }) => {
  const [filter, setFilter] = useState("All renewals");
  const [query, setQuery] = useState("");
  const days = (value) =>
    Math.ceil(
      (new Date(`${value}T12:00:00`) - new Date(`${today}T12:00:00`)) /
        86400000,
    );
  const rows = useMemo(
    () =>
      data.renewals
        .filter(
          (item) =>
            `${item.account} ${item.policy} ${item.owner} ${item.id}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (filter === "All renewals" ||
              (filter === "Due in 30 days" &&
                days(item.due) <= 30 &&
                days(item.due) >= 0) ||
              (filter === "Needs information" &&
                item.stage === "Information needed") ||
              (filter === "Ready to bind" &&
                item.completed.length === item.checklist.length)),
        )
        .sort((a, b) => a.due.localeCompare(b.due)),
    [data.renewals, query, filter],
  );
  const toggle = (item, task) => {
    const completed = item.completed.includes(task)
      ? item.completed.filter((x) => x !== task)
      : [...item.completed, task];
    updateRecord("renewal", item.id, { completed });
    showToast(
      "Submission checklist updated",
      `${completed.length} of ${item.checklist.length} items complete.`,
    );
  };
  const changeStage = (item, next) => {
    if (next === "Bound" && item.completed.length !== item.checklist.length) {
      showToast(
        "Checklist still open",
        "Complete all placement items before marking this renewal bound.",
        "info",
      );
      return;
    }
    updateRecord("renewal", item.id, { stage: next });
    showToast(
      "Renewal stage updated",
      `${item.account} moved to ${next.toLowerCase()}.`,
    );
  };
  const missing = rows.filter(
    (item) => item.stage === "Information needed",
  ).length;
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <div>
          <p className={styles.breadcrumb}>BROKERAGE / RENEWAL CYCLE</p>
          <h1>Renewal schedule</h1>
          <p>
            Keep the next term moving with clear owners and ready-to-market
            details.
          </p>
        </div>
        <button className={styles.add} onClick={() => openForm("renewal")}>
          <FiPlus /> Add renewal
        </button>
      </div>
      <section className={styles.calendar}>
        <div className={styles.calendarIntro}>
          <div className={styles.calendarIcon}>
            <FiCalendar />
          </div>
          <div>
            <span>RENEWAL WINDOW</span>
            <strong>October - December 2026</strong>
          </div>
          <div className={styles.monthDots}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className={styles.calendarNote}>
            {data.renewals.length} active placements
          </span>
        </div>
        <div className={styles.months}>
          {["OCT", "NOV", "DEC", "JAN"].map((month, i) => (
            <div
              className={`${styles.month} ${i === 0 ? styles.thisMonth : ""}`}
              key={month}
            >
              <span>{month}</span>
              <i style={{ height: `${[42, 68, 52, 30][i]}%` }} />
            </div>
          ))}
        </div>
      </section>
      <div className={styles.overview}>
        <div>
          <small>Within 30 days</small>
          <strong>
            {
              data.renewals.filter(
                (item) => days(item.due) <= 30 && days(item.due) >= 0,
              ).length
            }
          </strong>
          <span>Renewal dates approaching</span>
        </div>
        <div>
          <small>Waiting on information</small>
          <strong>{missing}</strong>
          <span>Client follow-up needed</span>
        </div>
        <div>
          <small>Ready for binding</small>
          <strong>
            {
              data.renewals.filter(
                (item) => item.completed.length === item.checklist.length,
              ).length
            }
          </strong>
          <span>Placement checklist complete</span>
        </div>
        <button
          onClick={() =>
            setFilter(
              filter === "Needs information"
                ? "All renewals"
                : "Needs information",
            )
          }
        >
          Review information gaps <FiArrowRight />
        </button>
      </div>
      <div className={styles.controlRow}>
        <label className={styles.search}>
          <FiSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search renewals or clients"
          />
        </label>
        <div className={styles.filters}>
          {[
            "All renewals",
            "Due in 30 days",
            "Needs information",
            "Ready to bind",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? styles.selected : ""}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.renewalList}>
        {rows.length === 0 ? (
          <div className={styles.empty}>
            <FiCalendar />
            <strong>No renewals match this view</strong>
            <span>Try another filter or add a renewal.</span>
          </div>
        ) : (
          rows.map((item) => {
            const remaining = days(item.due);
            const percent = Math.round(
              (item.completed.length / item.checklist.length) * 100,
            );
            return (
              <article className={styles.renewal} key={item.id}>
                <div className={styles.dateRail}>
                  <span className={styles.day}>
                    {new Date(`${item.due}T12:00:00`).getDate()}
                  </span>
                  <span>
                    {new Date(`${item.due}T12:00:00`).toLocaleDateString(
                      "en-US",
                      { month: "short" },
                    )}
                  </span>
                  <i />
                </div>
                <div className={styles.main}>
                  <div className={styles.cardHead}>
                    <div>
                      <button
                        className={styles.account}
                        onClick={() => openDetail("renewal", item)}
                      >
                        {item.account}
                      </button>
                      <span className={styles.policy}>
                        <FiFileText />
                        {item.policy} · {item.id}
                      </span>
                    </div>
                    <span
                      className={`${styles.days} ${remaining <= 14 ? styles.urgent : ""}`}
                    >
                      <FiClock />
                      {remaining < 0
                        ? `${Math.abs(remaining)} days overdue`
                        : remaining === 0
                          ? "Due today"
                          : `${remaining} days left`}
                    </span>
                  </div>
                  <div className={styles.meta}>
                    <span>
                      Renewal date <strong>{date(item.due)}</strong>
                    </span>
                    <span>
                      Owner <strong>{item.owner}</strong>
                    </span>
                    <span>
                      Current premium <strong>{money(item.premium)}</strong>
                    </span>
                  </div>
                  <div className={styles.stageLine}>
                    <label>
                      Stage{" "}
                      <select
                        value={item.stage}
                        onChange={(e) => changeStage(item, e.target.value)}
                      >
                        {renewalStages.map((stage) => (
                          <option key={stage}>{stage}</option>
                        ))}
                      </select>
                    </label>
                    <div className={styles.progressText}>
                      {percent}% ready{" "}
                      <span>
                        {item.completed.length}/{item.checklist.length}
                      </span>
                    </div>
                  </div>
                  <div className={styles.progress}>
                    <i style={{ width: `${percent}%` }} />
                  </div>
                  <div className={styles.checklist}>
                    {item.checklist.map((task) => (
                      <button
                        key={task}
                        className={
                          item.completed.includes(task) ? styles.done : ""
                        }
                        onClick={() => toggle(item, task)}
                      >
                        <span>
                          {item.completed.includes(task) && <FiCheck />}
                        </span>
                        {task}
                      </button>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    <button onClick={() => openDetail("renewal", item)}>
                      View renewal <FiArrowRight />
                    </button>
                    <button onClick={() => openForm("renewal", item)}>
                      Edit details
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
      <p className={styles.footnote}>
        Checklist progress is held in memory during this session. Refreshing
        resets sample edits.
      </p>
    </div>
  );
};

export default Renewals;
