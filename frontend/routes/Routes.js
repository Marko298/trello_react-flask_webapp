import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import {connect} from 'react-redux'
// import {Router} from 'react-router'
//containers
// import NavigationBar from '../containers/NavigationBar/NavigationBar'
import Home from '../containers/Home/Home'
import Login from '../containers/Login/Login'
import Signin from '../containers/Signin/Signin'
import Dashboard from '../containers/Dashboard/Dashboard'
//routes
import PrivateRoute from './PrivateRoute'


const NotFound = () => <h1>Page is not Found 404.</h1>
const Profile = (props) => <h3> Profile </h3>

class Routes extends Component {
    render() {
        const {userId} = this.props;
        const redirect = (props) => (userId ? (<Dashboard {...props}/>) : (<Home {...props}/>))
        return (
            <Router>
                <Switch>
                    <PrivateRoute 
                        path='/login' 
                        component={Login} 
                        isAuth={userId} 
                        redirectPath="/"
                    />
                    <PrivateRoute 
                        path='/signin' 
                        component={Signin} 
                        isAuth={userId} 
                        redirectPath="/"
                    />

                    <Route 
                        exact={userId ? false : true} 
                        path='/' 
                        component={(props) => redirect(props)}
                    />
                    
                    <Route component={NotFound} />
                </Switch>
            </Router>
        )
    }
}


function mapStateToProps(state) {
    return {
        userId: state.user.userId
    }
}

export default connect(mapStateToProps)(Routes)