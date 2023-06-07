import React, { useState, useCallback, memo } from "react";
import { getStocks } from "../../../util/https";
import { useQuery } from "react-query";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";

import Stock from "./Stock";

function WatchList() {
  const { isLoading, data, refetch } = useQuery("watchlist", getStocks);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.watchListHeader}>
        <Text style={styles.watchListTitle}>Watchlist</Text>
        <View>
          <Text style={styles.watchListAll}>All</Text>
        </View>
      </View>
      <View style={styles.stockList}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : data ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {data.map((stock) => {
              return (
                <Stock
                  key={stock.ticker}
                  ticker={stock.ticker}
                  open={stock.open}
                  close={stock.close}
                  name={stock.name}
                  image={stock.image}
                ></Stock>
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text>A problem occured</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}

export default memo(WatchList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watchListHeader: {
    flex: 1,
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockList: {
    justifyContent: "center",
    flex: 4,
  },
  watchListTitle: {
    fontSize: 26,
    color: "white",
  },
  watchListAll: {
    color: "#5e5b5b",
    fontSize: 18,
  },
});
