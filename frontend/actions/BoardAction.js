import api from '../settings'

import {FETCH_BOARDS, CREATE_BOARD_REQUEST} from '../constants/BoardConstant'

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
    BOARD_DELETE_REQUEST_SUCCESS,
    TEAM_UPLOAD_IMAGE_REQUEST,
    TEAM_UPLOAD_IMAGE_SUCCESS,
    TEAM_UPLOAD_IMAGE_FAILED,
    TEAM_UPLOAD_IMAGE_PROGRESS,

} from '../constants/BoardConstant'

import axios from 'axios'
import Utils from '../utils'
import UserActions from './UserAction';
import ListActions from './ListAction'
import CardActions from './CardAction'

export default class BoardActions {
    static boardRequest() {
        return {type: BOARD_REQUEST}
    }
    static toggleImportant(response) {
        return {type: TOGGLE_IS_IMPORTANT_BOARD, payload: response}
    }
    static boardRequestFailed(message) {
        return {type: BOARD_REQUEST_ERROR, error: message}
    }
    static boardRequestGetSuccess(data) {
        return {type: BOARD_REQUEST_GET_SUCCESS, payload: data}
    }

    static creatingBoardRequest() {
        return {type: "BOARD_REQUEST_CREATING"}
    }

    static boardCreated(response) {
        return {type: BOARD_REQUEST_CREATED_SUCCESS, payload: response}
    }

    static fetchBoards() {
        return (dispatch, getState) => {

            let {userId, name} = getState().user

            return axios({
                url: api.get_boards,
                mathod: 'get',
                headers: {
                    "Access-Control-Allow-Headers": "*"
                },
                withCredentials: true
            }).then(({data}) => {
                let all_boards = Utils.boardsToArray(data, userId)
                let isHavePrivateFields = all_boards.filter(board => board._id === userId)

                if (isHavePrivateFields.length === 0) {
                    all_boards.push({
                        status: '__PRIVATE__',
                        _id: userId,
                        boards: [],
                        title: name || 'Pasha School'
                    })
                }

                // dispatch(BoardActions.boardRequestGetSuccess(all_boards))
                // dispatch(BoardActions.boardRequestGetSuccess(all_boards))
                return Promise.resolve(data)

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
        return {type: CREATE_TEAM_REQUEST}
    }

    static created_team_successfully(data) {
        return {type: CREATE_TEAM_SUCCESS, payload: data}
    }

    static create_team(data) {
        return (dispatch) => {

            dispatch(BoardActions.create_team_request())
            return axios({
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
        return {type: FETCH_TEAMS_SUCCESS, payload: response}
    }

    static fetchTeams() {
        return (dispatch) => {

            return axios({
                url: api.get_teams,
                method: "GET",
                withCredentials: true,
                headers: api.headers()
            }).then( ({data}) => {
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
                dispatch(BoardActions.fetchTeams()),
                dispatch(ListActions.get_list_schema()),
               dispatch(CardActions.get_schema_card_request())
            ]).then((responseArray) => {

                let boards = responseArray[0]
                let teams = responseArray[1]

                let withTeams = Utils.partialReverse(
                    Utils.setMissedFieldsToBoardsFromTeams,
                    teams
                )

                let boardsWithAllTeamField = Utils.pipe(
                    Utils.splitBoardsToCommand,
                    Utils.flattObjectToArray,
                    withTeams
                )(boards)

                let teamsWithoutBoardsWithoutStatus = teams.filter(team => team.boards.length === 0)

                teamsWithoutBoardsWithoutStatus.map( ({_id, title, photo, boards}) => {
                    boardsWithAllTeamField.concat( [{ _id, title, photo, boards: boards || [] }] )
                })

                dispatch(BoardActions.boardRequestGetSuccess(boardsWithAllTeamField))

                return "I'm done"

            }).catch(error => {
                console.log("> Can not fetch the data. ERROR")
            })

        }
    }

    static board_success_deleted(response) {
        return {type: BOARD_DELETE_REQUEST_SUCCESS, payload: response}
    }

    static delete_board(boardId) {

        return (dispatch) => {
            axios({
                url: api.delete_board(boardId),
                method: 'DELETE',
                headers: api.headers(),
                withCredentials: true
            }).then((response) => {
                console.log({response})
                dispatch(BoardActions.board_success_deleted(response.data))

            }).catch(error => {
                console.log("CANNOT DELETE THIS POSE", {error})
            })
        }
    }

    static upload_image_request() {
        return {
            type: TEAM_UPLOAD_IMAGE_REQUEST
        }
    }

    static upload_image_success(image, teamId) {
        return {
            type: TEAM_UPLOAD_IMAGE_SUCCESS,
            payload: image,
            teamId
        }
    }

    static upload_image_failed() {
        return {
            type: TEAM_UPLOAD_IMAGE_FAILED
        }
    }

    static upload_image_progress(progress) {
        return {
            type: TEAM_UPLOAD_IMAGE_PROGRESS,
            progress
        }
    }

    static upload_image(teamId, image) {

        return (dispatch) => {

            dispatch( BoardActions.upload_image_request() )

            axios({
                url: api.set_image_for_team(teamId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: image,
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );

                    dispatch(BoardActions.upload_image_progress(percentCompleted))
                    
                }
            }).then(({data}) => {
                dispatch(BoardActions.upload_image_success(data, teamId))
            }).catch(error => {
                dispatch(BoardActions.upload_image_failed())
            })
        }
    }
}
