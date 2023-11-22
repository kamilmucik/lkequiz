import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './TabNavigation';
import AppProvider from '../store/AppProvider';

const RootNavigator = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default RootNavigator;