import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//components
import Button from '../../components/Button/Button'
import Form from '../../components/Form/Form'
import TextField from '../../components/TextField/TextField'
import Title from '../Title/Title'

import PropTypes from 'prop-types'

class Login extends Component{
    state = {
        fields: [
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
        console.log("Data is sended")
    }
    header = () => (
        <Title>Welcome back to Trello</Title>
    )
    footer = () => (
        <Link to='/signin'>Do you want to create new account ?</Link>
    )


    render() {

        const {email} = this.state.fields[0]
        const {password} = this.state.fields[1]
        return (
            <Form
                submit={this.onSubmit}
                renderHeader={this.header}
                renderFooter={this.footer}>
                <TextField 
                    handleChange={this.handleChange}
                    field={email}
                    name="email"
                    label='Email'/>
                <TextField  
                    handleChange={this.handleChange}
                    field={password}
                    name="password"
                    label='Password'/>
                <Button type='submit' primary>Login</Button>
               
            </Form>
        )
    }  
}

export default Login
// export default Login