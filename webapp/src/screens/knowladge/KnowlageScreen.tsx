import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import { useDebounce } from "../../hooks/useDebounce.ts";
import { QUIZ_ID, PAGE_SIZE, BASE_API_URL } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch.ts'

const KnowlageScreen = () => {

    const [questions, setQuestions] = useState([]);
    const [querySearch, setQuerySearch] = useState('');
    const debouncedSearch = useDebounce(querySearch);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const {moreLoading, totalPage, data} = useCustomFetch(query, true);
    
    const fetchDepartments = async (page) => {
        setQuery(`department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
      }

      useEffect(() => {
        fetchDepartments(currentPage);
      }, [currentPage]);
    
      useEffect(() => {
        setCurrentPage(1);
      }, []);

    const fetchQuery = async (query) => {
            if (query.length < 3) return [];
          try {
              const response = await fetch(`${BASE_API_URL}/question/find/${query}/`,
                  {
                      method: "GET"
                  }
              );
              const json = await response.json();
              return json;
          } catch (error) {
            setLoading(false);
            return [];
          }
      }

      useEffect(() => {
        setLoading(true);
          fetchQuery(debouncedSearch).then(json => {
            setQuestions(json.data);
            setLoading(false);
          });
        }, [debouncedSearch]);
    

    function increment() {
        currentPage < totalPage ? setCurrentPage(currentPage+1) : setCurrentPage(totalPage);
      }
    
      function decrement() {
        currentPage > 1 ? setCurrentPage(currentPage-1) : setCurrentPage(1);
      }


    return (
        <div className="container">
            <Stack direction="horizontal" gap={4}>
                <div className="p-2 text-center">
                    <input placeholder="Szukaj" onChange={event => setQuerySearch(event.target.value)} />
                </div>
                {moreLoading && <div>Szukam...</div>}
                {!questions ?
                <>

                <div className="p-2 ms-auto"><button class="btn btn-primary" onClick={decrement}>Wstecz</button></div>
                <div className="p-2">{currentPage} z {totalPage}</div>
                <div className="p-2"><button class="btn btn-primary" onClick={increment}>Dalej</button></div>
                </>:<></>}
            </Stack>
            {loading && <div>Szukam...</div>}
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Baza wiedzy</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!questions && data && data.map(department =>
                        <tr key={department.id}>
                            <td class="align-middle col-md-9">{department.name}</td>
                            <td class="col-md-1">
                                <NavLink className={"btn btn-link"} to={`/knowlage/category/${department.id}`} >       
                                    <span>wybierz</span>                 
                                </NavLink>
                            </td>
                        </tr>
                    )}
                    {questions && questions.map(question =>
                        <tr key={question.id}>
                            <td class="align-middle col-md-9" colSpan={2}>
                                {question.question}

                            <ul>
                            {question.answers && question.answers.map( (answer,index) =>
                                <>
                                    {answer && answer.correct === '1' ?
                                    <li>
                                    <b>{answer.answer}</b>
                                    </li>
                                    :<></>
                                    }
                                </>
                            )}
                            </ul>    
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </div>
    );
  };
  
  export default KnowlageScreen;
  