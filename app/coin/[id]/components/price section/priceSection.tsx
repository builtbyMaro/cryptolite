import styles from "./price.module.css";
import { getPercentageMeta } from "@/lib/utils/percentageMeta";

type Props = {
  image: string;
  name: string;
  symbol: string;
  price: number;
  percentage: number;
};

const PriceSection = ({ image, name, symbol, price, percentage }: Props) => {
  const percentageMeta = getPercentageMeta(percentage);

  return (
    <section className={styles.priceSection}>
      <div className={styles.priceContainer}>
        <div className={styles.coin}>
          <img src={image} alt={name} width={30} height={30} />
          <h4 className={styles.name}>{name}</h4>
          <h4 className={styles.symbol}>{symbol.toUpperCase()}</h4>
        </div>
        <div className={styles.price}>
          <h3>
            {price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h3>
          <div className={styles.percentageContainer}>
            <p className={styles[percentageMeta.class]}>
              <i className={percentageMeta.icon} />
              {percentage?.toFixed(2)}% (24h)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
