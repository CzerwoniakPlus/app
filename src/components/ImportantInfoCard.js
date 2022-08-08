import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Layout, Text, Icon, useTheme} from '@ui-kitten/components';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="bell-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Ogłoszenie
        </Text>
      </View>
    </View>
  );
};

const Footer = props => (
  <View {...props} style={[props.style, styles.footerContainer]}>
    <Text category="c1" style={styles.footerText}>
      {props.data.time}
    </Text>
  </View>
);

export const ImportantInfoCard = props => {
  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card
          style={styles.card}
          header={Header}
          footer={<Footer data={{time: props.data.time}} />}>
          <Text>{props.data.content}</Text>
        </Card>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
  },
  card: {
    flex: 1,
    margin: 2,
    borderWidth: 2.5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    borderTopColor: '#FC496A',
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
});
