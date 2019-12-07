import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';



export default createStackNavigator({ SignIn: LoginScreen, SignUp: RegisterScreen });