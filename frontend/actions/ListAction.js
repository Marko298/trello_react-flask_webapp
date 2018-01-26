import {
    LIST_REQUEST,
    LIST_REQUEST_GET_SUCCESS,
    LIST_REQUEST_POST_SUCCESS
} from '../constants/ListConstant'

import axios from 'axios'
import api from '../settings'

class ListActions {
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

    static create_list(data, boardId) {
        return (dispatch) => {
            axios({
                url: api.create_list(boardId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(data)
            }).then(response => {
                let {data} = response
                console.log("SUCCESS")
                dispatch(ListActions.list_successfully_created(data))
            }).then(error => {
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
}