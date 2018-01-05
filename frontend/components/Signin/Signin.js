import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//components
import Button from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import Title from '../Title/Title'

import Form from '../../components/Form/Form'


import './Signin.style.css'

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
        console.log("Data is sended")
    }

    header = () => (
        <Title>Register a new account in Trello</Title>
    )
    footer = () => (
        <Link to='/login'>Have already account ?</Link>
    )

    render() {
        const {fields} = this.state;

        const {name} = fields[0];
        const {email} = fields[1];
        const {password} = fields[2];
  
        return (
            <Form 
                submit={this.onSubmit}
                renderHeader={this.header}
                renderFooter={this.footer}>
                 <TextField
                    handleChange={this.handleChange}
                    name="name"
                    field={name}
                    label='Name'/>
                <TextField
                    handleChange={this.handleChange}
                    name="email"
                    field={email}
                    label='Email'/>
                <TextField
                    handleChange={this.handleChange}
                    name="password"
                    field={password}
                    label='Password'
                    type='password'/>
                <Button primary type='submit'>Sign in</Button>
            </Form>
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

export default Signin