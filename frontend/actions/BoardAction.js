import {FETCH_BOARDS, TOGGLE_IS_IMPORTANT_BOARD} from '../constants/BoardConstant'
import axios from 'axios'
import Utils from '../utils'

const boardRequest = (type, data) => ({type, payload: data})

export function fetchBoards() {
    return (dispatch, getState) => {

        let {userId} = getState().user
        
        axios({
            url: 'http://localhost:4000/boards',
            mathod: 'get',
            headers: {"Access-Control-Allow-Headers": "*"},
            withCredentials: true
        }).then(response => {

            let all_boards = Utils.boardsToArray(response.data, userId)


            dispatch(boardRequest(FETCH_BOARDS, all_boards))

        })
        .catch(error => {
            console.log(error.message);
            // dispatch(userRequest(USER_SIGNIN_ERROR, error.message))
        })
        
    }
}


export function toggleIsImportant(boardId, data) {
    
    return (dispatch, getState) => {

        let {userId} = getState().user
       
        let header = {headers: {
            "Access-Control-Allow-Headers": "*",
            "Content-Type": "application/json"
        }, "withCredentials": true}

        axios.post(`http://localhost:4000/user/${userId}/${boardId}/toggle_board_settings`, data, header)
        .then(response => {
            console.log("SUCCESS")
            console.log(response.data)

            dispatch(boardRequest(TOGGLE_IS_IMPORTANT_BOARD, response.data))

        }).catch(e => {
            console.log('ERRROR')
            console.log(e.message)
        })
    }
}
