import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import QuestionsScreen from '../screens/QuestionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuestionsBaseScreen from '../screens/QuestionsBaseScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen}
                        options={({ navigation }) => ({
                          headerShown: false,
                          title: ''
                        })}/>
      
      <HomeStack.Screen name="QuestionBase" component={QuestionsBaseScreen}
                        options={({ navigation, route }) => ({
                          headerShown: true,
                          title: 'Baza pytań',
                        })}/>
      <HomeStack.Screen name="Categories" component={CategoriesScreen}
                        options={({ navigation, route }) => ({
                          headerShown: true,
                          title: '' + route.params.departmentName,
                        })}/>
      <HomeStack.Screen name="Questions" component={QuestionsScreen}
                        options={({ navigation, route }) => ({
                          headerShown: true,
                          title: '' + route.params.categoryName,
                        })}/>
      <HomeStack.Screen name="Settings"
                        component={SettingsScreen}
                        options={({ navigation }) => ({
                          title: 'Ustawienia'
                        })} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;