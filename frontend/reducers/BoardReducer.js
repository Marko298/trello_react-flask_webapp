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

import Utils from '../utils'

const innitialState = {
    teams: [
        {
            teamName: '',
            boards: []
        }
    ],
    image_proccess: {
        isImageUploading: false,
        uploadingProgress: 0
    },
    isLoading: false,
    isTeamCreatingLoading: false,
    isTeamEditingRequestDone: false,
    isBoardUpdating: false
}


export default function BoardReducer(state=innitialState, {type, payload, progress, ...action}) {
    switch(type) {
        case BOARD_REQUEST:
            return {...state, isLoading: true}

        case BOARD_REQUEST_GET_SUCCESS:
            return {...state, teams: [...payload], isLoading: false}
        
        // case FETCH_BOARD_BY_ID:
            // return [...state, ...payload]
        
        case TOGGLE_IS_IMPORTANT_BOARD: {
            const { data: updatedBoard, data: {_id, reletedTo: {teamId} }} = payload

            return {
                ...state,
                teams: state.teams.map(team => {
                    if(team._id === teamId) {
                        return {
                            ...team,
                            boards: team.boards.map(board => {
                                if(board._id === _id) {
                                    return {
                                        ...board,
                                        ...updatedBoard
                                    }
                                }
                                return {...board}
                            })
                        }
                    }
                    return {...team}
                })
            }
        }

        case CREATED_NEW_LIST_FOR_BOARD: {
            
            const testTeams = state.teams.map(team => {
                
                const boardOfTeam = team.boards.map(board => {
                    if(board._id === payload.forBoard) {
                        return {
                            ...board,
                            lists: [...board.lists, payload._id]
                        }
                    }
                    return {...board}
                })
                return {...team, boards: [...boardOfTeam]}
            })
            
            return {...state, teams: testTeams}
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

            return {
                ...state,
                teams: [...state.teams, teamSchema],
                isTeamCreatingLoading: false
            }

        }
        case BOARD_DELETE_REQUEST_SUCCESS: {
            const _id = payload
            
            let updatedTeams = state.teams.map(team => {
                return {
                    ...team,
                    boards: team.boards.filter(board => board._id !== _id)
                }
            })

            return {
                ...state,
                teams: [...updatedTeams]
            }

        }

        case TEAM_UPLOAD_IMAGE_REQUEST: {
            return {
                ...state,
                image_proccess: {
                    ...state.image_proccess,
                    isImageUploading: true
                }
            }
        }
        
        case TEAM_UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                image_proccess: {
                    ...state.image_proccess,
                    isImageUploading: false
                },
                teams: state.teams.map(team => {
                    if(team._id === action.teamId) {
                        return {
                            ...team,
                            photo: payload
                        }
                    }
                    return {...team}
                })
            }
        }

        case TEAM_UPLOAD_IMAGE_FAILED: {
            const {teamId} = action
            return {
                ...state
            }
        }
       
        case TEAM_UPDATE_REQUEST: {
            return {
                ...state,
                isTeamEditingRequestDone: true
            }
        }
        case TEAM_UPDATE_REQUEST_SUCCESS: {
            return {
                ...state,
                isTeamEditingRequestDone: false,
                teams: state.teams.map(team => {
                    if (team._id === payload._id) {
                        return {
                            ...team,
                            title: payload.teamName,
                            ...payload
                        }
                    }
                    return {...team}
                })

            }
        }
        case TEAM_UPDATE_REQUEST_SUCCESS: {
            return {
                ...state,
                isTeamEditingRequestDone: false
            }
        }

        case BOARD_UPDATE_REQUEST: {
            return {
                ...state,
                isBoardUpdating: true
            }
        }
        case BOARD_UPDATE_SUCCESS: {
            const {reletedTo: {teamId}, _id: justUpdatedBoardId} = payload
            return {
                ...state,
                isBoardUpdating: false,
                teams: state.teams.map(team => {
                    if(team._id === teamId) {
                        return {
                            ...team,
                            boards: team.boards.map(board => {
                                if(board._id === justUpdatedBoardId) {
                                    return {
                                        ...board,
                                        ...payload
                                    }
                                }
                                return {...board}
                            })
                        }
                    }   
                    return {...team}
                })
            }
        }
        case BOARD_UPDATE_FAILED: {
            return {
                ...state,
                isBoardUpdating: false
            }
        }

      
        default:
            return {...state}
        return state
    }
}