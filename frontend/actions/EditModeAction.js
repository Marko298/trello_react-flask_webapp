import {
    TOGGLE_EDIT_MODE_BOARDS,
    SETUP_CORDINATES,
    TOGGLE_CREATE_BOARD_FORM,
    TOGGLE_CREATE_TEAM_FORM,
    TOGGLE_SIDEBAR_BOARDLIST,
    FIX_SIDEBAR,
    UNFIX_SIDEBAR,
    TOGGLE_CRATIVE_MENU,
    TOGGLE_ACCOUNT_SETTINGS_MENU,
    SWITCH_COMPONENTS_IN_EDITING_PAGE,
    // TOGGLE_CREATE_LIST_MENU,
    TOGGLE_MENU_BOARD_PAGE,
    POPUP_MENU_CLOSE
} from '../constants/EditModeConstant'

export default class PopupActions {
    static clear_cordinates() {
        return {type: POPUP_MENU_CLOSE}
    }
    static toggle_editMode() {
        return {type: TOGGLE_EDIT_MODE_BOARDS}
    }
    static get_cordinates(settings) {
        return {type: SETUP_CORDINATES, settings}
    }

    static toggle_create_board_form() {
        return {type: TOGGLE_CREATE_BOARD_FORM}

    }
    static toggle_create_team_form() {
        return {type: TOGGLE_CREATE_TEAM_FORM}
    }

    static toggle_sidebard_boardlist() {
        return {type: TOGGLE_SIDEBAR_BOARDLIST}
    }

    static fix_sidebar(match) {
        return {type: FIX_SIDEBAR, marginLeft: match}
    }

    static unfix_sidebar() {
        return {type: UNFIX_SIDEBAR}
    }

    static toggle_creative_menu() {
        return {type: TOGGLE_CRATIVE_MENU}
    }

    static toggle_account_settings_menu() {
        return {type: TOGGLE_ACCOUNT_SETTINGS_MENU}
    }

    static swtich_between_components(from) {
        if (from === 'first') {
            return {
                type: SWITCH_COMPONENTS_IN_EDITING_PAGE,
                switchBetweenComponents: {
                    toShowFirstComponent: false,
                    toShowSecondComponent: true
                }
            }
        }
        if (from === 'second') {
            return {
                type: SWITCH_COMPONENTS_IN_EDITING_PAGE,
                switchBetweenComponents: {
                    toShowFirstComponent: true,
                    toShowSecondComponent: false
                }
            }
        }

    }

    // static toggle_create_list_menu() {
    //     return {type: TOGGLE_CREATE_LIST_MENU}
    // }

    static toggle_menu_on_boardPage() {
        return {type: TOGGLE_MENU_BOARD_PAGE}
    }
}
