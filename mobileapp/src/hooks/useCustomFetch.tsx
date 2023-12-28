import { useEffect, useRef, useReducer } from 'react';
import { ACTION_TYPE } from './postActionTypes';
import { INITIAL_STATE, postReducer } from './postReducer'
import { BASE_API_URL, API_KEY } from '../config';


export const useCustomFetch = (query) => {
    const cache = useRef([]);
    const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

	useEffect(() => {
		let cancelRequest = false;
		if (!query || !query.trim()) return;

        const fetchData = async () => {

            // console.log("query", query)
            if (state.loading || state.moreLoading || state.isListEnd) return;
            dispach({type: ACTION_TYPE.FETCH_START});
            if (cache.current[query]) {
                const data = cache.current[query];
                dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage});
            } else {
              fetch(`${BASE_API_URL}/${query}`)
                .then( (response) => {
                  return response.json();
                })
                .then( (data) => {
                  dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage});
                  cache.current[query] = data; // set response in cache;
                })
                .catch( (error) => {
                  dispach({type: ACTION_TYPE.FETCH_ERROR});
                });
            }
          }

		fetchData();

		return function cleanup() {
			cancelRequest = true;
		};
	}, [query]);

    return state;
};