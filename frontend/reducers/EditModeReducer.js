import {TOGGLE_EDIT_MODE_BOARDS} from '../constants/EditModeConstant'

const initialEditModeState = {
    forms: {
        isEditBoardShow: false
    },
    top: 0,
    left: 0,
    width: 0
}

export default function EditModeReducer(state = initialEditModeState, {type, settings}) {
    switch (type) {
        case TOGGLE_EDIT_MODE_BOARDS:
            return {
                ...state,
                forms: {
                    isEditBoardShow: !state.mods.forms.isEditBoardShow
                }
            }
        default:
            return state
    }
    return state
} 
