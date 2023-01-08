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
import {AboutCard} from '../components/AboutCard';
import {OfflineNotice} from '../components/OfflineNotice';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

export const SettingsScreen = ({navigation}) => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(false);
  const [autoRefreshAllowed, setAutoRefreshAllowed] = React.useState(true);
  const [announcementsEnabled, setannouncementsEnabled] = React.useState(false);
  const [luckyNumberEnabled, setluckyNumberEnabled] = React.useState(false);
  const [notificationSlidersEnabled, setnotificationSlidersEnabled] =
    React.useState(true);
  const isConnected = useIsConnected();
  const isFocused = useIsFocused();
  const [notificationsAllowed, setNotificationsAllowed] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        getSavedTheme();
        checkAutoRefreshAllowed();
        checkNotificationSlidersEnabled();
        checkAnnouncementsNotificationsEnabled();
        checkLuckyNumberNotificationsEnabled();
        checkNotificationsAllowed();
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]),
  );

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

  const checkNotificationsAllowed = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    switch (result) {
      case RESULTS.UNAVAILABLE: {
        setNotificationsAllowed(false);
        break;
      }
      case RESULTS.DENIED: {
        setNotificationsAllowed(false);
        break;
      }
      case RESULTS.GRANTED: {
        setNotificationsAllowed(true);
        break;
      }
      case RESULTS.BLOCKED: {
        setNotificationsAllowed(false);
        break;
      }
    }
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

  const checkAnnouncementsNotificationsEnabled = async () => {
    let isAnnouncementsAllowed = await AsyncStorage.getItem('announcements');
    isAnnouncementsAllowed = isAnnouncementsAllowed === 'true';
    setannouncementsEnabled(isAnnouncementsAllowed);
  };

  const checkLuckyNumberNotificationsEnabled = async () => {
    let isLuckyNumberAllowed = await AsyncStorage.getItem('luckyNumber');
    isLuckyNumberAllowed = isLuckyNumberAllowed === 'true';
    setluckyNumberEnabled(isLuckyNumberAllowed);
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
      {isConnected ? null : <OfflineNotice />}
      <Layout style={styles.mainLayout}>
        <ScrollView contentContainerStyle={styles.cardScrollView}>
          <AboutCard style={styles.fullWidth} />
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
            notificationsAllowed={notificationsAllowed}
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
