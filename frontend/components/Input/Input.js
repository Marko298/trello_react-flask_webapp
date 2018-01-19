import React from 'react'
import PropTypes from 'prop-types'
//styles
import "./Input.css"

function Input({children, onChange, type, name, _id, ...props}){
    return (
        <label htmlFor={props.name}> {children}
            <input 
                {...props}
                onChange={onChange} 
                type={type} 
                name={name}
            />
        </label>
    )
}

Input.defaultProps = {
    type: "text"
}

Input.propTypes = {
    name: PropTypes.string.isRequired
}


export default Input