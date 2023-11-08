import { useState } from "react";
import AppContext from "./AppContext";

function AppProvider({children}) {

  const [settingsURLValue, setContextSettingsURLValue] = useState('http://info.e-strix.pl');
  const [settingsPortValue, setContextSettingsPortValue] = useState('80');

  const [quizCategoryId, setContextQuizCategoryId] = useState(0);
  const [quizCategoryName, setContextQuizCategoryName] = useState('');
  const [quizCategoryCode, setContextQuizCategoryCode] = useState('');
  const [quizTimeLimit, setContextQuizTimeLimit] = useState(0);
  const [quizQuestionLimit, setContextQuizQuestionLimit] = useState(0);

  const [isDebugMode, setContextIsDebugMode] = useState(0);

  function setSettingsURLValue(val){
    setContextSettingsURLValue( val);
  }
  function setSettingsPortValue(val){
    setContextSettingsPortValue( val);
  }

  function setQuizCategoryId(val){
    setContextQuizCategoryId( val);
  }
  function setQuizCategoryName(val){
    setContextQuizCategoryName( val);
  }
  function setQuizCategoryCode(val){
    setContextQuizCategoryCode( val);
  }
  function setQuizTimeLimit(val){
    setContextQuizTimeLimit( val);
  }
  function setQuizQuestionLimit(val){
    setContextQuizQuestionLimit( val);
  }

  function setIsDebugMode(val){
    setContextIsDebugMode(val);
  }

  const value = {
    settingsURLValue: settingsURLValue,
    settingsPortValue: settingsPortValue,

    quizCategoryId: quizCategoryId,
    quizCategoryName: quizCategoryName,
    quizCategoryCode: quizCategoryCode,
    quizTimeLimit: quizTimeLimit,
    quizQuestionLimit: quizQuestionLimit,

    isDebugMode: isDebugMode,

    setSettingsURLValue: setSettingsURLValue,
    setSettingsPortValue: setSettingsPortValue,
    setQuizCategoryId: setQuizCategoryId,
    setQuizCategoryName: setQuizCategoryName,
    setQuizCategoryCode: setQuizCategoryCode,
    setQuizTimeLimit: setQuizTimeLimit,
    setQuizQuestionLimit: setQuizQuestionLimit,
    setIsDebugMode: setIsDebugMode,
  }

  return <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
}
export default AppProvider;