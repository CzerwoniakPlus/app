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
import {Appearance} from 'react-native';

export default () => {
  LogBox.ignoreLogs([
    'You need to specify name or key when calling navigate with an object as the argument',
    'Found screens with the same name nested inside one another',
    'Stack Navigator: \'headerMode="none"\' is deprecated.',
  ]);
  const [theme, setTheme] = React.useState('light');
  const colorScheme = Appearance.getColorScheme();

  React.useEffect(() => {
    AsyncStorage.getItem('theme')
      .then(savedTheme => {
        setTheme(savedTheme || colorScheme || 'light');
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    AsyncStorage.getItem('theme')
      .then(savedTheme => {
        if (!savedTheme) {
          AsyncStorage.setItem('theme', colorScheme || 'light');
        }
        setTheme(savedTheme || colorScheme || 'light');
      })
      .catch(err => {
        console.log(err);
      });
  }, [colorScheme]);

  StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    StatusBar.setBarStyle(theme === 'light' ? 'dark-content' : 'light-content');
    AsyncStorage.setItem('theme', nextTheme);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ApplicationProvider {...eva} theme={eva[theme]}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
};
