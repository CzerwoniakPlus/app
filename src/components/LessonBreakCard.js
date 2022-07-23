import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const theme = useTheme();
  switch (props.data.type) {
    case 'Lekcja':
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
              Lekcja {props.data.number}
            </Text>
          </View>
        </View>
      );
    case 'Przerwa':
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
              Przerwa {props.data.number}
            </Text>
          </View>
        </View>
      );
    case 'afternoon':
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
              Koniec lekcji
            </Text>
          </View>
        </View>
      );
    case 'evening':
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
              Koniec lekcji
            </Text>
          </View>
        </View>
      );
    case 'morning':
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
              Smacznej kawusi ☕
            </Text>
          </View>
        </View>
      );
    case 'weekend':
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
              Weekend 🎉
            </Text>
          </View>
        </View>
      );
    default:
      break;
  }
};

const Body = props => {
  switch (props.data.type) {
    case 'Lekcja':
      return <Text>{props.data.timeLeft} do końca</Text>;
    case 'Przerwa':
      return <Text>{props.data.timeLeft} do końca</Text>;
    case 'afternoon':
      return <Text>Miłego popołudnia!</Text>;
    case 'evening':
      return <Text>Dobranoc 😴</Text>;
    case 'morning':
      return <Text>Pozostało {props.data.timeLeft} do 1 lekcji</Text>;
    case 'weekend':
      return <Text>Miłego weekendu!</Text>;
    default:
      break;
  }
};

const Footer = props => {
  let isShortLessons = null;
  if (props.data.isShortLessons) {
    isShortLessons = (
      <View {...props} style={[props.style, styles.footerContainer]}>
        <Text category="c1" style={styles.shortLessonsText}>
          Lekcje skrócone 🥳
        </Text>
      </View>
    );
  }
  return isShortLessons;
};

export const LessonBreakCard = props => {
  const navigation = useNavigation();
  const navigateSchoolBells = () => {
    navigation.navigate('Życie szkoły', {screen: 'Dzwonki'});
  };

  const number = props.data.number;
  if (parseInt(number, 10) !== -1) {
    return (
      <React.Fragment>
        <TouchableOpacity
          style={styles.topContainer}
          onPress={() => navigateSchoolBells()}>
          <Layout style={styles.fullWidthLayout} level="1">
            {props.data.isShortLessons ? (
              <Card
                disabled={true}
                style={styles.card}
                header={<Header data={props.data} />}
                footer={<Footer data={props.data} />}>
                <Body data={props.data} />
              </Card>
            ) : (
              <Card
                style={styles.card}
                disabled={true}
                header={<Header data={props.data} />}>
                <Body data={props.data} />
              </Card>
            )}
          </Layout>
        </TouchableOpacity>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <TouchableOpacity
          style={styles.topContainer}
          onPress={() => navigateSchoolBells()}>
          <Layout style={styles.fullWidthLayout} level="1">
            <Card style={styles.card} disabled={true} header={Header}>
              <Text>Miłego wypoczynku!</Text>
            </Card>
          </Layout>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  card: {
    flex: 1,
    maxHeight: 250,
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#F9C939',
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
  shortLessonsText: {
    textAlign: 'right',
  },
  fullWidthLayout: {
    width: '100%',
  },
});
