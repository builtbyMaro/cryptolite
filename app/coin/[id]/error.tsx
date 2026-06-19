"use client";
import styles from "./page.module.css";
import { useBack } from "@/lib/hooks/useBack";

type Props = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

const Error = ({ error, unstable_retry }: Props) => {
  const handleBack = useBack();
  let message = "Something went wrong loading this coin.";

  switch (error.message) {
    case "RATE_LIMIT":
      message = "Too many requests. Please wait a moment and try again.";
      break;

    case "SERVER_ERROR":
      message = "Server error. Please try again later.";
      break;

    case "NETWORK_ERROR":
      message = "Please check your connection and try again.";
      break;
  }

  return (
    <>
      <div className={`${styles.nav}`}>
        <div className={styles.backButton} onClick={handleBack}>
          <i className="bx bx-chevron-left" />
          <h5>Back</h5>
        </div>
      </div>
      <div className={styles.errorContainer}>
        <p className={styles.message}>{message}</p>
        <button onClick={() => unstable_retry()} className={styles.action}>
          Retry
        </button>
      </div>
    </>
  );
};

export default Error;
