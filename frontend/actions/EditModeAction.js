import {TOGGLE_EDIT_MODE_BOARDS, SETUP_CORDINATES} from '../constants/EditModeConstant'

export function toggle_editMode(styles) {
    return {
        type: TOGGLE_EDIT_MODE_BOARDS
    }
}


export function get_cordinates(settings) {
    return {
        type: SETUP_CORDINATES,
        settings
    }
}