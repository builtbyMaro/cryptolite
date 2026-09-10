"use client";
import styles from "./page.module.css";
import { useBack } from "@/lib/hooks/useBack";
import { ErrorInfo } from "next/error";
import ErrorComp from "@/components/error/error";

const Error = ({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) => {
  const handleBack = useBack();

  return (
    <>
      <div className={`${styles.nav}`}>
        <div className={styles.backButton} onClick={handleBack}>
          <i className="bx bx-chevron-left" />
          <h5>Back</h5>
        </div>
      </div>
      <ErrorComp error={error} action={retry} />
    </>
  );
};

export default Error;
