
import {USER_REQUEST_FAILED, USER_REQUEST, USER_LOGIN_SUCCESS, USER_REQUEST_LOGOUT} from '../constants/UserConstants'

const initialState = {
    userId: "b2b63710b865419ba4db2e873baddf90",
    email: null,
    error: null,
    isLoading: false,
    name: ''
}

const UserReducer = function (state = initialState, {type, payload}) {
    switch (type) {
        case USER_REQUEST: {
            return {
                ...state,
                isLoading: true 
            }
        }
        
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                email: payload.email,
                userId : payload._id,
                name: payload.name
            }
        }
        case USER_REQUEST_FAILED: {
            return {
                ...state,
                userId: null,
                email: null,
                error: payload,
                isLoading: false,
                name: null
            }
        }
        case USER_REQUEST_LOGOUT: {
            return {
                ...initialState,
                userId: null
            }
        }
        
        // case USER_SIGNIN_SUCCESS:
        //     return {
        //         ...state,
        //         error: null,
        //         userId: payload
        //     }
        // case USER_LOGIN_SUCCESS:
        //     return {
        //         ...state,
        //         error: null,
        //         userId: payload
        //     }
            
        // case USER_LOGIN_ERROR:
        //     return {
        //         ...state,
        //         error: payload,
        //         userId: null
        //     }
            /**
            |--------------------------------------------------
            | TEST REDUCER
            |--------------------------------------------------
            */

        default:
            return state
    }
    return state
}

export default UserReducer

        