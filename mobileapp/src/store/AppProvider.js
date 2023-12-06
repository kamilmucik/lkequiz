import { useState } from "react";
import AppContext from "./AppContext";

function AppProvider({children}) {

  const [settingsURLValue, setContextSettingsURLValue] = useState('http://zwroty.e-strix.pl');
  const [settingsPortValue, setContextSettingsPortValue] = useState('80');
  const [isDebugMode, setContextIsDebugMode] = useState(0);


  const [settingsShowPageSize, setContextSettingsShowPageSize] = useState('4');
  const [settingsShowCorrectAnswerOnly, setContextSettingsOnlyCorrectValue] = useState(false);

  function setSettingsURLValue(val){
    setContextSettingsURLValue( val);
  }
  function setSettingsPortValue(val){
    setContextSettingsPortValue( val);
  }
  function setSettingsShowPageSize(val){
    setContextSettingsShowPageSize( val);
  }
  function setSettingsOnlyCorrectValue(val){
    setContextSettingsOnlyCorrectValue( val);
  }
  function setIsDebugMode(val){
    setContextIsDebugMode(val);
  }

  const value = {
    settingsURLValue: settingsURLValue,
    settingsPortValue: settingsPortValue,
    settingsShowPageSize: settingsShowPageSize,
    settingsShowCorrectAnswerOnly: settingsShowCorrectAnswerOnly,
    isDebugMode: isDebugMode,

    setSettingsURLValue: setSettingsURLValue,
    setSettingsPortValue: setSettingsPortValue,
    setSettingsShowPageSize: setSettingsShowPageSize,
    setSettingsOnlyCorrectValue: setSettingsOnlyCorrectValue,
    setIsDebugMode: setIsDebugMode,
  }

  return <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
}
export default AppProvider;