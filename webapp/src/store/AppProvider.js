import { useState, useRef } from "react";
import AppContext from "./AppContext";

function AppProvider({children}) {

  const cache = useRef([]);
  const [settingsFastQuizDepartment, setContextSettingsFastQuizDepartment] = useState({});
  const [settingsShowCorrectAnswerOnly, setContextSettingsOnlyCorrectValue] = useState(false);

  const [isDebugMode, setContextIsDebugMode] = useState(0);
  const [showCorrectAnswerOnly, setContextShowCorrectAnswerOnly] = useState(0);
  const [showPageAnswer, setContextShowPageAnswer] = useState(4);

  function setSettingsFastQuizDepartment(val){
    setContextSettingsFastQuizDepartment( val);
  }
  function setSettingsOnlyCorrectValue(val){
    setContextSettingsOnlyCorrectValue( val);
  }
  function setIsDebugMode(val){
    setContextIsDebugMode(val);
  }
  function setShowCorrectAnswerOnly(val){
    setContextShowCorrectAnswerOnly(val);
  }
  function setShowPageAnswer(val){
    setContextShowPageAnswer(val);
  }
  function addToCache(query, data){
    cache.current[query] = {
      data: data
    };
  }
  function existInCache(query){
    return cache.current[query];
  }

  const value = {
    cache: cache,
    settingsFastQuizDepartment: settingsFastQuizDepartment,
    settingsShowCorrectAnswerOnly: settingsShowCorrectAnswerOnly,

    isDebugMode: isDebugMode,
    showCorrectAnswerOnly: showCorrectAnswerOnly,
    showPageAnswer: showPageAnswer,

    setSettingsFastQuizDepartment: setSettingsFastQuizDepartment,
    setSettingsOnlyCorrectValue: setSettingsOnlyCorrectValue,
    existInCache: existInCache,
    addToCache: addToCache,
    setIsDebugMode: setIsDebugMode,
    setShowCorrectAnswerOnly: setShowCorrectAnswerOnly,
    setShowPageAnswer: setShowPageAnswer,
  }

  return <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
}
export default AppProvider;