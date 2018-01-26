import {
    LIST_REQUEST,
    LIST_REQUEST_GET_SUCCESS,
    LIST_REQUEST_POST_SUCCESS
} from '../constants/ListConstant'

const initialState = {
    isLoading: false
}

export default function ListReducer(state=initialState, {type, payload, ...action}) {

    switch(type) {
        case LIST_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
           
        case LIST_REQUEST_GET_SUCCESS: {
            
            return {
                ...state,
                isLoading: false
            }
        }
           
        case LIST_REQUEST_POST_SUCCESS: {
            
        }

        default: {
            return state
        }
    }

    return state
}