import React from 'react';
import {StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';

export const TimetableViewer = props => {
  return <Pdf source={{uri: props.data}} style={[styles.view, props.style]} />;
};

const styles = StyleSheet.create({
  view: {
    alignSelf: 'stretch',
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
