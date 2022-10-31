import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../assets/icons';
import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {TimetableLoadingIndicator} from '../components/TimetableLoadingIndicator';
import {PdfViewer} from '../components/PdfViewer';

export const SchoolLifeScreen = ({navigation}) => {
  const [timetablesData, setTimetablesData] = React.useState(null);
  const [timetableOpen, setTimetableOpen] = React.useState(false);
  const [timetableValue, setTimetableValue] = React.useState();
  const [selectedTimetable, setSelectedTimetable] = React.useState(null);
  const [themeState, setThemeState] = React.useState(null);

  const theme = useTheme();
  const isFocused = useIsFocused();

  const getTheme = async () => {
    let themeAS = await AsyncStorage.getItem('theme');
    if (themeAS != null) {
      setThemeState(themeAS);
    }
  };

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
    (async () => {
      if (isFocused) {
        await getTheme();
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
      <Layout style={styles.layout}>
        {timetablesData ? (
          <View style={styles.flex}>
            <DropdownPicker
              theme={themeState === 'light' ? 'LIGHT' : 'DARK'}
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
                <PdfViewer theme={themeState} url={selectedTimetable} />
              </View>
            ) : null}
          </View>
        ) : (
          <TimetableLoadingIndicator />
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
    width: '100%',
  },
  scrollView: {
    flex: 1,
    maxHeight: '100%',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
