import { useEffect, useContext, useReducer } from 'react';
import { ACTION_TYPE } from './postActionTypes.ts';
import { INITIAL_STATE, postReducer } from './postReducer.ts'
import { BASE_API_URL, API_KEY } from '../config.tsx';
import PackageJson from '../../package.json';
import AppContext from "../store/AppContext";

//https://jasonwatmore.com/post/2021/09/17/react-fetch-set-authorization-header-for-api-requests-if-user-logged-in
//https://reactnative.dev/docs/network
//https://greenonsoftware.com/articles/react/react-use-ref-hook/
//https://blog.logrocket.com/implementing-component-visibility-sensor-react-native/
export const useCustomFetch = (query: string, cached = true, stataticData = []) => {
  const appCtx = useContext(AppContext);
  const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

	useEffect(() => {
		if (!query || !query.trim()) return;
    dispach({type: ACTION_TYPE.FETCH_START, loading: true, moreLoading: true});

    const fetchData = () => {
      if (appCtx.existInCache(query) ) {
          const data = appCtx.cache.current[query];
          dispach({type: ACTION_TYPE.FETCH_SUCCESS, data: [...data.data.data, ...stataticData], totalPage: data.data.totalPage});
      } else {
        fetch(`${BASE_API_URL}/${query}`, {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
              // 'test': '123',
              // 'X-API-Key': API_KEY,
              // 'X-APP-Version': PackageJson.version
            },
          }
          )
          .then( (response) => {
            return response.json();
          })
          .then( (data) => {
            dispach({type: ACTION_TYPE.FETCH_SUCCESS, data: [...data.data, ...stataticData], totalPage: data.totalPage});
            appCtx.addToCache(query, data);
          })
          .catch( (error) => {
            dispach({type: ACTION_TYPE.FETCH_ERROR, error: error});
          });
      }
    }
    

		fetchData();
	}, [query]);

  return state;
};