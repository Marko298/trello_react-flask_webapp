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
    LIST_UPDATE_REQUEST_FAILED,
    LIST_UPDATE_REQUEST_SUCCESS
} from '../constants/ListConstant'

import axios from 'axios'
import api from '../settings'
import uuidv1 from 'uuid/v1'
import CardActions from '../actions/CardAction'
import BoardActions from '../actions/BoardAction'

export default class ListActions {
    static list_request() {
        return {type: LIST_REQUEST}
    }
    static list_successfully_created(response) {
        return {type: LIST_REQUEST_POST_SUCCESS, payload: response}
    }

    static list_fetched(response) {
        return {type: LIST_REQUEST_GET_SUCCESS, payload: response}
    }

    static start_post_request(timeData) {
        return {type: LIST_POST_REQUEST, timeData}
    }

    static create_list({
        title
    }, boardId) {
        return (dispatch, getState) => {

            const state = getState()
            const {lists: {
                    list_schema
                }} = state

            let createRequest = {
                ...list_schema,
                _id: uuidv1(),
                forBoard: boardId,
                title
            }

            dispatch(ListActions.start_post_request(createRequest))

            axios({
                url: api.create_list(boardId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(createRequest)
            }).then(response => {
                let {data} = response
                dispatch(ListActions.list_successfully_created(data))
                dispatch( BoardActions.createdNewList({_id: data._id, forBoard: data.forBoard}))
            }).catch(error => {
                console.log("Cannot create this list for some reson")
            })
        }
    }

    static get_lists(boardId) {
        return (dispatch) => {

            dispatch(ListActions.list_request())

            return axios({
                url: api.get_lists_for_board(boardId),
                method: "GET",
                withCredentials: true,
                headers: api.headers()
            }).then(response => {
                let {data} = response
                // dispatch(ListActions.list_fetched(data))

                return Promise.resolve(data)
            }).catch(error => {
                console.log("CNNOT GET LIST")
            })
        }
    }

    static get_schema_request(response) {
        return {type: LIST_GET_SCHEMA, payload: response}
    }

    static get_list_schema() {
        return dispatch => {
            axios({
                url: api.get_list_schema,
                method: "GET",
                headers: api.headers(),
                withCredentials: true
            }).then(response => {
                let {data} = response
                dispatch(ListActions.get_schema_request(data))
            }).catch(error => {
                console.log("Error, cnnot get scheam")
            })
        }
    }

    static project_is_fetch_successfully(project) {
        return {
            type: PROJECT_IS_FETCHET_SUCCESSFULLY,
            payload: project
        }
    }

    static fetch_project_lists_with_cards(boardId) {
        return (dispatch) => {

            Promise.all([
                dispatch(ListActions.get_lists(boardId)),
                dispatch(CardActions.fetch_cards(boardId))
            ]).then(responseArray => {
                let lists = responseArray[0]
                let cards = responseArray[1]

                let project = lists.map(list => {

                    let card = cards.filter(card => card.forList === list._id)

                    return {
                        ...list,
                        cards: [...card]
                    }
                })

               dispatch(ListActions.project_is_fetch_successfully(project))
            }).catch(err => {
                console.log("Cannot get project")
            })
            
        }
    }

    static clear_project_data() {
        return {
            type: CLEAR_PROJECT_DATA
        }
    }

    static add_description_success(response) {
        return {
            type: LIST_POST_DESCRIPTION_SUCCESS,
            payload: response
        }
    }

    static add_description(cardId, description) {
        return (dispatch) => {
            return axios({
                url: api.update_card(cardId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(description)
            }).then(response => {
                const {data} = response

                dispatch(ListActions.add_description_success(data))

                return Promise.resolve(data)
            }).catch(error => {
                console.log("Error cant add description anywhey")
            })
        }
    }
    static update_list_request() {
        return {type: LIST_UPDATE_REQUEST}
    }

    static update_list_success(response) {
        return {
            type: LIST_UPDATE_REQUEST_SUCCESS,
            payload: response
        }
    }
    
    static update_list_failed() {
        return {type: LIST_UPDATE_REQUEST_FAILED}
    }

    static update_list(listId, updates) {
        return (dispatch) => {

            dispatch( ListActions.update_list_request() )

            axios({
                url: api.update_list(listId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(updates)
            }).then(({data}) => {
                dispatch( ListActions.update_list_success(data) )
            }).catch(err => {
                dispatch( ListActions.update_list_failed() )
            })
        }
    }
}