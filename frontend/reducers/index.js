import UserReducer from './UserReducer'
import {combineReducers} from 'redux'


export const reducer = combineReducers({
    user: UserReducer
})

// export const reducer = function(state={}, action) {
//     switch(action.type) {
//         case types.SET_ERROR:
//         console.log("The action is occur")
//             return {...state, error: action.error}
//     }

//     return state
// }