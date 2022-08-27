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
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Plan lekcji"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/*
        //TODO: cleanup styles
        */}
        <TimetableWebView
          timetableLink={`https://docs.google.com/gview?embedded=true&url=${timetableURL}`}
        />
      </Layout>
    </SafeAreaView>
  );
};
