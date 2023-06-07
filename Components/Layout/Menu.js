import { StyleSheet, View, Text, Button } from "react-native";

import { Foundation } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

function Menu() {
  return (
    <View style={styles.container}>
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
  );
}

export default Menu;

const styles = StyleSheet.create({
  container: {
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
