import React from 'react'
import PropTypes from 'prop-types'
import './Button.style.css'

const styles = function(props) {
    return {
        
    }
}


function Button({onClick, children, type, disabled, descruption,...props}) {

    let defaultClass = 'button'
    let addonsClasses = props.className ? props.className : ''

    return (
        <div>
            <button
                {...props}
                className={defaultClass.concat(" ", addonsClasses)}  
                disabled={disabled} 
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