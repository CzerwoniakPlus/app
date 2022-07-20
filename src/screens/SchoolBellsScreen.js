import {
  Divider,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {LessonHoursCard} from '../components/LessonHoursCard';
import { SchoolCalendarCard } from '../components/SchoolCalendarCard';

export const SchoolBellsScreen = ({navigation}) => {
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [lessonHours, setLessonHours] = React.useState(null);

  const getLessonHours = async () => {
    let jsonResponse;
    try {
      const response = await fetch('https://api.czerwoniakplus.pl/lessonHours');
      jsonResponse = await response.json();
      if (jsonResponse != null) {
        AsyncStorage.setItem('bellCache', JSON.stringify(jsonResponse));
      }
    } catch (error) {
      let bellCache = await AsyncStorage.getItem('bellCache');
      if (bellCache != null) {
        jsonResponse = JSON.parse(bellCache);
        jsonResponse = {...jsonResponse, disconnected: true};
      } else {
        jsonResponse = {
          disconnected: true,
          1: {
            start: '08:00',
            end: '08:45',
          },
          2: {
            start: '08:55',
            end: '09:40',
          },
          3: {
            start: '09:50',
            end: '10:35',
          },
          4: {
            start: '10:45',
            end: '11:30',
          },
          5: {
            start: '11:40',
            end: '12:25',
          },
          6: {
            start: '12:35',
            end: '13:20',
          },
          7: {
            start: '13:30',
            end: '14:15',
          },
          8: {
            start: '14:25',
            end: '15:10',
          },
          9: {
            start: '15:15',
            end: '16:00',
          },
          10: {
            start: '16:10',
            end: '16:55',
          },
        };
      }
    } finally {
      setRefreshing(false);
      setLessonHours(jsonResponse);
    }
  };

  React.useEffect(() => {
    setRefreshing(true);
    getLessonHours();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getLessonHours();
  }, []);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigateBack} />
  );

  const now = new Date();
  const dateTime = `${('0' + now.getDate()).slice(-2)}.${(
    '0' +
    (now.getMonth() + 1)
  ).slice(-2)}.${now.getFullYear()} ${('0' + now.getHours()).slice(-2)}:${(
    '0' + now.getMinutes()
  ).slice(-2)}:${('0' + now.getSeconds()).slice(-2)}`;

  return (
    <SafeAreaView style={styles.mainView}>
      <TopNavigation
        title="Dzwonki"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.mainLayout}>
        <ScrollView
          contentContainerStyle={styles.cardScrollView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {lessonHours ? (
            <LessonHoursCard timeOfRefresh={[dateTime]} data={lessonHours} />
          ) : null}
          <SchoolCalendarCard />
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
