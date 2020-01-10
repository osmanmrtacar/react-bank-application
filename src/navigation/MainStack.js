import Accounts from "../screens/main/Accounts";
import Transfers from "../screens/main/Transfer";
import TollSystem from "../screens/main/TollSystem";
import LoanScreen from '../screens/main/Loan'
import HistoryScreen from '../screens/main/History'
import { createBottomTabNavigator } from "react-navigation-tabs";

export default createBottomTabNavigator({
  Account: Accounts,
  Transfer: Transfers,
  HGS: TollSystem,
  Loan: LoanScreen,
  History: HistoryScreen
});
