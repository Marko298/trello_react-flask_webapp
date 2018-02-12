import {
    IS_FILE_START_UPLOAD,
    FILE_IS_UPLOADED,
    FILE_UPLOAD_PROGRESS,
} from '../constants/ToolsConstant'

const initialState = {
    isFileStartUpload: false,
    isFileUploaded: true,
    uploadingProgress: 1
}

export default function ToolsReducer(state=initialState, {type, progress}) {
    switch(type) {

        case IS_FILE_START_UPLOAD:{
            return {
                ...state,
                isFileStartUpload: true,
                isFileUploaded: false,
            }
        }
        case FILE_IS_UPLOADED:{
            return {
                ...state,
                isFileStartUpload: false,
                isFileUploaded: true,
                uploadingProgress: 1,
            }
        }
        case FILE_UPLOAD_PROGRESS:{
            return {
                ...state,
                uploadingProgress: progress
            }
        }

        default: {
            return state
        }
    }

    return state
}