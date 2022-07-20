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
      <View style={{flex: 1, flexDirection: 'row', marginLeft: -10}}>
        <Icon
          name="calendar-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={{marginLeft: 5}}>
          Kalendarz roku szkolnego
        </Text>
      </View>
    </View>
  );
};

export const SchoolCalendarCard = props => {
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
            Na stronie kalendarzswiat.pl znajduje się kalendarz roku szkolnego.
            Na zielono zaznaczone są dni wolne od nauki z powodu świąt, zimowej
            oraz wiosennej przerwy świątecznej, a także ferii zimowych i
            wakacji. Po wskazaniu danej komórki kalendarza zostanie wyświetlony
            dymek z informacją o nazwie oraz liczbie dni pozostałych do
            wskazanej daty.
          </Text>
          <Layout style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button
              onPress={() =>
                Linking.openURL(
                  'https://www.kalendarzswiat.pl/kalendarz_szkolny/',
                )
              }
              style={{marginTop: 20}}>
              Kalendarz roku szkolnego
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
});
