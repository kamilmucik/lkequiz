import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/quiz/HomeScreen';
import CategoryScreen from '../screens/quiz/CategoryScreen';
import QuizScreen from '../screens/quiz/QuizScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator >
    <HomeStack.Screen name="Home" component={HomeScreen}
                      options={({ navigation, route }) => ({
                        headerShown: false,
                        title: '' ,
                      })}/>
      <HomeStack.Screen name="Category" component={CategoryScreen}
                        options={({ navigation, route }) => ({
                          headerShown: true,
                          title: 'Quiz:' + route.params.departmentName,
                          headerShadowVisible: false, // applied here
                          headerBackTitleVisible: false,
                        })}/>
      <HomeStack.Screen name="Quiz" component={QuizScreen}
                        options={({ navigation, route }) => ({
                          headerShown: false,
                          title: '' + route.params.departmentName,
                          headerShadowVisible: false, // applied here
                          headerBackTitleVisible: false,
                        })}/>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;