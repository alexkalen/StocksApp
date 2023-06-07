import axios from "axios";
import { getCurrentDate } from "./date";

DUMMY_STOCKS = [
  {
    name: "Spotify",
    ticker: "SPOT",
    image: require("../assets/images/SPOT.png"),
  },
  {
    name: "Apple Inc",
    ticker: "AAPL",
    image: require("../assets/images/AAPL.png"),
  },
  {
    name: "Adobe Inc",
    ticker: "ADBE",
    image: require("../assets/images/ADBE.png"),
  },
  {
    name: "Lyft Inc",
    ticker: "LYFT",
    image: require("../assets/images/LYFT.png"),
  },
];

const date = getCurrentDate();
const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?adjusted=true&apiKey=zum8Kgf5Ce4UV8nFCmanqfkjNk7ZkViD`;

export async function getStocks() {
  const response = await axios.get(url);

  const data = response.data.results;

  let pickedStock = [];

  DUMMY_STOCKS.map((dummyStock) => {
    const stock = data.find((item) => item.T === dummyStock.ticker);

    pickedStock.push({
      ticker: stock.T,
      name: dummyStock.name,
      open: +stock.o,
      close: +stock.c,
      image: dummyStock.image,
    });
  });

  return pickedStock;
}

// const getAllStocks = async () => {
//   const response = await axios.get(url);
//   return response.data.results;
// };

// export const UseGetAll
