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
    TOGGLE_MENU_BOARD_PAGE,
    POPUP_MENU_CLOSE,
    TOGGLE_LABEL_MENU,
    TOGGLE_ADD_CHECKLIST_FORM,
    TOGGLE_IS_ALLOW_TO_REMOVE,
    TOGGLE_OVERLAY,
    TOGGLE_UPDATE_BOARDNAME_MENU,
    SET_SELECTED_ITEM


} from '../constants/EditModeConstant'
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';

const initialEditModeState = {
    forms: {
        isPopupShow: false
    },
    menu: {
        isCreateBoardFormShow: false,
        isCreateTeamFormShow: false,
        isCreativeMenuShow: false,
        isAccountSettingsMenuShow: false,
        isLabelListShow: false,
        isCreateChecklistMenuShow: false,
        isAllowToRemove: false,
        isUpdateBoardNameMenuShow: false
    },
    withOverlayScene: false,
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

export default function EditModeReducer(
    state = initialEditModeState, 
    {type, settings, marginLeft, switchBetweenComponents, ...action}
) {
    switch (type) {
        case TOGGLE_EDIT_MODE_BOARDS: {
            if(state.forms.isPopupShow) {

                return {
                    ...state,
                    selected: {},
                    menu: {...initialEditModeState.menu},
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
            return {
                ...state,
                ...settings
            }
        }

        case SET_SELECTED_ITEM: {
            let selected = {}
            let {isPopupShow} = state.forms

            if(isPopupShow) {
                selected = action.selected
            } 

            return {
                ...state,
                selected
            }
        }

        case POPUP_MENU_CLOSE: {
            return {
                ...state,
                top: 0,
                left: 0,
                width: 0
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

        case TOGGLE_MENU_BOARD_PAGE: {
            return {
                ...state,
                isMenuInBoardPageShow: !state.isMenuInBoardPageShow
            }
        }

        case TOGGLE_LABEL_MENU: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isLabelListShow: true
                }
            }
        }

        case TOGGLE_ADD_CHECKLIST_FORM: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isCreateChecklistMenuShow: true
                }
            }
        }

        case TOGGLE_IS_ALLOW_TO_REMOVE: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isAllowToRemove: true
                }
            }
        }

        case TOGGLE_OVERLAY: {
            return {
                ...state,
                withOverlayScene: !state.withOverlayScene
            }
        }

        case TOGGLE_UPDATE_BOARDNAME_MENU: {
            return {
                ...state,
                menu: {
                    ...initialEditModeState.menu,
                    isUpdateBoardNameMenuShow: true
                }
            }
        }


        default:
            return state
    }
    return state
} 
