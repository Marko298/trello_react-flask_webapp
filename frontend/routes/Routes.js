import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
//containers
import NavigationBar from '../containers/NavigationBar/NavigationBar'
import Home from '../containers/Home/Home'
import Login from '../containers/Login/Login'
import Signin from '../containers/Signin/Signin'
//routes
import PrivateRoute from './PrivateRoute'


function Dashboard(props) {
    return (
        <h1>Dashboard</h1>
    )
}
class Routes extends Component {
    render() {
        console.log("Render Router", this.props)
        // <Route exact path='/login' component={Login}/>
        // <Route exact path='/signin' component={Signin}/>
        const {userId} = this.props;
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path='/' component={(props) => {
                            return (userId ? (<Dashboard {...props}/>) : (<Home {...props}/>))
                        }} />

                        <PrivateRoute exact path='/login' component={Login} isAuth={userId} redirectPath="/"/>
                        <PrivateRoute exact path='/signin' component={Signin} isAuth={userId} redirectPath="/"/>
                    </Switch>
                </div>
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