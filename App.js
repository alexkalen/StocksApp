import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import Summary from "./Components/Layout/Summary";
import Account from "./Components/Layout/Account";
import WatchList from "./Components/Layout/WatchList/WatchList";
import Menu from "./Components/Layout/Menu";

const queryClient = new QueryClient();

export default function App() {
  const [beeper, setBeeper] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.summaryContainer}>
          <Summary />
        </View>
        <View style={styles.accountContainer}>
          <Account />
        </View>
        <View style={styles.watchlistContainer}>
          <WatchList onWatchListRefresh={WatchListRefreshHandler} />
        </View>
        <View style={styles.spaceContainer}></View>
        <View style={styles.menuContainer}>
          <Menu />
        </View>
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  //SUMMARY
  summaryContainer: {
    flex: 1.6,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 70,
  },
  //ACCOUNT
  accountContainer: {
    borderTopColor: "#302c2c",
    flex: 1.3,
    width: "100%",
    paddingHorizontal: 25,
  },
  //WATCHLIST
  watchlistContainer: {
    backgroundColor: "#161616",
    flex: 5,
    width: "100%",
    paddingHorizontal: 25,
  },
  //SPACE
  spaceContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingTop: 12,
  },
  //MENU
  menuContainer: {
    backgroundColor: "#161616",
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingBottom: 16,
  },
});
