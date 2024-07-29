import React, { useState, useEffect, useContext } from "react";

import AppContext from '../../store/AppContext';
import {useParams,} from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import {useCustomFetch} from '../../hooks/useCustomFetch.ts'


const KnowlageQuestionScreen = () => {

  const appCtx = useContext(AppContext);
  const showCorrectAnswerOnly = appCtx.showCorrectAnswerOnly;
  const PAGE_SIZE = appCtx.showPageAnswer;
  const { categoryId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {moreLoading, totalPage, data } = useCustomFetch(query);

  const fetchData = async (page) => {
    setQuery(`question/${categoryId}/${page}/${PAGE_SIZE}/`);
  }
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);
  
    function increment() {
        currentPage < totalPage ? setCurrentPage(currentPage+1) : setCurrentPage(totalPage);
    }

    function decrement() {
        currentPage > 1 ? setCurrentPage(currentPage-1) : setCurrentPage(1);
    }

    return <div className="container">
      <Stack direction="horizontal" gap={4}>
        <div className="p-2 text-center">{moreLoading && <div>Szukam...</div>}</div>
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
                    {data && data.map(question =>
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