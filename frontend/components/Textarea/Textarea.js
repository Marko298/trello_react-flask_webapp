import React from 'react'

import PropTypes from 'prop-types'

const Textarea = ({name, label, field, onChange}) => (
    <div>
        <label htmlFor={name}>
            {label}
        </label>
        <textarea name={name} value={field} onChange={onChange}>
        </textarea>
    </div>
)

Textarea.defaultProps = {
    onChange: () => {},
    name: '',
    label: ''
}


Textarea.propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired
}


export default Textarea