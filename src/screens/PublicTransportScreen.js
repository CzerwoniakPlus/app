import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export const PublicTransportScreen = ({navigation}) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={ArrowIosBackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation
        title="Komunikacja miejska"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <Text category="h1">Wkrótce</Text>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
