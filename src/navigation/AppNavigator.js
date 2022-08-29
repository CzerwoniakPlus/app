import {HomeDrawerNavigator} from './HomeDrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Instabug from 'instabug-reactnative';

const {Navigator, Screen} = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer onStateChange={Instabug.onStateChange}>
    <Navigator headerMode="none">
      <Screen name={'Drawer'} component={HomeDrawerNavigator} />
    </Navigator>
  </NavigationContainer>
);
