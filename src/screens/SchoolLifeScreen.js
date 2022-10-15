import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {useIsConnected} from 'react-native-offline';
import {OfflineNotice} from '../components/OfflineNotice';
import {TimetableOfflineCard} from '../components/TimetableOfflineCard';
import {View} from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import {TimetableViewer} from '../components/TimetableViewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TimetableLoadingIndicator} from '../components/TimetableLoadingIndicator';
import {useIsFocused} from '@react-navigation/native';

export const SchoolLifeScreen = ({navigation}) => {
  const [timetablesData, setTimetablesData] = React.useState(null);
  const [timetableOpen, setTimetableOpen] = React.useState(false);
  const [timetableValue, setTimetableValue] = React.useState();
  const [selectedTimetable, setSelectedTimetable] = React.useState(null);
  const isConnected = useIsConnected();
  const theme = useTheme();
  const isFocused = useIsFocused();

  const getTimetables = async () => {
    const data = await (
      await fetch('https://api.czerwoniakplus.pl/v2/timetables')
    ).json();
    setTimetablesData(data);
    AsyncStorage.getItem('last_timetable').then(result => {
      if (result) {
        setTimetableValue(result);
      }
    });
  };

  const getTimetable = async id => {
    if (id) {
      setSelectedTimetable(timetablesData.timetables[id]);
      AsyncStorage.setItem('last_timetable', id);
    }
  };

  React.useEffect(() => {
    getTimetables();
  }, []);

  React.useEffect(() => {
    getTimetables();
  }, [isConnected]);

  React.useEffect(() => {
    (async () => {
      if (isFocused) {
        setTimetableOpen(false);
      }
    })();
  }, [isFocused]);

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
      {isConnected ? null : <OfflineNotice />}
      <Layout style={styles.layout}>
        {isConnected ? (
          timetablesData ? (
            <View style={styles.flex}>
              <DropdownPicker
                theme={theme === 'light' ? 'LIGHT' : 'DARK'}
                closeOnBackPressed={true}
                style={[
                  {
                    backgroundColor: theme['background-basic-color-1'],
                  },
                  styles.border,
                ]}
                dropDownContainerStyle={{
                  backgroundColor: theme['background-basic-color-1'],
                }}
                labelStyle={{color: theme['text-basic-color']}}
                listItemLabelStyle={{color: theme['text-basic-color']}}
                schema={{
                  label: 'name',
                  value: 'id',
                }}
                selectedItemLabelStyle={styles.selectedItem}
                arrowIconStyle={{tintColor: theme['text-basic-color']}}
                tickIconStyle={{tintColor: theme['text-basic-color']}}
                placeholder="Wybierz klasę"
                translation={{
                  SEARCH_PLACEHOLDER: 'Wyszukaj...',
                }}
                searchable={true}
                open={timetableOpen}
                value={timetableValue}
                items={timetablesData.dataSet}
                maxHeight={350}
                setOpen={setTimetableOpen}
                setValue={setTimetableValue}
                onChangeValue={value => {
                  getTimetable(value);
                }}
              />
              {selectedTimetable ? (
                <View style={styles.flex}>
                  <TimetableViewer
                    data={selectedTimetable}
                    style={{backgroundColor: theme['background-basic-color-1']}}
                  />
                </View>
              ) : null}
            </View>
          ) : (
            <TimetableLoadingIndicator />
          )
        ) : (
          <TimetableOfflineCard />
        )}
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
  border: {
    borderRadius: 0,
    borderWidth: 0,
  },
  selectedItem: {
    fontWeight: 'bold',
  },
});
