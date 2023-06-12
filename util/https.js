import axios from "axios";
import { getCurrentDate } from "./getCurrentDate";

DUMMY_STOCKS2 = ["SPOT", "TSLA", "ADBE", "LYFT"];

const date = getCurrentDate();

export async function getStocks() {
  let stock_list = [];

  await Promise.all(
    DUMMY_STOCKS2.map((item) => {
      return axios
        .get(
          `https://api.polygon.io/v3/reference/tickers/${item}?date=${date}&apiKey=zum8Kgf5Ce4UV8nFCmanqfkjNk7ZkViD`
        )
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    })
  ).then((values) => {
    for (let i = 0; i < values.length; i++) {
      let stock = {
        ticker: values[i].data.results.ticker,
        name: values[i].data.results.name,
        address: values[i].data.results.address,
        description: values[i].data.results.description,
        type: values[i].data.results.sic_description,
        logo: values[i].data.results.branding.logo_url,
        icon: values[i].data.results.branding.icon_url,
        market_cap: values[i].data.results.market_cap,
        total_employees: values[i].data.results.total_employees,
        outstanding_shares: values[i].data.results.weighted_shares_outstanding,
        open: 0,
        close: 0,
      };

      stock_list.push(stock);
    }
  });

  await Promise.all(
    DUMMY_STOCKS2.map((item) => {
      return axios
        .get(
          `https://api.polygon.io/v1/open-close/${item}/${date}?adjusted=true&apiKey=zum8Kgf5Ce4UV8nFCmanqfkjNk7ZkViD`
        )
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    })
  ).then((values) => {
    for (let i = 0; i < stock_list.length; i++) {
      const foundStock = values.find(
        (item) => item.data.symbol === stock_list[i].ticker
      );

      stock_list[i].open = foundStock.data.open;
      stock_list[i].close = foundStock.data.close;
    }
  });

  return stock_list;
}
