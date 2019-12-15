import RNPickerSelect from "react-native-picker-select";
import React from "react";
import { StyleSheet } from "react-native";
export default HaveHouse = ({ onChange }) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: "YES/NO",
        value: null,
        color: "red"
      }}
      onValueChange={onChange}
      items={[
        { label: "Yes", value: 1 },
        { label: "No", value: 2 }
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
