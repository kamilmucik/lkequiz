import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
//import { render, cleanup, fireEvent } from 'react-native-testing-library';
import QuizScreen from '../../../../src/screens/quiz/QuizScreen'


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



describe("<QuizScreen />", () => {

  beforeEach(async () => {
    // await AsyncStorage.setItem('@storage_lkequiz3', items);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the QuizScreen", async () => {
    fetch.mockResponseOnce(JSON.stringify(apiResponse));
    
    const route = { params: { 
        quizCategoryName: 'quizCategoryName',
        quizCategoryId: 1,
        quizTimeLimit: 30,
        quizQuestionLimit: 5,
    } }
    const navigate = jest.fn();

    render(<QuizScreen route={route} navigation={{ navigate }} />);

    // const item1 = await screen.findByText("test item");
    // const falseItem = screen.queryByText("i shouldn't exist");
    // expect(item1).toBeTruthy();
    // expect(falseItem).toBeFalsy();
  });
});