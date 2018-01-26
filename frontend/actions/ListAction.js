import {
    LIST_REQUEST,
    LIST_REQUEST_GET_SUCCESS,
    LIST_REQUEST_POST_SUCCESS,
    LIST_GET_SCHEMA,
    LIST_POST_REQUEST,
} from '../constants/ListConstant'

import axios from 'axios'
import api from '../settings'
import uuidv1 from 'uuid/v1'

export default class ListActions {
    static list_request() {
        return {
            type: LIST_REQUEST
        }
    }
    static list_successfully_created(response) {
        return {
            type: LIST_REQUEST_POST_SUCCESS,
            payload: response
        }
    }

    static list_fetched(response) {
        return {
            type: LIST_REQUEST_GET_SUCCESS,
            payload: response
        }
    }

    static start_post_request(timeData) {
        return {
            type: LIST_POST_REQUEST,
            timeData
        }
    }


    static create_list({title}, boardId) {
        return (dispatch, getState) => {
            
            const state = getState()
            const {lists: {list_schema}} = state

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
                console.log("SUCCESS")
                dispatch(ListActions.list_successfully_created(data))
            }).catch(error => {
                console.log("Cannot create this list for some reson")
            })
        }
    }

    static get_lists(boardId) {
        return (dispatch) => {

            dispatch(ListActions.list_request())
            
            axios({
                url: api.get_lists_for_board(boardId),
                method: "GET",
                withCredentials: true,
                headers: api.headers()
            }).then(response => {
                let {data} = response
                dispatch(ListActions.list_fetched(data))
            }).catch(error => {
                console.log("CNNOT GET LIST")
            })
        }
    }

    static get_schema_request(response) {
        return {
            type: LIST_GET_SCHEMA,
            payload: response
        }
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
}