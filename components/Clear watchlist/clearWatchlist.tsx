import styles from "./clearwatchlist.module.css";
import { useAppContext } from "@/lib/context/appContext";

type Props = {
  setShowClear: React.Dispatch<React.SetStateAction<boolean>>;
};

const ClearWatchlist = ({ setShowClear }: Props) => {
  const { clearWatchlist } = useAppContext();
  const clearList = () => {
    clearWatchlist();
    setShowClear(false);
  };

  return (
    <div className={styles.container} onClick={() => setShowClear(false)}>
      <div className={styles.card}>
        <p>Do you want to clear your watchlist?</p>
        <span>
          <button className={styles.clearBtn} onClick={clearList}>
            Yes
          </button>
          <button
            className={styles.closeBtn}
            onClick={() => setShowClear(false)}
          >
            No
          </button>
        </span>
      </div>
    </div>
  );
};

export default ClearWatchlist;
