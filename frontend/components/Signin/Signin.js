import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//components
import Button from '../../components/Button/Button'
import Form from '../../components/Form/Form'
import TextField from '../../components/TextField/TextField'
import Title from '../Title/Title'

class Signin extends Component{

    render() {
        return (
            <Form>
                <Title>Register a new account in Trello</Title>
                <TextField label='Name'/>
                <TextField label='Email'/>
                <TextField label='Password' type='password'/>
                <Button type='submit'>Sign in</Button>
                <Link to='/login'>Have already account ?</Link>
            </Form>
        )
    }
}

export default Signin