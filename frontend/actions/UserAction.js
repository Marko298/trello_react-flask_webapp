import {
    USER_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REQUEST_FAILED,
    USER_SIGNIN_SUCCESS,
    USER_REQUEST_LOGOUT,
    USER_UPLOAD_IMAGE_REQUEST,
    USER_UPLOAD_IMAGE_PROGRESS,
    USER_UPLOAD_IMAGE__SUCCESS,
    USER_UPLOAD_IMAGE__FAILED,
} from '../constants/UserConstants'

import api from '../settings'
import axios from 'axios'


export default class UserActions {
    static userRequest() {
        return {type: USER_REQUEST}
    }
    static userRequestLogout() {
        return {type: USER_REQUEST_LOGOUT}
    }
    static userRequestLogined(response) {
        return {type: USER_LOGIN_SUCCESS, payload: response}
    }
    static userRequestFailed(message) {
        return {type: USER_REQUEST_FAILED, payload: message}
    }

    static userRequestSigin(data) {
        return {type: USER_SIGNIN_SUCCESS, payload: data}
    }

    static login(data) {
        return (dispatch) => {

            dispatch(UserActions.userRequest())

            return axios({
                url: api.login_user,
                method: 'post',
                headers: api.headers(),
                data: JSON.stringify(data),
                withCredentials: true
            }).then(({data}) => {


                dispatch(UserActions.userRequestLogined(data))
                return Promise.resolve(data)

            }).catch((error) => {
                console.log("ERROR", {error})
                dispatch(UserActions.userRequestFailed(error.message))
                return Promise.reject(error)
            })
        }
    }

    static register(data) {
        return (dispatch) => {

            dispatch(UserActions.userRequest())

            return axios({
                method: 'post',
                url: api.register_user,
                headers: api.headers(),
                data: JSON.stringify(data),
                withCredentials: true
            }).then(response => {
                console.log({response})
                dispatch(UserActions.userRequestSigin(response.data))
                return Promise.resolve(response.data)
            }).catch(error => {
                console.log("ERROR SIGIN")
                dispatch(UserActions.userRequestFailed(error.message))
            })
        }
    }

    static logout() {
        return (dispatch) => {
            dispatch(UserActions.userRequest())
            return axios({
                url: api.logout_user,
                method: 'get',
                headers: api.headers(),
                withCredentials: true
            }).then(response => {
                console.log("Logout success")
                dispatch(UserActions.userRequestLogout())

                return Promise.resolve()
                // console.log("LOGOUT is occur")
            }).catch(error => {
                console.log("ERROR TO LOGOUT!")
            })
        }
    }
    
    

    static user_upload_image_request() {
        return {type: USER_UPLOAD_IMAGE_REQUEST}
    }

    static user_uplod_image_success(image)  {
        return {
            type: USER_UPLOAD_IMAGE__SUCCESS,
            payload: image
        }
    }
    
    static user_update_image_failed() {
        return {type: USER_UPLOAD_IMAGE__FAILED}
    }

    static user_upload_image_progress(progress) {
        return {
            type: USER_UPLOAD_IMAGE_PROGRESS,
            progress
        }
    }

    static change_photo(image) {

        return dispatch => {
            dispatch(
                UserActions.user_upload_image_request()
            )
            axios({
                url: api.user_update_photo,
                method: 'POST',
                withCredentials: true,
                headers: api.headers(),
                data: image,
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );

                    dispatch(
                        UserActions.user_upload_image_progress(percentCompleted)
                    )

                    // console.log("Progress:-"+percentCompleted);
                }
            }).then(({data}) => {

                dispatch(
                    UserActions.user_uplod_image_success(data)
                )

            }).catch(error => {

                dispatch(
                    UserActions.user_update_image_failed()
                )
            })
        }
    }
}
