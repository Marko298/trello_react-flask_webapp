import {TOGGLE_EDIT_MODE_BOARDS, SETUP_CORDINATES} from '../constants/EditModeConstant'

const initialEditModeState = {
    forms: {
        isEditBoardShow: false
    },
    selected: {},
    top: 0,
    left: 0,
    width: 0
}

export default function EditModeReducer(state = initialEditModeState, {type, settings}) {
    switch (type) {
        case TOGGLE_EDIT_MODE_BOARDS:

            if(state.forms.isEditBoardShow) {

                return {
                    ...state,
                    selected: {},
                    forms: {
                        isEditBoardShow: !state.forms.isEditBoardShow
                    }
                }

            }
            return {
                ...state,
                forms: {
                    isEditBoardShow: !state.forms.isEditBoardShow
                }
            }

        case SETUP_CORDINATES:

            let {isEditBoardShow} = state.forms
            let selected = {}

            if(isEditBoardShow) {
                selected = {...settings.selected}
            } 

            return {
                ...state,
                selected: selected,
                ...settings
            }
        default:
            return state
    }
    return state
} 
