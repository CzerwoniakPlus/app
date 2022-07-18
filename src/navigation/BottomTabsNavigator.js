import {BulbIcon, TVIcon} from '../assets/icons';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
} from '@ui-kitten/components';

import {HomeScreen} from '../screens/HomeScreen';
import React from 'react';
import {NewsScreen} from '../screens/NewsScreen';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <View>
    <Divider />
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="Twój niezbędnik" icon={BulbIcon} />
      <BottomNavigationTab title="Aktualności" icon={TVIcon} />
    </BottomNavigation>
  </View>
);

export const BottomTabsNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      name="Strona główna"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Screen
      name="Aktualności"
      component={NewsScreen}
      options={{headerShown: false}}
    />
  </Navigator>
);
