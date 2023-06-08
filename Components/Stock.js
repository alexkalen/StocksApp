import { StyleSheet, View, Text, Image, Pressable } from "react-native";

import Performance from "./Performance";

const images = {
  AAPL: require("../assets/images/AAPL.png"),
  ADBE: require("../assets/images/ADBE.png"),
  LYFT: require("../assets/images/LYFT.png"),
  SPOT: require("../assets/images/SPOT.png"),
};

function Stock({ ticker, name, close, open, navigation }) {
  return (
    <Pressable onPress={() => navigation.navigate("Details")}>
      <View style={styles.container}>
        <View style={styles.stockInfo}>
          <Image style={styles.stockImage} source={images[ticker]} />
          <View>
            <Text style={styles.stockCode}>{ticker}</Text>
            <Text style={styles.stockName}>{name}</Text>
          </View>
        </View>
        <View style={styles.stockMovement}>
          <Text style={styles.stockCode}>{"$" + close}</Text>
          <Performance open={+open} close={+close} />
        </View>
      </View>
    </Pressable>
  );
}

export default Stock;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  stockInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stockMovement: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  stockImage: {
    backgroundColor: "white",
    marginRight: 15,
    width: 35,
    height: 35,
    borderRadius: 200,
  },
  stockCode: {
    color: "white",
    fontSize: 20,
    paddingBottom: 4,
  },
  stockName: {
    color: "#5e5b5b",
    fontSize: 16,
  },
});
