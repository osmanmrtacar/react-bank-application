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
  return json;
};

exports.newHGS = async (slc, qty) => {
  try {
    let response = await fetch(
      `https://fathomless-wave-57859.herokuapp.com/api/hgs/insert`,
      {
        method: "POST",
        headers: {
          token: await AsyncStorage.getItem("token"),
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ Quantity: qty, ekNo: slc })
      }
    );
    const json = await response.json();
    return json.message ? json.message : "success";
  } catch (er) {
    alert(er);
  }
};

exports.putMoney = async (slc, qty, sfx) => {
  try {
    let response = await fetch(
      `https://fathomless-wave-57859.herokuapp.com/api/hgs/load`,
      {
        method: "POST",
        headers: {
          token: await AsyncStorage.getItem("token"),
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ Quantity: qty, ekNo: slc, HgsEkNo: sfx })
      }
    );
    const json = await response.json();
    return json.message ? json.message : "success";
  } catch (er) {
    alert(er);
  }
};

exports.takeMoney = async sfx => {
  try {
    let response = await fetch(
      `https://fathomless-wave-57859.herokuapp.com/api/hgs/withdraw`,
      {
        method: "POST",
        headers: {
          token: await AsyncStorage.getItem("token"),
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ HgsEkNo: sfx })
      }
    );
    const json = await response.json();
    return json.status === 500 ? json.message : "success";
  } catch (er) {
    alert(er);
  }
};
