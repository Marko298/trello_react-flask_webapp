import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
//HOC
import {withValidationFields} from '../../HOC/withValidationFields'
//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Form from '../../components/Form/Form'
// containers
import Input from '../Input/Input'
//actions
import UserAction from '../../actions/UserAction'


import './Signin.style.css'

const FormWithValidation = withValidationFields(Form)
class Signin extends Component {
    state = {
        fields: [
            {name: ''},
            {email: ''}, 
            {password: ''}
        ],
        isLoading: false,
        serverResponse: ''
    }

    handleChange = (field) => (evant) => {

        let value = evant.target.value;

        this.setState(function (state) {
            let updatedFields = state.fields
                .reduce((acumulator, obj) => {
                    if (field in obj) {
                        obj[field] = value
                    }
                    acumulator.push(obj)
                    return acumulator
                }, [])

            return {...state, fields: [...updatedFields]}
        })
    }
    
    onSubmit = () => {
        const {fields} = this.state;

        const {name} = fields[0];
        const {email} = fields[1];
        const {password} = fields[2];
        
        const postRequest = {name, email, password};
        this.setState( (state) => ({...state, isLoading: true, serverResponse: ''}))
        this.props.register(postRequest).then(response => {
            this.setState( (state) => ({...state, isLoading: false}))
            console.log("register", {response})
            if('error' in response) {
                this.setState((state) => ({
                    ...state,
                    serverResponse: response.error,
                    fields: [
                        {name: ''},
                        {email: ''}, 
                        {password: ''}
                    ],
                }))
                console.log(response.error)
            }
        })
    }

    header = () => (
        <div className='margin-v-15'>
            <Title>Register a new account in Trello</Title>
        </div>
    )
    footer = () => (
        <div className='margin-v-15'>
            <Link to='/login'>Have already account ?</Link>
        </div>
    )

    render() {
        const {fields, isLoading, serverResponse} = this.state

        const {name} = fields[0]
        const {email} = fields[1]
        const {password} = fields[2]
  
        return (
            <div className='authenth-container'>
                {serverResponse && (
                    <div className='danger-response'>
                        <Title text={serverResponse} large color="#ffffff"/>
                    </div>
                )}
                <FormWithValidation
                    method="post" 
                    submit={this.onSubmit}
                    renderHeader={this.header}
                    renderFooter={this.footer}>
                    <Input
                        handleChange={this.handleChange}
                        name="name"
                        field={name}
                        label='Name'/>
                    <Input
                        handleChange={this.handleChange}
                        name="email"
                        field={email}
                        label='Email'/>
                    <Input
                        handleChange={this.handleChange}
                        name="password"
                        field={password}
                        label='Password'
                        type='password'/>
                    <Button type='submit' primary={!isLoading} disabled={isLoading}>Sign in</Button>
                </FormWithValidation>
            </div>
        )
    }
    componentDidMount() {
        document.title = "Sign in | Trello"
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate")

    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("componentDidUpdate", this.state.error, prevState.error)
        // https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs
    }  
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


const mapDispatchToProps = (dispatch) => ({
    register(data) {
        return dispatch(UserAction.register(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)