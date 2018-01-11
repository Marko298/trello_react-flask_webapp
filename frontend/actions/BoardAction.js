import {FETCH_BOARDS} from '../constants/BoardConstant'
import axios from 'axios'
import Utils from '../utils'

const boardRequest = (type, data) => ({type, payload: data})

// Utils.boardsToArray(boards)
export function fetchBoards() {
    return (dispatch) => {

        axios({
            url: 'http://localhost:4000/boards',
            mathod: 'get',
            headers: {"Access-Control-Allow-Headers": "*"},
            withCredentials: true
        }).then(response => {

            let result = Utils.boardsToArray(response.data)
            console.log(result)
            dispatch(boardRequest(FETCH_BOARDS, result))
        })
        .catch(error => {
            console.log(error.message);
            // dispatch(userRequest(USER_SIGNIN_ERROR, error.message))
        })

    }
}
