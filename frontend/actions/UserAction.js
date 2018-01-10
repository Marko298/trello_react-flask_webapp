import {USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR, USER_LOGIN_ERROR, USER_LOGIN_SUCCESS, USER_LOGOUT, FETCH_BOARD_BY_ID} from '../constants/UserConstants'
import axios from 'axios'

const userRequest = (type, data) => ({type, payload: data})


export function requestUserSignIn(data) {
    return (dispatch) => {

        let json = JSON.stringify(data);
        let header = {headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }}

        axios.post('http://localhost:4000/users/register', json, header)
        .then(response => {
            dispatch(userRequest(USER_SIGNIN_SUCCESS, response.data))
        })
        .catch(error => {
            console.log(error.message);
            dispatch(userRequest(USER_SIGNIN_ERROR, error.message))
        })

    }
}

export function requestUserLogin(data) {
    return (dispatch) => {

        let json = JSON.stringify(data);
        let header = {headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }}
        axios.post('http://localhost:4000/users/login', json, header)
            .then(response => {
                
                dispatch(userRequest(USER_LOGIN_SUCCESS, response.data._id))
            })
            .catch(error => {
                console.log(error.response);
                dispatch(userRequest(USER_LOGIN_ERROR, error.message))
            })
    }
}


/**
|--------------------------------------------------
| TEST ACTIONS
|--------------------------------------------------
*/

export function logout() {
    return {
        type: USER_LOGOUT
    }
}

export function fetchBoard(id) {

    return (dispatch) => {

        let header = {headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }}

        axios.get(`http://localhost:4000/boards/${id}`, header)
        .then(response => {
            dispatch({type: FETCH_BOARD_BY_ID,
                payload: response.data})
        })
        .catch(error => {
            console.log(error.message);
            dispatch(userRequest(USER_SIGNIN_ERROR, error.message))
        })

    }
    
}