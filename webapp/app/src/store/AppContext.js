import React from 'react';

const AppContext = React.createContext({
  cache: [],
  settingsFastQuizDepartment: {},
  settingsShowCorrectAnswerOnly: false,

  isDebugMode: 0,
  showCorrectAnswerOnly: 0,
  showPageAnswer: 0,

  setSettingsFastQuizDepartment: (val) => {},
  setSettingsOnlyCorrectValue: (val) => {},
  existInCache: (val) => {},
  addToCache: (val) => {},

  setIsDebugMode: (val) => {},
  setShowCorrectAnswerOnly: (val) => {},
  setShowPageAnswer: (val) => {},

});

export default AppContext;