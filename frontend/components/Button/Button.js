import React from 'react'
import PropTypes from 'prop-types'
import './Button.style.css'
import {Color} from '../../__asssets/color'

const {blue, green, red, white, grey} = Color
const styles = function({
    primary,
    error,
    success,
    disabled
}) {
    return {
        backgroundColor: 
               primary && blue 
            || error && red 
            || success && green
            || disabled && white 
            || 'transparent',

        color: primary && white || success && white ||error && white || disabled && '#e0e0e0' || grey,
        boxShadow: disabled && 'inset 0 0 20px #9e9e9e' || 'none'
    }
}


function Button({onClick, children, type, descruption,...props}) {

    let defaultClass = 'button'
    let addonsClasses = props.className ? props.className : ''

    return (
        <div>
            <button
                {...props}
                className={defaultClass.concat(" ", addonsClasses)}  
                // disabled={disabled} 
                type={type}
                onClick={onClick}
                style={styles(props)}
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
    descruption: PropTypes.string
}
export default Button