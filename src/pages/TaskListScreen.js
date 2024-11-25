import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../themes/Colors';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/SearchIcon.png';
import TodoItem from '../components/TodoItem';
import CustomButton from '../components/CustomButton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from '../components/EmptyList';
import Toast from 'react-native-toast-message';
import Status from '../components/Status';

const width = Dimensions.get('screen').width;

const TaskListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [filterTasks, setFilterTasks] = useState([]);
  const [activeStatus, setActiveStatus] = useState(null);

  const loadTasks = async () => {
    setActiveStatus(null);
    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      const sortTasks = tasks.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate),
      );
      setTasks(sortTasks);
      setFilterTasks([]);
      setSearchText('');
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const handleDeleteTask = async id => {
    try {
      const updatedTask = tasks.filter(task => task.id !== id);
      setTasks(updatedTask);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTask));
      Toast.show({
        type: 'error',
        text1: 'Info',
        text2: 'Deleted successful.',
      });
      if (activeStatus) {
        const filteredTasks = updatedTask.filter(task =>
          task.status.toLowerCase().includes(activeStatus.toLowerCase()),
        );
        setFilterTasks(filteredTasks);
      } else if (searchText) {
        const filteredSearchTasks = updatedTask.filter(task =>
          task.title.toLowerCase().includes(searchText.toLowerCase()),
        );
        setFilterTasks(filteredSearchTasks);
      } else {
        setFilterTasks(updatedTask);
      }
    } catch (error) {
      console.log('Failed to delete task', error);
    }
  };

  const filterTasksAll = () => {
    if (searchText) {
      const filtred = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilterTasks(filtred);
    } else {
      setFilterTasks(tasks);
    }
  };
  useEffect(() => {
    filterTasksAll();
  }, [searchText, tasks]);

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      setTasks([]);
      setFilterTasks([]);
      setSearchText('');
      Toast.show({
        type: 'error',
        text1: 'Info',
        text2: 'All data deleted successfully.',
      });
    } catch (error) {
      console.log('Failed to delete task', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <SafeAreaView style={[styles.container, styles.safeContainer]}>
          <CustomTextInput
            value={searchText}
            onChangeText={setSearchText}
            imageSource={SearchIcon}
            placeholder="Search"
            style={{marginHorizontal: 0}}
          />
          <View style={styles.main}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => loadTasks()}
                style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
                <Text style={styles.headerText}>Tasks</Text>
                <Text style={{fontSize: 18, fontWeight: '600'}}>(All)</Text>
              </TouchableOpacity>
              {tasks.length >= 1 && (
                <TouchableOpacity onPress={() => clearAll()}>
                  <Text style={styles.headerDeleteText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
            <Status
              tasks={tasks}
              setFilterTasks={setFilterTasks}
              activeStatus={activeStatus}
              setActiveStatus={setActiveStatus}
            />
          </View>
          <FlatList
            keyExtractor={item => item?.id.toString()}
            showsVerticalScrollIndicator={false}
            data={filterTasks}
            style={{marginBottom: 20}}
            renderItem={({item}) => (
              <TodoItem
                data={item}
                onDelete={() => handleDeleteTask(item.id)}
              />
            )}
            ListEmptyComponent={EmptyList}
          />
          <CustomButton
            onPress={() => navigation.navigate(ScreenName.addTask)}
            label={'Add Task'}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  mainContainer: {
    height: '100%',
    position: 'absolute',
    padding: 20,
    width: width,
  },
  safeContainer: {
    marginBottom: 20,
  },
  main: {
    marginBottom: 10,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  headerDeleteText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.red,
    padding: 1,
    borderBottomWidth: 0.2,
    borderBottomColor: 'red',
  },
});

export default TaskListScreen;
