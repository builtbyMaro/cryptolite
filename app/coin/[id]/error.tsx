"use client";
import styles from "./page.module.css";
import { useBack } from "@/lib/hooks/useBack";
import { ErrorInfo } from "next/error";
import ErrorComp from "@/components/error/error";

const Error = ({ error, unstable_retry }: ErrorInfo) => {
  const handleBack = useBack();

  return (
    <>
      <div className={`${styles.nav}`}>
        <div className={styles.backButton} onClick={handleBack}>
          <i className="bx bx-chevron-left" />
          <h5>Back</h5>
        </div>
      </div>
      <ErrorComp error={error} action={unstable_retry} />
    </>
  );
};

export default Error;
