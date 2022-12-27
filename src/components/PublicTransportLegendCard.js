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

const parseData = data => {
  const result = [];
  if (data.error) {
    return <Text>{data.message}</Text>;
  } else {
    for (let i = 0; i < data.length; i++) {
      result.push(
        <Text key={i}>
          {data[i].type} - {data[i].definition}
        </Text>,
      );
    }
    return result;
  }
};

export const PublicTransportLegendCard = props => {
  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card style={styles.card} header={Header}>
          {parseData(props.data)}
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
