import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Stack from 'react-bootstrap/Stack';

const KnowlageScreen = () => {
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const  quizId  = 1;
    const PAGE_SIZE = 5;
    const IP = '162.19.227.81';
    const PORT = '3001';

  const fetchDepartments = async (page) => {
        try {
            const response = await fetch(`http://${IP}:${PORT}/department/1/1/5/`,
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
                <div className="p-2 text-center"><h1 >Baza wiedzy</h1></div>
                <div className="p-2 ms-auto"><button onClick={decrement}>Wstecz</button></div>
                <div className="p-2">{currentPage} z {totalPage}</div>
                <div className="p-2"><button onClick={increment}>Dalej</button></div>
            </Stack>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {departments && departments.map(department =>
                        <tr key={department.id}>
                            <td>{department.name}</td>
                            <td>
                                <NavLink
                                    to={`/knowlage/category/${department.id}`}
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
  
  export default KnowlageScreen;
  