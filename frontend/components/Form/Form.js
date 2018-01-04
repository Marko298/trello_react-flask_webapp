import React, {Component} from 'react'
import {StForm} from './Form.style'
import PropTypes from 'prop-types'

import {withValidationFields} from '../../HOC/withValidationFields'


function Form({onSubmit, renderHeader, renderFooter, children}) {
    return (
        <StForm onSubmit={onSubmit}>
            {renderHeader()}
            {children}
            {renderFooter()}
        </StForm>
    )
}
Form.defaultProps = {
    renderHeader: () => {},
    renderFooter: () => {},
    submitHanlder: () => {}
}
// function Form({renderHeader, renderFooter, children, submitHanlder, ...props}){
//     console.log(children)
    
// }


export default withValidationFields(Form)