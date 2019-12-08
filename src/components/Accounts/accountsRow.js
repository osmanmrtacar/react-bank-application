import {
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Animated,
  AsyncStorage
} from "react-native";
import React from "react";

const accountRows = ({ item }) => (
  <View style={styles.rectButton}>
    <Text style={styles.fromText}>{item.from}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {"" + item.CustomerID + "-" + item.EkNo}
    </Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {"Quantity " + item.Quantity}
    </Text>
    <Text style={styles.dateText}>
      {item.when} {"❭"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent"
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent"
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold"
  }
});

export default accountRows;