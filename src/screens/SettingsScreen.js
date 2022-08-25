import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, StyleSheet} from 'react-native';
import {AppSettingsCard} from '../components/AppSettingsCard';

export const SettingsScreen = ({navigation}) => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(false);
  const [autoRefreshAllowed, setAutoRefreshAllowed] = React.useState(true);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getSavedTheme();
      checkAutoRefreshAllowed();
    });
    return focusHandler;
  }, [navigation]);

  const getSavedTheme = () => {
    AsyncStorage.getItem('theme')
      .then(savedTheme => {
        savedTheme === 'dark'
          ? setUsingDarkMode(true)
          : setUsingDarkMode(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkAutoRefreshAllowed = () => {
    AsyncStorage.getItem('isAutorefreshAllowed')
      .then(isAutoRefreshAllowed => {
        if (isAutoRefreshAllowed != null) {
          const isTrueSet = isAutoRefreshAllowed === 'true';
          isTrueSet === true
            ? setAutoRefreshAllowed(true)
            : setAutoRefreshAllowed(false);
        } else {
          setAutoRefreshAllowed(true);
          AsyncStorage.setItem('isAutorefreshAllowed', 'true');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={styles.mainView}>
      <TopNavigation
        title="Ustawienia"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.mainLayout}>
        <ScrollView contentContainerStyle={styles.cardScrollView}>
          <AppSettingsCard
            style={styles.fullWidth}
            usingDarkMode={usingDarkMode}
            autoRefreshAllowed={autoRefreshAllowed}
          />
          <Layout style={styles.spacer} />
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainLayout: {
    flexGrow: 1,
  },
  cardScrollView: {
    alignItems: 'center',
  },
  rowLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  spacer: {
    height: 100,
  },
  fullWidth: {
    width: '100%',
  },
});
