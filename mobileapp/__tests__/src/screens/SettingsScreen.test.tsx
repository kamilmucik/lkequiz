import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../../../src/screens/SettingsScreen';

jest.mock("@react-native-async-storage/async-storage", () => "AsyncStorage");
jest.mock("react-native-select-dropdown", () => "SelectDropdown");
jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  };
});


beforeEach(() => {
  // windowFetchSpy = jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
  // jest.spyOn(Dimensions, 'get').mockReturnValue({ width: 414, height: 818 });
})

afterEach(() => {
  jest.restoreAllMocks();
});

test('should render the label of the social link', async () => {
    render(<SettingsScreen />)
});