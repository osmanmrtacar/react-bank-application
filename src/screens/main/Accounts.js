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
import AccountsSwipeable from "../../components/Accounts/accountsSwipeable";
const services = require("../../services/accounts");
const { API } = require("../../../config");

export default class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, isModalVisible: false, Quantity: "" };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  async componentDidMount() {
    const response = await services.fetchAccounts();
    this.setState({
      dataSource: response,
      isLoading: false
    });
  }

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
            <Button title="Add Account" onPress={()=> services.addAccount(this.state.Quantity)} />
            <Button title="Hide modal" onPress={this.toggleModal} />
          </View>
        </Modal>

        <FlatList
          extraData={this.state}
          data={this.state.dataSource}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <AccountsSwipeable
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
