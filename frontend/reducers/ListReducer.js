import {
    LIST_REQUEST,
    LIST_REQUEST_GET_SUCCESS,
    LIST_REQUEST_POST_SUCCESS,
    LIST_GET_SCHEMA,
    LIST_POST_REQUEST,
    PROJECT_IS_FETCHET_SUCCESSFULLY,
    CLEAR_PROJECT_DATA,
    LIST_POST_DESCRIPTION_SUCCESS,
    LIST_UPDATE_REQUEST,
    LIST_UPDATE_REQUEST_SUCCESS,
    LIST_UPDATE_REQUEST_FAILED,
} from '../constants/ListConstant'

import {
    CARD_POST_REQUEST,
    CARD_REQUEST_POST_SUCCESS,
    GET_SCHEMA_CARD,
    ADD_LABEL_REQUEST,
    ADD_LABEL_REQUEST_SUCCESS,
    CARD_CREATING_CHECKLIST_REQUEST,
    CARD_CREATING_CHECKLIST_REQUEST_SUCCESS,
    CARD_REMOVE_CHECKLIST_REQUEST,
    CARD_REMOVE_CHECKLIST_REQUEST_FAILDED,
    CARD_REMOVE_CHECKLIST_REQUEST_SUCCESS,
    CARD_ADD_ITEM_TO_CHECKLIST,
    CARD_ADD_ITEM_TO_CHECKLIST_SUCCESS,
    CARD_ADD_ITEM_TO_CHECKLIST_FAILED,
    CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST,
    CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_SUCCESS,
    CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_FAILED ,
    CARD_UPDATE_CHECKLIST_REQUEST,
    CARD_UPDATE_CHECKLIST_REQUEST_SUCCESS,
    CARD_UPDATE_CHECKLIST_REQUEST_FIELD,
    CARD_UPDATE_REQUEST,
    CARD_UPDATE_SUCCESS,
    CARD_UPDATE_FAILED,
   
} from '../constants/CardConstant'

import {
    POST_COMMENT_REQUEST,
    POST_COMMENT_REQUEST_SUCCESS,
    GET_COMMENTS_REQUEST_SUCCESS,
    GET_COMMENTS_REQUEST,
    EDIT_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS
} from '../constants/CommentConstants'


import Utils from '../utils'


const initialState = {
    status: {
        isLoading: false,
        isPostRequstPending: false,
    },
    list_schema: {},
    card_schema: {},
    boardProject: {
        lists: []
    },
    comments: {
        isCommentsFetch: false,
        isCommentPostLoading: false,
        commentList: []
    },
    cardsPending: [],
    listsPending: []
}


function withoutRepitebleObjects(prop, newObj, arrOfObject) {
    let cObject = [...arrOfObject]
    let result = cObject.filter(obj => obj[prop] === newObj[prop])
    let withoutRecivedObject

    if(result.length) {
        withoutRecivedObject = cObject.filter(tim => tim[prop] !== newObj[prop])
    }

    if(!result.length) {
        return [...cObject, newObj]
    }

    return [...withoutRecivedObject]
}



export default function ListReducer(state=initialState, {type, payload, ...action}) {

    switch(type) {
        case LIST_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case PROJECT_IS_FETCHET_SUCCESSFULLY: {
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

        case CLEAR_PROJECT_DATA: {
            return {
                ...state,
                boardProject: {
                    lists: []
                }
            }
        }

        case LIST_POST_REQUEST: {
            const {timeData} = action

            return {
                ...state,
                status: {
                   ...state.status,
                   isPostRequstPending: true
                },
                boardProject: {
                    lists: [...state.boardProject.lists, timeData]
                },
                listsPending: [...state.listsPending, timeData._id]
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
                },
                listsPending: state.listsPending.filter(ids => ids !== justCreatedListId)
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
                },
                cardsPending: [...state.cardsPending, timeData._id]
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
                },
                cardsPending: state.cardsPending.filter(card => card !== justCreatedCardId)
            }

        }

        case LIST_POST_DESCRIPTION_SUCCESS: {
            let {forList, _id} = payload

            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        if(list._id === forList) {
                            return {
                                ...list,
                                cards: list.cards.map(card => {
                                    if(card._id === _id) {
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

        case ADD_LABEL_REQUEST: {
            const {cardId, forList} = action
            const getArrayOfLabels = Utils.partial(withoutRepitebleObjects, "_id", payload)
            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        if(list._id === forList) {
                            return {
                                ...list,
                                cards: list.cards.map(card => {
                                    if(card._id === cardId) {
                                        return {
                                            ...card,
                                            labels: getArrayOfLabels(card.labels)
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

        case ADD_LABEL_REQUEST_SUCCESS: {
            return {...state}
        }
        
        case POST_COMMENT_REQUEST: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    isCommentPostLoading: true
                }
            }
        }
        
        case POST_COMMENT_REQUEST_SUCCESS: {
            return {
                ...state,
                comments: {
                    isCommentPostLoading: false,
                    commentList: [...state.comments.commentList, payload]
                }
            }
        }

        case GET_COMMENTS_REQUEST: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    isCommentsFetch: true
                }
            }
        }
        
        case GET_COMMENTS_REQUEST_SUCCESS: {
            return {
                ...state,
                comments: {
                    commentList: [...payload],
                    isCommentsFetch: false
                }
            }
        }

        case EDIT_COMMENT_SUCCESS: {
            return {
                ...state,
                comments: {
                    ...state.comments,
                    commentList: state.comments.commentList.map(comment => {
                        if(comment._id === payload._id) {
                            return {
                                ...comment,
                                ...payload
                            }
                        }
                        return {...comment}
                    })
                }
            }
        }

        case DELETE_COMMENT_SUCCESS: {
            
            return {
                ...state,
                comments: {
                    ...state.comments,
                    commentList: state.comments.commentList.filter(({_id}) => payload !== _id)
                }
            }
        }

        case CARD_CREATING_CHECKLIST_REQUEST: {
            return {...state}
        }

        case CARD_CREATING_CHECKLIST_REQUEST_SUCCESS: {
            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                if(card._id == payload.cardId) {
                                    return {
                                        ...card,
                                        checklists: !card.checklists.length 
                                            ? [{...payload}]
                                            : [...card.checklists, {...payload}]
                                    }
                                }
                                return {...card}
                            })
                        }
                        return {...list}
                    })
                }

            }
        }

        case CARD_REMOVE_CHECKLIST_REQUEST: {
            return {
                ...state
            }
        }

        case CARD_REMOVE_CHECKLIST_REQUEST_SUCCESS: {
            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                return {
                                    ...card,
                                    checklists: card.checklists.filter(({_id}) => _id !== payload)
                                }
                            })
                        }
                    })
                }
            }
        }

        case CARD_REMOVE_CHECKLIST_REQUEST_FAILDED: {
            return {
                ...state
            }
        }

        
        case CARD_ADD_ITEM_TO_CHECKLIST: {
            return {
                ...state
            }
        }
        case CARD_ADD_ITEM_TO_CHECKLIST_SUCCESS: {
            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                if(card._id === payload.cardId) {
                                    return {
                                        ...card,
                                        checklists: card.checklists.map(chlist => {
                                            if(chlist._id === payload._id) {
                                                return {
                                                    ...chlist,
                                                    items: [...payload.items]
                                                }
                                            }
                                            return {...chlist}
                                        })
                                    }
                                }
                                return {...card}
                            })
                        }
                    })
                }
            }
        }
        case CARD_ADD_ITEM_TO_CHECKLIST_FAILED: {
            return {
                ...state
            }
        }


        case CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST: {
            return {
                ...state
            }
        }
        case CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_SUCCESS: {
            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                if(card._id === payload.cardId) {
                                    return {
                                        ...card,
                                        checklists: card.checklists.map(chlist => {
                                            if(chlist._id === payload._id) {
                                                return {
                                                    ...chlist,
                                                    items: [...payload.items]
                                                }
                                            }
                                            return {...chlist}
                                        })
                                    }
                                }
                                return {...card}
                            })
                        }
                    })
                }
            }
        }
        case CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_FAILED: {
            return {
                ...state
            }
        }



        case CARD_UPDATE_CHECKLIST_REQUEST: {
            return {
                ...state
            }
        }
        case CARD_UPDATE_CHECKLIST_REQUEST_SUCCESS: {
            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        return {
                            ...list,
                            cards: list.cards.map(card => {
                                if(card._id === payload.cardId) {
                                    return {
                                        ...card,
                                        checklists: card.checklists.map(chlist => {
                                            if(chlist._id === payload._id) {
                                                return {
                                                    ...chlist,
                                                    ...payload
                                                }
                                            }
                                            return {...chlist}
                                        })
                                    }
                                }
                                return {...card}
                            })
                        }
                    })
                }
            }
        }
        case CARD_UPDATE_CHECKLIST_REQUEST_FIELD: {
            return {
                ...state
            }
        }
        

        case LIST_UPDATE_REQUEST: {
            return {
                ...state
            }
        }
        case LIST_UPDATE_REQUEST_SUCCESS: {
            const {_id, forBoard: boardId } = payload

            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        if (list._id === _id) {
                            return {...list, ...payload}
                        }
                        return {...list}
                    })
                }
            }
        }
        case LIST_UPDATE_REQUEST_FAILED: {
            return {
                ...state
            }
        }

        

        case CARD_UPDATE_REQUEST: {
            return {
                ...state
            }
        }
        case CARD_UPDATE_SUCCESS: {
            const {_id, forList} = payload

            return {
                ...state,
                boardProject: {
                    lists: state.boardProject.lists.map(list => {
                        if(list._id === forList) {
                            return {
                                ...list,
                                cards: list.cards.map(card => {
                                    if(card._id === _id) {
                                        return {...card, ...payload}
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
        case CARD_UPDATE_FAILED: {
            return {...state}
        }
   
        default: {
            return state
        }
    }

    return state
}





