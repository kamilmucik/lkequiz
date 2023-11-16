import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../store/AppContext';

const QuizScreen = () => {

    const appCtx = useContext(AppContext);

    const quizCategoryName = appCtx.quizCategoryName;
    const quizCategoryId = appCtx.quizCategoryId;
    const quizTimeLimit = appCtx.quizTimeLimit;
    const quizQuestionLimit = appCtx.quizQuestionLimit;
    const [questions, setQuestions] = useState([]);
    const [countDownTime, setCountDownTime] = useState(appCtx.quizTimeLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [scorePercentage, setScorePercentage] = useState(0);


    const fetchQuestions = async (page) => {
        try {
            const response = await fetch(`${appCtx.settingsURLValue}/api/quiz/${quizCategoryId}/1/${quizQuestionLimit}/`);
            // console.log("response", response);
            const json = await response.json();
            // console.log("json", json);
            return json;
        } catch (error) {
            console.error(error);
            // return [];
        } finally {
            
        }
    }

    useEffect(() => {
        setLoading(true);
      // Fetch initial page of data
        fetchQuestions(currentPage).then(json => {
            setQuestions(json.data);
            // console.log("data",questions);
            setLoading(false);
        });
    }, [currentPage]);
  
    useEffect(() => {
      // loadProperties();
      setCurrentPage(1)
    }, []);

    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
      const updatedAnswers = [...answers];
      updatedAnswers[questionIndex] = selectedAnswer.id;
      setAnswers(updatedAnswers);
      if (selectedAnswer.correct === "1") {
        setScore(score + 1);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
        
        if (countDownTime > 0) {
          setCountDownTime(countDownTime - 1);
        }
        if (countDownTime === 0) {
          finish();

        }
      }, 60000); // 1 min
  
      return () => clearInterval(interval);
    }, [countDownTime]);

    function increment() {
      setCurrentQuestion(function (prevCount) {
          if (prevCount < questions.length-1) {
              return (prevCount += 1); 
          } else {
              return (prevCount = questions.length-1);
          }
      });
  }

  function decrement() {
    setCurrentQuestion(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1); 
      } else {
        return (prevCount = 0);
      }
    });
  }
  function finish() {
    setShowScore(true);
    var count = (score/quizQuestionLimit)*100;
    setScorePercentage(Math.round(count));
  }

    return (
      <div className="container">
          <table className="table table-striped table-bordered">
            <tbody>
                <tr><td>Kategoria</td><td>{quizCategoryName}</td></tr>
                <tr><td>Czas</td><td>{countDownTime}({quizTimeLimit})min.</td></tr> 
                <tr><td>Pytań</td><td> {currentQuestion + 1} z {questions.length}</td></tr>  
                {showScore ? (
                  <tr><td>Wynik</td><td> {score} {scorePercentage}% {scorePercentage >=80 ? (<label>Pozytywny</label>):(<label>Negatywny</label>) }</td></tr>
                ) : (<tr></tr>  )}
            </tbody>
          </table>
          {questions && questions.length > 0 ?
            <div>
                <h5> {questions[currentQuestion].code}</h5> <h4>{questions[currentQuestion].question}</h4>
                <ul>
                  {questions[currentQuestion].answers && questions[currentQuestion].answers.map( (answer,index) =>
                      <li key={index} >
                        <input
                          disabled={showScore}
                          type="radio"
                          name={`question${currentQuestion}`}
                          id={`answer${answer.id}`}
                          value={answer.answer}
                          checked={answers[currentQuestion] === answer.id}
                          onChange={() =>
                            handleAnswerSelection(currentQuestion, answer)
                          }
                        />
                        
                        <label for={`answer${answer.id}`}> {showScore && answer.correct === "1" ? (<>*</>):(<></>)} {answer.answer}</label>
                      </li>
                )}
                </ul>
                
            </div>
            : <div>loading...</div>
            }
              <button onClick={decrement}>Wstecz</button>
              <button onClick={increment}>Dalej</button>
              <button onClick={finish}>Zakończ test</button>
      </div>
    );
};

export default QuizScreen;