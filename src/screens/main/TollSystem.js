import React from "react";
import { withNavigationFocus } from "react-navigation";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
const services = require("../../services/tollservice");
import SwipeableRow from "../../components/TollSystem/swipeableRow";
class TollSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isModalVisible: false,
      Quantity: "",
      isSendingRequest: false
    };
  }

  async componentDidMount() {
    await this._reRender();
    this.setState({
      isLoading: false
    });
  }

  _reRender = async () => {
    const response = await services.fetchAll();
    this.setState({ dataSource: response });
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
        <FlatList
          extraData={this.state}
          keyExtractor={({ item, index }) => index}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <SwipeableRow item={item} refreshList={this._reRender} />
          )}
        />
      </View>
    );
  }
}

export default withNavigationFocus(TollSystem);
