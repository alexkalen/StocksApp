import { useState, useEffect } from "react";

import { useQuery } from "react-query";
import { getStocks } from "../../util/https";
import { StyleSheet, View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

import Performance from "../Performance";

function Summary() {
  const [totalStock, setTotalStock] = useState({});
  const { isLoading, data } = useQuery("watchlist", getStocks);

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

  if (isLoading || !data) {
    return (
      <View style={styles.container}>
        <Text style={styles.summaryTitle}>TOTAL INVESTING</Text>
        <Text style={styles.summaryTotal}></Text>
        <View style={styles.performanceContainer}>
          <Performance open={0} close={0} />
          <Octicons
            name="question"
            size={13}
            color="#5e5b5b"
            style={{ marginLeft: 5 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.summaryTitle}>TOTAL INVESTING</Text>
      <Text style={styles.summaryTotal}>{"$" + totalStock.close}</Text>
      <View style={styles.performanceContainer}>
        <Performance open={totalStock.open} close={totalStock.close} />
        <Octicons
          name="question"
          size={13}
          color="#5e5b5b"
          style={{ marginLeft: 5 }}
        />
      </View>
    </View>
  );
}

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "#1a191a",
    borderBottomWidth: 1,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#5e5b5b",
  },
  summaryTotal: {
    paddingVertical: 8,
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  performanceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
