import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="calendar-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Legenda
        </Text>
      </View>
    </View>
  );
};

const getData = async () => {
  let result = [];
  try {
    const response = await fetch(
      'https://zkm-api.czerwoniakplus.eu.org/v1/definition',
    );
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      result.push(
        <Text key={i}>
          {data[i].type} - {data[i].definition}
        </Text>,
      );
    }
  } catch (error) {
    result.push(
      <Text key={0}>
        Nie udało się pobrać danych. Sprawdź swoje połączenie z internetem.
      </Text>,
    );
  } finally {
    return result;
  }
};

export const PublicTransportLegendCard = props => {
  const [data, setData] = React.useState(<Text>Ładowanie...</Text>);
  React.useEffect(() => {
    getData().then(result => setData(result));
  }, []);
  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card style={styles.card} header={Header}>
          {data}
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
    borderTopColor: '#6879bd',
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
