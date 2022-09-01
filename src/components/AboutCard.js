import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {
  Card,
  Layout,
  Text,
  Icon,
  useTheme,
  Button,
  Avatar,
} from '@ui-kitten/components';
import {version} from '../../package.json';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="info-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          O aplikacji
        </Text>
      </View>
    </View>
  );
};

const Footer = props => {
  return (
    <View {...props}>
      <Layout style={styles.footerLayout}>
        <Text category="s1" style={styles.textCenter}>
          Made with ❤ by Mateusz Tatko
        </Text>
      </Layout>
    </View>
  );
};

export const AboutCard = props => {
  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card style={styles.card} header={Header} footer={Footer}>
          <Layout style={styles.buttonLayout}>
            <Avatar size="giant" source={require('../assets/icon.png')} />
            <Text category="h6" style={styles.marginTop}>
              CzerwoniakPlus
            </Text>
            <Text category="s1">Wersja {version}</Text>
          </Layout>
          <Layout style={styles.buttonLayout}>
            <Text style={styles.aboutText}>
              Najnowsze i najważniejsze informacje, plany lekcji, wydarzenia
              więcej! Wszystko to na wyciągnięcie ręki użytkowników
              CzerwoniakaPlus.
            </Text>
            <Button
              style={styles.button}
              onPress={() => {
                Linking.openURL('https://github.com/CzerwoniakPlus');
              }}>
              Github - CzerwoniakPlus
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                Linking.openURL('https://github.com/mtatko');
              }}>
              Github - mtatko
            </Button>
            <Button
              style={styles.button}
              onPress={() => {
                Linking.openURL('https://api.czerwoniakplus.pl/v2/privacy');
              }}>
              Polityka prywatności
            </Button>
          </Layout>
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
  },
  footerLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#A9F0D1',
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
  buttonLayout: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
  marginTop: {
    marginTop: 5,
  },
  aboutText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
