import { StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { getStocks } from "../util/https";
import { SvgUri } from "react-native-svg";

let formatUS = new Intl.NumberFormat("en-US");

function StockDetails({ route, navigation }) {
  const { ticker } = route.params;
  const { data } = useQuery("watchlist", getStocks);

  const current_stock = data.find((element) => element.ticker === ticker);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
        <Text style={{ color: "white" }}>STOCK DETAILS</Text>
        <Ionicons name="arrow-back-outline" size={24} color="#161616" />
      </View>
      <View style={styles.stockContainer}>
        <View style={styles.stockIDContainer}>
          <View style={styles.stockNameContainer}>
            <Text style={styles.stockName}>{current_stock.name}</Text>
            {current_stock.type && (
              <Text style={styles.stockTicker}>{current_stock.type}</Text>
            )}
          </View>
          <SvgUri
            width="50%"
            height="50%"
            uri={
              current_stock.logo +
              "?" +
              "apiKey=zum8Kgf5Ce4UV8nFCmanqfkjNk7ZkViD"
            }
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{current_stock.description}</Text>
        <View style={styles.stockInfoContainer}>
          <Text style={styles.stockInfo}>
            {"Total Outstanding Shares: " +
              formatUS.format(current_stock.outstanding_shares)}
          </Text>
          <Text style={styles.stockInfo}>
            {"Employees: " + formatUS.format(current_stock.total_employees)}
          </Text>
          <Text style={styles.stockInfo}>
            {"Market Cap: " + formatUS.format(current_stock.market_cap)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default StockDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0d0d0e",
    flex: 1,
    paddingTop: 50,
  },
  headerContainer: {
    flex: 0.5,
    backgroundColor: "#161616",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  stockContainer: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  stockIDContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
  },
  stockName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  stockTicker: {
    color: "#cccccc",
    fontSize: 12,
    paddingVertical: 10,
  },
  descriptionContainer: {
    flex: 10,
    backgroundColor: "#161616",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  description: {
    color: "white",
    fontSize: 14,
    textAlign: "justify",
  },
  stockInfo: {
    color: "#5e5b5b",
  },
  stockInfoContainer: {
    paddingTop: 20,
    borderTopColor: "#0d0d0e",
    borderTopWidth: 1,
    marginVertical: 20,
  },
  stockNameContainer: {
    flex: 3,
  },
});
