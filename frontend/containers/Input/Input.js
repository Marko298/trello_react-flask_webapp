import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './Input.style.css'


function Input(props) {
    const {label, field, name, type, handleChange, children, onFocus, onBlur, errors, onChange} = props

    return (
        <div className='wrapper'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                value={field}
                onFocus={onFocus}
                onBlur={onBlur}
                className='input'
                type={type}
                ref={n => this.node = n}
                name={name}
                placeholder={`Type from ${label}`}
                onChange={handleChange(name)}
            />
                {errors.length > 0 && <span>{errors}</span>}
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    label: '',
    field: '',
    handleChange: () => {},
    errors: ''
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    field: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default Input