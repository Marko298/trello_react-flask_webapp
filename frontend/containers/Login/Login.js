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
   
 
    componentDidMount() {
        document.title = "Log in | Trello"
    }

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
    header = () => {}
    footer = () => (
        <div style={{textAlign: 'center', padding: '10px'}}>
            <Link to='/signin' style={{textDecoration: 'underline'}}>Do you want to create new account ?</Link>
        </div>
    )
    change = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    render() {
        const { email, password } = this.state
        const allowUserSubmitButton = this.props.isUserLoading 
            ? {primary: false, disabled: true} 
            : {primary: true, disabled: false}

        return (
            <div {...this.props} className='authenth-container'>
                <FormWithValidation
                    {...this.props.custom_style}
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
                    <Button type='submit' {...allowUserSubmitButton}>Login</Button>
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

const mapStateToProps = ({user}) => ({
    isUserLoading: user.isLoading
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)