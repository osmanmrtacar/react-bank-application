import Accounts from "../screens/main/Accounts";
import Transfers from "../screens/main/Transfer";

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';



export default createStackNavigator({ Account: Accounts, Transfer: Transfers });