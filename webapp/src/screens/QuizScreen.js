import {useContext} from 'react';
import AppContext from '../store/AppContext';

const QuizScreen = () => {

    const appCtx = useContext(AppContext);

    const quizCategoryName = appCtx.quizCategoryName;
    const quizTimeLimit = appCtx.quizTimeLimit;
    const quizQuestionLimit = appCtx.quizQuestionLimit;

    return (
      <div className="container">
          <h3 className="p-3 text-center">Quiz</h3>
          <table className="table table-striped table-bordered">
            <tbody>
                <tr><td>Kategoria</td><td>{quizCategoryName}</td></tr>
                <tr><td>Czas</td><td>{quizTimeLimit} min.</td></tr> 
                <tr><td>Pytań</td><td>{quizQuestionLimit}</td></tr>  
            </tbody>
          </table>
      </div>
    );
};

export default QuizScreen;