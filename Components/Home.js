import React, { useState, useCallback, memo, useEffect } from "react";

import { useQuery } from "react-query";
import { getStocks } from "../util/https";
import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import Button from "./Button";
import Performance from "./Performance";
import Stock from "./Stock";

function Home({ navigation }) {
  const [accountBalance, setAccount] = useState(840.5);
  const [refreshing, setRefreshing] = useState(false);
  const [totalStock, setTotalStock] = useState({});
  const { isLoading, data, refetch } = useQuery("watchlist", getStocks);

  //Prevents setting 'setTotalStock' unless data has changed.
  useEffect(() => {
    let setter = { open: 0, close: 0 };
    if (data && !isLoading) {
      data.map((item) => {
        setter.open = setter.open + item.open;
        setter.close = setter.close + item.close;
      });
      setter.open = setter.open.toFixed(2);
      setter.close = setter.close.toFixed(2);

      setTotalStock(setter);
    }
  }, [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  const depositHandler = () => {
    setAccount((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        {isLoading || !data ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>TOTAL INVESTING</Text>
            <Text style={styles.summaryTotal}></Text>
            <View style={styles.summaryPerformanceContainer}>
              <Performance open={0} close={0} />
              <Octicons
                name="question"
                size={13}
                color="#5e5b5b"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>TOTAL INVESTING</Text>
            <Text style={styles.summaryTotal}>{"$" + totalStock.close}</Text>
            <View style={styles.summaryPerformanceContainer}>
              <Performance open={totalStock.open} close={totalStock.close} />
              <Octicons
                name="question"
                size={13}
                color="#5e5b5b"
                style={{ marginLeft: 5 }}
              />
            </View>
          </View>
        )}
      </View>
      <View style={styles.account}>
        <View style={styles.accountContainer}>
          <View>
            <View style={styles.buyingPowerContainer}>
              <Text style={styles.accountTitle}>BUYING POWER</Text>
              <Octicons name="question" size={13} color="#5e5b5b" />
            </View>
            <Text style={styles.accountBalance}>{"$" + accountBalance}</Text>
          </View>
          <View style={styles.depositButton}>
            <Button onDeposit={depositHandler}>
              <Feather name="plus" size={18} color="white" />
              <Text style={styles.buttonText}>Deposit</Text>
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.watchlist}>
        <View style={styles.watchlistContainer}>
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
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
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
                      icon={stock.icon}
                      navigation={navigation}
                    ></Stock>
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View style={styles.loadingContainer}>
                  <Text style={styles.errorMessage}>
                    Please try again later...
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </View>
      <View style={styles.space}></View>
      <View style={styles.menu}>
        <View style={styles.menuContainer}>
          <View style={styles.iconContainer}>
            <Foundation name="home" size={32} color="#5e5b5b" />
            <Text style={styles.iconText}>Home</Text>
          </View>
          <View style={styles.iconContainer}>
            <AntDesign name="piechart" size={32} color="#5e5b5b" />
            <Text style={styles.iconText}>Markets</Text>
          </View>
          <View style={styles.middleIconContainer}>
            <Octicons name="arrow-switch" size={25} color="#5e5b5b" />
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={32}
              color="#5e5b5b"
            />
            <Text style={styles.iconText}>Portfolio</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialIcons name="more-horiz" size={32} color="#5e5b5b" />
            <Text style={styles.iconText}>More</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0d0d0e",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  //SUMMARY
  summary: {
    flex: 1.6,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 70,
  },
  summaryContainer: {
    flex: 1,
    borderBottomColor: "#1a191a",
    borderBottomWidth: 1,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#5e5b5b",
  },
  summaryTotal: {
    paddingTop: 8,
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  summaryPerformanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  //ACCOUNT
  account: {
    borderTopColor: "#302c2c",
    flex: 1.3,
    width: "100%",
    paddingHorizontal: 25,
  },
  accountContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buyingPowerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountTitle: {
    marginRight: 5,
    fontSize: 14,
    color: "#5e5b5b",
  },
  accountBalance: {
    paddingVertical: 5,
    fontSize: 20,
    color: "white",
  },
  depositButton: {
    width: 130,
    borderRadius: 20,
  },
  buttonText: {
    color: "#cccccc",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  //WATCHLIST
  watchlist: {
    backgroundColor: "#161616",
    flex: 5,
    width: "100%",
    paddingHorizontal: 25,
  },
  watchlistContainer: {
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
    fontSize: 14,
  },
  //SPACE
  space: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 12,
  },
  //MENU
  menu: {
    backgroundColor: "#161616",
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingBottom: 16,
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    marginTop: 4,
    color: "#5e5b5b",
  },
  middleIconContainer: {
    backgroundColor: "#1d1d1d",
    padding: 15,
    height: 52,
    borderRadius: 500,
    justifyContent: "center",
  },
});
