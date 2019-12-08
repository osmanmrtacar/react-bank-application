import React, { Component } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  I18nManager,
  AsyncStorage
} from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";

export default class GmailStyleSwipeableRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children } = this.props;
    return (
      <View>
        <Swipeable
          ref={this.props.updateRef}
          friction={2}
          leftThreshold={80}
          rightThreshold={40}
          renderLeftActions={this.props.renderLeftActions}
          renderRightActions={this.props.renderRightActions}
        >
          {children}
        </Swipeable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse"
  },
  leftAction2: {
    flex: 1,
    backgroundColor: "#FFAE42",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse"
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});
