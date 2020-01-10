import { Overlay, Input, ThemeProvider, Button } from "react-native-elements";
import AccountPicker from "../Transfer/Picker";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import accountService from "../../services/accounts";
import tollService from "../../services/tollservice";
class putMoneyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isModalVisible: false,
      selectedAccount: null,
      Quantity: "",
      isSendingRequest: false
    };
  }

  async componentDidMount() {
    await this._request();
    this.setState({ isLoading: false });
  }

  _request = async () => {
    const response = await accountService.fetchAccounts();
    this.setState({ dataSource: response });
  };
  setAccount = value => {
    this.setState({ selectedAccount: value });
  };

  _onPress = async event => {
    const response = await tollService.putMoney(
      this.state.selectedAccount,
      this.state.Quantity,
      this.props.suffix
    );
    alert(response);
    this.props.refresh();
    await this._request();
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
      <Overlay
        isVisible={this.props.isVisible}
        windowBackgroundColor="rgba(189, 195, 199, .5)"
        overlayBackgroundColor="white"
      >
        <View style={styles.container}>
          <Text>Take Money</Text>
          <AccountPicker
            items={this.state.dataSource}
            myValue={this.state.selectedAccount}
            pickAccount={this.setAccount}
          />
          <Input
            value={this.state.Quantity}
            placeholder="Quantity"
            onChangeText={Quantity => this.setState({ Quantity })}
            inputStyle={styles.input}
            maxLength={4}
            keyboardType={"decimal-pad"}
          />
          <Button
            title={"Add Money"}
            buttonStyle={styles.input}
            onPress={this._onPress}
          />
          <Button
            title={"X"}
            buttonStyle={styles.crossButton}
            type="outline"
            onPress={this.props.toggle}
          />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    marginTop: 30
  },
  crossButton: {
    marginTop: 60
  }
});

export default putMoneyModal;
