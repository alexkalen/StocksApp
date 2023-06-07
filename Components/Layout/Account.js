import { useState } from "react";

import { StyleSheet, View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

import DepositButton from "../UI/DepositButton";

function Account() {
  const [account, setAccount] = useState(840.5);

  const depositHandler = () => {
    setAccount((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.buyingPowerContainer}>
          <Text style={styles.accountTitle}>BUYING POWER</Text>
          <Octicons name="question" size={13} color="#5e5b5b" />
        </View>
        <Text style={styles.accountBalance}>{"$" + account}</Text>
      </View>
      <View style={styles.button}>
        <DepositButton onDeposit={depositHandler}>{"Deposit"}</DepositButton>
      </View>
    </View>
  );
}

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buyingPowerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountTitle: {
    marginRight: 5,
    fontSize: 14,
    color: "#5e5b5b",
  },
  accountBalance: {
    paddingVertical: 5,
    fontSize: 20,
    color: "white",
  },
  button: {
    width: 130,
    borderRadius: 20,
  },
});
