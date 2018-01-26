import {
    LIST_REQUEST,
    LIST_REQUEST_GET_SUCCESS,
    LIST_REQUEST_POST_SUCCESS,
    LIST_GET_SCHEMA,
    LIST_POST_REQUEST
} from '../constants/ListConstant'

const initialState = {
    status: {
        isLoading: false,
        isPostRequstPending: false,
    },
    list_schema: {},
    boardProject: {
        lists: [
            {
                title: ''
            }
        ]
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

        default: {
            return state
        }
    }

    return state
}