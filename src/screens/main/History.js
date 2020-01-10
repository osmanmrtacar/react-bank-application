import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native";
import { withNavigationFocus } from "react-navigation";
import services from "../../services/history";
import { ListItem } from "react-native-elements";

class History extends React.Component {
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
    const bankHistory = await services.fetchAccountHistory();
    const HGSHistory = await services.fetchHGSHistory();

    this.setState({
      bankSource: bankHistory,
      hgsSource: HGSHistory,
      isLoading: false
    });
  }

  keyExtractor = (item, index) => index.toString();
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
        <Text style={{ marginTop: 35, marginBottom: 10 }}> Account</Text>
        <ScrollView style={styles.firstContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.bankSource}
            renderItem={renderItem}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
        <Text style={{ marginVertical: 15 }}> HGS</Text>
        <ScrollView style={styles.firstContainer}>
          <FlatList
            extraData={this.state}
            data={this.state.hgsSource}
            renderItem={renderHGSItem}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  firstContainer: {
    height: "50%",
    width: "98%"
  }
});

function renderItem({ item }) {
  return (
    <ListItem
      title={item.TransactionType}
      subtitle={`${item.RecipientID}-${item.RecipientEkNo}`}
      bottomDivider
      rightTitle={`Quantity: ${item.Quantity}`}
    />
  );
}

function renderHGSItem({ item }) {
  return (
    <ListItem
      title={item.TransactionType}
      subtitle={`${item.HgsID}-${item.HgsEkNo}`}
      bottomDivider
      rightTitle={`Quantity: ${item.Quantity}`}
    />
  );
}

export default withNavigationFocus(History);
