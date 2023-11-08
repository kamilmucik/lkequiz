import React from 'react';

const AppContext = React.createContext({
  settingsURLValue: '',
  settingsPortValue: '',
  quizCategoryId: '',
  quizCategoryName: '',
  quizCategoryCode: '',
  quizTimeLimit: 0,
  quizQuestionLimit: 0,
  isDebugMode: 0,
  setSettingsURLValue: (val) => {},
  setSettingsPortValue: (val) => {},

  setQuizCategoryId: (val) => {},
  setQuizCategoryName: (val) => {},
  setQuizCategoryCode: (val) => {},
  setQuizTimeLimit: (val) => {},
  setQuizQuestionLimit: (val) => {},

  setIsDebugMode: (val) => {},
});

export default AppContext;