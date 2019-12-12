import React from "react";
import { withNavigationFocus } from "react-navigation";

class TollSystem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isModalVisible: false,
      Quantity: "",
      isSendingRequest: false
    };
  }
}

export default withNavigationFocus(TollSystem);
