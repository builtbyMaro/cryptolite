export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
};

export type CoinDetails = {
  id: string;
  name: string;
  symbol: string;

  image: {
    thumb: string;
    small: string;
    large: string;
  };

  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;

    market_cap: {
      usd: number;
    };

    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;

    high_24h: {
      usd: number;
    };

    low_24h: {
      usd: number;
    };
  };

  links: {
    homepage: string[];
    twitter_screen_name: string | null;
    official_forum_url: string[];
  };
};
