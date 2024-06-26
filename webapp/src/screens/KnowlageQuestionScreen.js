import React, { useState, useEffect, useContext } from "react";
import AppContext from '../store/AppContext';
import {useParams,} from "react-router-dom";
import Stack from 'react-bootstrap/Stack';


const KnowlageQuestionScreen = () => {

  const appCtx = useContext(AppContext);
  const showCorrectAnswerOnly = appCtx.showCorrectAnswerOnly;
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  const PAGE_SIZE = appCtx.showPageAnswer;

    const fetchQuestions = async (page) => {
        try {
            const response = await fetch(`${appCtx.settingsURLValue}/api/question/${categoryId}/${page}/${PAGE_SIZE}/`);
            // console.log("response", response);
            const json = await response.json();
            // console.log("json", json);
            return json;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    useEffect(() => {
      // Fetch initial page of data
        fetchQuestions(currentPage).then(json => {
            // console.log("data",json);
            setTotalPage(json.totalPage);
            setQuestions(json.data);
        });
    }, [currentPage]);
  
    useEffect(() => {
      // loadProperties();
      setCurrentPage(1)
    }, []);

    function increment() {
        setCurrentPage(function (prevCount) {
            if (prevCount < totalPage) {
                return (prevCount += 1); 
            } else {
                return (prevCount = totalPage);
            }
        });
    }

    function decrement() {
        setCurrentPage(function (prevCount) {
            if (prevCount > 1) {
                return (prevCount -= 1); 
            } else {
                return (prevCount = 1);
            }
        });
    }

    return <div className="container">
      <Stack direction="horizontal" gap={4}>
        <div className="p-2 text-center"></div>
        <div className="p-2 ms-auto"><button class="btn btn-primary"  onClick={decrement}>Wstecz</button></div>
        <div className="p-2">{currentPage} z {totalPage}</div>
        <div className="p-2"><button class="btn btn-primary" onClick={increment}>Dalej</button></div>
    </Stack>
      <table className="table table-sm">
        <thead>
                    <tr>
                        <th>Baza wiedzy: Pytania</th>
                    </tr>
                </thead>
                <tbody>
                    {questions && questions.map(question =>
                        <tr key={question.id}>
                            <td class="align-middle">
                                {question.code} {question.question}
                                <ul>
                                {showCorrectAnswerOnly == 1 && question.answers && question.answers.map( (answer,index) =>
                                    answer.correct === "1" ?
                                    (<li key={index}>{answer.answer}</li>)
                                    :
                                    (<></>)
                                )
                                }
                                {!showCorrectAnswerOnly && question.answers && question.answers.map( (answer,index) =>
                                    <li key={index}>{answer.answer}</li>
                                )
                                }
                                </ul>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

    </div>;
  };
  
  export default KnowlageQuestionScreen;