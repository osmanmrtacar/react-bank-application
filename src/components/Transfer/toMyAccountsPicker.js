import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { StyleSheet } from "react-native";
export default ToMyAccounts = ({ items, toggleSuffix, myValue }) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: "Select the receiver account",
        value: null,
        color: "red"
      }}
      value={myValue}
      onValueChange={toggleSuffix}
      items={items.map(mapArray)}
      style={pickerSelectStyles}
    />
  );
};

const mapArray = x => {
  return {
    label: `${x.CustomerID}-${x.EkNo}`,
    value: `${x.EkNo}`
  };
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});
