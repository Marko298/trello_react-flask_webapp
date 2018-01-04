import React, {Component} from 'react'
import PropTypes from 'prop-types'

import './TextField.style.css'

class TextField extends Component {
    static defaultProps = {
        type: "text",
        label: '',
        field: '',
        handleChange: () => {},
        getField: (n) => n,
        errors: ''
    }
    static propTypes = {
        type: PropTypes.string,
        handleChange: PropTypes.func,
        label: PropTypes.string
    }
    componentDidMount() {
        this.props.getField(this.node)
    }

    shouldComponentUpdate(nextProps, nextState) {
        const {field: currentValue, errors: currentError} = this.props;
        const {field: newValue, errors: newError} = nextProps;

        if(currentError.length === 0 && newError.length > 0) {
            return true
        }

        if(currentError !== newError) {
            return true
        }
        
        if(currentValue.length == 0 && newValue.length > 0) {
            return true
        }
        if(currentValue !== newValue) {
            return true
        }
        return false
    }

    render() {
        const {label, field, name, type, handleChange, children, onFocus, onBlur, errors} = this.props;
   
        return (
            <div className='wrapper'>
                {label && <label>{label}</label>}
                <input
                    value={field}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className='input'
                    type={type}
                    ref={n => this.node = n}
                    name={name}
                    placeholder={`Type from ${label}`}
                    onChange={handleChange(name)}/>
                    {errors.length > 0 && <span>{errors}</span>}
            </div>
        )
    }

}

export default TextField