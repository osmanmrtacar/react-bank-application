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
