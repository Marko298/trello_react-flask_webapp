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
        ]
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
        
        this.props.register(postRequest).then(response => {
            if('error' in response) {
                console.log(response.error)
            }
        })
    }

    header = () => (
        <Title>Register a new account in Trello</Title>
    )
    footer = () => (
        <Link to='/login'>Have already account ?</Link>
    )

    render() {
        const {fields} = this.state

        const {name} = fields[0]
        const {email} = fields[1]
        const {password} = fields[2]
  
        return (
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
                <Button type='submit'>Sign in</Button>
            </FormWithValidation>
        )
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