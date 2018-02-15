
import {
    USER_REQUEST_FAILED, 
    USER_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_REQUEST_LOGOUT,
    USER_UPLOAD_IMAGE_REQUEST,
    USER_UPLOAD_IMAGE_PROGRESS,
    USER_UPLOAD_IMAGE__SUCCESS,
    USER_UPLOAD_IMAGE__FAILED,
    USER_UPDATE_DATA_REQUEST,
    USER_UPDATE_DATA_REQUEST_SUCCESS,
    USER_UPDATE_DATA_REQUEST_FAILED,
    USER_SIGNIN_SUCCESS
} from '../constants/UserConstants'

let defaultLabels = [
    {_id: "41335e0511994300a2845c20bf8fe57d", color: "#c62828", description: "red"},
    {_id: "a5b54c2d0f184550aca154a05e39fd1b", color: "#eeff41", description: "yellow"},
    {_id: "44d2a269dd374b87a3f3090f7c7cde8a", color: "#00e676", description: "green"},
    {_id: "0063886c4eb04603b5b204620ca987de", color: "#42a5f5", description: "blue"},
]

const initialState = {
    // userId: "17fce7315d3a419bbae02f09d71f85ae",
    userId: null,
    email: null,
    error: null,
    isLoading: false,
    labels: defaultLabels || [],
    name: null,
    photo: null,
    isPhotoUploading: false,
    progree_photo_upload: 0,
    initials: null,
    bio: null,
    isDataUpdateRequest: false
}


const UserReducer = function (state = initialState, {type, payload, progress}) {
    switch (type) {
        case USER_REQUEST: {
            return {
                ...state,
                isLoading: true 
            }
        }
        
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                email: payload.email,
                userId : payload._id,
                name: payload.name,
                labels: payload.labels,
                photo: payload.photo,
                bio: payload.bio,
                initials: payload.initials
            }
        }
        case USER_REQUEST_FAILED: {
            return {
                ...state,
                userId: null,
                email: null,
                error: payload,
                isLoading: false,
                name: null,
                photo: null,
                bio: null,
                initials: null
            }
        }
        case USER_REQUEST_LOGOUT: {
            return {
                ...initialState,
                userId: null
            }
        }
       
        case USER_UPLOAD_IMAGE_REQUEST: {
            return {
                ...state,
                isPhotoUploading: true
            }
        }
        case USER_UPLOAD_IMAGE__SUCCESS: {
            return {
                ...state,
                isPhotoUploading: false,
                photo: payload
            }
        }
        case USER_UPLOAD_IMAGE_PROGRESS: {
            return {
                ...state,
                progree_photo_upload: progress
            }
        }
        case USER_UPLOAD_IMAGE__FAILED: {
            return {
                ...state,
                isPhotoUploading: false,
            }
        }

        case USER_UPDATE_DATA_REQUEST: {
            return {
                ...state,
                isDataUpdateRequest: true
            }
        }
        case USER_UPDATE_DATA_REQUEST_SUCCESS: {
            return {
                ...state,
                isDataUpdateRequest: false,
                ...payload
            }
        }
        case USER_UPDATE_DATA_REQUEST: {
            return {
                ...state,
                isDataUpdateRequest: false
            }
        }

        
        case USER_SIGNIN_SUCCESS:
            return {
                ...state,
                error: null,
                isLoading: false
            }


        default:
            return state
    }
    return state
}

export default UserReducer


