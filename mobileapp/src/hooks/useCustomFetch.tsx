import { useEffect, useRef, useReducer } from 'react';
import { ACTION_TYPE } from './postActionTypes';
import { INITIAL_STATE, postReducer } from './postReducer'
import { BASE_API_URL, API_KEY } from '../config';
import PackageJson from '../../package.json';

//https://jasonwatmore.com/post/2021/09/17/react-fetch-set-authorization-header-for-api-requests-if-user-logged-in
//https://reactnative.dev/docs/network
export const useCustomFetch = (query, cached = true, stataticData = []) => {
  const cache = useRef([]);
  const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

	useEffect(() => {
		if (!query || !query.trim()) return;

    const fetchData = async () => {
      // console.log("query", query)
      if (state.loading || state.moreLoading || state.isListEnd) return;
      dispach({type: ACTION_TYPE.FETCH_START});

      console.log("cache: " + (cached?"t":"f") + " : " + query);

      // if (cache.current[query] && cached ) {
        
      //     console.log("cache: " + (cached?"t":"f") + " : " + query);
      //     const data = cache.current[query];
      //     dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage});
      // } else {
        fetch(`${BASE_API_URL}/${query}`, {
            method: 'GET',
            headers: {
              'X-API-Key': API_KEY,
              'X-APP-Version': PackageJson.version
            },
          })
          .then( (response) => {
            return response.json();
          })
          .then( (data) => {
            

            dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: [...data.data, ...stataticData], totalPage: data.totalPage});
            // dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage});
            cache.current[query] = data; // set response in cache;
          })
          .catch( (error) => {
            // console.log("error: ", error);
            dispach({type: ACTION_TYPE.FETCH_ERROR, error: error});
          });
      // }
    }

		fetchData();
	}, [query]);

  return state;
};