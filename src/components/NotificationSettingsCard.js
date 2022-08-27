import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  Layout,
  Text,
  Icon,
  useTheme,
  Toggle,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/messaging';
import {useIsConnected} from 'react-native-offline';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="bell-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Ustawienia powiadomień
        </Text>
      </View>
    </View>
  );
};

export const NotificationSettingsCard = props => {
  const [announcementsEnabled, setannouncementsEnabled] = React.useState(true);
  const [luckyNumberEnabled, setluckyNumberEnabled] = React.useState(true);
  const isConnected = useIsConnected();

  React.useEffect(() => {
    setannouncementsEnabled(props.announcementsEnabled);
    setluckyNumberEnabled(props.luckyNumberEnabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const toggleAnnouncementsEnabled = async () => {
    const nextAnnouncementsStatus = announcementsEnabled ? 'false' : 'true';
    if (nextAnnouncementsStatus === 'true') {
      firebase
        .messaging()
        .subscribeToTopic('announcementsV2')
        .then(async () => {
          await AsyncStorage.setItem('announcements', 'true').then(() => {
            console.log('subscribed to announcements notifications');
          });
        });
    } else {
      firebase
        .messaging()
        .unsubscribeFromTopic('announcementsV2')
        .then(async () => {
          await AsyncStorage.setItem('announcements', 'false').then(() => {
            console.log('unsubscribed from announcements notifications');
          });
        });
    }
    setannouncementsEnabled(!announcementsEnabled);
  };

  const toggleLuckyNumberEnabled = async () => {
    const nextLuckyNumberStatus = luckyNumberEnabled ? 'false' : 'true';
    if (nextLuckyNumberStatus === 'true') {
      firebase
        .messaging()
        .subscribeToTopic('luckyNumberV2')
        .then(async () => {
          await AsyncStorage.setItem('luckyNumber', 'true').then(() => {
            console.log('subscribed to lucky number notifications');
          });
        });
    } else {
      firebase
        .messaging()
        .unsubscribeFromTopic('luckyNumberV2')
        .then(async () => {
          await AsyncStorage.setItem('luckyNumber', 'false').then(() => {
            console.log('unsubscribed from lucky number notifications');
          });
        });
    }
    setluckyNumberEnabled(!luckyNumberEnabled);
  };

  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card style={styles.card} header={Header}>
          <Layout style={[styles.topContainer]} level="1">
            <Text>Ważne ogłoszenia</Text>
            <Toggle
              checked={announcementsEnabled}
              onChange={toggleAnnouncementsEnabled}
              disabled={!isConnected}
            />
          </Layout>
          <Layout style={[styles.topContainer]} level="1">
            <Text>Szczęśliwy numerek</Text>
            <Toggle
              checked={luckyNumberEnabled}
              onChange={toggleLuckyNumberEnabled}
              disabled={!isConnected}
            />
          </Layout>
          {!isConnected ? (
            <Layout style={[styles.offlineContainer]} level="1">
              <Text status="warning" style={styles.offlineWarningText}>
                Błąd sieci.
              </Text>
              <Text status="warning" style={styles.offlineWarningText}>
                Sprawdź połączenie z internetem i spróbuj ponownie.
              </Text>
            </Layout>
          ) : null}
        </Card>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  offlineContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  offlineWarningText: {
    textAlign: 'center',
    width: '100%',
  },
  card: {
    flex: 1,
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#459652',
    borderTopWidth: 3.5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  footerText: {
    textAlign: 'right',
  },
  headerTextView: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -10,
  },
  headerText: {
    marginLeft: 5,
  },
});
