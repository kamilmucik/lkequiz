import React, { useState, useContext } from "react";
import AppContext from '../store/AppContext';
import packageJson from '../../package.json';import {
  NumberInput,
} from "react-router-dom";

const SettingsScreen = () => {
  const appCtx = useContext(AppContext);

  const isDebugMode = appCtx.isDebugMode;
  const settingsURLValue = appCtx.settingsURLValue;
  const settingsPortValue = appCtx.settingsPortValue;
  
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
          <table className="table table-striped table-bordered">
            <tbody>
                <tr><td>{packageJson.version}</td><td>version</td></tr>

                <tr><td>{settingsURLValue}</td><td>settingsURLValue</td></tr> 
                <tr><td>{settingsPortValue}</td><td>settingsPortValue</td></tr> 
                <tr><td>{isDebugMode ? 'true' : 'false'}</td><td>isDebugMode</td></tr> 
                <tr><td> <input type="checkbox" id="show-correct-only" checked={showCorrectAnswerOnly} onChange={handleChange}></input></td><td><labe for="show-correct-only">Pokaz tylko dobre odpowiedzi</labe></td></tr>  
                <tr><td> <input type="number" min="4" max="20" step="1" value={appCtx.showPageAnswer} onChange={handleNumberChange} ></input></td><td>Limit rekordów na stronie {appCtx.showPageAnswer}</td></tr>     
                
            </tbody>
          </table>
    </div>
  );
  };
  
  export default SettingsScreen;