import UserReducer from './UserReducer'
import BoardReducer from './BoardReducer'
import EditModeReducer from './EditModeReducer'
import {combineReducers} from 'redux'


export const reducer = combineReducers({
    user: UserReducer,
    organizations: BoardReducer,
    mode: EditModeReducer
})
