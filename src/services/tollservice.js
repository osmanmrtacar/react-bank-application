const { API } = require("../../config");
const axios = require("axios");
import { AsyncStorage } from "react-native";

exports.fetchAll = async () => {
  var response = await fetch(`${API}/api/hgs/queryAll`, {
    method: "GET",
    headers: {
      token: await AsyncStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8"
    }
  });
  const json = await response.json();
  console.log(json)
  return json
};
