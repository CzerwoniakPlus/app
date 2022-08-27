import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TimetableWebView} from '../components/TimetableWebView';
import {StyleSheet} from 'react-native';

export const SchoolLifeScreen = ({navigation}) => {
  const [timetableURL, setTimetableURL] = React.useState(null);

  const getTimetableURL = async () => {
    const url = await (
      await fetch('https://api.czerwoniakplus.pl/v2/timetableurl')
    ).text();
    setTimetableURL(url);
  };

  React.useEffect(() => {
    getTimetableURL();
  }, []);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title="Plan lekcji"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <TimetableWebView
          timetableLink={`https://docs.google.com/gview?embedded=true&url=${timetableURL}`}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
});
