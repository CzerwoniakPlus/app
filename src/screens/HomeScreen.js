import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {MenuIcon} from '../assets/icons';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {ImportantInfoCard} from '../components/ImportantInfoCard';
import {ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {LuckyNumberCard} from '../components/LuckyNumberCard';
import {VacationCard} from '../components/VacationCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LessonBreakCard} from '../components/LessonBreakCard';

export const HomeScreen = () => {
  const [apiHomeData, setApiHomeData] = React.useState(null);
  const [isRefreshing, setRefreshing] = React.useState(false);

  const getHomeData = async () => {
    let jsonResponse;
    try {
      const response = await fetch('https://dev-api.czerwoniakplus.pl/home');
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
            type: 'weekend',
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

  useEffect(() => {
    //onComponentMount
    setRefreshing(true);
    getHomeData();
    const refreshInterval = setInterval(() => {
      setRefreshing(true);
      getHomeData();
    }, 30000);
    //onComponentUnmount
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

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
    <SafeAreaView style={styles.mainView}>
      <TopNavigation
        title="Twój niezbędnik"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      <Divider />
      <Layout style={styles.mainLayout}>
        <ScrollView
          contentContainerStyle={styles.cardScrollView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
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
    flex: 1,
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
});
