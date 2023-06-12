import { View, Pressable } from "react-native";
import styled from "styled-components/native";

function Button(props) {
  const pressHandler = () => {
    props.onDeposit();
  };

  return (
    <Container>
      <Pressable
        style={({ pressed }) =>
          pressed && {
            opacity: 0.7,
          }
        }
        onPress={pressHandler}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {props.children}
        </View>
      </Pressable>
    </Container>
  );
}

export default Button;

const Container = styled.View`
  background-color: #161616;
  border-radius: 28px;
  padding-top: 11px;
  padding-bottom: 11px;
  padding-right: 18px;
  padding-left: 18px;
  align-items: center;
`;
