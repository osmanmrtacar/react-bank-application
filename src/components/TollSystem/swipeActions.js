import React from "react";
import { Animated, StyleSheet, I18nManager } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialIcons";
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default renderLeftActions = (
  progress,
  dragX,
  togglePutMoneyModal,
  item,
  onClick,
  close,
  onTakeMoney
) => {
  const scale = dragX.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const _onPress = () => {
    togglePutMoneyModal();
    onClick(item.HgsEkNo);
    close();
  };
  return (
    <Animated.View style={{ flex: 1, flexDirection: "row" }}>
      <RectButton
        style={styles.leftAction}
        onPress={() => {
          onTakeMoney(item);
          close();
        }}
      >
        <AnimatedIcon
          name="arrow-downward"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
      <RectButton style={styles.leftAction2} onPress={_onPress}>
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
