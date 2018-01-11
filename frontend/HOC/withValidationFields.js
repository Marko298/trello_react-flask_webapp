import React from 'react'

export function withValidationFields(Component) {

    return class Wrapper extends React.Component {
        state = {
            fields: {},
            errors: {}
        }

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

        getField = (node) => {
            this.setState( state => {
                let fields = Object.assign({}, state.fields)
                if( !(node.name in fields) ) {
                    fields[node.name] = node
                    return {
                        ...state,
                        fields: {...fields}
                    }
                }
                return null
            })
        }

        validateBeforeSubmit = () => {
            const {fields} = this.state;
            let isFieldEmpty = false;

            for( let name in fields ) {
                let node = fields[name];
                if(node.value.length === 0) {
                    isFieldEmpty = true
                }
                this.displayErrors(name, node.value);
            }
          
            if(isFieldEmpty) {
                return false
            }

            if( Object.keys(this.state.errors).length === 0 ) {
                // console.log('All right')
                return true
            }
            // console.log("There is some error")
            return false

        }

        displayErrors = (name, value) => {
            try {
                let result = Wrapper._isEmpty(value)
                result && this.removeError(name)

                if(name.toLowerCase() === 'email') {
                    let result = Wrapper._isValidEmail(value);
                    result && this.removeError(name)
                }
            } catch ({message}) {
                this.setError(name, message);
            }
        }

        onBlur =  (e) => {
            let {value, name} = e.target;
            this.displayErrors(name, value)
        }
        removeError = (elementName) => {
            this.setState(state => {
                let errors = Object.assign({}, state.errors);

                if(elementName in errors) {
                    let isDeleted = delete errors[elementName]

                    if(isDeleted) {
                        return {
                            ...state,
                            errors: {...errors}
                        }
                    } else {
                        throw new Error(`Can't delete ${elementName} from ${errors} object`)
                    }
                } 
                return null
            })
        }

        setError = (elementName, errorMessage) => {
            this.setState( state => {
                let error = Object.assign({}, state.errors)
                let anotherErrorMessage = error[elementName] === errorMessage;

                if( !(elementName in error) || !anotherErrorMessage ) {
                    error[elementName] = errorMessage
                    return {
                        ...state,
                        errors: {...error}
                    }
                }
                return null
            })

        }
        renderChild = () => {
            const { state, props } = this
            let newProps = {
                getField: this.getField,
                onBlur: this.onBlur,
                errors: ''
            }
            return React.Children.map(props.children, child => {
                if(child.props.name in state.errors) {
                    return React.cloneElement(child, {...newProps, errors: state.errors[child.props.name]})
                }
                let inputField = React.cloneElement(child, {...newProps})

                return inputField
            })
        }
        render() {
            return (
                <Component {...this.props} onSubmit={(e) => {
                        e.preventDefault();
                        const isValid = this.validateBeforeSubmit();
                        console.log({isValid})
                        isValid && this.props.submit();
                    }} >
                    {this.renderChild()}
                </Component>
            )
        }
    }
}