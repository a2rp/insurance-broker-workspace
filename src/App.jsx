import { useCallback, useState } from "react";
import { BrowserRouter, useNavigate, useSearchParams } from "react-router-dom";
import Header from "./components/header/index.jsx";
import Sidebar from "./components/sidebar/index.jsx";
import Footer from "./components/footer/index.jsx";
import Dialog from "./components/dialog/index.jsx";
import Toast from "./components/toast/index.jsx";
import ScrollToTop from "./components/scrollToTop/index.jsx";
import AppRoutes from "./AppRoutes.jsx";
import styles from "./App.module.css";
import {
  seedData,
  brokers,
  policyStatuses,
  renewalStages,
  requestStatuses,
} from "./data/seed.js";
import { nextId } from "./utils/format.js";

const types = {
  account: {
    key: "accounts",
    prefix: "AC",
    label: "client account",
    fields: [
      { name: "name", label: "Business name", required: true },
      { name: "contact", label: "Primary contact", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone" },
      { name: "industry", label: "Industry", required: true },
      { name: "location", label: "Location", required: true },
      {
        name: "premium",
        label: "Annual premium ($)",
        type: "number",
        required: true,
      },
      {
        name: "renewalDate",
        label: "Next renewal",
        type: "date",
        required: true,
      },
      {
        name: "risk",
        label: "Risk profile",
        type: "select",
        options: ["Low", "Moderate", "High"],
        required: true,
      },
      { name: "notes", label: "Account notes", type: "textarea", wide: true },
    ],
  },
  policy: {
    key: "policies",
    prefix: "PL",
    label: "policy",
    fields: (data) => [
      {
        name: "account",
        label: "Client account",
        type: "select",
        options: data.accounts.map((item) => item.name),
        required: true,
      },
      { name: "type", label: "Coverage type", required: true },
      { name: "carrier", label: "Carrier", required: true },
      {
        name: "premium",
        label: "Annual premium ($)",
        type: "number",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: policyStatuses,
        required: true,
      },
      {
        name: "owner",
        label: "Account manager",
        type: "select",
        options: brokers,
        required: true,
      },
      {
        name: "effective",
        label: "Effective date",
        type: "date",
        required: true,
      },
      {
        name: "expires",
        label: "Expiration date",
        type: "date",
        required: true,
      },
      { name: "limit", label: "Coverage limit", required: true },
    ],
  },
  renewal: {
    key: "renewals",
    prefix: "RN",
    label: "renewal",
    fields: (data) => [
      {
        name: "account",
        label: "Client account",
        type: "select",
        options: data.accounts.map((item) => item.name),
        required: true,
      },
      {
        name: "policy",
        label: "Coverage type",
        type: "select",
        options: [...new Set(data.policies.map((item) => item.type))],
        required: true,
      },
      { name: "due", label: "Renewal date", type: "date", required: true },
      {
        name: "stage",
        label: "Renewal stage",
        type: "select",
        options: renewalStages,
        required: true,
      },
      {
        name: "owner",
        label: "Account manager",
        type: "select",
        options: brokers,
        required: true,
      },
      {
        name: "premium",
        label: "Current premium ($)",
        type: "number",
        required: true,
      },
    ],
  },
  request: {
    key: "requests",
    prefix: "SR",
    label: "service request",
    fields: (data) => [
      {
        name: "account",
        label: "Client account",
        type: "select",
        options: data.accounts.map((item) => item.name),
        required: true,
      },
      { name: "subject", label: "Request summary", required: true },
      {
        name: "type",
        label: "Request type",
        type: "select",
        options: [
          "Certificate of insurance",
          "Certificate / endorsement",
          "Policy change",
          "Document request",
          "Coverage question",
          "Claim assistance",
        ],
        required: true,
      },
      {
        name: "priority",
        label: "Priority",
        type: "select",
        options: ["Normal", "High", "Urgent"],
        required: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: requestStatuses,
        required: true,
      },
      {
        name: "owner",
        label: "Assigned to",
        type: "select",
        options: brokers,
        required: true,
      },
    ],
  },
};

const Workspace = () => {
  const [data, setData] = useState(seedData);
  const [dialog, setDialog] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const showToast = useCallback(
    (title, message = "", type = "success") =>
      setToast({ title, message, type }),
    [],
  );

  const openForm = (entity, record = null) => {
    const config = types[entity];
    const fields =
      typeof config.fields === "function" ? config.fields(data) : config.fields;
    const defaults =
      entity === "request"
        ? { priority: "Normal", status: "New", owner: brokers[0] }
        : entity === "renewal"
          ? { stage: "Preparation", owner: brokers[0] }
          : entity === "policy"
            ? { status: "Active", owner: brokers[0] }
            : {};
    setDialog({
      kind: "form",
      entity,
      record,
      title: `${record ? "Edit" : "New"} ${config.label}`,
      description: record
        ? "Update the record details below."
        : "Add the details to your brokerage workspace.",
      fields,
      initial: record || defaults,
      submitLabel: record ? "Save updates" : `Create ${config.label}`,
    });
  };
  const openDetail = (entity, record) => {
    const rows = Object.entries(record).filter(
      ([key]) =>
        !["id", "checklist", "completed", "accountId", "notes"].includes(key),
    );
    const content = (
      <>
        <div className={styles.detailGrid}>
          {rows.map(([key, value]) => (
            <div key={key}>
              <span>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (letter) => letter.toUpperCase())}
              </span>
              <strong>{String(value)}</strong>
            </div>
          ))}
        </div>
        {record.notes && (
          <div className={styles.detailNote}>
            <strong>Account notes</strong>
            <br />
            {record.notes}
          </div>
        )}
        {entity === "renewal" && (
          <div className={styles.detailNote}>
            Submission checklist: {record.completed.length} of{" "}
            {record.checklist.length} items complete.
          </div>
        )}
      </>
    );
    setDialog({
      kind: "detail",
      title:
        record.name ||
        record.subject ||
        `${entity[0].toUpperCase()}${entity.slice(1)} details`,
      description: `${entity[0].toUpperCase()}${entity.slice(1)} · ${record.id}`,
      content,
      actions: (
        <>
          <button
            className="dialogSecondary"
            onClick={() => openForm(entity, record)}
          >
            Edit record
          </button>
          <button className="dialogPrimary" onClick={() => setDialog(null)}>
            Done
          </button>
        </>
      ),
    });
  };
  const saveRecord = (values) => {
    const { entity, record } = dialog;
    const config = types[entity];
    const key = config.key;
    const next = { ...values };
    if (entity === "account") {
      next.premium = Number(values.premium);
      next.policies = record?.policies ?? 0;
    }
    if (
      entity === "policy" &&
      new Date(values.expires) <= new Date(values.effective)
    ) {
      showToast(
        "Check the policy dates",
        "Expiration must be later than the effective date.",
        "error",
      );
      return;
    }
    if (entity === "policy") {
      next.premium = Number(values.premium);
      next.accountId =
        data.accounts.find((account) => account.name === values.account)?.id ||
        "";
    }
    if (entity === "renewal") {
      next.premium = Number(values.premium);
      next.checklist = record?.checklist || [
        "Exposure data",
        "Loss runs",
        "Carrier submission",
      ];
      next.completed = record?.completed || [];
    }
    if (record) {
      setData((current) => ({
        ...current,
        [key]: current[key].map((item) =>
          item.id === record.id ? { ...item, ...next } : item,
        ),
      }));
      showToast(
        `${config.label[0].toUpperCase()}${config.label.slice(1)} updated`,
        `${record.id} has been updated.`,
      );
    } else {
      const created = { id: nextId(config.prefix, data[key]), ...next };
      if (entity === "request") created.received = "2026-10-11";
      setData((current) => ({ ...current, [key]: [created, ...current[key]] }));
      showToast(
        `${config.label[0].toUpperCase()}${config.label.slice(1)} created`,
        `${created.id} is now in your workspace.`,
      );
    }
    setDialog(null);
  };
  const confirmDelete = (entity, record) => {
    const config = types[entity];
    setDialog({
      kind: "confirm",
      title: `Delete ${config.label}?`,
      message: `This will permanently remove ${record.id} from this session. ${entity === "account" ? "Linked policies, renewals, and service requests for this account will also be removed. " : ""}This action cannot be undone.`,
      confirmLabel: "Delete record",
      onConfirm: () => {
        if (entity === "account")
          setData((current) => ({
            ...current,
            accounts: current.accounts.filter((item) => item.id !== record.id),
            policies: current.policies.filter(
              (item) => item.accountId !== record.id,
            ),
            renewals: current.renewals.filter(
              (item) => item.account !== record.name,
            ),
            requests: current.requests.filter(
              (item) => item.account !== record.name,
            ),
          }));
        else if (entity === "policy")
          setData((current) => ({
            ...current,
            policies: current.policies.filter((item) => item.id !== record.id),
            renewals: current.renewals.filter(
              (item) =>
                !(
                  item.account === record.account && item.policy === record.type
                ),
            ),
          }));
        else
          setData((current) => ({
            ...current,
            [config.key]: current[config.key].filter(
              (item) => item.id !== record.id,
            ),
          }));
        setDialog(null);
        showToast(
          `${config.label[0].toUpperCase()}${config.label.slice(1)} deleted`,
          `${record.id} has been removed.`,
        );
      },
    });
  };
  const updateRecord = (entity, id, changes) =>
    setData((current) => ({
      ...current,
      [types[entity].key]: current[types[entity].key].map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    }));
  const notifications = () =>
    setDialog({
      kind: "notice",
      title: "Renewal reminders",
      description: "Upcoming client work that may need attention.",
      content: (
        <div className={styles.reminderList}>
          {data.renewals
            .slice()
            .sort((a, b) => a.due.localeCompare(b.due))
            .slice(0, 4)
            .map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setDialog(null);
                  navigate("/renewals");
                }}
              >
                <strong>{item.account}</strong>
                <span>
                  {item.policy} · due {item.due}
                </span>
              </button>
            ))}
        </div>
      ),
    });
  const shared = {
    data,
    search: params.get("search") || "",
    openForm,
    openDetail,
    confirmDelete,
    updateRecord,
    showToast,
  };

  return (
    <div className={styles.appShell}>
      <Header onCreate={openForm} onNotify={notifications} />
      <main className={styles.workspaceMain} id="main-content">
        <Sidebar requests={data.requests} />
        <ScrollToTop />
        <AppRoutes {...shared} />
      </main>
      <Footer />
      <Dialog
        key={
          dialog
            ? `${dialog.kind}:${dialog.title}:${dialog.record?.id || "new"}`
            : "closed"
        }
        dialog={dialog}
        onClose={() => setDialog(null)}
        onSubmit={saveRecord}
      />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

const App = () => (
  <BrowserRouter basename="/insurance-broker-workspace">
    <Workspace />
  </BrowserRouter>
);
export default App;
