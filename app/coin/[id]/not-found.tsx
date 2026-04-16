"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.errorContainer}>
      <p className={styles.message}>Sorry, this page does not exist</p>
      <button onClick={() => router.push("/")} className={styles.action}>
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
