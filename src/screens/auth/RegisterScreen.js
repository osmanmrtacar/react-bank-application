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
import { identifier } from "@babel/types";
const axios = require("axios");
const { API } = require("../../../config");

export default class RegisterScreen extends Component {
  state = {
    ID: "",
    email: "",
    fname: "",
    lname: "",
    pnumber: "",
    password: "",
    isLoggingIn: false,
    message: ""
  };

  _userRegister = async () => {
    this.setState({ isLoggingIn: true, message: "" });

    var user = {
      TC: this.state.ID,
      FirstName: this.state.fname,
      LastName: this.state.lname,
      Phone: this.state.pnumber,
      Password: this.state.password,
      Mail: this.state.email
    };

    try {
      const response = await axios.post(`${API}/register`, user);
      if (response.data.status == 200) {
        this.setState({ message: "Success" });
        setTimeout(1100);
        this.props.navigation.navigate("SignIn");
      } else {
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.ID}
          onChangeText={ID => this.setState({ ID })}
          placeholder={"ID"}
          keyboardType={"number-pad"}
          style={styles.input}
          maxLength={11}
        />
        <TextInput
          value={this.state.first_name}
          onChangeText={fname => this.setState({ fname })}
          placeholder={"First Name"}
          style={styles.input}
          maxLength={20}
        />
        <TextInput
          value={this.state.last_name}
          onChangeText={lname => this.setState({ lname })}
          placeholder={"Last Name"}
          style={styles.input}
          maxLength={20}
        />
        <TextInput
          value={this.state.phone_number}
          onChangeText={pnumber => this.setState({ pnumber })}
          placeholder={"Phone Number"}
          style={styles.input}
          keyboardType={"phone-pad"}
          maxLength={11}
        />
        <TextInput
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={"E-Mail"}
          style={styles.input}
          keyboardType={"email-address"}
          maxLength={20}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
          maxLength={6}
        />
        {!!this.state.message && (
          <Text style={{ fontSize: 14, color: "red", padding: 5 }}>
            {this.state.message}
          </Text>
        )}
        <Button
          title={"Register"}
          style={styles.input}
          onPress={this._userRegister}
          disabled={this.state.ID.length!=11||this.state.password.length!=6}
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
