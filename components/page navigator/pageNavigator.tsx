import styles from "./pagenavigator.module.css";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const PageNavigator = ({ page, setPage }: Props) => {
  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className={styles.container}>
      <button onClick={handlePrev} disabled={page === 1}>
        <i className="bx bx-chevron-left" />
        Prev
      </button>

      <span>Page {page}</span>

      <button onClick={handleNext}>
        Next
        <i className="bx bx-chevron-right" />
      </button>
    </div>
  );
};

export default PageNavigator;
