import { StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

function Performance(props) {
  const stockPerformance = { dolarAmount: 0, percentageAmount: 0 };

  const calculatePerformance = (cVal, oVal) => {
    if (cVal === 0 || oVal === 0) {
      stockPerformance.dolarAmount = 0;
      stockPerformance.percentageAmount = 0;

      return stockPerformance;
    }
    stockPerformance.dolarAmount = cVal - oVal;
    stockPerformance.percentageAmount =
      (Math.abs(stockPerformance.dolarAmount) / cVal) * 100;

    return stockPerformance;
  };

  calculatePerformance(props.close, props.open);

  if (stockPerformance.dolarAmount >= 0) {
    return (
      <View style={styles.container}>
        <MaterialIcons
          style={{ marginRight: 3 }}
          name="trending-up"
          size={16}
          color="green"
        />
        <Text style={{ color: "green", paddingRight: 6, fontSize: 15 }}>
          {"+$" + stockPerformance.dolarAmount.toFixed(2)}
        </Text>
        <Text style={{ color: "green", fontSize: 15 }}>
          {"(" + stockPerformance.percentageAmount.toFixed(2) + "%)"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MaterialIcons
        style={{ marginRight: 3 }}
        name="trending-down"
        size={16}
        color="#911616"
      />
      <Text style={{ color: "#911616", paddingRight: 6, fontSize: 15 }}>
        {"-$" + Math.abs(stockPerformance.dolarAmount.toFixed(2))}
      </Text>
      <Text style={{ color: "#911616", fontSize: 15 }}>
        {"(" + stockPerformance.percentageAmount.toFixed(2) + "%)"}
      </Text>
    </View>
  );
}

export default Performance;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});