import { StyleSheet, View, Text, Pressable } from "react-native";

function Button(props) {
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
        <View style={styles.buttonContainer}>{props.children}</View>
      </Pressable>
    </View>
  );
}

export default Button;

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
  pressedItem: {
    opacity: 0.7,
  },
});
