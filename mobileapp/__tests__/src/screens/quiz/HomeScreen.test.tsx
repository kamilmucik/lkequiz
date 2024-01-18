import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
//import { render, cleanup, fireEvent } from 'react-native-testing-library';
import HomeScreen from '../../../../src/screens/quiz/HomeScreen'
// import useCustomFetch from '../../../../src/hooks/useCustomFetch';


const apiResponse = {"data": [{"id": 6, "name": "PPL(A) skrócony"}, {"id": 1, "name": "PPL(A)"}, {"id": 5, "name": "SPL"}], "status": 200, "totalPage": 1};
const apiResponse2 = {"data": [], "status": 200, "totalPage": 1};

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

let mockCustomFetching = {
  loading: true, 
  moreLoading: true, 
  data: []
};

let mockCustomFetched = {
  loading: false, 
  moreLoading: false, 
  data: [
    {"id": 6, "name": "PPL(A) skrócony"}, 
    {"id": 1, "name": "PPL(A)"}, 
    {"id": 5, "name": "SPL"}
  ]
};

// jest.mock('./hooks/useCustomFetch', () => {
//   return jest.fn(() => (mockCustomFetch))
// })

describe("<HomeScreen />", () => {

  beforeEach(async () => {
    // await AsyncStorage.setItem('@storage_lkequiz3', items);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should show list of departments", async () => {
    fetch.mockResponseOnce(JSON.stringify(apiResponse));
    jest.mock('../../../../src/hooks/useCustomFetch', () => {
      return jest.fn(() => (mockCustomFetched))
    })

    const { getByTestId } = render(<HomeScreen />)

    const flatList = getByTestId('flatListTestID');
    expect(flatList).toBeTruthy();
  });

  // it("should show indicator", async () => {
  //   // fetch.mockResponseOnce(JSON.stringify(apiResponse2));
  //   // jest.mock('../../../../src/hooks/useCustomFetch', () => {
  //   //   return jest.fn(() => (mockCustomFetching))
  //   // })
  //   // global.fetch = jest.fn(() => Promise.resolve({ json: () => ''}))
  //   fetch.mockImplementationOnce(() => Promise.reject("API is down"));

  //   const { getByTestId } = render(<HomeScreen />)

  //   const indicator = getByTestId('homeIndicatorTestID');
  //   expect(indicator).toBeTruthy();
  // });


  // it("should navigate HomeScreen", async () => {
  //   fetch.mockResponseOnce(JSON.stringify(apiResponse));

  //   render(<HomeScreen />);

  //   // const item1 = await screen.findByText("test item");
  //   // const falseItem = screen.queryByText("i shouldn't exist");
  //   // expect(item1).toBeTruthy();
  //   // expect(falseItem).toBeFalsy();
  // });
});
