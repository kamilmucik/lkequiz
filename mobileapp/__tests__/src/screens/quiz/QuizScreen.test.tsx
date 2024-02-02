import React from 'react';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react-native';
import QuizScreen from '../../../../src/screens/quiz/QuizScreen'
import AppContext from '../../../../src/store/AppContext'


const apiResponse = {"data": [
  {
    "id": 2765, "code": "PL070-0015",  "question": " Po zderzeniu z ptakiem dowódca statku powietrznego składa meldunek:  ",
    "answers": [
        { "id": 11055, "answer": "pisemny. ", "correct": "1" },
        { "id": 11056, "answer": "ustny. ", "correct": "0" },
        { "id": 11057, "answer": "nie składa.", "correct": "0" },
        { "id": 11058, "answer": "składa, meldunek ustny, jeśli statek powietrzny uległ jakiemukolwiek uszkodzeniu.", "correct": "0" }
    ]
  },
  {
    "id": 2715, "code": "PL070-0043", "question": " Pojęcia: ALERFA, DETRESFA, INTERFA odnoszą się do: ",
    "answers": [
        { "id": 10855, "answer": "Stanu zagrożenia dla statku powietrznego określanego przez służby SAR .",  "correct": "1" },
        { "id": 10856, "answer": "Stanu zdrowia załogi ", "correct": "0" },
        { "id": 10857, "answer": "Stanu pogody ", "correct": "0" },
        { "id": 10858, "answer": "Stanu lotniska", "correct": "0" }
    ]
  },
  {
    "id": 2708, "code": "PL070-0055", "question": " Komunikat MAYDAY nadaje się w przypadku: ",
    "answers": [
        { "id": 10827, "answer": "bezpośredniego zagrożenia życia załogi i pasażerów", "correct": "1" },
        { "id": 10828, "answer": "konieczności zapewnienia pomocy medycznej",  "correct": "0" },
        { "id": 10829, "answer": "ogólnego niebezpieczeństwa dla ruchu lotniczego, zaobserwowania groźnych zjawisk itp.", "correct": "0" },
        { "id": 10830, "answer": "utraty łączności", "correct": "0" }
    ]
  }
    ], 
    "status": 200
  };



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
        quizTimeLimit: 3,
        quizQuestionLimit: 3,
    } }
    const navigate = jest.fn();

    render(<QuizScreen route={route} navigation={{ navigate }} />);
  });

  it("should press finish incremet decrement button", async () => {
    fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(apiResponse),
      })
    );

    const route = { 
      params: {
        quizCategoryName: "3 szybkie",
        quizCategoryId: 0,
        quizTimeLimit: 3,
        quizQuestionLimit: 3,
      } 
    }
    const navigateMock = { 
      navigate:()=>jest.fn(),
      goBack:()=>jest.fn()
    };

    const { getByTestId,getByText, debug} = render(
      <AppContext.Provider value={{
            existInCache: jest.fn(),
            addToCache: jest.fn(),
          }}
      >
        <QuizScreen route={route} navigation={navigateMock} />
      </AppContext.Provider>
      )
    await act(async () => {
      const listNode = await waitFor(() => getByTestId('questionListTestID'));

      const finishButton = getByText('Zakończ test');
      const backButton = getByText('Wstecz');
      const nextButton = getByText('Dalej');



      expect(finishButton).toBeDefined();
      expect(backButton).toBeDefined();
      expect(nextButton).toBeDefined();
      expect(listNode).toBeDefined();
      expect(listNode).toBeTruthy();

      fireEvent.press(nextButton);
      fireEvent.press(backButton);
      fireEvent.press(finishButton);


      const returnButton = getByText('Powrót');
      expect(returnButton).toBeDefined();
      fireEvent.press(returnButton);


    debug();
    });
  });

  //should press finish incremet decrement button
  //should show result if finish
  //download question from api
});