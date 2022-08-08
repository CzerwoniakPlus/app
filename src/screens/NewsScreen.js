import {MenuIcon} from '../assets/icons';
import {
  Divider,
  // Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {RefreshControl} from 'react-native-web-refresh-control';
import {NewsCard} from '../components/NewsCard';

export const NewsScreen = () => {
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [apiSchoolNewsData, setApiSchoolNewsData] = React.useState(null);

  const getData = async () => {
    let jsonResponse;
    try {
      const response = await fetch('https://api.czerwoniakplus.pl/schoolNews');
      jsonResponse = await response.json();
      if (jsonResponse != null) {
        AsyncStorage.setItem('schoolNewsCache', JSON.stringify(jsonResponse));
      }
    } catch (error) {
      let schoolNewsCache = await AsyncStorage.getItem('schoolNewsCache');
      if (schoolNewsCache != null) {
        jsonResponse = JSON.parse(schoolNewsCache);
      } else {
        jsonResponse = [
          {
            title: 'Brak połączenia z siecią',
            content:
              'Nie udało się pobrać aktualności szkolnych. Sprawdź swoje połączenie z internetem.',
          },
        ];
      }
    } finally {
      setApiSchoolNewsData(jsonResponse);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setRefreshing(true);
    getData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
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
        title="Aktualności"
        alignment="center"
        accessoryLeft={renderDrawerAction}
      />
      <Divider />
      <ScrollView style={styles.mainLayout}>
        <ScrollView
          contentContainerStyle={styles.cardScrollView}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {apiSchoolNewsData ? <NewsCard data={apiSchoolNewsData} /> : null}
          {/* <Layout style={styles.spacer} /> */}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  mainLayout: {
    // flexGrow: 1,
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
