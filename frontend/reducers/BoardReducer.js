import {FETCH_BOARDS, FETCH_BOARD_BY_ID} from '../constants/BoardConstant'

const innitialState = []

export default function BoardReducer(state=innitialState, action) {
    switch(action.type) {
        case FETCH_BOARDS:
        console.log(action.payload)
            return [...state, ...action.payload]
        
        case FETCH_BOARD_BY_ID:
            return [...state, ...action.payload]
              
            default:
                return state
        return state
    }
}