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

import Modal from "react-native-modal";
import GmailStyleSwipeableRow from "../SwipableRows/GmailStyleSwipeableRow";
import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialIcons";
const { API } = require("../../../config");

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class AccountsGmailStyleRow extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isWithDrawnVisible: false,
    isPutMoneyVisible: false,
    Quantity: ""
  };
  toggleWithDrawn = () => {
    this.setState({ isWithDrawnVisible: !this.state.isWithDrawnVisible });
  };

  togglePutMoney = () => {
    this.setState({ isPutMoneyVisible: !this.state.isPutMoneyVisible });
  };

  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    return (
      <Animated.View style={{ flex: 1, flexDirection: "row" }}>
        <RectButton style={styles.leftAction} onPress={this.toggleWithDrawn}>
          <AnimatedIcon
            name="undo"
            size={30}
            color="#fff"
            style={[styles.actionIcon, { transform: [{ scale }] }]}
          />
        </RectButton>
        <RectButton style={styles.leftAction2} onPress={this.togglePutMoney}>
          <AnimatedIcon
            name="redo"
            size={30}
            color="#fff"
            style={[styles.actionIcon, { transform: [{ scale }] }]}
          />
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp"
    });
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => this._deleteAccount(this.props.children.props.item.EkNo)}
      >
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    );
  };
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const { children } = this.props;
    return (
      <View>
        <Modal isVisible={this.state.isWithDrawnVisible}>
          <View
            style={{
              flex: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ecf0f1"
            }}
          >
            <TextInput
              value={this.state.identifier}
              onChangeText={Quantity => this.setState({ Quantity })}
              placeholder={"Quantity"}
              style={styles.input}
              keyboardType={"decimal-pad"}
            />
            <Button
              title="Get Money"
              onPress={() => this._getMoney(children.props.item.EkNo)}
            />
            <Button title="Hide modal" onPress={this.toggleWithDrawn} />
          </View>
        </Modal>
        <Modal isVisible={this.state.isPutMoneyVisible}>
          <View
            style={{
              flex: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ecf0f1"
            }}
          >
            <TextInput
              value={this.state.identifier}
              onChangeText={Quantity => this.setState({ Quantity })}
              placeholder={"Quantity"}
              style={styles.input}
              keyboardType={"decimal-pad"}
            />
            <Button
              title="Add Money"
              onPress={() => this._putMoney(children.props.item.EkNo)}
            />
            <Button title="Hide modal" onPress={this.togglePutMoney} />
          </View>
        </Modal>
        <GmailStyleSwipeableRow
          updateRef={this.updateRef}
          renderLeftActions={this.renderLeftActions}
          renderRightActions={this.renderRightActions}
        >
          {children}
        </GmailStyleSwipeableRow>
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
