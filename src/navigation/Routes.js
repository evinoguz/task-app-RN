import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenName from '../constants/ScreenName';
import SplashScreen from '../pages/SplashScreen';
import OnboardingScreen from '../pages/OnboardingScreen';
import TaskListScreen from '../pages/TaskListScreen';
import AddTaskScreen from '../pages/AddTaskScreen';
import colors from '../themes/Colors';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.taskList}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text,
        headerBackVisible: false,
      }}>
      <Stack.Screen
        name={ScreenName.splash}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenName.onboarding}
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenName.taskList}
        component={TaskListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={ScreenName.addTask}
        component={AddTaskScreen}
        options={({navigation}) => {
          return {
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  size={24}
                  color="#000"
                  style={{marginLeft: 10}}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
          };
        }}
      />
    </Stack.Navigator>
  );
}
