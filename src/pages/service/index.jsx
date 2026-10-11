import { useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiInbox,
  FiPlus,
  FiSearch,
  FiSliders,
  FiTrash2,
  FiEdit3,
} from "react-icons/fi";
import { date } from "../../utils/format.js";
import { requestStatuses } from "../../data/seed.js";
import styles from "./styles.module.css";

const Service = ({
  data,
  search,
  openForm,
  openDetail,
  confirmDelete,
  updateRecord,
  showToast,
}) => {
  const [query, setQuery] = useState(search);
  const [status, setStatus] = useState("All requests");
  const [priority, setPriority] = useState("All priorities");
  const rows = useMemo(
    () =>
      data.requests
        .filter(
          (item) =>
            `${item.id} ${item.account} ${item.subject} ${item.type} ${item.owner}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (status === "All requests" || item.status === status) &&
            (priority === "All priorities" || item.priority === priority),
        )
        .sort((a, b) => b.received.localeCompare(a.received)),
    [data.requests, query, status, priority],
  );
  const updateStatus = (item, next) => {
    updateRecord("request", item.id, { status: next });
    showToast(
      "Request status changed",
      `${item.id} is now ${next.toLowerCase()}.`,
    );
  };
  const counts = requestStatuses.map((stage) => ({
    stage,
    count: data.requests.filter((item) => item.status === stage).length,
  }));
  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <div>
          <p className={styles.breadcrumb}>BROKERAGE / CLIENT SERVICE</p>
          <h1>Service desk</h1>
          <p>Respond to client needs and keep every service item moving.</p>
        </div>
        <button className={styles.add} onClick={() => openForm("request")}>
          <FiPlus /> Log request
        </button>
      </div>
      <div className={styles.counts}>
        {counts.map(({ stage, count }, index) => (
          <button
            key={stage}
            onClick={() => setStatus(status === stage ? "All requests" : stage)}
            className={`${styles.count} ${status === stage ? styles.selected : ""}`}
          >
            <span className={`${styles.countIcon} ${styles[`tone${index}`]}`}>
              {index === 0 ? (
                <FiInbox />
              ) : index === 1 ? (
                <FiClock />
              ) : index === 2 ? (
                <FiSliders />
              ) : (
                <FiCheckCircle />
              )}
            </span>
            <span>
              <small>{stage}</small>
              <strong>{count}</strong>
            </span>
          </button>
        ))}
      </div>
      <section className={styles.board}>
        <div className={styles.boardHeader}>
          <div>
            <h2>Request queue</h2>
            <p>Requests are held in this browser session only.</p>
          </div>
          <span className={styles.live}>
            <i /> Live queue
          </span>
        </div>
        <div className={styles.filters}>
          <label className={styles.search}>
            <FiSearch />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by client, subject, or request ID"
              aria-label="Search service requests"
            />
          </label>
          <label className={styles.select}>
            <FiSliders />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>All requests</option>
              {requestStatuses.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className={styles.select}>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>All priorities</option>
              {["Normal", "High", "Urgent"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        {rows.length === 0 ? (
          <div className={styles.empty}>
            <FiInbox />
            <strong>No service requests found</strong>
            <span>Clear the filters or add a new request.</span>
            <button
              onClick={() => {
                setStatus("All requests");
                setPriority("All priorities");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.requestList}>
            {rows.map((item) => {
              const done = item.status === "Completed";
              return (
                <article
                  className={`${styles.request} ${done ? styles.completed : ""}`}
                  key={item.id}
                >
                  <div className={styles.requestId}>
                    <span
                      className={`${styles.priorityDot} ${styles[item.priority.toLowerCase()]}`}
                    />
                    <span>{item.id}</span>
                  </div>
                  <div className={styles.requestMain}>
                    <button
                      className={styles.subject}
                      onClick={() => openDetail("request", item)}
                    >
                      {item.subject}
                    </button>
                    <span className={styles.account}>{item.account}</span>
                    <div className={styles.tags}>
                      <span>{item.type}</span>
                      <span
                        className={`${styles.priority} ${styles[item.priority.toLowerCase()]}`}
                      >
                        {item.priority} priority
                      </span>
                    </div>
                  </div>
                  <div className={styles.owner}>
                    <span>Assigned to</span>
                    <strong>{item.owner}</strong>
                    <small>Received {date(item.received)}</small>
                  </div>
                  <div className={styles.requestStatus}>
                    <label>Status</label>
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item, e.target.value)}
                      aria-label={`Change status for ${item.id}`}
                    >
                      {requestStatuses.map((stage) => (
                        <option key={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.actions}>
                    <button
                      onClick={() => openDetail("request", item)}
                      aria-label={`View ${item.id}`}
                      title="View request"
                    >
                      <FiArrowUpRight />
                    </button>
                    <button
                      onClick={() => openForm("request", item)}
                      aria-label={`Edit ${item.id}`}
                      title="Edit request"
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      onClick={() => confirmDelete("request", item)}
                      aria-label={`Delete ${item.id}`}
                      title="Delete request"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <div className={styles.note}>
        <span>
          <FiCheckCircle /> Changes update the overview and queue right away.
        </span>
        <button onClick={() => openForm("request")}>
          <FiPlus /> Add another request
        </button>
      </div>
    </div>
  );
};

export default Service;
