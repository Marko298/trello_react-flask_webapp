import {USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR, USER_LOGIN_ERROR, USER_LOGIN_SUCCESS, USER_LOGOUT} from '../constants/UserConstants'

const initialState = {
    userId: "userId",
    error: null
}

const UserReducer = function (state = initialState, {type, payload}) {
    switch (type) {
        case USER_SIGNIN_SUCCESS:
            return {
                ...state,
                error: null,
                userId: payload
            }
        case USER_SIGNIN_ERROR:
            return {
                ...state,
                error: payload,
                userId: null
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                error: null,
                userId: payload
            }
            
        case USER_LOGIN_ERROR:
            return {
                ...state,
                error: payload,
                userId: null
            }
            /**
            |--------------------------------------------------
            | TEST REDUCER
            |--------------------------------------------------
            */
        case USER_LOGOUT: 
            return {
                ...state,
                error: null,
                userId: null
            }
        default:
            return state
    }
    return state
}

export default UserReducer

        