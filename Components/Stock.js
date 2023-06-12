import { View, Image, Pressable } from "react-native";
import styled from "styled-components/native";
import { standardStockName } from "../util/standardStockName";

import Performance from "./Performance";

function Stock({ ticker, name, close, open, navigation, icon }) {
  return (
    <Pressable
      onPress={() => navigation.navigate("Details", { ticker: ticker })}
    >
      <Container>
        <BaseContainer>
          <Image
            style={{
              backgroundColor: "white",
              marginRight: 15,
              width: 35,
              height: 35,
              borderRadius: 200,
            }}
            source={{
              uri: icon + "?" + "apiKey=zum8Kgf5Ce4UV8nFCmanqfkjNk7ZkViD",
            }}
          />
          <View>
            <StockText>{ticker}</StockText>
            <NameText>{standardStockName(name)}</NameText>
          </View>
        </BaseContainer>
        <View style={{ alignItems: "flex-end" }}>
          <StockText>{"$" + close}</StockText>
          <Performance open={+open} close={+close} />
        </View>
      </Container>
    </Pressable>
  );
}

export default Stock;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
`;

const BaseContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StockText = styled.Text`
  color: white;
  font-size: 20px;
  padding-bottom: 2px;
`;

const NameText = styled.Text`
  color: #5e5b5b;
  font-size: 13px;
`;
