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
    TOGGLE_CREATE_LIST_MENU,
    TOGGLE_MENU_BOARD_PAGE

} from '../constants/EditModeConstant'

const initialEditModeState = {
    forms: {
        isPopupShow: false
    },
    menu: {
        isCreateBoardFormShow: false,
        isCreateTeamFormShow: false,
        isCreativeMenuShow: false,
        isAccountSettingsMenuShow: false,
        isCreateListNebuShow: false
    },
    switchBetweenComponents: {
        toShowFirstComponent: true,
        toShowSecondComponent: false
    },
    sidebar: {
        isPinned: false,
        isFixed: false,
        backing: 0
    },
    isMenuInBoardPageShow: false,
    selected: {},
    top: 0,
    left: 0,
    width: 0
}

export default function EditModeReducer(state = initialEditModeState, {type, settings, marginLeft, switchBetweenComponents}) {
    switch (type) {
        case TOGGLE_EDIT_MODE_BOARDS: {
            if(state.forms.isPopupShow) {

                return {
                    ...state,
                    selected: {},
                    forms: {
                        isPopupShow: !state.forms.isPopupShow
                    }
                }

            }
            return {
                ...state,
                forms: {
                    isPopupShow: !state.forms.isPopupShow
                }
            }

        }

            
        case SETUP_CORDINATES: {
            let {isPopupShow} = state.forms
            let selected = {}
    
            if(isPopupShow) {
                selected = {...settings.selected}
            } 
    
            return {
                ...state,
                selected: selected,
                ...settings
            }
        }


        case TOGGLE_CREATE_BOARD_FORM: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isCreateBoardFormShow: true,
                }
            }
        }
        
        case TOGGLE_CREATE_TEAM_FORM: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isCreateTeamFormShow: true
                }
            }
        }
        
        case TOGGLE_SIDEBAR_BOARDLIST: {
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    isFixed: !state.sidebar.isFixed,
                    backing: 0
                }
            }
        }


        case FIX_SIDEBAR: {
            return {
                ...state,
                sidebar: {
                    isPinned: true,
                    isFixed: true,
                    backing: marginLeft
                }
            }
        }

        case UNFIX_SIDEBAR: {
            return {
                ...state,
                sidebar : {
                    isPinned: false,
                    isFixed: true,
                    backing: 0
                }
            }
        }

        case TOGGLE_CRATIVE_MENU: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isCreativeMenuShow: true,
                }
            }
        }

        case TOGGLE_ACCOUNT_SETTINGS_MENU: {

            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isAccountSettingsMenuShow: true
                }
            }
        }

        case SWITCH_COMPONENTS_IN_EDITING_PAGE: {
            return {
                ...state,
                switchBetweenComponents: {
                    toShowFirstComponent: switchBetweenComponents.toShowFirstComponent,
                    toShowSecondComponent: switchBetweenComponents.toShowSecondComponent
                }
            }
        }

        case TOGGLE_CREATE_LIST_MENU: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isCreateListNebuShow: true
                }
            }
        }

        case TOGGLE_MENU_BOARD_PAGE: {
            return {
                ...state,
                isMenuInBoardPageShow: !state.isMenuInBoardPageShow
            }
        }

        default:
            return state
    }
    return state
} 
