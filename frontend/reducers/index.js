import * as types from '../constants'

export const reducer = function(state={}, action) {
    switch(action.type) {
        case types.SET_ERROR:
        console.log("The action is occur")
            return {...state, error: action.error}
    }

    return state
}