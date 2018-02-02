
import {USER_REQUEST_FAILED, USER_REQUEST, USER_LOGIN_SUCCESS, USER_REQUEST_LOGOUT} from '../constants/UserConstants'

let defaultLabels = [
    {_id: "41335e0511994300a2845c20bf8fe57d", color: "#c62828", description: "red"},
    {_id: "a5b54c2d0f184550aca154a05e39fd1b", color: "#eeff41", description: "yellow"},
    {_id: "44d2a269dd374b87a3f3090f7c7cde8a", color: "#00e676", description: "green"},
    {_id: "0063886c4eb04603b5b204620ca987de", color: "#42a5f5", description: "blue"},
]

const initialState = {
    userId: "a8ea0247945a4718861760aedcdc117c",
    email: null,
    error: null,
    isLoading: false,
    labels: defaultLabels || [],
    name: '',
    photo: ''
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
                name: payload.name,
                labels: payload.labels,
                photo: payload.photo
            }
        }
        case USER_REQUEST_FAILED: {
            return {
                ...state,
                userId: null,
                email: null,
                error: payload,
                isLoading: false,
                name: null,
                photo: null
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

        