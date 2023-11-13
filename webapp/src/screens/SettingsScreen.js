import {useContext} from 'react';
import AppContext from '../store/AppContext';
import packageJson from '../../package.json';

const SettingsScreen = () => {
  const appCtx = useContext(AppContext);

  const isDebugMode = appCtx.isDebugMode;
  const settingsURLValue = appCtx.settingsURLValue;
  const settingsPortValue = appCtx.settingsPortValue;

  const quizCategoryId = appCtx.quizCategoryId;
  const quizCategoryName = appCtx.quizCategoryName;
  const quizTimeLimit = appCtx.quizTimeLimit;
  const quizQuestionLimit = appCtx.quizQuestionLimit;
  const showCorrectAnswerOnly = appCtx.showCorrectAnswerOnly;

  const handleChange = () => { 
    appCtx.setShowCorrectAnswerOnly(!showCorrectAnswerOnly)
  };

  return (
    <div className="container">
        <h3 className="p-3 text-center">Ustawienia</h3>
          <table className="table table-striped table-bordered">
            <tbody>
                <tr><td>version</td><td>{packageJson.version}</td></tr> 
                <tr><td>settingsURLValue</td><td>{settingsURLValue}</td></tr> 
                <tr><td>settingsPortValue</td><td>{settingsPortValue}</td></tr> 
                <tr><td>quizCategoryId</td><td>{quizCategoryId}</td></tr> 
                <tr><td>quizCategoryName</td><td>{quizCategoryName}</td></tr> 
                <tr><td>quizTimeLimit</td><td>{quizTimeLimit}</td></tr> 
                <tr><td>quizQuestionLimit</td><td>{quizQuestionLimit}</td></tr> 
                <tr><td>isDebugMode</td><td>{isDebugMode ? 'true' : 'false'}</td></tr> 
                <tr><td>Pokaz tylko dobre odpowiedzi</td><td> <input type="checkbox" checked={showCorrectAnswerOnly} onChange={handleChange}></input></td></tr>     
            </tbody>
          </table>
    </div>
  );
  };
  
  export default SettingsScreen;