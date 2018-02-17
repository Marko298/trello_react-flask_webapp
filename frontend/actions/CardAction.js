import {
    CARD_POST_REQUEST,
    CARD_REQUEST_POST_SUCCESS,
    GET_SCHEMA_CARD,
    CARD_GET_REQUEST_SUCCESSFULL,
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
    CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_FAILED,
    CARD_UPDATE_CHECKLIST_REQUEST,
    CARD_UPDATE_CHECKLIST_REQUEST_SUCCESS,
    CARD_UPDATE_CHECKLIST_REQUEST_FIELD,
    CARD_UPDATE_REQUEST,
    CARD_UPDATE_SUCCESS,
    CARD_UPDATE_FAILED,
    CARD_UPLOADED_ATTACHMENT_SUCCESS,
    CARD_GET_ALL_ATTACHMENT_SUCESS,
    CARD_ASSIGN_FILE
} from '../constants/CardConstant'

import axios from 'axios'
import api from '../settings'
import uuidv1 from 'uuid/v1'

import ToolsActions from './ToolsAction'

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

            return axios({
                url: api.create_card(listId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(createSchemaRequest)
            }).then(response => {
                console.log({response})
                const {data} = response
                dispatch(CardActions.create_card_is_success(data))

                return Promise.resolve(data)

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
                console.log({response})
                // console.log({response})
                // dispatch(CardActions.fetch_cards_successfully(response.data))
                return Promise.resolve(response.data)
            }).catch(error => {
                console.log("ERROR CANT FETCH CARDS")
            })

        }
    }

    static add_labels(cardId, labels, forList) {
        return {
            type: ADD_LABEL_REQUEST,
            payload: labels,
            cardId,
            forList
        }
    }

    static add_labels_success(response) {
        return {
            type: ADD_LABEL_REQUEST_SUCCESS,
            payload: response
        }
    }

    static add_labels_request(cardId, labels, forList) {
        return (dispatch) => {

            let prepareRequest = {labels}

            console.log({prepareRequest})

            axios({
                url: api.update_card(cardId),
                method: "POST",
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(prepareRequest)
            }).then(response => {
                let {data} = response
                console.log(data)
                dispatch( CardActions.add_labels_success(data) )
            }).catch(error => {
                console.log("cant save labels fro CARD")
            })
        }
    }

    static update_card_request() {
        return {
            type: CARD_UPDATE_REQUEST
        }
    }
    static update_card_success(response) {
        return {
            type: CARD_UPDATE_SUCCESS,
            payload: response
        }
    }
    static update_card_failed() {
        return {
            type: CARD_UPDATE_FAILED
        }
    }

    static update_card(cardId, updates) {
        return (dispatch) => {
            dispatch( CardActions.update_card_request() )

            axios({
                url: api.update_card(cardId),
                method: "POST",
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(updates)
            }).then(response => {
                let {data} = response
                console.log(data)
                dispatch( CardActions.update_card_success(data) )
            }).catch(error => {
                dispatch( CardActions.update_card_failed() )
            })
            
        }
    }
    
    
    static creating_checkList_request() {
        return {type: CARD_CREATING_CHECKLIST_REQUEST}
    }

    static checklist_created(response) {
        return {
            type: CARD_CREATING_CHECKLIST_REQUEST_SUCCESS,
            payload: response
        }
    }

    static create_checklist(cardId, title) {

        return (dispatch) => {

            const prepareRequest = {
                checklists: { title }
            }

            dispatch(
                CardActions.creating_checkList_request()
            )

            axios({
                url: api.create_checklist(cardId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(prepareRequest)
            }).then(({data}) => {
                console.log("CHECKLIST IS CREATD ", data)
                dispatch(CardActions.checklist_created(data))
            }).catch(error => {
                console.log('CANNOT CREATE CHECKLIST')
            })


        }
    }

    static remove_checklist_request(checklistId) {
        return {
            type: CARD_REMOVE_CHECKLIST_REQUEST,
            checklistId
        }
    }

    static remove_checklist_success(response) {
        return {
            type: CARD_REMOVE_CHECKLIST_REQUEST_SUCCESS,
            payload: response
        }
    }

    static remove_checklist(checklistId) {

        return (dispatch) => {

            dispatch(
                CardActions.remove_checklist_request(checklistId)
            )

            return axios({
                url: api.remove_checklist(checklistId),
                method: 'DELETE',
                headers: api.headers(),
                withCredentials: true,
            }).then( ({data}) => {
                console.log("DELETED SUCCESSFULL", {data})
                dispatch(
                    CardActions.remove_checklist_success(data)
                )

                return Promise.resolve(data)

            }).catch(error => {
                console.log("ERROR")
            })
        }
    }

    static add_item_request() {
        return {type: CARD_ADD_ITEM_TO_CHECKLIST}
    }

    static add_item_success(response) {
        return {
            type: CARD_ADD_ITEM_TO_CHECKLIST_SUCCESS,
            payload: response
        }
    
    }
    static add_item_failed(response) {
        return {
            type: CARD_ADD_ITEM_TO_CHECKLIST_FAILED,
            payload: response
        }
    }

    static add_item(checklistId, title) {
        return (dispatch) => {

            const prepareRequest = {title}

            return axios({
                url: api.add_item(checklistId),
                method: 'POST',
                withCredentials: true,
                headers: api.headers(),
                data: JSON.stringify(prepareRequest)
            }).then(({data}) => {
                dispatch(  CardActions.add_item_success(data))
                return Promise.resolve(data)
            }).catch(error => {
                console.log("CANNOT ADD THIS ITEM", title)
            })
        }
    }

   
    static update_item_request() {
        return {type: CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST}
    }

    static update_item_success(response) {
        return {
            type: CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_SUCCESS,
            payload: response
        }
    }
    // static update_item_failed() {
    //     return {type: CARD_CHENCGE_ITEM_FOR_CHECKLIST_REQUEST_FAILED}
    // }

    static update_item(checklistId, itemId, upToDate) {
        return (dispatch) => {

            dispatch( 
                CardActions.update_item_request()
            )

            const preparedRequest = {...upToDate}
            
            return axios({
                url: api.update_item(checklistId, itemId),
                headers: api.headers(),
                method: 'POST',
                withCredentials: true,
                data: JSON.stringify(preparedRequest)
            }).then(({data}) => {
                dispatch( CardActions.update_item_success(data) )

                return Promise.resolve(data)

            }).catch(err => {
                console.log("The error was occured, Cannot change item")
            })
        }
    }


    static update_checklist_request() {
        return {type: CARD_UPDATE_CHECKLIST_REQUEST}
    }

    static update_checklist_success(response) {
        return {
            type: CARD_UPDATE_CHECKLIST_REQUEST_SUCCESS,
            payload: response
        }
    }
    // static update_checklist_success() {
    //     return {type: CARD_UPDATE_CHECKLIST_REQUEST_FIELD}
    // }

    static update_checklist(checkListId, upToDate) {

        return (dispatch) => {
            dispatch(
                CardActions.update_checklist_request()
            )

            const preparedRequest = {...upToDate}

            return axios({
                url: api.update_checklist(checkListId),
                method: "POST",
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(preparedRequest)
            }).then(({data}) => {

                dispatch(
                    CardActions.update_checklist_success(data)
                )
                return Promise.resolve(data)

            }).catch(error => {
                console.log("CANNOT UPDATE CURRENT CHECKLIST ")
            })
        }
    }

    static attachment_is_uploaded(response) {
        return {
            type: CARD_UPLOADED_ATTACHMENT_SUCCESS,
            payload: response
        }
    }

    static add_attachment(cardId, image) {
      
        return (dispatch) => {

            dispatch(ToolsActions.is_file_start_upload())

            return axios({
                url: api.add_attachemnt(cardId),
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: image,
                onUploadProgress: function({loaded, total}) {
                    let percentCompleted = Math.round( (parseInt(loaded, 10) * 100) / parseInt(total, 10) );
                    dispatch( ToolsActions.file_upload_progress(percentCompleted))
                }
            }).then( ({data}) => {
                dispatch( ToolsActions.is_file_uploaded() )
                dispatch( CardActions.attachment_is_uploaded(data) )
                console.log({data})
                return Promise.resolve(data)
            }).catch(error => {
                dispatch( ToolsActions.is_file_uploaded() )
                console.log("CANNOT UPLOAD FILE",{error})
            })
        }
    }

    static get_all_attachment_success(attachments) {
        return {
            type: CARD_GET_ALL_ATTACHMENT_SUCESS,
            payload: attachments
        }
    }

    static get_all_attachments(cardId) {

        return (dispatch) => {
            return axios({
                url: api.get_attachment(cardId),
                method: 'GET',
                headers: api.headers(),
                withCredentials: true,
            }).then( ({data}) => {

                dispatch( CardActions.get_all_attachment_success(data) )

                return Promise.resolve()
            } ).catch(error => {
                console.log("CANNOT GET")
            })
        }
    }

    static change_assigned_file(response) {
        return {
            type: CARD_ASSIGN_FILE,
            payload: response
        }
    }

    static assign_file(cardId, fileId) {
        return (dispatch) => {

            const prepareRequest = {
                attachments: {
                    assigned: fileId
                }
            }

            return axios({
                url: api.update_card(cardId),
                method: "POST",
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(prepareRequest)
            }).then( ({data}) => {
                console.log("SUCCESS file assigned", {data})
                dispatch( CardActions.change_assigned_file(data) )

                return Promise.resolve()
            }).catch(error => {
                console.log("SOMETHING FO WRONG")
            })
        }
    }

}