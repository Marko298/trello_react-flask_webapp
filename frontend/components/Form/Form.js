import React, {Component} from 'react'
//utils
import PropTypes from 'prop-types'
//style
import './Form.style.css'
//HOC's
import {withValidationFields} from '../../HOC/withValidationFields'


function Form({onSubmit, renderHeader, renderFooter, children, method}) {
    return (
        <form onSubmit={onSubmit} className="form" method={method}>
            {renderHeader()}
            {children}
            {renderFooter()}
        </form>
    )
}
Form.defaultProps = {
    renderHeader: () => {},
    renderFooter: () => {},
    submitHanlder: () => {},
    method: "GET"
}


export default withValidationFields(Form)