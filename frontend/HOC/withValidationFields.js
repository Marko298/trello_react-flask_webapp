import React, {Component} from 'react'

export function withValidationFields(Comp) {

    return class Wrapper extends Component {
        state = {
            fields: [],
            errors: {},
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
        componentDidMount() {
            // console.log("componentDidMount withValidationFields")
            // console.log(this.props.children)
        }
        getField = (node) => {
            this.setState( state => ({
                ...state,
                fields: state.fields.concat(node)
            }))
        }
        componentWillUpdate(nextProps, nextState){
            // console.log("componentWillUpdate",nextProps, nextState)
            // this.state.fields.forEach(f => console.log({val: f.value, name: f.name}))
        }
        validateBeforeSubmit = () => {
            alert("from wrapper")
        }

        onBlur =  (e) => {
            let {value, name} = e.target;
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
        enhancChild = () => {
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
                <Comp {...this.props} onSubmit={(e) => {
                        e.preventDefault();
                        this.validateBeforeSubmit();
                        this.props.submit();
                    }} >
                    {this.enhancChild()}
                </Comp>
            )
        }
    }
}