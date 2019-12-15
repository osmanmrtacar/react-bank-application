import { ListItem, Overlay, Button, Input } from "react-native-elements";
import React from "react";
import { Animated, StyleSheet, I18nManager, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialIcons";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const services = require("../../services/tollservice");

export default class SwipeableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModalVisible: false,
      Quantity: "",
      isSendingRequest: false
    };
  }
  renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    return (
      <Animated.View style={{ flex: 1, flexDirection: "row" }}>
        <RectButton
          style={styles.leftAction}
          onPress={() => this._toggleModal(this._getMoney, "Get Money")}
        >
          <AnimatedIcon
            name="arrow-downward"
            size={30}
            color="#fff"
            style={[styles.actionIcon, { transform: [{ scale }] }]}
          />
        </RectButton>
        <RectButton
          style={styles.leftAction2}
          onPress={() => this._toggleModal(this._putMoney, "Put Money")}
        >
          <AnimatedIcon
            name="arrow-upward"
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
      <RectButton style={styles.rightAction}>
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
    const { item } = this.props;
    return (
      <View>
        <Overlay
          isVisible={this.state.isSendingRequest}
          width="auto"
          height="auto"
        >
          <Button
            title="Clear button"
            type="clear"
            loading={this.state.isSendingRequest}
          />
        </Overlay>
        <Overlay
          isVisible={this.state.isModalVisible}
          windowBackgroundColor="rgba(189, 195, 199, .5)"
          overlayBackgroundColor="white"
        >
          <View style={styles.container}>
            <Input
              value={this.state.Quantity}
              placeholder="Quantity"
              onChangeText={qty => this.setState({ Quantity: qty })}
              inputStyle={styles.input}
              keyboardType={"decimal-pad"}
            />
            <Button
              title={this.state.currentText}
              loading={this.state.isLoading}
              disabled={!(this.state.Quantity > 0) || this.state.isLoading}
              buttonStyle={styles.input}
              onPress={() => this.state.currentFunction(this.state.Quantity)}
            />
            <Button
              title={"X"}
              buttonStyle={styles.crossButton}
              type="outline"
              disabled={this.state.isLoading}
              loading={this.state.isLoading}
              onPress={() =>
                this._toggleModal(
                  this.state.currentFunction,
                  this.state.currentText
                )
              }
            />
          </View>
        </Overlay>
        <Swipeable
          ref={this.updateRef}
          renderLeftActions={this.renderLeftActions}
          renderRightActions={this.renderRightActions}
          onSwipeableRightOpen={this._deleteAccount}
        >
          <ListItem
            title={"" + item.HgsID + "-" + item.HgsEkNo}
            subtitle={"Quantity: " + item.Quantity}
            bottomDivider
          />
        </Swipeable>
      </View>
    );
  }
  _toggleModal = (func, txt) => {
    this.close();
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      currentFunction: func,
      currentText: txt,
      currentAccId: this.props.item.EkNo
    });
  };
  _deleteAccount = async () => {
    this.close();
    this.setState({ isSendingRequest: true });
    const response = await services.deleteAccount(this.props.item.EkNo);
    if (response == "success") this.props.refreshList();
    this.setState({ isSendingRequest: false });
    setTimeout(function() {
      alert(response);
    }, 10);
  };
  _putMoney = async qty => {
    this.setState({ isLoading: true });
    const response = await services.putMoney(qty, this.state.currentAccId);
    if (response == "success") this.props.refreshList();
    this.setState({ isLoading: false });
    setTimeout(function() {
      alert(response);
    }, 10);
  };

  _getMoney = async qty => {
    console.log(qty);
    this.setState({ isLoading: true });
    const response = await services.getMoney(qty, this.state.currentAccId);
    if (response == "success") this.props.refreshList();
    this.setState({ isLoading: false });
    setTimeout(function() {
      alert(response);
    }, 10);
  };
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse"
  },
  input: {
    width: 200,
    height: 44,
    marginTop: 30
  },
  crossButton: {
    marginTop: 60
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
    marginHorizontal: 10,
    alignItems: "center"
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end"
  }
});
