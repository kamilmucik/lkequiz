import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
//import { render, cleanup, fireEvent } from 'react-native-testing-library';
import HomeScreen from '../../../../src/screens/quiz/HomeScreen'


const apiResponse = {"data": [{"id": 6, "name": "PPL(A) skrócony"}, {"id": 1, "name": "PPL(A)"}, {"id": 5, "name": "SPL"}], "status": 200, "totalPage": 1};

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



describe("<HomeScreen />", () => {

  beforeEach(async () => {
    // await AsyncStorage.setItem('@storage_lkequiz3', items);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the HomeScreen", async () => {
    fetch.mockResponseOnce(JSON.stringify(apiResponse));

    render(<HomeScreen />);

    // const item1 = await screen.findByText("test item");
    // const falseItem = screen.queryByText("i shouldn't exist");
    // expect(item1).toBeTruthy();
    // expect(falseItem).toBeFalsy();
  });
});