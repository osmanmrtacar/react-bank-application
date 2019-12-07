import React, { Component } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";

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
        try {
          await AsyncStorage.setItem("token", response.data.token);
        } catch (error) {
          console.log(error)
        }
        this.props.navigation.navigate("App");
      }
      else{
        this.setState({ message: response.data.message });
      }
    } catch (error) {
      this.setState({ message: error.message });
      this.setState({ isLoggingIn: false });
    }

    var proceed = false;
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
        <TextInput
          value={this.state.identifier}
          onChangeText={identifier => this.setState({ identifier })}
          placeholder={"ID"}
          style={styles.input}
          keyboardType={"number-pad"}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />
        {!!this.state.message && (
          <Text style={{ fontSize: 14, color: "red", padding: 5 }}>
            {this.state.message}
          </Text>
        )}
        <Button
          title={"Login"}
          style={styles.input}
          onPress={this._userLogin}
        />
        <Button
          title={"Register"}
          style={styles.input}
          onPress={this._switchScreen}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});
