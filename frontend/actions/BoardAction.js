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
    BOARD_REQUEST_CREATED_SUCCESS,
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    FETCH_TEAMS_SUCCESS,
    BOARD_DELETE_REQUEST_SUCCESS

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

            return axios({
                url: api.get_boards,
                mathod: 'get',
                headers: {"Access-Control-Allow-Headers": "*"},
                withCredentials: true
            }).then(response => {
                let all_boards = Utils.boardsToArray(response.data, userId)
                dispatch(BoardActions.boardRequestGetSuccess(all_boards))
                return Promise.resolve(all_boards)

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


    static create_team_request() {
        return {
            type : CREATE_TEAM_REQUEST
        }
    }

    static created_team_successfully(data) {
        return {
            type: CREATE_TEAM_SUCCESS,
            payload: data
        }
    }

    static create_team(data) {
        return (dispatch) => {

            dispatch(BoardActions.create_team_request())
            return  axios({
                url: api.create_team,
                method: "POST",
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(data)
            }).then((response) => {
                console.log("SUCCESS", {response})
                dispatch(BoardActions.created_team_successfully(response.data))
            }).catch((error) => {
                console.log("ERROR", {error})
            })
        }
    }

    static fetch_boards_success(response) {
        return {
            type: FETCH_TEAMS_SUCCESS,
            payload: response
        }
    }

    static fetchTeams() {
        return (dispatch) => {

            return axios({
                url: api.get_teams,
                method: "GET",
                withCredentials: true,
                headers: api.headers()
            }).then( response => {
                const {data} = response
                dispatch(BoardActions.fetch_boards_success(data))
                return Promise.resolve(data)
            }).catch(error => {
                console.log("ERROR ")
            })

        }
    }

    static fetchBoardsAndTeams() {
        return (dispatch) => {

            dispatch(BoardActions.boardRequest())

            return Promise.all([
                dispatch(BoardActions.fetchBoards()),
                dispatch(BoardActions.fetchTeams())
            ]).then((responseArray) => {

                let boards = [...responseArray[0]]
                let teams = [...responseArray[1]]
                let teamsWithoutBoards = teams.filter(team => team.boards.length === 0)

                let updatedTeam = teamsWithoutBoards.map(board => {
                    boards.push({
                        status: "__COMAND__",
                        title: board.teamName,
                        _id: board._id,
                        boards: [...board.boards]
                    })
                })

                dispatch(BoardActions.boardRequestGetSuccess(boards))

                return "I'm done"
            }).catch(error => {
                console.log("> Can not fetch the data. ERROR")
            })

        }
    }

    static board_success_deleted(response) {
        return {
            type: BOARD_DELETE_REQUEST_SUCCESS,
            payload: response
        }
    }

    static delete_board(boardId) {

        return (dispatch) => {
            axios({
                url: api.delete_board(boardId),
                method: 'DELETE',
                headers: api.headers()
            }).then((response) => {
                console.log({response})
                dispatch(BoardActions.board_success_deleted(response.data))

            }).catch(error => {
                console.log("CANNOT DELETE THIS POSE", {error})
            })
        }
    }
}
