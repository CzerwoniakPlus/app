import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from '@ui-kitten/components';

export const OfflineNotice = props => {
  const theme = useTheme();
  return (
    <View
      style={[styles.view, {backgroundColor: theme['border-warning-color-2']}]}>
      <Text
        style={{
          color: theme['color-basic-active'],
        }}>
        Brak połączenia z internetem
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
