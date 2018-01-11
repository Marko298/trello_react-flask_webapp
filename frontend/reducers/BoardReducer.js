import {FETCH_BOARDS, FETCH_BOARD_BY_ID} from '../constants/BoardConstant'

const innitialState = [
    {
        teamName: '',
        boards: []
    }
]

export default function BoardReducer(state=innitialState, action) {
    switch(action.type) {
        case FETCH_BOARDS:
            return [...action.payload]
        
        case FETCH_BOARD_BY_ID:
            return [...state, ...action.payload]
              
            default:
                return state
        return state
    }
}