import {CalendarIcon, ClipboardIcon, ClockIcon} from '../assets/icons';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SchoolLifeScreen} from '../screens/SchoolLifeScreen';
import {SubstitutionsScreen} from '../screens/SubstitutionsScreen';
import {SchoolBellsScreen} from '../screens/SchoolBellsScreen';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}) => (
  <View>
    <Divider />
    <BottomNavigation
      appearance="noIndicator"
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title="Plan lekcji" icon={CalendarIcon} />
      <BottomNavigationTab title="Zastępstwa" icon={ClipboardIcon} />
      <BottomNavigationTab title="Dzwonki" icon={ClockIcon} />
    </BottomNavigation>
  </View>
);

export const SchoolNewsBottomTabsNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      name="Plan lekcji"
      component={SchoolLifeScreen}
      options={{headerShown: false}}
    />
    <Screen
      name="Zastępstwa"
      component={SubstitutionsScreen}
      options={{headerShown: false}}
    />
    <Screen
      name="Dzwonki"
      component={SchoolBellsScreen}
      options={{headerShown: false}}
    />
  </Navigator>
);
