import api from '../settings'

import {
    FETCH_BOARDS,
    CREATE_BOARD_REQUEST
} from '../constants/BoardConstant'

import {
    BOARD_REQUEST,
    BOARD_REQUEST_GET_SUCCESS,
    BOARD_REQUEST_POST_SUCCESS,
    BOARD_REQUEST_ERROR,
    TOGGLE_IS_IMPORTANT_BOARD,
    BOARD_REQUEST_CREATED_SUCCESS
} from '../constants/BoardConstant'

import axios from 'axios'
import Utils from '../utils'
import UserActions from './UserAction';


export default class BoardActions {
    static boardRequest() {
        return {
            type: BOARD_REQUEST
        }
    }
    static toggleImportant(response) {
        return {
            type: TOGGLE_IS_IMPORTANT_BOARD,
            payload: response
        }
    }
    static boardRequestFailed(message) {
        return {
            type: BOARD_REQUEST_ERROR,
            error: message
        }
    }
    static boardRequestGetSuccess(data) {
        return {
            type: BOARD_REQUEST_GET_SUCCESS,
            payload: data
        }
    }

    static creatingBoardRequest() {
        return {
            type: "BOARD_REQUEST_CREATING"
        }
    }

    static boardCreated(response) {
        return {
            type: BOARD_REQUEST_CREATED_SUCCESS,
            payload: response
        }
    }

    static fetchBoards() {
        return (dispatch, getState) => {

            let {userId} = getState().user

            dispatch(BoardActions.boardRequest())
            
            axios({
                url: api.get_boards,
                mathod: 'get',
                headers: {"Access-Control-Allow-Headers": "*"},
                withCredentials: true
            }).then(response => {
                
                let all_boards = Utils.boardsToArray(response.data, userId)

                dispatch(BoardActions.boardRequestGetSuccess(all_boards))
                // return Promise.resolve(response.status)

            }).catch(({message}) => {
                // BoardActions.boardRequestFailed(message)
            })
        }
    }

    static toggleIsImportant(boardId, data) {
        return (dispatch, getState) => {
            let {userId} = getState().user

            axios({
                url: api.toggle_important_board(userId, boardId),
                method: 'post',
                headers: api.headers(),
                withCredentials: true,
                data: data
            }).then(response => {
                dispatch(BoardActions.toggleImportant(response.data))
            }).catch(e => {
                console.log(e.message)
            })

        }
    }

    static create_board(board, teamId) {

        return (dispatch) => {

            dispatch(BoardActions.creatingBoardRequest())

            return axios({
                url: api.create_board(teamId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(board)
            }).then(response => {
                
                console.log({response})
                dispatch(BoardActions.boardCreated(response.data))

                return Promise.resolve(response.data)
    
            }).catch(error => {
                console.log("ERROR creating board", {error})
            }) 
        }

    }
}


// const boardRequest = (type, data) => {
//     return {type, payload: data}
// }

// export function fetchBoards() {
//     return (dispatch, getState) => {

//         let {userId} = getState().user
        
//         axios({
//             url: api.get_boards,
//             mathod: 'get',
//             headers: {"Access-Control-Allow-Headers": "*"},
//             withCredentials: true
//         }).then(response => {
//             let all_boards = Utils.boardsToArray(response.data, userId)
//             dispatch(boardRequest(FETCH_BOARDS, all_boards))
//         })
//         .catch(error => {
//             console.log(error.message);
//         })
//     }
// }


// export function toggleIsImportant(boardId, data) {
//     return (dispatch, getState) => {
//         let {userId} = getState().user

//         axios.post(api.toggle_important_board(userId, boardId), data, api.headers)
//         .then(response => {
//             dispatch(boardRequest(TOGGLE_IS_IMPORTANT_BOARD, response.data))

            

//         }).catch(e => {
//             console.log(e.message)
//         })
//     }
// }


// export function create_board(board, teamId) {
//     return (dispatch) => {

//         return axios({
//             url: api.create_board(teamId),
//             method: 'POST',
//             headers: api.headers(),
//             withCredentials: true,
//             data: JSON.stringify(board)
//         }).then(response => {

//             dispatch(boardRequest(CREATE_BOARD_REQUEST, response.data))
//             return Promise.resolve(response.data)

//         }).catch(error => {
//             console.log("ERROR", {error})
//         }) 

        // axios.post(api.create_board(teamId), json, api.headers)
        // .then(response => {
        //     return response.json().then((data) => {
        //         console.log("response.then", {data})
        //     })
        //     dispatch(boardRequest(CREATE_BOARD_REQUEST, response.data))
        //     return Promise.resolve()
        // }).catch(error => {
        //     console.log("Error", {error})
        // })

//     }
// }




// export function create_board(board, teamId) {
//     return (dispatch) => {

//         fetch()
        
//         let json = JSON.stringify(board)
//         console.log({json}, api.create_board(teamId), teamId)

//         axios.post(api.create_board(teamId), json, api.headers)
//         .then(response => {
//             return response.json().then((data) => {
//                 console.log("response.then", {data})
//             })
//             // dispatch(boardRequest(CREATE_BOARD_REQUEST, response.data))
//             // return Promise.resolve()
//         }).catch(error => {
//             console.log("Error", {error})
//         })

//     }
// }




// export default class AccountActions {

//     static login(username, password) {

//       return (dispatch, getStore) => {
          
//         dispatch(AccountActions.loginRequest(username));

//         fetch(apiUrls.signInUrl, {})
//         .then(response => {

//           return response.json().then(responseJson => {
//             return dispatch(AccountActions.loginResponse(username, responseJson.token, response.status));
//           });

//         })
//         .catch(err => {
//           console.error(err);
//         });
//       };

//     }
  
//     static loginRequest(username) {
//       return {
//         type: ActionTypes.loginRequest,
//         username,
//       };
//     }
  
//     static loginResponse(username, token, status) {
//       return {
//         type: ActionTypes.loginResponse,
//         username,
//         token,
//         status,
//       };
//     }
  
//   }