import React, { useState, useCallback, memo } from "react";
import { getStocks } from "../../../util/https";
import { useQuery } from "react-query";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import Stock from "./Stock";

function WatchList() {
  const { isLoading, data, refetch } = useQuery("watchlist", getStocks);
  const [refreshing, setRefreshing] = useState(false);

  //Pull Down to Refresh function (can only used every minute or so becasue of API restrictions)
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.watchListHeader}>
        <Text style={styles.watchListTitle}>Watchlist</Text>
      </View>
      <View style={styles.stockList}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
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
            <View style={styles.loadingContainer}>
              <Text tyle={styles.errorMessage}>Please try again later...</Text>
            </View>
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
    alignItems: "center",
  },
  stockList: {
    flex: 4,
  },
  watchListTitle: {
    fontSize: 26,
    color: "white",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "white",
    fontSize: 40,
  },
});
