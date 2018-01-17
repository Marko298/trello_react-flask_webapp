import React from 'react'
import PropTypes from 'prop-types'
import './Button.style.css'


function Button({onClick, children, type, disabled, descruption,...props}) {
    let button = null;

    let isObject = typeof props.className === 'object'
    const className = props.className &&
            isObject && props.className
            ? "button ".concat( props.className.join(" "))
            : 'button'

            // ref={node => button = node}
    return (
        <div>
            <button
                {...props}
                ref={n => button = n}
                className={className}
                disabled={disabled} 
                type={type}
                onClick={onClick}
            >
                {children}
            </button>
                {descruption && <p>{descruption}</p>}
        </div>
    )
}

Button.defaultProps = {
    descruption: '',
    children: "button",
    disabled: false,
    type: "button",
    onClick: () => {}
}

Button.propTypes = {
    children: PropTypes.string,
    disabled: PropTypes. bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
    descruption: PropTypes.string
}
export default Button