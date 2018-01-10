import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Login from '../Login/Login'
// import Signin from '../../components/Signin/Signin'
import NavigationBar from '../../components/NavigationBar/NavigationBar'

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
            <div>
                {!this.state.isAuth 
                ?  (<Redirect to='/login'/>)
                :  (
                    <div>
                        <NavigationBar/>
                        <Login/>
                    </div>
                )}
                
            </div>
        )
    }
}

export default Home