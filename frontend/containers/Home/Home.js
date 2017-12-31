import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Login from '../../components/Login/Login'
// import Signin from '../../components/Signin/Signin'
import NavigationBar from '../NavigationBar/NavigationBar'

class Home extends Component{
    // static defaultProps = {
    //     isAuth: false
    // }

    constructor(props) {
        super(props)

        this.state = {
            isAuth: true
        }
    }
    render() {
        return (
            <div>_
                {!this.state.isAuth 
                ?  (<Redirect to='/login'/>)
                :  (<div>
                <NavigationBar/>
                <Login/>
                </div>)}
            </div>
        )
    }
}

export default Home