import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Stack from 'react-bootstrap/Stack';
import AppContext from '../store/AppContext';


const KnowlageCategoriesScreen = () => {

  const appCtx = useContext(AppContext);
  const { departmentId } = useParams();
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const PAGE_SIZE = 8;

  const fetchCategories = async (page) => {
      try {
          const response = await fetch(`${appCtx.settingsURLValue}/api/category/${departmentId}/${page}/${PAGE_SIZE}/`);
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
      fetchCategories(currentPage).then(json => {
          // console.log("data",json);
          setTotalPage(json.totalPage);
          setCategories(json.data);
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

    return <div className="container">
    <Stack direction="horizontal" gap={4}>
        <div className="p-2 text-center"></div>
        <div className="p-2 ms-auto"><button onClick={decrement}>Wstecz</button></div>
        <div className="p-2">{currentPage} z {totalPage}</div>
        <div className="p-2"><button onClick={increment}>Dalej</button></div>
    </Stack>
      <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Baza wiedzy: kategorie</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category =>
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <NavLink to={`/knowlage/question/${category.id}`} >       
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