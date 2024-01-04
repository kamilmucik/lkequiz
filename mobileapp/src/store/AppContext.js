import React from 'react';

const AppContext = React.createContext({
  settingsURLValue: '',
  settingsPortValue: '80',
  settingsFastQuizDepartment: {},
  settingsShowCorrectAnswerOnly: false,
  isDebugMode: 0,
  setSettingsURLValue: (val) => {},
  setSettingsPortValue: (val) => {},
  setIsDebugMode: (val) => {},
  setSettingsFastQuizDepartment: (val) => {},
  setSettingsOnlyCorrectValue: (val) => {},
});

export default AppContext;