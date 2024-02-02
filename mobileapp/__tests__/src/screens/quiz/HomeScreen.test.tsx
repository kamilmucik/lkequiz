import React from 'react';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from '../../../../src/screens/quiz/HomeScreen'


const apiResponse = {"data": [{"id": 6, "name": "PPL(A) skrócony"}, {"id": 1, "name": "PPL(A)"}, {"id": 5, "name": "SPL"}], "status": 200, "totalPage": 1};

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(apiResponse),
//   })
  
// );


describe("<HomeScreen />", () => {

  afterEach(cleanup);

  it("should show list of departments", async () => {
    const { getByTestId, debug} = render(<HomeScreen />)
    const listNode = await waitFor(() => getByTestId('flatListTestID'));

    expect(listNode).toBeDefined();
    expect(listNode).toBeTruthy();

    // debug();
  }); 

  it("should navigate to fast quiz screen", async () => {
    fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(apiResponse),
  })
  
);
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(<HomeScreen navigation={navigateMock} />)
    const tileNode = await waitFor(() => getByTestId('homeMenuTileTestID-0'));

    fireEvent.press(tileNode);
    // debug();
  }); 

  it("should navigate to category screen", async () => {
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(<HomeScreen navigation={navigateMock} />)
    const tileNode = await waitFor(() => getByTestId('homeMenuTileTestID-1'));

    fireEvent.press(tileNode);
    // debug();
  }); 

  it("should show refresh button", async () => {

fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(apiResponse),
  })
  
);
    // global.fetch = jest.fn(() => Promise.resolve({ json: () => ''}))
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));

    const { debug, getByTestId } = render(<HomeScreen />)

    await act(async () => {
      // const indicator = getByTestId('homeIndicatorTestID');
      // expect(indicator).toBeTruthy();
      // debug();
    });
  });


  it("should show indicator", async () => {
        fetch.mockImplementationOnce( () => new Promise((res) => setTimeout(() => res(apiResponse), 200)) );
    
        const { debug, getByTestId } = render(<HomeScreen />)
    
        await act(async () => {
          // const indicator = getByTestId('homeIndicatorTestID');
          // expect(indicator).toBeTruthy();
          debug();
        });
      });

});
