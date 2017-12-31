import React from 'react'
import {StForm} from './Form.style'
import PropTypes from 'prop-types'


const Form = ({children, submitHanlder}) => {
    return (
        <StForm onSubmit={submitHanlder}>
            {children}
        </StForm>
    )
};

Form.defaultProps = {
    submitHanlder: () => {}
}

Form.propTypes = {
    submitHanlder: PropTypes.func.isRequired
}

export default Form