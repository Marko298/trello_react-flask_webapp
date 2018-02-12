import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {Color} from '../../__asssets/color'

import './Input.style.css'

const {red} = Color

const styles = (isError) => ({
    border: isError && `2px solid ${red}` || "none"
})

function Input(props) {
    const {label, field, name, type, handleChange, children, onFocus, onBlur, errors, onChange} = props

    return (
        <div className='wrapper'>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                style={styles(errors.length)}
                value={field}
                onFocus={onFocus}
                onBlur={onBlur}
                className='input'
                type={type}
                ref={n => this.node = n}
                name={name}
                placeholder={`Type from ${label}`}
                onChange={handleChange(name)}
                {...props}
            />
                {errors.length > 0 && <span style={{color: red, lineHeight: 1.5}}>{errors}</span>}
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