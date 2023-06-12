import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { calculatePerformance } from "../util/calculatePerformance";

function Performance(props) {
  const stockPerformance = calculatePerformance(props.close, props.open);

  if (stockPerformance.dolarAmount >= 0) {
    return (
      <View style={styles.container}>
        <MaterialIcons
          style={{ marginRight: 3 }}
          name="trending-up"
          size={16}
          color="green"
        />
        <Text style={{ color: "green", paddingRight: 6, fontSize: 13 }}>
          {"+$" + stockPerformance.dolarAmount.toFixed(2)}
        </Text>
        <Text style={{ color: "green", fontSize: 13 }}>
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
      <Text style={{ color: "#911616", paddingRight: 6, fontSize: 13 }}>
        {"-$" + Math.abs(stockPerformance.dolarAmount.toFixed(2))}
      </Text>
      <Text style={{ color: "#911616", fontSize: 13 }}>
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
