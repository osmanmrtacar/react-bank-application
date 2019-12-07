import React from "react";
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
import Modal from "react-native-modal";
import { RectButton } from "react-native-gesture-handler";
import GmailStyleSwipeableRow from "./GmailStyleSwipeableRow";
const axios = require("axios");
const { API } = require("../../../config");

const Row = ({ item }) => (
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

const SwipeableRow = ({ updateRender, item, index }) => {
  return (
    <GmailStyleSwipeableRow deneme={item} fetchToggle={updateRender}>
      <Row item={item} />
    </GmailStyleSwipeableRow>
  );
};

export default class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isModalVisible: false, Quantity: "" };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _addAccount = async () => {
    try {
      await fetch(`${API}/api/account/newAccount`, {
        method: "POST",
        headers: {
          token: await AsyncStorage.getItem("token"),
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ Quantity: this.state.Quantity })
      });
      await this._reRender();
    } catch (err) {
      alert(err);
    }
  };

  _reRender = async () => {
    const options2 = {
      method: "GET",
      headers: {
        token: await AsyncStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8"
      },
      url: `${API}/api/account`
    };
    try {
      const response2 = await axios(options2);

      this.setState({
        dataSource: response2.data[0]
      });
    } catch (error) {
      alert("error");
    }
  };

  async componentDidMount() {
    await this._reRender();
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.fetchToggle !== this.state.fetchToggle) {
      this.updateNews();
    }
  }

  fetchToggle = () => {
    this.setState({
      fetchToggle: !this.state.fetchToggle
    });
  };
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }]
            }
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Button title="New Account" onPress={this.toggleModal} />
        <Modal isVisible={this.state.isModalVisible}>
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
            <Button title="Add Account" onPress={this._addAccount} />
            <Button title="Hide modal" onPress={this.toggleModal} />
          </View>
        </Modal>

        <FlatList
          extraData={this.state}
          data={this.state.dataSource}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeableRow
              updateRender={this._reRender}
              item={item}
              index={index}
            />
          )}
          keyExtractor={(item, index) => `message ${index}`}
        />
      </View>
    );
  }
}

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
