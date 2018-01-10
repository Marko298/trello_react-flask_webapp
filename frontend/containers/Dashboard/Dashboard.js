import React from 'react'
import {Switch, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
import {logout} from '../../actions/UserAction'

import {fetchBoards, fetchBoard} from '../../actions/BoardAction'

import ToolBar from '../ToolBar/ToolBar'

let Profile = ({match}) => (
    <div>

        <button>Profile</button>
    </div>
)

// Board = connect(null,fetchBoard )(Board)


class Board extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }
    componentWillReceiveProps(nextProps) {
        console.log("Profile componentWillReceiveProps")
        console.log(nextProps)
    }
    render() {
        console.log("RENADER Board WITH PROPS ", this.props)
        return (
            <div>Board {this.props.match.params.userId}</div>
        )
    }
}

class Dashboard extends React.Component {
    static CurrentBoard = Board
    static ListBoards = (props) => <h4>here is default</h4>

    componentWillReceiveProps(nextProps) {
        console.log("Dashboard componentWillReceiveProps")
        console.log(nextProps)
    }

    componentDidMount() {
        console.log("componentDidMount")
    }
    logout = () => {
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <ToolBar>
                    <Link to={`${this.props.match.url}profile/c`}>—profile—</Link>
                    <div/>
                    <Link to={`${this.props.match.url}board/9fbabd96602348eaba70fdaf8154944f`}>board</Link>
                    <button onClick={this.logout}>LOG OUT</button>
                    <button onClick={this.props.fetchBoards}>Fetch all boards</button>
                </ToolBar>
                <div>
                    <Switch>

                        <Route exact path={`${this.props.match.path}`} component={Dashboard.ListBoards}/>
                        <Route path={`${this.props.match.path}board/:boardID`} component={Board}/>
                        <Route path={`${this.props.match.path}profile/:userId`} component={Profile}/>
                        
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

export default withRouter(connect(null, {logout, fetchBoards})(Dashboard))