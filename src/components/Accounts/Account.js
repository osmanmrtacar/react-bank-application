import React from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Text
} from "react-native";
import { Overlay, Input, ThemeProvider, Button } from "react-native-elements";
const services = require("../../services/accounts");

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isModalVisible: false, Quantity: "" };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Overlay
          isVisible={true}
          windowBackgroundColor="rgba(189, 195, 199, .5)"
          overlayBackgroundColor="white"
          fullScreen
        >
          <View>
            <Text>New Account</Text>
            <Input placeholder="BASIC INPUT" />
            <Button title={"Add Account"} />
            <Button
              title={"X"}
              type="outline"
              buttonStyle={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }}
              onPress={() => props.toggle()}
            />
          </View>
        </Overlay>
      );
    }

    return <View></View>;
  }
}
