import {
    IS_FILE_START_UPLOAD,
    FILE_IS_UPLOADED,
    FILE_UPLOAD_PROGRESS,
} from '../constants/ToolsConstant'

export default class ToolsActions {
    static is_file_start_upload(){
        return {type: IS_FILE_START_UPLOAD}
    }    
    static is_file_uploaded(){
        return {type: FILE_IS_UPLOADED}
    }    
    static file_upload_progress(progress){
        return {type: FILE_UPLOAD_PROGRESS, progress}
    }    
}