import {
    POST_COMMENT_REQUEST,
    POST_COMMENT_REQUEST_SUCCESS,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_REQUEST_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS

} from '../constants/CommentConstants'

import axios from 'axios'
import api from '../settings'
import Utils from '../utils'






export default class CommentActions{
    static post_comment_request() {
        return {
            type: POST_COMMENT_REQUEST
        }
    }

    static post_comment_success_created(response) {
        return {
            type: POST_COMMENT_REQUEST_SUCCESS,
            payload: response
        }
    }

    static create_comment(body, cardId) {
        return (dispatch, getState)  => {
            let {user} = getState()
            axios({
                url: api.create_comment(cardId),
                method: 'POST',
                withCredentials: true,
                headers: api.headers(),
                data: JSON.stringify(body)
            }).then(response => {
                let {data} = response

                let {name: user_name, photo: user_photo} = user

                let prepareComment = {
                    ...data,
                    user_name,
                    user_photo
                }

                dispatch(CommentActions.post_comment_success_created(prepareComment))
                console.log("COMMENT IS CREATED", prepareComment)

            }).catch(error => {
                console.log("FAILED POST REQUEST. COMMENT IS NOT CREATED !!!")
            })
        }
    }

    static fetch_comments_for_card() {
        return {
            type: GET_COMMENTS_REQUEST
        }
    }
    
    static fetch_comments_for_card_success(response) { 
        return {
            type: GET_COMMENTS_REQUEST_SUCCESS,
            payload: response
        }
    }
    // dispatch(CommentActions.fetch_authors(authorIdsOfComments))
    // let {partial, collectUniq} = Utils
    // let comments = partial(collectUniq, data)
    // let authorIdsOfComments = comments("authorId")
    static fetch_comments(cardId) {
        return (dispatch) => {

            dispatch(CommentActions.fetch_comments_for_card())
            
            return axios({
                url: api.get_comments_for_card(cardId),
                method: "GET",
                headers: api.headers(),
                withCredentials: true,
            }).then(response => {

                let {data} = response
                
                // console.log("Comments is fetched", {data})
                // dispatch(CommentActions.fetch_comments_for_card_success(data))

                return new Promise((resolve, reject) => {
                    if('error' in data) {
                        return reject(data)
                    }
                    return resolve(data)
                })

            }).catch(error => {
                console.log("CANNOT FETCH ANY COMMENTS")
            })
        }
    }

    static fetch_authors(authorsIds) {

        return (dispatch) => {

            let prepareRequest = {
                user_ids: authorsIds
            }

            return axios({
                url: api.get_users,
                method: 'POST',
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(prepareRequest)
            }).then(({data}) => {
                return Promise.resolve(data)
            }).catch(err => {
                console.log("CANT FETCH USERS")
            })
        }
    }


    static get_comments_with_authors(cardId) {

        return (dispatch) => {

            let globalComments;

            dispatch(CommentActions.fetch_comments(cardId))
                .then((comments) => {
                    globalComments = comments

                    let {partial, collectUniq} = Utils
                    let commentsArr = partial(collectUniq, comments)
                    let authorIdsOfComments = commentsArr("authorId")

                    return Promise.resolve(
                        dispatch(CommentActions.fetch_authors(authorIdsOfComments))
                    )

                }).then((authors) => {
                    
                    let newComments = globalComments.map(comment => {
                        let commentAuthorId = comment.authorId
                        let enhancObj = {}

                        authors.forEach(author => {

                            if(commentAuthorId === author._id) {

                                enhancObj = {
                                    ...comment,
                                    user_photo: author.photo,
                                    user_name: author.name
                                }

                            }
                        })

                        return enhancObj

                    })

                    dispatch(CommentActions.fetch_comments_for_card_success(newComments))
                })
            
        }
    }

    static edit_comment_success(response) {
        return {
            type: EDIT_COMMENT_SUCCESS,
            payload: response
        }
    }

    static edit_comment(commentId, description) {

        return (dispatch) => {

            let newDescription = {
                description
            }

            axios({
                url: api.edit_comment(commentId),
                method: "POST",
                headers: api.headers(),
                withCredentials: true,
                data: JSON.stringify(newDescription)
            }).then(({data}) => {

                console.log("COMMENT IS EDDITED")
                dispatch(
                    CommentActions.edit_comment_success(data)
                )

            }).catch(error => {
                console.log("CANNOT EDIT THIS COMMENT")
            })

        }
    }

    static remove_comment_success(deletedCommentId) {
        return {
            type: DELETE_COMMENT_SUCCESS,
            payload: deletedCommentId
        }
    }
    static remove_comment(commentId){

        return dispatch => {

            axios({
                url: api.remove_comment(commentId),
                method: 'DELETE',
                headers: api.headers(),
                withCredentials: true
            }).then(({data: isDeleted}) => {

                if(isDeleted) {
                    console.log("COMMENT DELETED")
                    dispatch(
                        CommentActions.remove_comment_success(commentId)
                    )
                }

            }).catch(error => {
                console.log("COMMENT IS NOT DELETED")
            })
        }
    }
}
