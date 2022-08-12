import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  Layout,
  Text,
  Icon,
  useTheme,
  Toggle,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../utils/ThemeContext';

const Header = props => {
  const theme = useTheme();
  return (
    <View {...props}>
      <View style={styles.headerTextView}>
        <Icon
          name="options-2-outline"
          fill={theme['text-basic-color']}
          width={24}
          height={24}
        />
        <Text category="h6" style={styles.headerText}>
          Ustawienia aplikacji
        </Text>
      </View>
    </View>
  );
};

export const AppSettingsCard = props => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(false);
  const [autoRefreshAllowed, setAutoRefreshAllowed] = React.useState(true);
  const themeContext = React.useContext(ThemeContext);

  React.useEffect(() => {
    setUsingDarkMode(props.usingDarkMode);
    setAutoRefreshAllowed(props.autoRefreshAllowed);
  }, [props.usingDarkMode, props.autoRefreshAllowed]);

  const toggleTheme = () => {
    themeContext.toggleTheme();
    const nextTheme = usingDarkMode ? 'light' : 'dark';
    setUsingDarkMode(!usingDarkMode);
    AsyncStorage.setItem('theme', nextTheme);
  };

  const toggleAutoRefresh = async () => {
    const nextAutoRefreshAllowed = autoRefreshAllowed ? 'false' : 'true';
    await AsyncStorage.setItem('isAutorefreshAllowed', nextAutoRefreshAllowed);
    setAutoRefreshAllowed(!autoRefreshAllowed);
  };

  return (
    <React.Fragment>
      <Layout style={styles.topContainer} level="1">
        <Card style={styles.card} header={Header}>
          <Layout style={[styles.topContainer, {marginBottom: 20}]} level="1">
            <Text>Dark mode </Text>
            <Toggle checked={usingDarkMode} onChange={toggleTheme} />
          </Layout>
          <Layout style={[styles.topContainer, {marginBottom: 20}]} level="1">
            <Text>Autoodświeżanie ekranu głównego</Text>
            <Toggle checked={autoRefreshAllowed} onChange={toggleAutoRefresh} />
          </Layout>
        </Card>
      </Layout>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%"
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
    flex: 1,
    flexDirection: 'row',
    marginLeft: -10,
  },
  headerText: {
    marginLeft: 5,
  },
});
