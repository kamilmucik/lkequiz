import { useEffect, useReducer} from 'react';
import { ACTION_TYPE } from './postActionTypes';
import { INITIAL_STATE, postReducer } from './postReducer'

export const useCustomApi = (query: string, formData: any, method: any, actionType: any) => {
    const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

    useEffect(() => {
        // console.log("sending: " + JSON.stringify(formData));
		if (!formData || formData === null) return;
        dispach({type: ACTION_TYPE.FETCH_START, loading: true, moreLoading: true });

        const postData = () => {
            fetch(query, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }
            )
            .then( (response) => {
                return response.json();
            })
            .then( (data) => {
                console.log("data: " + JSON.stringify(data));
                // if (actionType == "FETCH_SINGLE_SUCCESS"){
                //     dispach({type: ACTION_TYPE.FETCH_SINGLE_SUCCESS, payload: data });
                // }

                // if (actionType == "FETCH_DELETE_SUCCESS"){
                //     dispach({type: ACTION_TYPE.FETCH_DELETE_SUCCESS, payload: data });
                // }

                // if (actionType == "FETCH_POSUP_SUCCESS"){
                //     dispach({type: ACTION_TYPE.FETCH_POSUP_SUCCESS, payload: data });
                // }
            })
            .catch( (error) => {
                console.error(error);
                dispach({type: ACTION_TYPE.FETCH_ERROR, error: error});
            });
        }
        
        postData();
	}, [formData]);

  return state;
};