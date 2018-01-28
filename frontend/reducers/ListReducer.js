import {
    LIST_REQUEST,
    LIST_REQUEST_GET_SUCCESS,
    LIST_REQUEST_POST_SUCCESS,
    LIST_GET_SCHEMA,
    LIST_POST_REQUEST
} from '../constants/ListConstant'

import {
    CARD_POST_REQUEST,
    CARD_REQUEST_POST_SUCCESS,
    GET_SCHEMA_CARD
} from '../constants/CardConstant'


const initialState = {
    status: {
        isLoading: false,
        isPostRequstPending: false,
    },
    list_schema: {},
    card_schema: {},
    boardProject: {
        lists: []
    }
}

export default function ListReducer(state=initialState, {type, payload, ...action}) {

    switch(type) {
        case LIST_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LIST_REQUEST_GET_SUCCESS: {
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: false,
                },
                boardProject: {
                    lists: [...payload]
                }
               
            }
        }

        case LIST_POST_REQUEST: {
            const {timeData} = action

            console.log({timeData, LIST_POST_REQUEST})

            return {
                ...state,
                status: {
                   ...state.status,
                   isPostRequstPending: true
                },
                boardProject: {
                    lists: [...state.boardProject.lists, timeData]
                }
            }
        }
           
        case LIST_REQUEST_POST_SUCCESS: {
            const {_id: justCreatedListId} = payload
            return {
                ...state,
                status: {
                    ...state.status,
                    isPostRequstPending: false
                 },
                 boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        if(list._id === justCreatedListId) {

                            return {
                               ...list,
                               ...payload
                            }
                        }
                        return {...list}
                    })
                }
            }
        }

        case LIST_GET_SCHEMA: {
            return {
                ...state,
                list_schema: {...payload}
            }
        }

        case GET_SCHEMA_CARD: {
            return {
                ...state,
                card_schema: {...payload}
            }
        }


        case CARD_POST_REQUEST: {
            const {timeData, timeData: {forList: listId}} = action

            function addNewCardForList(firstId, ownProps, newData) {
                return function mapThroughtList(props) {
                    if(props._id === firstId) {
                        return {
                            ...props,
                            [ownProps]: [...props[ownProps], newData]
                        }
                    }
                    return {...props}
                }
            }

            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(addNewCardForList(listId, 'cards', timeData))
                }
            }

        }
        

        case CARD_REQUEST_POST_SUCCESS: {
            
            const {
                _id: justCreatedCardId,
                forList: listId
            } = payload

            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        if(list._id === listId) {
                            return {
                                ...list,
                                cards: list.cards.map(card => {
                                    if(card._id === justCreatedCardId) {
                                        return {
                                            ...card,
                                            ...payload 
                                        }
                                    }
                                    return {...card}
                                })
                            }
                        }
                        return {...list}
                    })
                }
            }

        }


      
        default: {
            return state
        }
    }

    return state
}