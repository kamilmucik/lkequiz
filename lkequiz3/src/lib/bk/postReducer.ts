export const INITIAL_STATE = {
    loading: false,
    error: null,
    data: []
}

export const postReducer = (state = INITIAL_STATE, action: any) => {
    switch(action.type){
        case "FETCH_START":
                return { 
                    ...state, 
                    loading: true 
                }
        case "FETCH_SUCCESS":
            return {
                ...state,
                data: [ ...action.payload],
                error: '',
                loading: false
            }
        case "FETCH_ERROR":
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;

    }
}