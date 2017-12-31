import React from 'react'
import {StButton} from './Button.style'
import PropTypes from 'prop-types'


const Button = ({clickHandler, children, type, disabled}) => {
    return (
        <StButton
            disabled={disabled} 
            type={type}
            onClick={clickHandler}
            primary>
            {children}
        </StButton>
    )
};

Button.defaultProps = {
    children: "button",
    disabled: false,
    type: "button",
    clickHandler: () => {}
}

Button.propTypes = {
    children: PropTypes.string,
    disabled: PropTypes. bool,
    type: PropTypes.string,
    clickHandler: PropTypes.func
}
export default Button