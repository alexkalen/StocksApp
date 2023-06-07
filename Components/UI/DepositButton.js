import { StyleSheet, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

function DepositButton(props) {
  const pressHandler = () => {
    console.log("Caching!");
    props.onDeposit();
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={pressHandler}
      >
        <View style={styles.buttonContainer}>
          <Feather name="plus" size={18} color="white" />
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default DepositButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#161616",
    borderRadius: 28,
    paddingVertical: 11,
    paddingHorizontal: 18,
    elevation: 2,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  text: {
    color: "#cccccc",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  pressedItem: {
    opacity: 0.7,
  },
});
