import React, {Component} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, Text, ActivityIndicator} from 'react-native';
const axios = require('axios');
export default class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then(response => {
        if (response) {
          this.setState({
            isLoading: false,
            dataSource: response.data,
          });
        }
      });
  }
  Item = params => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.firt_name}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}
