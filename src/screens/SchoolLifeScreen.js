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
        //TODO: cleanup styles and
        //TODO: make timetableLink downloadable from API
        */}
        <TimetableWebView timetableLink="https://docs.google.com/gview?embedded=true&url=http://zs1rowecki.pl/images/Dokumenty_Szkolne/Plan%20lekcji%202021-22.pdf" />
      </Layout>
    </SafeAreaView>
  );
};
