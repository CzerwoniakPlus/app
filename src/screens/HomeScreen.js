import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {MenuIcon} from '../assets/icons';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useNavigation,
  DrawerActions,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import {ImportantInfoCard} from '../components/ImportantInfoCard';
import {ScrollView, StyleSheet} from 'react-native';
import {RefreshControl} from 'react-native-web-refresh-control';
import {LuckyNumberCard} from '../components/LuckyNumberCard';
import {VacationCard} from '../components/VacationCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LessonBreakCard} from '../components/LessonBreakCard';
import {View} from 'react-native';
import {firebase} from '@react-native-firebase/messaging';
import {useIsConnected} from 'react-native-offline';
import {OfflineNotice} from '../components/OfflineNotice';
import {requestNotifications} from 'react-native-permissions';

export const HomeScreen = () => {
  const theme = useTheme();
  const [apiHomeData, setApiHomeData] = React.useState(null);
  const [isRefreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const [refreshInterval, setRefreshInterval] = React.useState(0);
  const [autoRefreshAllowed, setAutoRefreshAllowed] = React.useState(null);
  const isConnected = useIsConnected();

  const checkNotificationsSubscription = async () => {
    const firstRun = await AsyncStorage.getItem('appFirstRun');
    if (firstRun === null) {
      console.log('isConnected:', isConnected);
      if (!isConnected) {
        return;
      } else {
        await AsyncStorage.setItem('appFirstRun', 'false');
        const {status} = await requestNotifications([
          'alert',
          'sound',
          'badge',
        ]);
        if (status === 'granted') {
          console.log('User granted notifications');
          firebase
            .messaging()
            .subscribeToTopic('luckyNumberV2')
            .then(async () => {
              await AsyncStorage.setItem('luckyNumber', 'true').then(() => {
                console.log(
                  'subscribed to luckyNumber notifications on first run',
                );
              });
            });
          firebase
            .messaging()
            .subscribeToTopic('announcementsV2')
            .then(async () => {
              await AsyncStorage.setItem('announcements', 'true').then(() => {
                console.log(
                  'subscribed to announcements notifications on first run',
                );
              });
            });
          firebase
            .messaging()
            .getToken()
            .then(async token => {
              await AsyncStorage.setItem('notificationToken', token).then(
                () => {
                  console.log('notificationToken saved: ', token);
                },
              );
            });
        } else {
          console.log('User denied notifications');
        }
      }
    }
  };

  const getHomeData = async () => {
    let jsonResponse;
    try {
      const response = await fetch('https://api.czerwoniakplus.pl/v2/home');
      jsonResponse = await response.json();
      if (jsonResponse != null) {
        AsyncStorage.setItem('homeScreenCache', JSON.stringify(jsonResponse));
      }
    } catch (error) {
      let homeScreenCache = await AsyncStorage.getItem('homeScreenCache');
      if (homeScreenCache != null) {
        jsonResponse = JSON.parse(homeScreenCache);
      } else {
        jsonResponse = {
          news: [
            {
              content:
                'Nie udało się pobrać danych z API. Sprawdź swoje połączenie z siecią.',
              time: 'właśnie teraz',
            },
          ],
          lesson: {
            type: 'error',
            isShortLessons: false,
          },
          luckyNumber: {
            info: 'Nie udało się pobrać danych z API.',
            number: '',
          },
          vacation: {
            daysTotal: -1,
            daysLeft: -1,
            procent: 1,
          },
        };
      }
    } finally {
      setApiHomeData(jsonResponse);
      setRefreshing(false);
    }
  };

  const checkAutoRefreshAllowed = async () => {
    let isAutoRefreshAllowed = await AsyncStorage.getItem(
      'isAutorefreshAllowed',
    );
    if (isAutoRefreshAllowed != null) {
      const isTrueSet = isAutoRefreshAllowed === 'true';
      if (isTrueSet) {
        setAutoRefreshAllowed(true);
      } else {
        setAutoRefreshAllowed(false);
      }
    } else {
      AsyncStorage.setItem('isAutorefreshAllowed', 'true');
      setAutoRefreshAllowed(true);
    }
  };

  useEffect(() => {
    setRefreshing(true);
    checkNotificationsSubscription();
    getHomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    (async () => {
      if (isFocused) {
        await checkAutoRefreshAllowed();
        onRefresh();
        // console.log(await firebase.messaging().getToken());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        clearInterval(refreshInterval);
        if (autoRefreshAllowed) {
          const interval = setInterval(() => {
            setRefreshing(true);
            getHomeData();
          }, 30000);
          setRefreshInterval(interval);
        }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoRefreshAllowed, isFocused]),
  );

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearInterval(refreshInterval);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshInterval, isFocused]),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getHomeData();
  }, []);

  const navigation = useNavigation();

  const renderDrawerAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    />
  );

  return (
    <SafeAreaView
      style={[
        styles.mainView,
        {backgroundColor: theme['background-basic-color-1']},
      ]}>
      <TopNavigation
        title="Twój niezbędnik"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      <Divider />
      {isConnected ? null : <OfflineNotice />}
      <ScrollView
        style={styles.mainLayout}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.flex}>
          <View style={styles.cardScrollView}>
            {apiHomeData ? (
              <ImportantInfoCard data={apiHomeData.news[0]} />
            ) : null}
            <Layout style={styles.rowLayout}>
              <Layout style={styles.flex}>
                {apiHomeData ? (
                  <LuckyNumberCard data={apiHomeData.luckyNumber} />
                ) : null}
              </Layout>
              <Layout style={styles.flex}>
                {apiHomeData ? (
                  <VacationCard data={apiHomeData.vacation} />
                ) : null}
              </Layout>
            </Layout>
            {apiHomeData ? <LessonBreakCard data={apiHomeData.lesson} /> : null}
            {/* <Layout style={styles.spacer} /> */}
          </View>
        </View>
      </ScrollView>
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
    flex: 1,
    alignItems: 'center',
  },
  rowLayout: {
    flexDirection: 'row',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  spacer: {
    height: 100,
  },
});
