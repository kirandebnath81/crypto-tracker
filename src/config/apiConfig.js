export const CoinList = (currency) =>
  `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1 &sparkline=false`;

export const SingleCoin = (id) => `/coins/${id}`;

export const HistoricalChart = (id, currency, days = 365) =>
  `/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const PopularCoins = (currency) =>
  `/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
