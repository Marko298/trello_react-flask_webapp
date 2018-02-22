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
    TEAM_UPDATE_REQUEST,
    TEAM_UPDATE_REQUEST_SUCCESS,
    TEAM_UPDATE_REQUEST_FAILED,
    BOARD_UPDATE_REQUEST,
    BOARD_UPDATE_SUCCESS,
    BOARD_UPDATE_FAILED,
    CREATED_NEW_LIST_FOR_BOARD

} from '../constants/BoardConstant'

import axios from 'axios'
import Utils from '../utils'
import UserActions from './UserAction';
import ListActions from './ListAction'
import CardActions from './CardAction'
import ToolsActions from './ToolsAction'

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
        console.log({data})
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
                        title: name 
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

    static createdNewList(listId) {
        return {type: CREATED_NEW_LIST_FOR_BOARD, payload: listId}
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
        return (dispatch, getState) => {

            dispatch(BoardActions.boardRequest())

            return Promise.all([
                dispatch(BoardActions.fetchBoards()),
                dispatch(BoardActions.fetchTeams()),
                dispatch(ListActions.get_list_schema()),
               dispatch(CardActions.get_schema_card_request())
            ]).then((responseArray) => {
                const state = getState()
                const [boards, teams, listSc, cardSc] = responseArray
                const {boards: userBoards} = state.user
                const isUserHaveBoards = userBoards.length > 0 ? true : false

                const {userId, name } = state.user
                const teamForUser = {
                    _id: userId,
                    title: name,
                    boards: userBoards,
                    photo: '',
                    websites: ''
                }

                if(boards.length === 0 && teams.length === 0) {
                    dispatch(BoardActions.boardRequestGetSuccess([teamForUser]))
                    return "Nothink to upload"
                }

                if(boards.length === 0 && teams.length > 0) {
                    let teamsWithBoard = Utils.reduceTeamToBoard(teams)
                    dispatch(BoardActions.boardRequestGetSuccess([teamsWithBoard, teamForUser]))
                    return
                }


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
                const isHaveSomeTeamWithoutBoards = teamsWithoutBoardsWithoutStatus.length > 0

                if (!isUserHaveBoards) {
                    
                    boardsWithAllTeamField = [...boardsWithAllTeamField, teamForUser]
                } 

                if (isHaveSomeTeamWithoutBoards) {

                    let teamsWithoutBoardsWithoutStatusMaps = teamsWithoutBoardsWithoutStatus.map( (team) => {
                        const preparedTeam = {
                            _id: team._id,
                            title: team.teamName,
                            boards: team.boards,
                            photo: team.photo,
                            website: team.website,
                        }
                        return  preparedTeam
                    })

                   const mergeTeams = [...teamsWithoutBoardsWithoutStatusMaps, ...boardsWithAllTeamField]
                   dispatch(BoardActions.boardRequestGetSuccess(mergeTeams))
                   return
                }

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
            dispatch( ToolsActions.is_file_start_upload()  )

            axios({
                url: api.set_image_for_team(teamId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: image,
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                    dispatch(ToolsActions.file_upload_progress(percentCompleted))
                    
                }
            }).then(({data}) => {
                console.log("SUCCESS")
                dispatch(ToolsActions.is_file_uploaded())
                dispatch(BoardActions.upload_image_success(data, teamId))
            }).catch(error => {
                console.log("ERROR", {error})
                dispatch(ToolsActions.is_file_uploaded())
                dispatch(BoardActions.upload_image_failed())
            })
        }
    }

    static team_update_request() {
        return {type: TEAM_UPDATE_REQUEST}
    }
    static team_update_success(response) {
        return {
            type: TEAM_UPDATE_REQUEST_SUCCESS,
            payload: response
        }
    }
    static team_update_failed() {
        return {type: TEAM_UPDATE_REQUEST_FAILED}
    }


    static update_team(teamId, updates) {
        return dispatch => {

            dispatch(
                BoardActions.team_update_request()
            )

            axios({
                url: api.update_team(teamId),
                headers: api.headers(),
                method: "POST",
                withCredentials: true,
                data: JSON.stringify(updates)
            }).then(({data}) => {

                dispatch(
                    BoardActions.team_update_success(data)
                )
            }).catch(error => {
                dispatch(
                    BoardActions.team_update_failed()
                )
            })
        }
    }

    static board_update_request() {
        return {type: BOARD_UPDATE_REQUEST}
    }
    static board_update_success(response) {
        return {
            type: BOARD_UPDATE_SUCCESS,
            payload: response
        }
    }
    static board_update_failed() {
        return {type: BOARD_UPDATE_FAILED}
    }


    static update_board(boardId, updates) {
        return (dispatch) => {

            dispatch( BoardActions.board_update_request())
            
            axios({
                url: api.update_board_data(boardId),
                method: 'POST',
                withCredentials: true,
                headers: api.headers(),
                data: JSON.stringify(updates)
            }).then(({data}) => {
                dispatch( BoardActions.board_update_success(data) )
            }).catch(error => {

                dispatch( BoardActions.board_update_failed() )
            })
        }
    }
}
