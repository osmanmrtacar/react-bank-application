import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';

export default class ModalExample extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Button title="Show modal" onPress={this.toggleModal} />
        <Modal isVisible={this.props.isModalVisible}>
          <View style={{flex: 1}}>
            <Text>Hello!</Text>
            <Button title="Hide modal" onPress={this.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}
