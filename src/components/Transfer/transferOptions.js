import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { StyleSheet } from "react-native";
export default TransferOptions = ({disabled, render}) => {
  return (
    <RNPickerSelect
    disabled={disabled}
      onValueChange={render}
      items={[
        { label: "Myself", value: "myself" },
        { label: "Others", value: "others" }
      ]}
      style={pickerSelectStyles}
    />
  );
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
