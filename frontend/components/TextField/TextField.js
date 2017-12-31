import React from 'react'

import {StyledTextField, StyledLabel, TextFieldWrapper} from './TextField.style'
import PropTypes from 'prop-types'

const TextField = ({type, handleChange, label}) => {
    return (
        <TextFieldWrapper>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledTextField
                placeholder={`Type from ${label}`}
                onChange={handleChange}
                type={type}
             />
        </TextFieldWrapper>
    )
}

TextField.defaultProps = {
    type: "text",
    label: '',
    handleChange: () => {}
}

TextField.propTypes = {
    type: PropTypes.string,
    handleChange: PropTypes.func,
    label: PropTypes.string
}
export default TextField