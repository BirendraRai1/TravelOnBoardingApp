import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OnBoarding } from './screens';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='OnBoarding' component={OnBoarding} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App;
