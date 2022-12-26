import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {StyleSheet, ScrollView} from 'react-native';
import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsConnected} from 'react-native-offline';
import {OfflineNotice} from '../components/OfflineNotice';
import {RefreshControl} from 'react-native-web-refresh-control';
import moment from 'moment';
import {DeparturesCard} from '../components/DeparturesCard';
import {PublicTransportLegendCard} from '../components/PublicTransportLegendCard';
import {PKSInfoCard} from '../components/PKSInfoCard';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';

export const PublicTransportScreen = ({navigation}) => {
  const isConnected = useIsConnected();
  const isFocused = useIsFocused();
  const [apiMagazynowaData, setApiMagazynowaData] = React.useState(null);
  const [apiPapiezaData, setApiPapiezaData] = React.useState(null);
  const papiezaApiUrl =
    'https://zkm-api.czerwoniakplus.eu.org/v1/departures/14';
  const magazynowaApiUrl =
    'https://zkm-api.czerwoniakplus.eu.org/v1/departures/7';

  const navigateBack = () => {
    navigation.goBack();
  };

  const getData = async () => {
    let jsonMagazynowa;
    let jsonPapieza;
    try {
      const body = {time: moment().format('HH:mm')};
      await fetch(magazynowaApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(async response => {
        jsonMagazynowa = await response.json();
      });
      await fetch(papiezaApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(async response => {
        jsonPapieza = await response.json();
      });
      if (jsonMagazynowa === [] || jsonPapieza === []) {
        try {
          await fetch(magazynowaApiUrl).then(async response => {
            jsonMagazynowa = await response.json();
          });
          await fetch(papiezaApiUrl).then(async response => {
            jsonPapieza = await response.json();
          });
        } catch (error) {
          jsonMagazynowa = jsonPapieza = {
            error: true,
            message:
              'Nie udało się pobrać danych z serwera. Sprawdź swoje połączenie z internetem.',
          };
        }
      }
    } catch (error) {
      jsonMagazynowa = jsonPapieza = {
        error: true,
        message:
          'Nie udało się pobrać danych z serwera. Sprawdź swoje połączenie z internetem.',
      };
    } finally {
      setApiMagazynowaData(jsonMagazynowa);
      setApiPapiezaData(jsonPapieza);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    setRefreshing(true);
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setRefreshing(true);
      getData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]),
  );

  React.useEffect(() => {
    setRefreshing(true);
    getData();
  }, [isConnected]);

  const [isRefreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
  }, []);

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigateBack} />
  );

  const theme = useTheme();

  return (
    <SafeAreaView
      style={[
        styles.flex,
        {backgroundColor: theme['background-basic-color-1']},
      ]}>
      <TopNavigation
        title="Komunikacja miejska"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      {isConnected ? null : <OfflineNotice />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <Layout style={styles.layout}>
          <PublicTransportLegendCard />
          {apiMagazynowaData == null || apiPapiezaData == null ? null : (
            <>
              <DeparturesCard
                direction="ul. Papieża Jana Pawła II"
                data={apiPapiezaData}
              />
              <DeparturesCard
                direction="ul. Magazynowa"
                data={apiMagazynowaData}
              />
            </>
          )}
          <PKSInfoCard />
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
