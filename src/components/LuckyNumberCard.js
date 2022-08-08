import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';

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
          Szczęśliwy numerek
        </Text>
      </View>
    </View>
  );
};

export const LuckyNumberCard = props => {
  const number = props.data.number;
  if (parseInt(number, 10) !== -1) {
    return (
      <React.Fragment>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card} header={Header}>
            <Text>{props.data.info}</Text>
            <Text style={styles.luckyNumberText}>{props.data.number}</Text>
          </Card>
        </Layout>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card} header={Header}>
            <Text>Miłego wypoczynku!</Text>
          </Card>
        </Layout>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  card: {
    flex: 1,
    maxHeight: 250,
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#00AAF9',
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
    flexDirection: 'row',
    marginLeft: -10,
  },
  headerText: {
    marginLeft: 5,
  },
  luckyNumberText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});
