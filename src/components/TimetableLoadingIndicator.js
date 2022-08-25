import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import {ActivityIndicator} from 'react-native';

export const TimetableLoadingIndicator = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        styles.horizontal,
        {backgroundColor: theme['background-basic-color-1']},
      ]}>
      <ActivityIndicator color={theme['text-basic-color']} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 50,
  },
});
