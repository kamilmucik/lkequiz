import React, { useState, useEffect, useContext } from "react";
import {BrowserRouter as Router,useParams} from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import AppContext from '../../store/AppContext';
import { useNavigate } from "react-router-dom";
import { PAGE_SIZE } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch.ts'


const CategoriesScreen = () => {
    const appCtx = useContext(AppContext);
    const navigate = useNavigate();
    const { departmentId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const { moreLoading, totalPage, data } = useCustomFetch(query, true);

    const fetchCategories = async (page) => {
        setQuery(`category/${departmentId}/${page}/${PAGE_SIZE}/`);
    }

    useEffect(() => {
        fetchCategories(currentPage);
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

    const startQuizHandler = async (e) => {
        e.preventDefault()
        //capture the attributes of the element
        let id = e.target.getAttribute("data-id");
        let catCode = e.target.getAttribute("data-category-code");
        let catName = e.target.getAttribute("data-category-name");
        let timeLimit = e.target.getAttribute("data-time-limit");
        let questionLimit = e.target.getAttribute("data-question-limit");

        appCtx.setQuizCategoryId(id);
        appCtx.setQuizCategoryName(catName);
        appCtx.setQuizCategoryCode(catCode);
        appCtx.setQuizTimeLimit(timeLimit);
        appCtx.setQuizQuestionLimit(questionLimit);
        navigate("/quiz/");
    } 

    return <div className="container">
    <Stack direction="horizontal" gap={4}>
        <div className="p-2 text-center">{moreLoading && <div>Szukam...</div>}</div>
        <div className="p-2 ms-auto"><button class="btn btn-primary" onClick={decrement}>Wstecz</button></div>
        <div className="p-2">{currentPage} z {totalPage}</div>
        <div className="p-2"><button class="btn btn-primary" onClick={increment}>Dalej</button></div>
    </Stack>
      <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Kod</th>
                        <th>Kategorie</th>
                        <th>Czas (min)</th>
                        <th>Pytań</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(category =>
                        <tr key={category.id}>
                            <td class="align-middle">{category.code}</td>
                            <td class="align-middle">{category.name}</td>
                            <td class="align-middle">{category.time_limit}</td>
                            <td class="align-middle">{category.question_limit} z {category.max_question_limit}</td>
                            <td class="col-md-1">
                                <a class="btn btn-link"
                                    data-id={category.id}
                                    data-category-code={category.code}
                                    data-category-name={category.name}
                                    data-time-limit={category.time_limit}
                                    data-question-limit={category.question_limit}
                                    onClick={ startQuizHandler } href="#">
                                    Start
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

    </div>;
  };
  
  export default CategoriesScreen;