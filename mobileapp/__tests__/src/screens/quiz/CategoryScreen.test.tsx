import React from 'react';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react-native';
import CategoryScreen from '../../../../src/screens/quiz/CategoryScreen'
import AppContext from '../../../../src/store/AppContext'


const apiResponseOnePage = {"status":200,"totalPage":1,
      "data":[
        {"id":27,"name":"Ogólne Bezpieczeństwo Wykonywania Lotów","department_id":1,"code":"PL100","time_limit":30,"question_limit":12,"max_question_limit":10},
        {"id":37,"name":"Łączność ","department_id":1,"code":"PL099","time_limit":30,"question_limit":12,"max_question_limit":10}
      ]}
const apiResponseMultiPage = {"status":200,"totalPage":2,
      "data":[
        {"id":27,"name":"Ogólne Bezpieczeństwo Wykonywania Lotów","department_id":1,"code":"PL100","time_limit":30,"question_limit":12,"max_question_limit":10},
        {"id":37,"name":"Łączność ","department_id":1,"code":"PL099","time_limit":30,"question_limit":12,"max_question_limit":10}
      ]}


describe("<CategoryScreen />", () => {

  beforeEach(cleanup);

  afterEach(cleanup);

  it("should render the CategoryScreen", async () => {
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
        <CategoryScreen route={route} navigation={navigateMock} />
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
          <CategoryScreen route={route} navigation={navigateMock} />
      </AppContext.Provider>
      )
    await act(async () => {
      const tileNode = await waitFor(() => getByTestId('categoryListItemTestID-27'));

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
        <CategoryScreen route={route} navigation={navigateMock} />
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
        <CategoryScreen route={route} navigation={navigateMock} />
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