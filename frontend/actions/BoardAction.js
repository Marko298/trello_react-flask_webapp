import {FETCH_BOARDS} from '../constants/BoardConstant'
import axios from 'axios'

const boardRequest = (type, data) => ({type, payload: data})


export function fetchBoards() {
    return (dispatch) => {

        axios.get('http://localhost:4000/boards', {headers: {"Access-Control-Allow-Headers": "*"}})
        .then(response => {
            console.log(response)
            console.log("SUCCESS")
            dispatch(boardRequest(FETCH_BOARDS, response.data))
        })
        .catch(error => {
            console.log("ERROR")
            console.log(error.message);
            // dispatch(boardRequest(USER_SIGNIN_ERROR, error.message))
        })

    }
}