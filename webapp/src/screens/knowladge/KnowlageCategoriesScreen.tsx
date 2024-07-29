import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import { PAGE_SIZE } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch.ts'

const KnowlageCategoriesScreen = () => {
    const { departmentId } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const [query, setQuery] = useState('');
    const {moreLoading, totalPage, data } = useCustomFetch(query);

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
                        <th>Baza wiedzy: kategorie</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(category =>
                        <tr key={category.id}>
                            <td class="align-middle col-md-9">{category.name}</td>
                            <td class="col-md-1">
                                <NavLink className={"btn btn-link"} to={`/knowlage/question/${category.id}`} >       
                                    <span>wybierz</span>                 
                                </NavLink>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

    </div>;
  };
  
  export default KnowlageCategoriesScreen;