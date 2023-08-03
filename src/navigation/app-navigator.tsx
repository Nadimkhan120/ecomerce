import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {Details } from '@/screens';
import { TabNavigator } from './tab-navigator';

export type AppStackParamList = {
  TabNavigator: undefined;
  Details: { id: number };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Group>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Details" component={Details} options={{
          headerBackTitle:"Back"
        }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
