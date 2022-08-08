import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';
import * as Progress from 'react-native-progress';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="sun-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Wakacje
        </Text>
      </View>
    </View>
  );
};

export const VacationCard = props => {
  const daysLeft = props.data.daysLeft;
  if (daysLeft > 0) {
    return (
      <React.Fragment>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card} header={Header}>
            <Text>Do wakacji pozostało jeszcze</Text>
            <Text style={styles.vacationTimeRemainingText}>
              {props.data.daysLeft} dni
            </Text>
            <View style={styles.progressBarView}>
              <Progress.Bar
                style={styles.progressBar}
                progress={props.data.procent}
                height={15}
                color="#41C655"
              />
            </View>
          </Card>
        </Layout>
      </React.Fragment>
    );
  } else if (daysLeft === -1) {
    return (
      <React.Fragment>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card} header={Header}>
            <Text>Nie udało się pobrać danych z API.</Text>
          </Card>
        </Layout>
      </React.Fragment>
    );
  } else if (daysLeft === 0) {
    return (
      <React.Fragment>
        <Layout style={styles.topContainer} level="1">
          <Card style={styles.card} header={Header}>
            <Text>Mamy już wakacje, miłego wypoczynku! 🎉</Text>
          </Card>
        </Layout>
      </React.Fragment>
    );
  } else {
    return null;
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
    margin: 2,
    maxHeight: 250,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#41C655',
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
  vacationTimeRemainingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
  progressBarView: {
    flexDirection: 'row',
  },
  progressBar: {
    marginTop: 10,
    width: '100%',
  },
});
