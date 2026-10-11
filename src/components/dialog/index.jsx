import { useEffect, useState } from "react";
import { FiAlertTriangle, FiCheck, FiX, FiInfo } from "react-icons/fi";
import styles from "./styles.module.css";

const Dialog = ({ dialog, onClose, onSubmit }) => {
  const [values, setValues] = useState(dialog?.initial || {});
  const [error, setError] = useState("");
  useEffect(() => {
    if (!dialog) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dialog, onClose]);
  if (!dialog) return null;
  const isConfirm = dialog.kind === "confirm";
  const isDetail = dialog.kind === "detail" || dialog.kind === "notice";
  const update = (name, value) =>
    setValues((current) => ({ ...current, [name]: value }));
  const submit = (event) => {
    event.preventDefault();
    const required = dialog.fields?.find(
      (field) => field.required && !String(values[field.name] ?? "").trim(),
    );
    if (required) {
      setError(`${required.label} is required.`);
      return;
    }
    const invalidEmail = dialog.fields?.find(
      (field) =>
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field.name] || ""),
    );
    if (invalidEmail) {
      setError(`Enter a valid ${invalidEmail.label.toLowerCase()}.`);
      return;
    }
    const invalidNumber = dialog.fields?.find(
      (field) => field.type === "number" && Number(values[field.name]) < 0,
    );
    if (invalidNumber) {
      setError(`${invalidNumber.label} cannot be negative.`);
      return;
    }
    onSubmit(values);
  };
  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className={styles.heading}>
          <div
            className={`${styles.symbol} ${isConfirm ? styles.warning : ""}`}
          >
            {isConfirm ? (
              <FiAlertTriangle />
            ) : isDetail ? (
              <FiInfo />
            ) : (
              <FiCheck />
            )}
          </div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <FiX />
          </button>
          <h2 id="dialog-title">{dialog.title}</h2>
          {dialog.description && <p>{dialog.description}</p>}
        </div>
        {isConfirm ? (
          <div className={styles.confirm}>
            <p>{dialog.message}</p>
            <div className={styles.actions}>
              <button className={styles.secondary} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.danger} onClick={dialog.onConfirm}>
                {dialog.confirmLabel || "Delete"}
              </button>
            </div>
          </div>
        ) : isDetail ? (
          <div className={styles.detail}>
            {dialog.content}
            {dialog.actions && (
              <div className={styles.actions}>{dialog.actions}</div>
            )}
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
            <div className={styles.fields}>
              {dialog.fields?.map((field) => (
                <label
                  key={field.name}
                  className={field.wide ? styles.wide : ""}
                >
                  {field.label}
                  {field.type === "select" ? (
                    <select
                      required={field.required}
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        update(field.name, event.target.value)
                      }
                    >
                      <option value="">
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      required={field.required}
                      rows="3"
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        update(field.name, event.target.value)
                      }
                      placeholder={field.placeholder || ""}
                    />
                  ) : (
                    <input
                      required={field.required}
                      type={field.type || "text"}
                      min={field.type === "number" ? 0 : undefined}
                      value={values[field.name] ?? ""}
                      onChange={(event) =>
                        update(field.name, event.target.value)
                      }
                      placeholder={field.placeholder || ""}
                    />
                  )}
                </label>
              ))}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondary}
                onClick={onClose}
              >
                Cancel
              </button>
              <button className={styles.primary} type="submit">
                {dialog.submitLabel || "Save changes"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default Dialog;
