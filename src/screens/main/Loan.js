import React, { Component } from "react";
import { withNavigationFocus } from "react-navigation";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from "react-native";
const machineLearningService = require("../../services/machinelearningservice");
import HaveHousePicker from "../../components/Loan/haveHousePicker";
import HavePhonePicker from "../../components/Loan/havePhonePicker";
import Input from "../../components/Input";
import { CheckBox, Button, ThemeConsumer } from "react-native-elements";

class Loan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isSendingRequest: false,
      isValid: null,
      Quantity: "",
      age: "",
      loanBeforeCount: "",
      doesHavePhone: 0,
      doesHaveHouse: 0
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    /* const response = await accountService.fetchAccounts();
    if (prevProps.isFocused !== this.props.isFocused) {
      if (JSON.stringify(response) != JSON.stringify(prevState.dataSource)) {
        this.setState({ dataSource: response });
      }
    } */
  }
  setDoesHavePhone = selected => {
    this.setState({ doesHavePhone: selected });
  };

  setDoesHaveHouse = selected => {
    this.setState({ doesHaveHouse: selected });
  };
  _onPress = async () => {
    this.setState({ isSendingRequest: true });
    const data = ({
      Quantity,
      doesHaveHouse,
      doesHavePhone,
      age,
      loanBeforeCount
    } = this.state);
    console.log(data);
    const response = await machineLearningService.request(data);
    alert(response);
    this.setState({ isSendingRequest: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={{ paddingBottom: 15 }}>Your Age</Text>
          <Input
            value={this.state.age}
            placeholder={"Age"}
            style={styles.input}
            maxLength={2}
            keyboardType={"number-pad"}
            setValue={age => this.setState({ age })}
            pattern={"^(1[89]|[2-9][0-9])$"}
            onValidation={isValid => this.setState({ isValid })}
          />
          {!!this.state.isValid && (
            <Text style={{ fontSize: 14, color: "red", paddingBottom: 15 }}>
              Age must be greater than 18
            </Text>
          )}
          <Text style={{ paddingBottom: 15 }}>Do you have house?</Text>
          <HaveHousePicker onChange={this.setDoesHaveHouse} />
          <Text style={{ paddingVertical: 15 }}>Do you have phone?</Text>
          <HavePhonePicker onChange={this.setDoesHavePhone} />
          <Text style={{ paddingVertical: 15 }}>
            How many times did you get loan before?
          </Text>
          <TextInput
            value={this.state.loanBeforeCount}
            onChangeText={loan => this.setState({ loanBeforeCount: loan })}
            placeholder={"Number"}
            style={styles.input}
            maxLength={1}
            keyboardType={"number-pad"}
          />
          <Text style={{ paddingVertical: 15 }}>
            How much do you want to borrow?
          </Text>
          <TextInput
            value={this.state.Quantity}
            onChangeText={qty => this.setState({ Quantity: qty })}
            placeholder={"Quantity"}
            style={styles.input}
            maxLength={6}
            keyboardType={"number-pad"}
          />

          <View paddingVertical={15} />
          <Button
            disabled={
              this.state.age == "" ||
              this.state.isValid ||
              !(this.state.Quantity > 0) ||
              this.state.doesHaveHouse == 0 ||
              this.state.doesHavePhone == 0 ||
              this.state.loanBeforeCount == "" ||
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
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10
  }
});
export default withNavigationFocus(Loan);
