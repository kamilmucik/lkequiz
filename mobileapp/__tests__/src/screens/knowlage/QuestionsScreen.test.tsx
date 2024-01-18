import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QuestionsScreen from '../../../../src/screens/knowlage/QuestionsScreen'


const apiResponse = {"data": [{"id": 6, "name": "PPL(A) skrócony"}, {"id": 1, "name": "PPL(A)"}, {"id": 5, "name": "SPL"}], "status": 200, "totalPage": 2};

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



describe("<QuestionsScreen />", () => {

  beforeEach(async () => {
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the QuestionsScreen", async () => {
    fetch.mockResponseOnce(JSON.stringify(apiResponse));
    const route = { params: { categoryId: 1 } }
    const navigate = jest.fn();

    render(<QuestionsScreen route={route} navigation={{ navigate }} />);
  });

  it("should render the QuestionsScreen and execute LoadMoreData", async () => {
    fetch.mockResponseOnce(JSON.stringify(apiResponse));
    const route = { params: { categoryId: 1 } }
    const navigate = jest.fn();

    render(<QuestionsScreen route={route} navigation={{ navigate }} />);
  });

  // it("should render the QuestionsScreen and execute press item", async () => {
  //   fetch.mockResponseOnce(JSON.stringify(apiResponse));
  //   const route = { params: { categoryId: 1 } }
  //   const navigate = jest.fn();

  //   render(<QuestionsScreen route={route} navigation={{ navigate }} />);
  // });


});