import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';
import moment from 'moment';
import 'moment/locale/pl';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="navigation-2-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Odjazdy - kierunek {props.direction}
        </Text>
      </View>
    </View>
  );
};

export const DeparturesCard = props => {
  moment.locale('pl');
  const parseData = () => {
    const data = props.data;
    if (data.error) {
      return <Text>{data.message}</Text>;
    } else {
      if (data.length === 0) {
        return <Text>Brak odjazdów 😥</Text>;
      } else {
        let result = [];
        for (let i = 0; result.length < 5; i++) {
          if (!data[i]) {
            break;
          }
          if (data[i].line_id === 4) {
            continue;
          }
          if (i === 0) {
            result.push(
              <Text key={i}>
                Linia {data[i].line_id} - {data[i].time} {data[i].type_id} (
                {moment(data[i].time, 'HH:mm').fromNow()})
              </Text>,
            );
          } else {
            result.push(
              <Text key={i}>
                Linia {data[i].line_id} - {data[i].time} {data[i].type_id}
              </Text>,
            );
          }
        }
        return result;
      }
    }
  };

  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card
          style={styles.card}
          header={<Header direction={props.direction} />}
          footer={
            <Text category="c1">
              Pociągnij w dół, aby odświeżyć.{'\n'}
              Ostatnia aktualizacja danych:{' '}
              {moment().format('DD.MM.YYYY HH:mm')}.
            </Text>
          }>
          {parseData()}
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
    borderTopColor: '#6368d6',
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
