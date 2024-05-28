import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClockRotateLeft, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HabitsScreen from './one';
import HabitsHistoryScreen from './two';
import ProfileScreen from './three';

export default function TabLayout() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
  
            if (route.name === 'Hábitos') {
              icon = <FontAwesomeIcon icon={faCheck} size={size} color={color} />;
            } else if (route.name === 'Histórico') {
              icon = <FontAwesomeIcon icon={faClockRotateLeft} size={size} color={color} />;
            } else if (route.name === 'Perfil') {
              icon = <FontAwesomeIcon icon={faUser} size={size} color={color} />;
            }
  
            return icon;
          },
          headerShown: false,
          tabBarStyle: { backgroundColor: '#1e1b4b' },
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: 'white'
        })}
        >
        <Tab.Screen name="Hábitos" component={HabitsScreen} />
        <Tab.Screen name="Histórico" component={HabitsHistoryScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
