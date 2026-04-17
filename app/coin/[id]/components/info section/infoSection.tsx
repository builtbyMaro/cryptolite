import styles from "./info.module.css";

type Props = {
  links: {
    homepage: string[];
    twitter_screen_name: string | null;
    official_forum_url: string[];
  };
  coinName: string;
};

const InfoSection = ({ links, coinName }: Props) => {
  const website = links.homepage.find((url) => url);
  const twitterUrl = links.twitter_screen_name
    ? `https://twitter.com/${links.twitter_screen_name}`
    : `https://twitter.com/search?q=${encodeURIComponent(coinName)}`;

  const formatUrl = (url: string): string => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      return url;
    }
  };

  return (
    <section className={styles.information}>
      <div className={styles.informationCard}>
        <div className={styles.infoRow}>
          <h5 className={styles.infoItem}>Website:</h5>
          <div className={styles.infoValue}>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <i className="bx bx-globe" />
                {formatUrl(website)}
              </a>
            )}
          </div>
        </div>
        <div className={styles.infoRow}>
          <h5 className={styles.infoItem}>Official Forums:</h5>
          <div className={styles.infoValue}>
            {links.official_forum_url
              .filter((link) => link)
              .map((link) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <i className="bx bx-link" />
                  {formatUrl(link)}
                </a>
              ))}
          </div>
        </div>
        <div className={styles.infoRow}>
          <h5 className={styles.infoItem}>Search on:</h5>
          <div className={styles.infoValue}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={twitterUrl}
              className={styles.link}
            >
              <i className="bx bx-search" />
              twitter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
