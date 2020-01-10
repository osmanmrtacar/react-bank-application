import React from "react";
import { withNavigationFocus } from "react-navigation";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { Button, Overlay } from "react-native-elements";
const services = require("../../services/tollservice");
import accountService from "../../services/accounts";
import SwipeableRow from "../../components/TollSystem/swipeableRow";
import AddModal from "../../components/TollSystem/addModal";
import PutMoneyModal from "../../components/TollSystem/putMoney";
class TollSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPutModalVisible: false,
      isModalVisible: false,
      Quantity: "",
      clickedHGS: null,
      isSendingRequest: false
    };
  }

  async componentDidMount() {
    await this._reRender();
    this.setState({
      isLoading: false
    });
  }

  _toggleAddModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _togglePutModal = () => {
    this.setState({ isPutModalVisible: !this.state.isPutModalVisible });
  };

  _setHGS = value => {
    this.setState({ clickedHGS: value });
  };
  keyExtractor = (item, index) => item.HgsEkNo.toString();

  _reRender = async () => {
    const response = await services.fetchAll();
    this.setState({ dataSource: response });
  };
  _takeMoney = async item => {
    this.setState({ isSendingRequest: true });
    const response = await services.takeMoney(item.HgsEkNo);
    await this._reRender();
    this.setState({ isSendingRequest: false });
    setTimeout(function() {
      alert(response);
    }, 10);
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
      <View style={{ flex: 1, paddingTop: 40 }}>
        <Button title="New HGS" onPress={this._toggleAddModal} />
        <Overlay
          isVisible={this.state.isSendingRequest}
          width="auto"
          height="auto"
        >
          <Button
            title="Clear button"
            type="clear"
            loading={this.state.isSendingRequest}
          />
        </Overlay>
        <AddModal
          isVisible={this.state.isModalVisible}
          toggle={this._toggleAddModal}
          refresh={this._reRender}
        />
        <PutMoneyModal
          isVisible={this.state.isPutModalVisible}
          toggle={this._togglePutModal}
          refresh={this._reRender}
          suffix={this.state.clickedHGS}
        />
        <FlatList
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <SwipeableRow
              item={item}
              refreshList={this._reRender}
              togglePutMoneyModal={this._togglePutModal}
              _onClick={this._setHGS}
              onTakeMoney={this._takeMoney}
            />
          )}
        />
      </View>
    );
  }
}

export default withNavigationFocus(TollSystem);
