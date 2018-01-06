import React from 'react'
import PropTypes from 'prop-types'
import './Button.style.css'

function Button({clickHandler, children, type, disabled, primary}) {
    return (
        <button
            className={primary ? 'button button-primary' : 'button'}
            disabled={disabled} 
            type={type}
            onClick={clickHandler}
            >
            {children}
        </button>
    )
}

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