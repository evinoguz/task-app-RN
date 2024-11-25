import LottieView from 'lottie-react-native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomTextInput from '../components/CustomTextInput';
import TitleIcon from '../assets/images/TitleIcon.png';
import DatePickerIcon from '../assets/images/DatePickerIcon.png';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../themes/Colors';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import {statusData} from '../utils/statusData';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params || {};

  const [title, setTitle] = useState(data?.title?.toUpperCase() || '');
  const [startDate, setStartDate] = useState(data?.startDate || '');
  const [endDate, setEndDate] = useState(data?.endDate || '');
  const [value, setValue] = useState(data?.status || 'open');

  const [open, setOpen] = useState(false);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);

  const animationSource = data
    ? require('../assets/animations/pencil-edit.json')
    : require('../assets/animations/pencil.json');

  const [items, setItems] = useState(
    statusData.map(item => ({
      label: item.label,
      value: item.value,
    })),
  );

  const selectedColor =
    statusData.find(item => item.value === value)?.color || 'red';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data ? 'Update Task' : 'Add Task',
    });
  }, [data, navigation]);

  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };
  const showStartDatePicker = () => {
    setIsStartDatePickerVisible(true);
  };
  const handleConfirmStartDate = date => {
    setStartDate(date.toString());
    hideStartDatePicker();
  };

  const hideEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };
  const showEndDatePicker = () => {
    setIsEndDatePickerVisible(true);
  };
  const handleConfirmEndDate = date => {
    setEndDate(date.toString());
    hideEndDatePicker();
  };

  const handleAddTask = async () => {
    if (!title || !startDate || !endDate || !value) {
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: 'Lütfen alanları doldurunuz!.',
        topOffset: 0,
      });
      return;
    }
    const newTask = {
      id: data?.id || uuid.v4(),
      title,
      startDate,
      endDate,
      status: value,
    };
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasks = existingTasks ? JSON.parse(existingTasks) : [];

      if (data) {
        tasks = tasks.map(task => (task.id === data.id ? newTask : task));
      } else {
        tasks.push(newTask);
      }
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      Toast.show({
        type: data ? 'info' : 'success',
        text1: 'Info',
        text2: data ? 'Updated successful.' : 'Added successful.',
      });
      navigation.navigate(ScreenName.taskList);
    } catch (error) {
      console.log('Failed to save task', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.justify}>
        <View style={styles.inlineContainer}>
          <View style={styles.taskImageContainer}>
            <LottieView
              loop
              autoPlay
              style={{height: 150, width: '100%', marginBottom: 30}}
              source={animationSource}
            />
            <CustomTextInput
              imageSource={TitleIcon}
              value={title}
              onChangeText={setTitle}
              label={'Task Name'}
            />
            <View style={{flexDirection: 'row'}}>
              <CustomTextInput
                onPressIcon={() => showStartDatePicker()}
                imageSource={DatePickerIcon}
                style={{width: '40%'}}
                label={'Start Time'}
                value={startDate}
                onChangeText={setStartDate}
                isDate
              />
              <CustomTextInput
                onPressIcon={() => showEndDatePicker()}
                imageSource={DatePickerIcon}
                style={{width: '40%'}}
                label={'End Time'}
                value={endDate}
                onChangeText={setEndDate}
                isDate
              />
            </View>
            <View style={styles.dropContainer}>
              <View>
                <Text style={styles.statusTitle}>Status</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={{width: '90%'}}
                  dropDownContainerStyle={{
                    borderWidth: 0,
                  }}
                  textStyle={{
                    color: colors.text.primary,
                  }}
                  style={{
                    borderWidth: 1,
                    borderLeftWidth: 4,
                    borderColor: selectedColor,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <CustomButton
          onPress={handleAddTask}
          label={data ? 'Update Task' : 'Save Task'}
          style={styles.button}
        />
      </View>

      <DateTimePickerModal
        mode="datetime"
        onConfirm={handleConfirmStartDate}
        onCancel={hideStartDatePicker}
        isVisible={isStartDatePickerVisible}
      />
      <DateTimePickerModal
        mode="datetime"
        onConfirm={handleConfirmEndDate}
        onCancel={hideEndDatePicker}
        isVisible={isEndDatePickerVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
  },
  justify: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inlineContainer: {
    width: '100%',
  },
  taskImageContainer: {
    marginTop: 0,
  },
  dropContainer: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: '600',
    color: colors.text.primary,
  },
  button: {
    width: '95%',
  },
});

export default AddTaskScreen;
