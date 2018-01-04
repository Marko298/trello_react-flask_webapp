import * as types from '../constants'


export function setFieldError(error) {
    return {
        type: types.SET_ERROR,
        error
    }
}