import { Overlay, Input, ThemeProvider, Button } from "react-native-elements";

import { Text, View, StyleSheet } from "react-native";
import React, { useState } from "react";
const addAccountModal = props => {
  const [Quantity, setQuantity] = useState("");
  return (
    <Overlay
      isVisible={props.isVisible}
      windowBackgroundColor="rgba(189, 195, 199, .5)"
      overlayBackgroundColor="white"
    >
      <View style={styles.container}>
        <Text>New Account</Text>
        <Input
          value={Quantity}
          placeholder="Quantity"
          onChangeText={qty => setQuantity(qty)}
          inputStyle={styles.input}
          keyboardType={"decimal-pad"}
        />
        <Button
          title={"Add Account"}
          loading={props.sendingRequest}
          buttonStyle={styles.input}
          disabled={!(Quantity > 0) || props.sendingRequest}
          onPress={() => props.requestFunc(Quantity)}
        />
        <Button
          title={"X"}
          buttonStyle={styles.crossButton}
          type="outline"
          disabled={props.sendingRequest}
          onPress={() => props.toggle()}
        />
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    marginTop: 30
  },
  crossButton: {
    marginTop: 60
  }
});

export default addAccountModal;
