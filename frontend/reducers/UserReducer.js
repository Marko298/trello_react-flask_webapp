// import {USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR, USER_LOGIN_ERROR, USER_LOGIN_SUCCESS, USER_LOGOUT} from '../constants/UserConstants'

import {USER_REQUEST_FAILED, USER_REQUEST, USER_LOGIN_SUCCESS, USER_REQUEST_LOGOUT} from '../constants/UserConstants'

const initialState = {
    userId: "e5383e778a2549138e47d6d132772016",
    email: null,
    error: null,
    isLoading: false
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
            return initialState
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

        