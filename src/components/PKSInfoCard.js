import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {
  Card,
  Layout,
  Text,
  Icon,
  useTheme,
  Button,
} from '@ui-kitten/components';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="car-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Rozkład jazdy PKS
        </Text>
      </View>
    </View>
  );
};

export const PKSInfoCard = props => {
  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card
          style={styles.card}
          header={Header}
          footer={
            <Text category="c1">
              Naciśnięcie guzika otworzy zewnętrzną stronę internetową
            </Text>
          }>
          <Text>
            Jeśli potrzebujesz informacji o rozkładzie jazdy autobusów PKS,
            skorzystaj z wyszukiwarki udostępnianej przez PKS Nova.
          </Text>
          <Layout style={styles.buttonLayout}>
            <Button
              onPress={() => Linking.openURL('https://www.pksnova.pl/')}
              style={styles.button}>
              pksnova.pl
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
  },
  card: {
    flex: 1,
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#6031f7',
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
    marginTop: 20,
  },
});
