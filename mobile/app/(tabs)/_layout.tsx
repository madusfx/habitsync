import React from 'react';
import { Link, Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockRotateLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable } from 'react-native';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

import HabitsScreen from './one';
import HabitsHistoryScreen from './two';

export default function TabLayout() {
  const renderOneScreen = () => <HabitsScreen />;

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;

            if (route.name === 'Hábitos') {
              icon = <FontAwesomeIcon icon={faCheck} size={size} color={color} />;
            } else if (route.name === 'Histórico') {
              icon = <FontAwesomeIcon icon={faClockRotateLeft} size={size} color={color} />;
            }

            return icon;
          },
          headerShown: false
        })}>
        <Tab.Screen name="Hábitos" component={HabitsScreen} />
        <Tab.Screen name="Histórico" component={HabitsHistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
