import React from 'react';
import {Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Card, Layout, Text} from '@ui-kitten/components';

const Header = props => {
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Text category="h6" style={styles.headerText}>
          {props.data.title}
        </Text>
      </View>
    </View>
  );
};

const Footer = props => {
  return (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Text category="c1">Dotknij, aby otworzyć artykuł w przeglądarce</Text>
    </View>
  );
};

export const NewsCard = props => {
  const handleTouch = url => {
    Linking.openURL(url);
  };
  const newsList = props.data.map((news, index) => {
    return (
      <React.Fragment>
        <TouchableOpacity
          style={styles.topContainer}
          onPress={() => handleTouch(news.link)}>
          <Layout style={styles.fullWidthLayout} level="1" key={index}>
            <Card
              disabled={true}
              style={styles.card}
              header={<Header data={news} />}
              footer={Footer}>
              <Text>{news.content}</Text>
            </Card>
          </Layout>
        </TouchableOpacity>
      </React.Fragment>
    );
  });
  return newsList;
};

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
  card: {
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopWidth: 3.5,
    flex: 1,
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
  fullWidthLayout: {
    width: '100%',
  },
});
