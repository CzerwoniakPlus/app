import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {TimetableLoadingIndicator} from '../components/TimetableLoadingIndicator';

export const TimetableWebView = props => {
  return (
    <View style={styles.view}>
      <WebView
        source={{uri: props.timetableLink}}
        startInLoadingState={true}
        scalesPageToFit={true}
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
  },
});
