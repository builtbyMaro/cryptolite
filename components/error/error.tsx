import styles from "./error.module.css";

type Props = {
  error: (Error & { status?: number | undefined }) | null;
  action?: () => void;
  isCoolingDown?: boolean;
};

const ErrorComp = ({ error, action }: Props) => {
  let errorMsg = "Please check your connection.";
  if (error?.status) {
    console.error(`HTTP Error : ${error?.status}`);
    errorMsg = "Something went wrong, try again later";
  } else if (error?.message == "NO COINS") {
    errorMsg = "No coins available";
  }

  return (
    <div className={styles.container}>
      <p className={styles.message}>{errorMsg}</p>
      <button onClick={action} className={styles.action}>
        Retry
      </button>
    </div>
  );
};

export default ErrorComp;
