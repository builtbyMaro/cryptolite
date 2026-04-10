import styles from "./error.module.css";

type Props = {
  message: string | React.ReactNode;
  actionText?: string;
  action?: () => void;
  isCoolingDown?: boolean;
};

const Error = ({ message, actionText, action, isCoolingDown }: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      {actionText && action && (
        <button
          onClick={action}
          className={styles.action}
          disabled={isCoolingDown}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Error;
