const { API } = require("../../config");
const axios = require("axios");
import { AsyncStorage } from "react-native";

exports.Others = async (mySuffix, receiverId, receiverSuffix, qty) => {
  const options = {
    method: "POST",
    headers: {
      token: await AsyncStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8"
    },
    data: {
      Quantity: qty,
      ekNo: mySuffix,
      Receiver_CustomerID: receiverId,
      Receiver_ekNo: receiverSuffix
    },
    url: `${API}/api/payment/havale`
  };
  try {
    const response = await axios(options);
    return response.data.status == 500 ? response.data.message : "success";
  } catch (err) {
    alert(err);
  }
};

exports.Myself = async (mySuffix, receiverSuffix, qty) => {
  const options = {
    method: "POST",
    headers: {
      token: await AsyncStorage.getItem("token"),
      "Content-Type": "application/json;charset=utf-8"
    },
    data: {
      Quantity: qty,
      ekNo: mySuffix,
      Receiver_ekNo: receiverSuffix
    },
    url: `${API}/api/payment/virman`
  };
  try {
    const response = await axios(options);
    return response.data.status == 500 ? response.data.message : "success";
  } catch (err) {
    alert(err);
  }
};
