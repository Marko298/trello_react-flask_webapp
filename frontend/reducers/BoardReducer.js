import {FETCH_BOARDS, FETCH_BOARD_BY_ID, TOGGLE_IS_IMPORTANT_BOARD} from '../constants/BoardConstant'
import Utils from '../utils'

const innitialState = [
   
        {
            teamName: '',
            boardsGroup: []
        }
    ]

// all_boards,important_boards
export default function BoardReducer(state=innitialState, {type, payload}) {
    switch(type) {
        case FETCH_BOARDS:

            return [...payload]
        
        case FETCH_BOARD_BY_ID:
            return [...state, ...payload]
        
        case TOGGLE_IS_IMPORTANT_BOARD:
            const { data: updatedBoard, data: {_id, reletedTo: {teamId} }} = payload

            let comandsThatAreNotWasUpdated = state.filter(c => c.status !=='__IMPORTANT__').filter(c => c._id !== teamId)

            let group = Utils.returnGroupById(state, teamId)[0]
            let olderBoards = group.boards.filter(board => board._id !== _id )
            let updateComand = [{...group, boards: [...olderBoards, updatedBoard] }]
                        
            let newState = [...updateComand, ...comandsThatAreNotWasUpdated ]

            let boards = Utils.flattToArray(newState, "boards")
            let assignToImportant = Utils.setBoardsToImportant(boards)
            let wrappToArray = Utils.flattObjectToArray(assignToImportant)

            return [...wrappToArray, ...newState]
           
            default:
                return state
        return state
    }
}