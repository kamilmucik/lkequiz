import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Stack from 'react-bootstrap/Stack';


const KnowlageQuestionScreen = () => {
  const { categoryId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const PAGE_SIZE = 5;
  const HOST = 'info.e-strix.pl';

    const fetchQuestions = async (page) => {
        try {
            const response = await fetch(`http://${HOST}/api/question/${categoryId}/${page}/${PAGE_SIZE}/`);
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
            console.log("data",json);
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
        <div className="p-2 text-center"><h1 >Baza wiedzy: Pytania</h1></div>
        <div className="p-2 ms-auto"><button onClick={decrement}>Wstecz</button></div>
        <div className="p-2">{currentPage} z {totalPage}</div>
        <div className="p-2"><button onClick={increment}>Dalej</button></div>
    </Stack>
      <table className="table table-striped table-bordered">

                <tbody>
                    {questions && questions.map(question =>
                        <tr key={question.id}>
                            <td>
                                {question.question}
                                <lu>
                                {question.answers && question.answers.map(answer =>
                                    <li>{answer.answer}</li>
                                )}
                                </lu>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

    </div>;
  };
  
  export default KnowlageQuestionScreen;