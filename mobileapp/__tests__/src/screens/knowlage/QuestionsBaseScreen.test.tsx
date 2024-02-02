import React from 'react';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react-native';
import QuestionsBaseScreen from '../../../../src/screens/knowlage/QuestionsBaseScreen'
import AppContext from '../../../../src/store/AppContext'


// const apiResponse = {"data": [{"id": 6, "name": "PPL(A) skrócony"}, {"id": 1, "name": "PPL(A)"}, {"id": 5, "name": "SPL"}], "status": 200, "totalPage": 1};

// jest.mock('react-native-safe-area-context', () => {
//   const inset = {top: 0, right: 0, bottom: 0, left: 0};
//   return {
//     ...jest.requireActual('react-native-safe-area-context'),
//     SafeAreaProvider: jest.fn(({children}) => children),
//     SafeAreaConsumer: jest.fn(({children}) => children(inset)),
//     useSafeAreaInsets: jest.fn(() => inset),
//     useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
//   };
// });

const apiResponseOnePage = {"status":200,"totalPage":1,
      "data":[
        { "id": 6, "name": "PPL(A) skrócony" },
        { "id": 1, "name": "PPL(A)" },
        { "id": 5, "name": "SPL" }
      ]}
const apiResponseMultiPage = {"status":200,"totalPage":2,
      "data":[
        { "id": 6, "name": "PPL(A) skrócony" },
        { "id": 1, "name": "PPL(A)" },
        { "id": 5, "name": "SPL" }
      ]}


describe("<QuestionsBaseScreen />", () => {
  beforeEach(async () => {
  });
  afterEach(() => {
    // cleanup();
    jest.restoreAllMocks();
  });

  // beforeEach(async () => {
  // });
  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  // it("should render the QuestionsBaseScreen", async () => {
  //   fetch.mockResponseOnce(JSON.stringify(apiResponse));
  //   const route = { params: { departmentId: 1 } }
  //   const navigate = jest.fn();

  //   render(<QuestionsBaseScreen route={route} navigation={{ navigate }} />);
  // });

  it("should render the QuestionsBaseScreen", async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponseOnePage),
      })
    );

    const route = { params: { departmentId: 1 } }
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
            existInCache: jest.fn(),
            addToCache: jest.fn(),
          }}
      >
        <QuestionsBaseScreen route={route} navigation={navigateMock} />
      </AppContext.Provider>
      )
    await act(async () => {
      const listNode = await waitFor(() => getByTestId('flatListTestID'));

      expect(listNode).toBeDefined();
      expect(listNode).toBeTruthy();
    });
    // debug();
  });

  it("should navigate to quiz screen", async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponseOnePage),
      })
    );
    const route = { params: { departmentId: 1 } }
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
            existInCache: jest.fn(),
            addToCache: jest.fn(),
          }}
      >
          <QuestionsBaseScreen route={route} navigation={navigateMock} />
      </AppContext.Provider>
      )
    await act(async () => {
      const tileNode = await waitFor(() => getByTestId('knowlageMenuListElementTestID-1'));

      fireEvent.press(tileNode);
    });
    // debug();
  }); 

  it("should add more data to list when currentPage < totalPage", async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponseMultiPage),
      })
    );
    const route = { params: { departmentId: 1 } }
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
          existInCache: jest.fn(),
          addToCache: jest.fn(),
        }}
      >
        <QuestionsBaseScreen route={route} navigation={navigateMock} />
      </AppContext.Provider>
    )

    await act(async () => {
      let listNode = await waitFor(() => getByTestId('flatListTestID'));
        fireEvent.scroll(listNode, {
          nativeEvent: {
              contentSize: { height: 600, width: 400 },
              contentOffset: { y: 150, x: 0 },
              layoutMeasurement: { height: 100, width: 100 } // Dimensions of the device
          }
      });
      // Trigger the onEndReached event
      fireEvent(listNode, 'onEndReached');
    })
    
    // debug();
  }); 
  
  it("should add more data to list when currentPage == totalPage", async () => {
    const route = { params: { departmentId: 1 } }
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
        existInCache: jest.fn(),
        addToCache: jest.fn(),
        }}
      >
        <QuestionsBaseScreen route={route} navigation={navigateMock} />
        </AppContext.Provider>
      )
    const listNode = await waitFor(() => getByTestId('flatListTestID'));

    act(() => {
        fireEvent.scroll(listNode, {
          nativeEvent: {
              contentSize: { height: 600, width: 400 },
              contentOffset: { y: 150, x: 0 },
              layoutMeasurement: { height: 100, width: 100 } // Dimensions of the device
          }
      })
    })
    
    // Trigger the onEndReached event
    await act(async () => {
      fireEvent(listNode, 'onEndReached');
    });
    // debug();
  }); 
});