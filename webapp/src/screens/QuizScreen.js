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

    // const PAGE_SIZE = 5;
    const HOST = 'info.e-strix.pl';

    const fetchQuestions = async (page) => {
        try {
            const response = await fetch(`http://${HOST}/api/question/${quizCategoryId}/${page}/${quizQuestionLimit}/`);
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
      // const updatedAnswers = [...answers];
      // updatedAnswers[questionIndex] = selectedAnswer;
      // setAnswers(updatedAnswers);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDownTime(countDownTime - 1);
      }, 60_000);
  
      return () => clearInterval(interval);
    }, [countDownTime]);

    function increment() {
      setCurrentQuestion(function (prevCount) {
          if (prevCount < questions.length) {
              return (prevCount += 1); 
          } else {
              return (prevCount = questions.length);
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

    return (
      <div className="container">
          <h3 className="p-3 text-center">Quiz</h3>
          <table className="table table-striped table-bordered">
            <tbody>
                <tr><td>Kategoria</td><td>{quizCategoryName}</td></tr>
                <tr><td>Czas</td><td>{countDownTime}({quizTimeLimit})min.</td></tr> 
                <tr><td>Pytań</td><td> {currentQuestion + 1} z {questions.length}</td></tr>  
            </tbody>
          </table>

          {/* <h2>Question {currentQuestion + 1} : {isLoading ? 'true' : 'false'}</h2> */}
          {questions && questions.length > 0 ?
          <div>
              <h5> {questions[currentQuestion].code}</h5> <h4>{questions[currentQuestion].question}</h4>
              <ul>
                {questions[currentQuestion].answers && questions[currentQuestion].answers.map( (answer,index) =>
                    <li key={index}>
                <input
                  type="radio"
                  name={`question${currentQuestion}`}
                  value={answer.answer}
                  onChange={() =>
                    handleAnswerSelection(currentQuestion, answer)
                  }
                />
                {answer.answer}
              </li>
              )}
              </ul>
              
          </div>
          : <div>loading...</div>
          }
            <button onClick={decrement}>Wstecz</button>
            <button onClick={increment}>Dalej</button>

            {/* {questions && questions.map(question =>
              <p>{question.question}</p>
            )} */}
          
      </div>
    );
};

export default QuizScreen;