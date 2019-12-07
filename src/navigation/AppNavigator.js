import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthStack from './AuthStack';
import AppStack from './MainStack';
import AuthLoadingScreen from '../screens/auth/AuthenticationLoaderScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
