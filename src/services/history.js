const { API } = require("../../config");
import { AsyncStorage } from "react-native";

exports.fetchHGSHistory = async () => {
  var response = await fetch(
    "https://fathomless-wave-57859.herokuapp.com/api/hgs/HgsTransaction",
    {
      method: "GET",
      headers: {
        token: await AsyncStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  );
  const json = await response.json();
  console.log(json)
  return json;
};

exports.fetchAccountHistory = async () => {
  var response = await fetch(
    "https://fathomless-wave-57859.herokuapp.com/api/transaction/bank",
    {
      method: "GET",
      headers: {
        token: await AsyncStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  );
  const json = await response.json();
  return json;
};
