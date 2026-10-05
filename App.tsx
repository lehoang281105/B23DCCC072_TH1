import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import type {RootStackParamList} from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#1e6fb8'},
          headerTintColor: '#ffffff',
          headerTitleStyle: {fontWeight: '600'},
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Thời tiết'}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({route}) => ({title: route.params.cityName})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
