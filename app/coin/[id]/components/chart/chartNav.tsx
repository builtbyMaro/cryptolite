"use client";
import styles from "./chart.module.css";

type Prop = {
  timeFrame: string;
  setTimeFrame: React.Dispatch<React.SetStateAction<"1" | "7" | "30">>;
};

const ChartNav = ({ timeFrame, setTimeFrame }: Prop) => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.timeFrame}>
        <h4
          className={
            timeFrame === "1"
              ? `${styles.time} ${styles.timeActive}`
              : styles.time
          }
          onClick={() => setTimeFrame("1")}
        >
          24HR
        </h4>
        <h4
          className={
            timeFrame === "7"
              ? `${styles.time} ${styles.timeActive}`
              : styles.time
          }
          onClick={() => setTimeFrame("7")}
        >
          7D
        </h4>
        <h4
          className={
            timeFrame === "30"
              ? `${styles.time} ${styles.timeActive}`
              : styles.time
          }
          onClick={() => setTimeFrame("30")}
        >
          30D
        </h4>
      </div>
    </div>
  );
};

export default ChartNav;
