import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';
import {
  HomeIcon,
  SmileyOutlineIcon,
  CarIcon,
  SettingsIcon,
} from '../assets/icons';
import {SchoolLifeScreen} from '../screens/SchoolLifeScreen';
import {BottomTabsNavigator} from './BottomTabsNavigator';
import {PublicTransportScreen} from '../screens/PublicTransportScreen';
import React from 'react';
import {SettingsScreen} from '../screens/SettingsScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Linking} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {SchoolLifeBottomTabsNavigator} from './SchoolLifeBottomTabsNavigator';

const {Navigator, Screen} = createDrawerNavigator();

const DrawerContent = ({navigation, state}) => {
  const styles = useStyleSheet(themedStyles);

  const Header = () => (
    <Layout style={styles.header}>
      <View style={styles.profileContainer}>
        <Avatar size="giant" source={require('../assets/icon.png')} />
        <Text style={styles.profileName} category="h6">
          Czerwoniak+
        </Text>
      </View>
    </Layout>
  );

  return (
    <SafeAreaView>
      <Drawer
        header={Header}
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title="Strona główna" accessoryLeft={HomeIcon} />
        <DrawerItem title="Życie szkoły" accessoryLeft={SmileyOutlineIcon} />
        <DrawerItem title="Komunikacja miejska" accessoryLeft={CarIcon} />
        <DrawerItem title="Ustawienia" accessoryLeft={SettingsIcon} />
        <View />
        <DrawerItem
          title="Strona szkoły"
          onPress={() => Linking.openURL('http://zs1rowecki.pl/')}
        />
        <DrawerItem
          title="Facebook ZS1"
          onPress={() =>
            Linking.openURL('https://www.facebook.com/ZS1Czerwoniak')
          }
        />
        <DrawerItem
          title="Dziennik elektroniczny"
          onPress={() => Linking.openURL('https://portal.librus.pl')}
        />
      </Drawer>
    </SafeAreaView>
  );
};

export const HomeDrawerNavigator = () => {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme['background-basic-color-1'],
          width: 240,
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Screen
        name="Strona główna"
        component={BottomTabsNavigator}
        options={{headerShown: false}}
      />
      <Screen
        name="Życie szkoły"
        component={SchoolLifeBottomTabsNavigator}
        options={{headerShown: false}}
      />
      <Screen
        name="Komunikacja miejska"
        component={PublicTransportScreen}
        options={{headerShown: false}}
      />
      <Screen
        name="Ustawienia"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

const themedStyles = StyleService.create({
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
});
