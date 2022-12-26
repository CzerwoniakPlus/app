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
import Instabug, {APM, CrashReporting, Replies} from 'instabug-reactnative';
import {instabug_key, admob_banner_id} from '@env';
import {Appearance} from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  // TestIds,
} from 'react-native-google-mobile-ads';

export default () => {
  mobileAds().initialize();
  LogBox.ignoreLogs([
    'You need to specify name or key when calling navigate with an object as the argument',
    'Found screens with the same name nested inside one another',
    'Stack Navigator: \'headerMode="none"\' is deprecated.',
    'Error - You need to specify name or key when calling navigate with an object as the argument. See https://reactnavigation.org/docs/navigation-actions#navigate for usage.',
  ]);
  const [theme, setTheme] = React.useState('light');
  const colorScheme = Appearance.getColorScheme();

  React.useEffect(() => {
    Instabug.start(instabug_key, [Instabug.invocationEvent.shake]);
    Instabug.setWelcomeMessageMode(Instabug.welcomeMessageMode.disabled);
    APM.setEnabled(true);
    Replies.setInAppNotificationsEnabled(false);
    Replies.setEnabled(false);
    CrashReporting.setEnabled(true);
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

  theme === 'light'
    ? StatusBar.setBackgroundColor('#FFFFFF')
    : StatusBar.setBackgroundColor('#222B45');

  theme === 'light'
    ? StatusBar.setBarStyle('dark-content')
    : StatusBar.setBarStyle('light-content');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
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
              <BannerAd
                unitId={admob_banner_id}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              />
            </SafeAreaProvider>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </NetworkProvider>
    </>
  );
};
