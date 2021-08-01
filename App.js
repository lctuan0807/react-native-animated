import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen, FloatingHeartScreen } from './screens/'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="FloatingHeart">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="FloatingHeart" component={FloatingHeartScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
