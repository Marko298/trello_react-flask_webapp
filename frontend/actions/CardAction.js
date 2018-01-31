import {
    CARD_POST_REQUEST,
    CARD_REQUEST_POST_SUCCESS,
    GET_SCHEMA_CARD,
    CARD_GET_REQUEST_SUCCESSFULL
} from '../constants/CardConstant'

import axios from 'axios'
import api from '../settings'
import uuidv1 from 'uuid/v1'

export default class CardActions {
    static get_schema(response) {
        return {
            type: GET_SCHEMA_CARD,
            payload: response
        }
    }

    static get_schema_card_request() {
        return (dispatch) => {
            axios({
                url: api.get_card_schema,
                method: 'GET',
                headers: api.headers(),
                withCredentials: true,
            }).then(response => {
                const {data} = response
                dispatch(CardActions.get_schema(data))
            }).catch(error => {
                console.log("Cannot get Schema for CARD")
            })
        }
    }
    static create_static_card(card) {
        return {
            type: CARD_POST_REQUEST,
            timeData: card
        }
    }

    static create_card_is_success(response) {
        return {
            type: CARD_REQUEST_POST_SUCCESS,
            payload: response
        }
    }

    static create_card_request(listId, {title, boardId}) {
        return (dispatch, getState) => {

            const state = getState()
            const {card_schema} = state.lists

            const createSchemaRequest = {
                ...card_schema,
                forList: listId,
                _id: uuidv1(),
                title,
                boardId
            }

            dispatch(CardActions.create_static_card(createSchemaRequest))

            axios({
                url: api.create_card(listId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(createSchemaRequest)
            }).then(response => {
                console.log({response})
                const {data} = response
                dispatch(CardActions.create_card_is_success(data))

            }).catch(error => {
                console.log("cannot create this card")
            })
        }
    }

    static fetch_cards_successfully(response) {
        return {
            type: CARD_GET_REQUEST_SUCCESSFULL,
            payload: response
        }
    }   

    static fetch_cards(boardId) {
        return (dispatch) => {

            return axios({
                url: api.get_cards_by_boardId(boardId),
                method: 'GET',
                headers: api.headers(),
                withCredentials: true
            }).then(response => {
                // console.log({response})
                // dispatch(CardActions.fetch_cards_successfully(response.data))
                return Promise.resolve(response.data)
            }).catch(error => {
                console.log("ERROR CANT FETCH CARDS")
            })

        }
    }

    static add_labels(labels) {
        return {
            type: '',
            payload: labels
        }
    }
}