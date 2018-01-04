import React, {Component} from 'react'
import {connect} from 'react-redux'

//actions
import {setFieldError} from '../../actions'

class ValidateFields extends Component {

    static _isEmpty = (field) => {
        if(field.length == 0) {
            throw new Error(`isRequired fields ${field}`)
        }
        if(field.length > 1) {
            return true
        } else {
            throw new Error(`мало букв`)
        }
    }

    static _isValidEmail(email) {
        let re = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        if( !re.test(email.toLowerCase()) ) {
            throw new Error(`invalid email`)
        } else {
            return true
        }
    }

    static validateFields = () => {
        console.log(new ValidateFields())
        let {fields} = this.props.parentState;
        let {setFieldError} = this.props;
        const errorsList = [];

        fields.forEach(o => {         
            for(let key in o) {
                let value = o[key];

                try {
                    ValidateFields._isEmpty(value)
                    if(key === 'email') {
                        ValidateFields._isValidEmail(value)
                    }
                } catch ({message}) {
                    errorsList.push(message)
                }               
            }
        })
        
        errorsList.length ? setFieldError(errorsList) : setFieldError([])
    }

    showElements = () => {

        return React.Children.map(this.props.children, child => {

            let newProps = {
                isValid: false,
                invalidReason: ""
            }
           
            let node = React.cloneElement(child);

            // if (this.props.error.includes(node.props.field)) {
            //     let newNode = React.cloneElement(node, {...newProps});

            //     return newNode
            // }
            return node
        })
    }
    render() {
        return (
            <div>
                {this.showElements()}
            </div>
        )
    }
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate", nextProps.parentState, this.props.parentState)
        }
        componentDidUpdate(prevProps, prevState) {
            console.log("componentDidUpdate", prevProps.parentState, this.props.parentState)
    } 
}

function mapStateToProps(state) {
    return{
        error: state.error
    }
}


export default connect(mapStateToProps, {setFieldError})(ValidateFields)