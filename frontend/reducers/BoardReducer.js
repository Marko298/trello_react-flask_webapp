import {
    FETCH_BOARDS,
    FETCH_BOARD_BY_ID,
    TOGGLE_IS_IMPORTANT_BOARD,
    CREATE_BOARD_REQUEST
} from '../constants/BoardConstant'

import {
    BOARD_REQUEST,
    BOARD_REQUEST_GET_SUCCESS,
    BOARD_REQUEST_POST_SUCCESS,
    BOARD_REQUEST_ERROR,
    BOARD_REQUEST_CREATED_SUCCESS,
    CREATE_TEAM_REQUEST,
    CREATE_TEAM_SUCCESS,
    FETCH_TEAMS_SUCCESS
} from '../constants/BoardConstant'

import Utils from '../utils'

const innitialState = {
    teams: [
        {
            teamName: '',
            boards: []
        }
    ],
    isLoading: false,
    isTeamCreatingLoading: false
}


export default function BoardReducer(state=innitialState, {type, payload}) {
    switch(type) {
        case BOARD_REQUEST:
            return {...state, isLoading: true}

        case BOARD_REQUEST_GET_SUCCESS:
            return {...state, teams: [...payload], isLoading: false}
        
        // case FETCH_BOARD_BY_ID:
            // return [...state, ...payload]
        
        case TOGGLE_IS_IMPORTANT_BOARD: {
            const { data: updatedBoard, data: {_id, reletedTo: {teamId} }} = payload

            let comandsThatAreNotWasUpdated = state.teams.filter(c => c.status !=='__IMPORTANT__').filter(c => c._id !== teamId)

            const group = Utils.returnGroupById(state.teams, teamId)[0]
            let olderBoards = group.boards.filter(board => board._id !== _id )
            let updateComand = [{...group, boards: [...olderBoards, updatedBoard] }]
                        
            let newState = [...updateComand, ...comandsThatAreNotWasUpdated ]

            let boards = Utils.flattToArray(newState, "boards")
            let assignToImportant = Utils.setBoardsToImportant(boards)
            let wrappToArray = Utils.flattObjectToArray(assignToImportant)


            return {...state, teams: [...wrappToArray, ...newState]}
        }
           
           
        case BOARD_REQUEST_CREATED_SUCCESS: {
            let { reletedTo: {teamId} } = payload

            let group = Utils.returnGroupById(state.teams, teamId)[0]
            let updatedGroup = [{ ...group, boards: [...group.boards, payload] }]

            let oldGroup = state.teams.filter( ({_id}) => _id !== teamId )

            return {...state, teams: [...oldGroup, ...updatedGroup]}
            
        }

        case CREATE_TEAM_REQUEST: {
            return {
                ...state,
                isTeamCreatingLoading: true
            }
        }

        case FETCH_TEAMS_SUCCESS: {

            return {
                ...state
            }
        }

        case CREATE_TEAM_SUCCESS: {
            const {_id, boards, teamName: title} = payload
            const teamSchema = {_id, boards, title, status: "__COMAND__"}

            console.log({teamSchema})

            return {
                ...state,
                teams: [...state.teams, teamSchema],
                isTeamCreatingLoading: false
            }

        }

            default:
                return {...state}
        return state
    }
}