import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import AppContext from '../store/AppContext';

const HomeScreen = () => {

    const appCtx = useContext(AppContext);
  const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const  QUIZ_ID  = 1;
    const PAGE_SIZE = 15;

  const fetchDepartments = async (page) => {
        try {
            const response = await fetch(`${appCtx.settingsURLValue}/api/department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`,
                {
                    method: "GET"
                }
            );
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
        fetchDepartments(currentPage).then(json => {
            // console.log("data",json);
            setTotalPage(json.totalPage);
            setDepartments(json.data);
        });
      }, [currentPage]);
    
      useEffect(() => {
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
    
      return (
        <div className="container">
            <Stack direction="horizontal" gap={4}>
                <div className="p-2 text-center"></div>
                <div className="p-2 ms-auto"><button class="btn btn-primary" onClick={decrement}>Wstecz</button></div>
                <div className="p-2">{currentPage} z {totalPage}</div>
                <div className="p-2"><button class="btn btn-primary" onClick={increment}>Dalej</button></div>
            </Stack>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Quiz</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {departments && departments.map(department =>
                        <tr key={department.id}>
                            <td class="align-middle">{department.name}</td>
                            <td class="col-md-1">
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
  