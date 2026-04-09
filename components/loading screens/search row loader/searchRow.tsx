import styles from "./searchrow.module.css";

const SearchRowLoader = () => {
  return (
    <div className={styles.rowContainer}>
      <div className={styles.iconContainer}></div>
      <div className={styles.nameContainer}></div>
      <div className={styles.dayContainer}></div>
    </div>
  );
};

export default SearchRowLoader;
