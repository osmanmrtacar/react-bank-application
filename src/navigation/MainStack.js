import Accounts from "../screens/main/Accounts";
import Transfers from "../screens/main/Transfer";

import { createBottomTabNavigator } from 'react-navigation-tabs';

export default createBottomTabNavigator({
  Account: Accounts,
  Transfer: Transfers
});
