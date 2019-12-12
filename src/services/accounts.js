const { API } = require("../../config");
const axios = require("axios");
import { AsyncStorage } from "react-native";

const fetchAccounts = async () => {
  const options = {
    method: "GET",
    headers: {
      token: await AsyncStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8"
    },
    url: `${API}/api/account`
  };
  try {
    const response = await axios(options);
    return response.data[0];
  } catch (e) {
    console.log(e);
  }
};

const addAccount = async quantity => {
  const options = {
    method: "POST",
    headers: {
      token: await AsyncStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8"
    },
    data: { Quantity: quantity },
    url: `${API}/api/account/newAccount`
  };
  try {
    const response = await axios(options);
    alert(response.data.message);
  } catch (err) {
    alert(err);
  }
};

exports.getMoney = async (qty, accSuffix) => {
  try {
    const response = await fetch(`${API}/api/account/withdraw`, {
      method: "POST",
      headers: {
        token: await AsyncStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ Quantity: qty, ekNo: accSuffix })
    });
    const json = await response.json();
    return json.message;
  } catch (err) {
    alert(err);
  }
};

exports.putMoney = async (qty, accSuffix) => {
  try {
    const response = await fetch(`${API}/api/account/selectAccount`, {
      method: "POST",
      headers: {
        token: await AsyncStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ Quantity: qty, ekNo: accSuffix })
    });
    const json = await response.json();
    return json.message;
  } catch (err) {
    alert(err);
  }
};

exports.deleteAccount = async accountId => {
  try {
    const response = await fetch(`${API}/api/account/deleteAccount`, {
      method: "POST",
      headers: {
        token: await AsyncStorage.getItem("token"),
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({ ekNo: accountId })
    });
    const json = await response.json();
    return json.message;
  } catch (err) {
    alert(err);
  }
};

exports.fetchAccounts = fetchAccounts;

exports.addAccount = addAccount;
