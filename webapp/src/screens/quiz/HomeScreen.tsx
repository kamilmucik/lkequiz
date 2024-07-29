import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import { QUIZ_ID, PAGE_SIZE } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch.ts'

const HomeScreen = () => {

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


function increment() {
    currentPage < totalPage ? setCurrentPage(currentPage+1) : setCurrentPage(totalPage);
  }

  function decrement() {
    currentPage > 1 ? setCurrentPage(currentPage-1) : setCurrentPage(1);
  }

      return (
        <div className="container">
             <Stack direction="horizontal" gap={4}>
                 <div className="p-2 text-center">{moreLoading && <div>Szukam...</div>}</div>
                 <div className="p-2 ms-auto"><button className="btn btn-primary" onClick={decrement}>Wstecz</button></div>
                 <div className="p-2">{currentPage} z {totalPage}</div>
                 <div className="p-2"><button className="btn btn-primary" onClick={increment}>Dalej</button></div>
             </Stack>
             <table className="table table-sm">
                 <thead>
                     <tr>
                         <th>Quiz</th>
                         <th></th>
                     </tr>
                 </thead>
                 <tbody>
                     {data && data.map(department =>
                         <tr key={department.id}>
                             <td className="align-middle">{department.name}</td>
                             <td className="col-md-1">
                                 <NavLink
                                     className={"btn btn-link"}
                                     to={`/category/${department.id}`}
                                     >       
                                     <span>wybierz</span>                 
                                 </NavLink>
                             </td>
                         </tr>
                     )}
                 </tbody>
             </table>
        </div>
    );
};
  
  export default HomeScreen;
  