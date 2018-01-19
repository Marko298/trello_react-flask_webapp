import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect}  from 'react-redux'
//HOC
import {withValidationFields} from '../../HOC/withValidationFields'
//utils
import PropTypes from 'prop-types'
//components
import Button from '../../components/Button/Button'
import Title from '../../components/Title/Title'
import Form from '../../components/Form/Form'
import Input from '../Input/Input'

//actions
// import {requestUserLogin} from '../../actions/UserAction'
import UserActions from '../../actions/UserAction'




const FormWithValidation = withValidationFields(Form)

class Login extends Component{

    state = {
        email: '',
        password: ''
    }

    handleChange = (field) => (evant) => {
        let value = evant.target.value;
        this.setState({
            [field] : value
            
        })
    }
    onSubmit = () => {

        const { email, password } = this.state

        this.props.login({email, password}).then(response => {
            if('error' in response) {
                console.log(response.error)
            }
        })

    }
    header = () => (
        <Title>Welcome back to Trello :D</Title>
    )
    footer = () => (
        <Link to='/signin'>Do you want to create new account ?</Link>
    )
    change = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    render() {
        const { email, password } = this.state
        return (
            <div>
                <FormWithValidation
                    submit={this.onSubmit}
                    renderHeader={this.header}
                    renderFooter={this.footer}>


                    <Input 
                        handleChange={this.handleChange}
                        field={email}
                        name="email"
                        label='Email'
                    />

                    <Input
                        type="password"  
                        handleChange={this.handleChange}
                        field={password}
                        name="password"
                        label='Password'
                    />
                    <Button type='submit' className={["button-primary"]} >Login</Button>
                </FormWithValidation>
            </div>
        )
    }  
}

// function mapDispatchToProps(dispatch) {
//     return {
//         userLogin: (data) => dispatch(requestUserLogin(data))
//     }
// }


const mapDispatchToProps = (dispatch) => ({
    login(data) {
        return dispatch(UserActions.login(data))
    }
})


export default connect(null, mapDispatchToProps)(Login)