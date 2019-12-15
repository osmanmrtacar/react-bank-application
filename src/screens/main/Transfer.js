import React, { Component } from "react";
import { withNavigationFocus } from "react-navigation";
import {
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";
const axios = require("axios");
const accountService = require("../../services/accounts");
const transferService = require("../../services/transfer");
import Dropdown from "../../components/Transfer/Picker";
import ToMyAccounts from "../../components/Transfer/toMyAccountsPicker";
import TransferOption from "../../components/Transfer/transferOptions";

import { CheckBox, Button, ThemeConsumer } from "react-native-elements";

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isSendingRequest: false,
      Quantity: "",
      user: "",
      selectedAccount: "",
      render: false,
      selectedOption: "",
      Receiver_Customer: "",
      Receiver_Suffix: ""
    };
  }

  _render = async () => {
    const response = await accountService.fetchAccounts();
    this.setState({
      dataSource: response,
      isLoading: false
    });
  };

  async componentDidMount() {
    await this._render();
  }

  async componentDidUpdate(prevProps, prevState) {
    const response = await accountService.fetchAccounts();
    if (prevProps.isFocused !== this.props.isFocused) {
      if (JSON.stringify(response) != JSON.stringify(prevState.dataSource)) {
        this.setState({ dataSource: response });
      }
    }
  }

  setAccount = item => {
    this.setState({ selectedAccount: item });
  };

  filterData = () => {
    return this.state.dataSource.filter(
      element => element.EkNo != this.state.selectedAccount
    );
  };

  updateUser = user => {
    this.setState({ user: user });
  };

  _toggleSelected = value => {
    if (value === "myself") {
      this.setState({ selectedOption: "myself" });
    } else this.setState({ selectedOption: "others" });
  };

  _toggleReceiverSuffix = value => {
    this.setState({ Receiver_Suffix: value });
  };

  _onPress = async () => {
    this.setState({ isSendingRequest: true });
    var response = null;
    const {
      Quantity,
      Receiver_Customer,
      Receiver_Suffix,
      selectedAccount
    } = this.state;
    if (this.state.selectedOption == "myself") {
      response = await transferService.Myself(
        selectedAccount,
        Receiver_Suffix,
        Quantity
      );
    } else {
      response = await transferService.Others(
        selectedAccount,
        Receiver_Customer,
        Receiver_Suffix,
        Quantity
      );
    }
    await this._render();
    this.setState({ selectedAccount: "", selectedOption: "", isSendingRequest: false, Receiver_Suffix: "" });
    alert(response);
    this.props.navigation.navigate("Accounts", {
      accountsData: this.state.dataSource
    });
  };

  _renderSelectedOption = () => {
    if (this.state.selectedOption == "") return null;
    if (this.state.selectedOption == "myself") {
      return (
        <ToMyAccounts
          toggleSuffix={this._toggleReceiverSuffix}
          items={this.filterData()}
        />
      );
    }
    return (
      <View>
        <TextInput
          style={styles.input}
          value={this.state.Receiver_Customer}
          onChangeText={rcv => this.setState({ Receiver_Customer: rcv })}
          placeholder={"Receiver Customer ID"}
          keyboardType={"number-pad"}
          maxLength={6}
        />
        <TextInput
          style={styles.input}
          value={this.state.Receiver_Suffix}
          onChangeText={this._toggleReceiverSuffix}
          placeholder={"Suffix"}
          keyboardType={"number-pad"}
          maxLength={4}
        />
      </View>
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
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={{ paddingBottom: 15 }}>FROM</Text>
          <Dropdown
            myValue={this.state.selectedAccount}
            pickAccount={this.setAccount}
            items={this.state.dataSource}
          />
          <Text style={{ paddingVertical: 15 }}>Quantity</Text>
          <TextInput
            value={this.state.Quantity}
            onChangeText={qty => this.setState({ Quantity: qty })}
            placeholder={"Quantity"}
            style={styles.input}
            maxLength={6}
            keyboardType={"decimal-pad"}
          />
          <Text style={{ paddingVertical: 15 }}>Transfer To</Text>
          <TransferOption
            disabled={this.state.selectedAccount == ""}
            render={this._toggleSelected}
          />
          <View paddingVertical={15} />
          {this._renderSelectedOption()}
          <View paddingVertical={15} />
          <Button
            disabled={
              this.state.selectedAccount == null ||
              this.state.Quantity == "" ||
              this.state.Receiver_Suffix == "" ||
              this.state.isSendingRequest
            }
            loading={this.state.isSendingRequest}
            title={"Send"}
            onPress={this._onPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  scrollContainer: {
    flex: 1,
    width: "95%"
  },
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});
export default withNavigationFocus(Transfer);
