import { useId } from "react";
import { Info } from "lucide-react";
import styles from "./InfoTooltip.module.css";

export default function InfoTooltip({ label, children }) {
  const tooltipId = useId();

  return (
    <span className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        aria-label={label}
        aria-describedby={tooltipId}
      >
        <Info size={15} aria-hidden="true" />
      </button>

      <span
        id={tooltipId}
        role="tooltip"
        className={styles.tooltip}
      >
        {children}
      </span>
    </span>
  );
}