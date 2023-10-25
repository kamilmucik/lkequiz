import React from 'react';

const AppContext = React.createContext({
  settingsURLValue: '',
  settingsPortValue: '80',
  isDebugMode: 0,
  setSettingsURLValue: (val) => {},
  setSettingsPortValue: (val) => {},
  setIsDebugMode: (val) => {},
});

export default AppContext;