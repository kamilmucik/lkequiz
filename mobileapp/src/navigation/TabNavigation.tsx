import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackScreen from './HomeStack';
import SettingsScreen from '../screens/SettingsScreen';
import KnowlageBaseStack from './KnowlageBaseStackScreen';
import GlobalStyle from "../utils/GlobalStyle";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  return (
    <Tab.Navigator 
      initialRouteName="HomeStack" 
      activeColor="#18376e"
      sceneContainerStyle={GlobalStyle.AppContainer}
      screenOptions={{ 
        activeTintColor: '#18376e',
        headerShown: false,
        unmountOnBlur: true
        }}>
        <Tab.Screen 
          name="HomeStack" 
          component={HomeStackScreen} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} 
          />
        <Tab.Screen 
          name="Baza wiedzy" 
          component={KnowlageBaseStack} 
          options={{
            tabBarLabel: 'Baza wiedzy',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="book" color={color} size={size} />
            )
          }} 
          />
        <Tab.Screen 
          name="Ustawienia" 
          component={SettingsScreen} 
          options={{
            tabBarLabel: 'Ustawienia',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}/>
      </Tab.Navigator>
  );
};

export default TabNavigator;