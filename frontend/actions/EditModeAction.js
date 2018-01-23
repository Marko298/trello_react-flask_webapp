import {
    TOGGLE_EDIT_MODE_BOARDS,
    SETUP_CORDINATES,
    TOGGLE_CREATE_BOARD_FORM,
    TOGGLE_CREATE_TEAM_FORM,
    TOGGLE_SIDEBAR_BOARDLIST,
    FIX_SIDEBAR

} from '../constants/EditModeConstant'


export default class PopupActions {
    static toggle_editMode() {
        return {
            type: TOGGLE_EDIT_MODE_BOARDS
        }
    }
    static get_cordinates(settings) {
        return {
            type: SETUP_CORDINATES,
            settings
        }
    }

    static toggle_create_board_form() {
        return {
            type: TOGGLE_CREATE_BOARD_FORM
        }
    
    }
    static toggle_create_team_form() {
        return {
            type: TOGGLE_CREATE_TEAM_FORM
        }
    }

    static toggle_sidebard_boardlist() {
        return {
            type: TOGGLE_SIDEBAR_BOARDLIST
        }
    }

    static fix_sidebar(match) {
        return {
            type: FIX_SIDEBAR,
            marginLeft: match
        }
    }



}
