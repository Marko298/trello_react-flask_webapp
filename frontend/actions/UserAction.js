import {USER_SIGNIN_SUCCESS, USER_SIGNIN_ERROR, USER_LOGIN_ERROR, USER_LOGIN_SUCCESS} from '../constants/UserConstants'
import axios from 'axios'

const userRequest = (type, data) => ({type, payload: data})


export function requestUserSignIn(data) {
    return (dispatch) => {

        let json = JSON.stringify(data);
        let header = {headers: {'Content-Type': 'application/json'}}

        axios.post('/users/register', json, header)
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
        let header = {headers: {'Content-Type': 'application/json'}}

        axios.post('/users/login', json, header)
            .then(response => {
                dispatch(userRequest(USER_LOGIN_SUCCESS, response.data))
            })
            .catch(error => {
                console.log(error.response);
                dispatch(userRequest(USER_LOGIN_ERROR, error.message))
            })
    }
}