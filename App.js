import * as eva from '@eva-design/eva';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';

import {AppNavigator} from './src/navigation/AppNavigator';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeContext} from './src/utils/ThemeContext';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import {NetworkProvider} from 'react-native-offline';

export default () => {
  LogBox.ignoreLogs([
    'You need to specify name or key when calling navigate with an object as the argument',
    'Found screens with the same name nested inside one another',
    'Stack Navigator: \'headerMode="none"\' is deprecated.',
  ]);
  const [theme, setTheme] = React.useState('light');

  React.useEffect(() => {
    AsyncStorage.getItem('theme')
      .then(savedTheme => {
        setTheme(savedTheme || 'light');
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');
    AsyncStorage.setItem('theme', nextTheme);
  };

  return (
    <>
      <NetworkProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{theme, toggleTheme}}>
          <ApplicationProvider {...eva} theme={eva[theme]}>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </NetworkProvider>
    </>
  );
};

// *****Default Code****
/* import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */
