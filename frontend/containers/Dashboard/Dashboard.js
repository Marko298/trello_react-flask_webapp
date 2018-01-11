import React from 'react'
import {Switch, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
//actions
import {requestUserLogout} from '../../actions/UserAction'
import {fetchBoards} from '../../actions/BoardAction'

import ToolBar from '../ToolBar/ToolBar'
import BoardsList from '../BoardsList/BoardsList'

let Profile = ({match}) => (
    <div>
        <button>Profile</button>
    </div>
)
let Board = ({match}) => (
    <div>
        <button>Board</button>
    </div>
)


class Dashboard extends React.Component {
    static defaultProps = {
        boards: []
    }
    
    componentWillReceiveProps(nextProps) {
        console.log("------------------------------------------------")
        console.log("Dashboard componentWillReceiveProps", {nextProps})
        console.log("------------------------------------------------")
    }

    componentDidMount() {
        const {boards: propBoards, fetchBoards} = this.props
        propBoards.length === 0 ? fetchBoards() : null
    }
    logout = () => {
        this.props.requestUserLogout()
        this.props.history.push('/')
    }

    render() {
        const { location, match } = this.props

        return (
            <div>
                <ToolBar>
                    <Link to='/' >HOME</Link>
                    <Link to={`${this.props.match.url}profile/silver-ok`}>—profile—</Link>
                    <div/>
                    <Link to={`${this.props.match.url}board/9fbabd96602348eaba70fdaf8154944f`}>board</Link>
                    <button onClick={this.logout}>LOG OUT</button>

                </ToolBar>
                        {/* <Route path={`${this.props.match.path}profile/:userId`} component={Profile}/> */}
                <div>
                    <Switch>

                        <Route exact path={`${this.props.match.path}`} render={(props) => {
                            return <BoardsList {...props} />
                        }}/>

                        <Route path={`${this.props.match.path}board/:boardId`} render={(props) => {
                            console.log(" <Route path={`${this.props.match.path}/:boardId`} render={(props)", props)

                            return <h1>We are change location</h1>
                        }}/>

                        <Route path={`${this.props.match.path}profile/:userId`} render={(props) => {
                            console.log(" <Route path={`${this.props.match.path}profile/:userId`} render={(props)", props)

                            return <h1>profile {props.match.params.userId}</h1>
                        }}/>
                        
                    </Switch>                
                </div>
            </div>
        )
    }
}
            // <Dashboard>
            //     <ToolBar>
            //         <ToolBar.BoardsList/>
            //         <ToolBar.Search/>
            //         <ToolBar.Create/>
            //         <ToolBar.Notification/>
            //         <ToolBar.Profile/>
            //         {/* /Navigation/ */}
                    
            //     </ToolBar>
            //     <Dashboard.Container />
            //            {/* Routes */}
            // </Dashboard>
/**
|--------------------------------------------------
| TEST ACTIONS
|--------------------------------------------------
*/

export default withRouter(connect(null, {requestUserLogout, fetchBoards})(Dashboard))