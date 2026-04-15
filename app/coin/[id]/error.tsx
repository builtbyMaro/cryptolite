"use client";
import styles from "./page.module.css";
import { useBack } from "@/lib/hooks/useBack";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  const handleBack = useBack();
  return (
    <>
      <div className={`${styles.nav}`}>
        <div className={styles.backButton} onClick={handleBack}>
          <i className="bx bx-chevron-left" />
          <h5>Back</h5>
        </div>
      </div>
      <div className={styles.errorContainer}>
        <p className={styles.message}>
          Something went wrong loading this coin.
        </p>
        <button onClick={() => reset()} className={styles.action}>
          Retry
        </button>
      </div>
    </>
  );
};

export default Error;
