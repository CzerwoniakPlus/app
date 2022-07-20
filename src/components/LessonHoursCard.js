import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="clock-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Godziny dzwonków
        </Text>
      </View>
    </View>
  );
};

const Footer = props => {
  return (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Text category="c1" style={styles.footerText}>
        {props.isUserOffline
          ? 'Brak połączenia z internetem - obecnie widzisz dane zapisane w pamięci podręcznej.'
          : `Ostatnia aktualizacja danych: ${props.timeOfRefresh}`}
      </Text>
    </View>
  );
};

export const LessonHoursCard = props => {
  const isUserOffline = props.data.disconnected ? true : false;
  const lesson = Object.keys(props.data).map(l => {
    return (
      <Text style={styles.lessonTimeText} key={l}>
        {l}. {props.data[l].start} - {props.data[l].end}
      </Text>
    );
  });
  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card
          style={styles.card}
          header={Header}
          footer={
            <Footer
              timeOfRefresh={props.timeOfRefresh}
              isUserOffline={isUserOffline}
            />
          }>
          {lesson}
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
    borderTopColor: '#FF7E6B',
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
  lessonTimeText: {
    textAlign: 'center',
  },
});
