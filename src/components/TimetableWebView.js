import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {TimetableLoadingIndicator} from '../components/TimetableLoadingIndicator';

export const TimetableWebView = props => {
  return (
    <View style={styles.view}>
      <WebView
        style={{width: '100%', height: '100%'}}
        source={{uri: props.timetableLink}}
        startInLoadingState={true}
        // scalesPageToFit={true}
        showsVerticalScrollIndicator={false}
        renderLoading={() => <TimetableLoadingIndicator />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignSelf: 'stretch',
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
