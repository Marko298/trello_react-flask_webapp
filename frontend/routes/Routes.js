import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

//containers
import NavigationBar from '../containers/NavigationBar/NavigationBar'
import Home from '../containers/Home/Home'

//test component
import Login from '../components/Login/Login'
import Signin from '../components/Signin/Signin'

{/* <NavigationBar/> */}
class Routes extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signin' component={Signin}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Routes