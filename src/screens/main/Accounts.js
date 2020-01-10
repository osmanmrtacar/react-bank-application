import React from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { withNavigationFocus } from "react-navigation";
import { ListItem, Button, ThemeProvider } from "react-native-elements";
const services = require("../../services/accounts");
import AddModal from "../../components/Accounts/addAccountModal";
import SwipeableRow from "../../components/Accounts/swipeableRow";
class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isModalVisible: false,
      Quantity: "",
      isSendingRequest: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  
  keyExtractor = (item, index) => item.EkNo.toString();

  async componentDidMount() {
    await this._reRender();
    this.setState({
      isLoading: false
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    const response = await services.fetchAccounts();
    if (prevProps.isFocused !== this.props.isFocused) {
      if (JSON.stringify(response) != JSON.stringify(prevState.dataSource)) {
        this.setState({ dataSource: response });
      }
    }
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
      <View style={{ flex: 1, paddingTop: 40 }}>
        <Button title="New Account!" onPress={this.toggleModal} />

        <FlatList
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <SwipeableRow item={item} refreshList={this._reRender} />
          )}
        />
        <AddModal
          isVisible={this.state.isModalVisible}
          toggle={this.toggleModal}
          sendingRequest={this.state.isSendingRequest}
          requestFunc={this._addAccount}
        />
      </View>
    );
  }
  _reRender = async () => {
    try {
      const response = await services.fetchAccounts();
      this.setState({
        dataSource: response
      });
    } catch (error) {
      alert(error);
    }
  };
  _addAccount = async quantity => {
    try {
      this.setState({ isSendingRequest: true });
      await services.addAccount(quantity);
      this._reRender();
      this.setState({ isSendingRequest: false });
    } catch (err) {
      alert(err);
    }
  };
}

export default withNavigationFocus(Accounts);
