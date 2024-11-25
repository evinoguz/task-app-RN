import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './navigation/Routes';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
