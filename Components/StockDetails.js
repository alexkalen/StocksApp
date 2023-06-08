import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function StockDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="arrow-back-outline" size={24} color="white" />
        <Text style={{ color: "white" }}>STOCK DETAILS</Text>
        <Ionicons name="arrow-back-outline" size={24} color="#161616" />
      </View>
      <View>
        <View>
          {/* Stock Logo */}
          <Text>Stock Name</Text>
        </View>
        <View>{/* Stock Ticker in grey */}</View>
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
  titleContainer: {
    backgroundColor: "#161616",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
