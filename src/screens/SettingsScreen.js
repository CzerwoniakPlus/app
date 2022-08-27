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
import {useIsConnected} from 'react-native-offline';
import {NotificationSettingsCard} from '../components/NotificationSettingsCard';

export const SettingsScreen = ({navigation}) => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(false);
  const [autoRefreshAllowed, setAutoRefreshAllowed] = React.useState(true);
  const [announcementsEnabled, setannouncementsEnabled] = React.useState(true);
  const [luckyNumberEnabled, setluckyNumberEnabled] = React.useState(true);
  const [notificationSlidersEnabled, setnotificationSlidersEnabled] =
    React.useState(true);
  const isConnected = useIsConnected();

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getSavedTheme();
      checkAutoRefreshAllowed();
      checkAnnouncementsNotificationsEnabled();
      checkLuckyNumberNotificationsEnabled();
      checkNotificationSlidersEnabled();
    });
    return focusHandler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkAnnouncementsNotificationsEnabled = () => {
    AsyncStorage.getItem('announcements')
      .then(areAnnouncementsAllowed => {
        if (areAnnouncementsAllowed != null) {
          const isTrueSet = areAnnouncementsAllowed === 'true';
          isTrueSet === true
            ? setannouncementsEnabled(true)
            : setannouncementsEnabled(false);
        } else {
          setannouncementsEnabled(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkLuckyNumberNotificationsEnabled = () => {
    AsyncStorage.getItem('luckyNumber')
      .then(isLuckyNumberAllowed => {
        if (isLuckyNumberAllowed != null) {
          const isTrueSet = isLuckyNumberAllowed === 'true';
          isTrueSet === true
            ? setluckyNumberEnabled(true)
            : setluckyNumberEnabled(false);
        } else {
          setluckyNumberEnabled(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const checkNotificationSlidersEnabled = () => {
    if (isConnected) {
      setnotificationSlidersEnabled(true);
    } else {
      setnotificationSlidersEnabled(false);
    }
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
          <NotificationSettingsCard
            style={styles.fullWidth}
            announcementsEnabled={announcementsEnabled}
            luckyNumberEnabled={luckyNumberEnabled}
            togglesEnabled={notificationSlidersEnabled}
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
