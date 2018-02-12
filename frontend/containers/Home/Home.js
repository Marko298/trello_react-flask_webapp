import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'

import Login from '../Login/Login'

//components
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Wrapper from '../../components/Wrapper/Wrapper'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'

import withTheme from '../../HOC/withTheme'

import './Home.style.css'

const Theme = {
    first_section: {
        className: 'container bg-lightblue align-middle in_column',
    },
    second_section: {
        className: 'container bg-white align-middle in_column'
    },
    title: {
        className: 'first-text',
        biggest: true,
        color: '#90caf9'
    },
    second_title: {
        className: 'second-text',
        biggest: true,
        color: '#90caf9'
    },
    form_login: {
        className: 'login-form'
    }
}

class Home extends Component{
    state = {
        isAuth: true
    }

    render() {
        const {first_section, title, second_title, form_login, second_section} = this.props.Theme
        return (
            <div>
                {!this.state.isAuth 
                ?  (<Redirect to='/login'/>)
                :  (
                    <div>
                        <NavigationBar/>
                        <Wrapper {...first_section}>
                            <div className='home-container'>
                                <Title text="Wellcome back" {...title}>
                                    <span className='custom-font-splitter'> 
                                        in <span className='span'>Trello</span>
                                    </span>
                                </Title >

                                <Title text="Login" {...second_title}/>

                                <Login {...form_login} />
                            </div>
                        </Wrapper>
                        <Wrapper {...second_section}>
                            <div className='home-container'>
                                <Title text="You can create a new Account what ever" {...title}>
                                    <span className='custom-font-splitter'> 
                                        and <span className='span'>it's free</span>
                                    </span>
                                </Title >
                                <div {...second_section}>
                                    <Link className='sign-in' to='/signin' style={{textAlign: 'center'}}>
                                        Create account and <br /> join to us ?
                                    </Link>
                                </div>
                            </div>
                        </Wrapper>
                    </div>
                )}
            </div>
        )
    }
}

export default withTheme(Home)(Theme)