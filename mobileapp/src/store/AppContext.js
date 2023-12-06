import React from 'react';

const AppContext = React.createContext({
  settingsURLValue: '',
  settingsPortValue: '80',
  settingsShowPageSize: '4',
  settingsShowCorrectAnswerOnly: false,
  isDebugMode: 0,
  setSettingsURLValue: (val) => {},
  setSettingsPortValue: (val) => {},
  setIsDebugMode: (val) => {},
  setSettingsShowPageSize: (val) => {},
  setSettingsOnlyCorrectValue: (val) => {},
});

export default AppContext;