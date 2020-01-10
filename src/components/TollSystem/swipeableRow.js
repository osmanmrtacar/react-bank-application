import { ListItem, Overlay, Button, Input } from "react-native-elements";
import React from "react";
import { Animated, StyleSheet, I18nManager, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialIcons";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
import LeftAction from "./swipeActions";
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
        <Swipeable
          ref={this.updateRef}
          renderLeftActions={(progress, dragX) =>
            LeftAction(
              progress,
              dragX,
              this.props.togglePutMoneyModal,
              item,
              this.props._onClick,
              this.close,
              this.props.onTakeMoney
            )
          }
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

  _putMoney = async qty => {
    this.setState({ isLoading: true });
    const response = await services.putMoney(qty, this.state.currentAccId);
    this.setState({ isLoading: false });
    setTimeout(function() {
      alert(response);
    }, 1000);
  };

  _getMoney = async qty => {
    this.setState({ isLoading: true });
    const response = await services.getMoney(qty, this.state.currentAccId);
    this.setState({ isLoading: false });
    setTimeout(function() {
      alert(response);
    }, 1000);
  };
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: "#FFAE42",
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
    backgroundColor: "#388e3c",
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
