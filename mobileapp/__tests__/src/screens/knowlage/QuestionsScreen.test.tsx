import React from 'react';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react-native';
import QuestionsScreen from '../../../../src/screens/knowlage/QuestionsScreen'
import AppContext from '../../../../src/store/AppContext'

const apiResponseOnePage = {
  "status": 200,
  "totalPage": 1,
  "data": [
      { "id": 2038, "code": "PL030-0034",  "question": " Co to jest VX:. ",
          "answers": [
              { "id": 8147, "answer": "To prędkość, przy której osiąga się najlepszy gradient wznoszenia. Best Angle of Climb.", "correct": "1" },
              { "id": 8148,  "answer": "To prędkość, przy której osiąga się najlepszą prędkość wznoszenia Best Rate of Climb.", "correct": "0" },
              { "id": 8149,  "answer": "To prędkość decyzji, przy której są bezpiecznie spełnione warunki do przerwania i kontynuowania startu.", "correct": "0" },
              { "id": 8150,  "answer": "To prędkość, przy której osiąga się najlepszy stosunek siły nośnej do ciągu.", "correct": "0" }
          ]
      },
      { "id": 2009, "code": "PL030-0120", "question": " Zjawisko polegajce na oblodzeniu statecznika poziomego:. ",
          "answers": [
              { "id": 8031, "answer": "Może doprowadzić do przeciągniecia statecznika poziomego i wejście samolotu w niekontrolowane nurkowanie.", "correct": "1" },
              { "id": 8032, "answer": "Gdy zaistnieje, wymaga takiego samego działania ze strony pilota – oddania steru od siebie, dodania mocy.", "correct": "0" },
              { "id": 8033, "answer": "Występuje tylko na dużych samolotach pasażerskich.", "correct": "0" },
              { "id": 8034, "answer": "Jest najbardziej niebezpieczne przy dużych prędkościach lotu, kiedy skuteczność sterowania pochyleniem jest największa.", "correct": "0"}
          ]
      },
      { "id": 2010, "code": "PL030-0111", "question": " Ważenie samolotu: przednie kółko 1000kg, lewe i prawe koła główne po 5000kg. odległość między kółkiem przednim i głównymi wynosi 10 m. Ile przed kołami głównego podwozia znajduje się środek masy: ",
          "answers": [
              { "id": 8035, "answer": "0.91 m ", "correct": "1" },
              { "id": 8036, "answer": "0.75 m ", "correct": "0" },
              { "id": 8037, "answer": "9.1 m ", "correct": "0" },
              { "id": 8038, "answer": "0.81 m", "correct": "0" }
          ]
      }
    ]
  }
const apiResponseMultiPage = {
  "status": 200,
  "totalPage": 14,
  "data": [
      { "id": 2038, "code": "PL030-0034",  "question": " Co to jest VX:. ",
          "answers": [
              { "id": 8147, "answer": "To prędkość, przy której osiąga się najlepszy gradient wznoszenia. Best Angle of Climb.", "correct": "1" },
              { "id": 8148,  "answer": "To prędkość, przy której osiąga się najlepszą prędkość wznoszenia Best Rate of Climb.", "correct": "0" },
              { "id": 8149,  "answer": "To prędkość decyzji, przy której są bezpiecznie spełnione warunki do przerwania i kontynuowania startu.", "correct": "0" },
              { "id": 8150,  "answer": "To prędkość, przy której osiąga się najlepszy stosunek siły nośnej do ciągu.", "correct": "0" }
          ]
      },
      { "id": 2009, "code": "PL030-0120", "question": " Zjawisko polegajce na oblodzeniu statecznika poziomego:. ",
          "answers": [
              { "id": 8031, "answer": "Może doprowadzić do przeciągniecia statecznika poziomego i wejście samolotu w niekontrolowane nurkowanie.", "correct": "1" },
              { "id": 8032, "answer": "Gdy zaistnieje, wymaga takiego samego działania ze strony pilota – oddania steru od siebie, dodania mocy.", "correct": "0" },
              { "id": 8033, "answer": "Występuje tylko na dużych samolotach pasażerskich.", "correct": "0" },
              { "id": 8034, "answer": "Jest najbardziej niebezpieczne przy dużych prędkościach lotu, kiedy skuteczność sterowania pochyleniem jest największa.", "correct": "0"}
          ]
      },
      { "id": 2010, "code": "PL030-0111", "question": " Ważenie samolotu: przednie kółko 1000kg, lewe i prawe koła główne po 5000kg. odległość między kółkiem przednim i głównymi wynosi 10 m. Ile przed kołami głównego podwozia znajduje się środek masy: ",
          "answers": [
              { "id": 8035, "answer": "0.91 m ", "correct": "1" },
              { "id": 8036, "answer": "0.75 m ", "correct": "0" },
              { "id": 8037, "answer": "9.1 m ", "correct": "0" },
              { "id": 8038, "answer": "0.81 m", "correct": "0" }
          ]
      }
    ]
  }



describe("<QuestionsScreen />", () => {
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

  // it("should render the QuestionsScreen", async () => {
  //   fetch.mockResponseOnce(JSON.stringify(apiResponse));
  //   const route = { params: { categoryId: 1 } }
  //   const navigate = jest.fn();

  //   render(<QuestionsScreen route={route} navigation={{ navigate }} />);
  // });

  // it("should render the QuestionsScreen and execute LoadMoreData", async () => {
  //   fetch.mockResponseOnce(JSON.stringify(apiResponse));
  //   const route = { params: { categoryId: 1 } }
  //   const navigate = jest.fn();

  //   render(<QuestionsScreen route={route} navigation={{ navigate }} />);
  // });
  it("should render the QuestionsScreen", async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponseOnePage),
      })
    );

    const route = { params: { categoryId: 1 } }

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
            existInCache: jest.fn(),
            addToCache: jest.fn(),
          }}
      >
        <QuestionsScreen route={route} />
      </AppContext.Provider>
      )
    await act(async () => {
      const listNode = await waitFor(() => getByTestId('flatListTestID'));

      expect(listNode).toBeDefined();
      expect(listNode).toBeTruthy();
    });
    // debug();
  });


  it("should add more data to list when currentPage < totalPage", async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponseMultiPage),
      })
    );
    const route = { params: { categoryId: 1 } }
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
          existInCache: jest.fn(),
          addToCache: jest.fn(),
        }}
      >
        <QuestionsScreen route={route}  />
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
    const route = { params: { categoryId: 1 } }
    const navigateMock = {navigate:()=>jest.fn()};

    const { getByTestId, debug} = render(
      <AppContext.Provider value={{
        existInCache: jest.fn(),
        addToCache: jest.fn(),
        }}
      >
        <QuestionsScreen route={route} navigation={navigateMock} />
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