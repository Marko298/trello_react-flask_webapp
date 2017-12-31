import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//components
import Button from '../../components/Button/Button'
import Form from '../../components/Form/Form'
import TextField from '../../components/TextField/TextField'
import Title from '../Title/Title'

// import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

class Login extends Component{

    componentWillMount() {
        console.log("componentWillMount Login")
    }
    clickHandler = (value) => (event) => {
        event.preventDefault();
        console.log("Submit is occur")
        console.log("from clusures", value)
    }
    render() {
        console.log("The render is running on Login")
        return (
            <Form>
                <Title>Welcome back to Trello</Title>
                <TextField label='Email'/>
                <TextField label='Password' type='password'/>
                <Button type='submit' clickHandler={this.clickHandler("right")}>Login</Button>
                <Link to='/signin'>Do you want to create new account ?</Link>
            </Form>
        )
    }
    componentDidMount() {
        console.log('_____________________')
        console.log(this.props)
        console.log("componentDidMount Login")
        console.log('_____________________')
    }

    componentWillReceiveProps(nextProps) {
        console.log('_____________________')
        console.log('New Props', nextProps)
        console.log('_____________________')
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate Login")
        return true
    }
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate Login")
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate Login")
    }
    componentWillUnmount() {
        console.log("——componentWillUnmount")
    }
   
}

export default Login
// export default Login