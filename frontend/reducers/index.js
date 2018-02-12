import UserReducer from './UserReducer'
import BoardReducer from './BoardReducer'
import EditModeReducer from './EditModeReducer'
import ListReducer from './ListReducer'
import ToolsReducer from './ToolsReducer'

import {combineReducers} from 'redux'


export const reducer = combineReducers({
    user: UserReducer,
    organizations: BoardReducer,
    mode: EditModeReducer,
    lists: ListReducer,
    tools: ToolsReducer
})
