import React, { useContext } from "react";
import AppContext from '../store/AppContext';
import packageJson from '../../package.json';

const SettingsScreen = () => {
  const appCtx = useContext(AppContext);
  
  const showCorrectAnswerOnly = appCtx.showCorrectAnswerOnly;

  const handleChange = () => { 
    appCtx.setShowCorrectAnswerOnly(!showCorrectAnswerOnly)
  };

  const handleNumberChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    appCtx.setShowPageAnswer(result);
  };

  return (
    <div className="container">
        <h3 className="p-3 text-center">Ustawienia</h3>
          <table className="table table-sm">
            <tbody>
                <tr><td class="col-md-3">Wersja</td><td class="align-middle col-md-7">{packageJson.version}</td></tr>
                <tr><td class="col-md-3"><label for="show-correct-only">Pokaz tylko dobre odpowiedzi</label></td><td class="align-middle col-md-7"> <input type="checkbox" id="show-correct-only" checked={showCorrectAnswerOnly} onChange={handleChange}></input></td></tr>  
                <tr><td class="col-md-3">Limit rekordów na stronie</td><td class="align-middle col-md-7"> <input type="number" min="4" max="20" step="1" value={appCtx.showPageAnswer} onChange={handleNumberChange} ></input></td></tr>
            </tbody>
          </table>
    </div>
  );
  };
  
  export default SettingsScreen;