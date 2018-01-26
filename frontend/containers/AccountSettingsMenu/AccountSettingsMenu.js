import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

//actions
import UserActions from '../../actions/UserAction'
//components
import Button from '../../components/Button/Button'


import TabRoutes from '../../components/TabRoutes/TabRoutes'

const routes = [
    {path: '', title: "Profile"},
    {path: '/cards', title: "Cards"},
    {path: '/settings', title: "Settings"}
]

class AccountSettingsMenu extends React.Component {
    handleLogoutAction = () => {
        this.props.logout().then(() => {
           this.props.history.push('/')
        })
    }
    render() {
        const {match, userId} = this.props
        return (
            <div>
                <TabRoutes _id={userId} routers={routes} match={match}/>
                <Button onClick={this.handleLogoutAction}>
                    Logout
                </Button>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    userId: user.userId
})

const mapDispatchToProps = (dispatch) => ({
    logout() {
        return dispatch(UserActions.logout())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountSettingsMenu))