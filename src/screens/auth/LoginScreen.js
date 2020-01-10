import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { Input, ThemeProvider, Button } from "react-native-elements";
const axios = require("axios");
const { API } = require("../../../config");

export default class LoginScreen extends Component {
  state = {
    identifier: "",
    password: "",
    isLoggingIn: false,
    message: ""
  };

  _userLogin = async () => {
    this.setState({ isLoggingIn: true, message: "" });

    var user = {
      TC: this.state.identifier,
      Password: this.state.password
    };

    try {
      const response = await axios.post(`${API}/login`, user);
      if (response.data.status == true) {
        await AsyncStorage.setItem("token", response.data.token);
        this.setState({ isLoggingIn: false });
        this.props.navigation.navigate("App");
      } else {
        this.setState({ isLoggingIn: false });
        this.setState({ message: response.data.message });
      }
    } catch (error) {
      this.setState({ message: error.message });
      this.setState({ isLoggingIn: false });
    }
  };

  clearUsername = () => {
    this._username.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  clearPassword = () => {
    this._password.setNativeProps({ text: "" });
    this.setState({ message: "" });
  };

  _switchScreen = () => {
    this.props.navigation.navigate("SignUp");
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.state.identifier}
          onChangeText={identifier => this.setState({ identifier })}
          placeholder={"TC"}
          keyboardType={"number-pad"}
          maxLength={11}
        />
        <Input
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          maxLength={6}
        />
        {!!this.state.message && (
          <Text style={{ fontSize: 14, color: "red", padding: 5 }}>
            {this.state.message}
          </Text>
        )}
        <Button
          title={"Login"}
          onPress={this._userLogin}
          loading={this.state.isLoggingIn}
          disabled={
            this.state.identifier.length != 11 ||
            this.state.password.length != 6 ||
            this.state.isLoggingIn
          }
          buttonStyle={styles.input}
        />
        <Button
          title={"Register"}
          onPress={this._switchScreen}
          loading={this.state.isLoggingIn}
          disabled={this.state.isLoggingIn}
          buttonStyle={styles.input}
        />
      </View>
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
  }
});
