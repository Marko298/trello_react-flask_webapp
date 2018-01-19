import React from 'react'
import {Switch, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
//actions
// import {requestUserLogout} from '../../actions/UserAction'
// import {fetchBoards} from '../../actions/BoardAction'

import BoardActions from '../../actions/BoardAction'

import EditForm from '../EditForm/EditForm'

import ToolBar from '../ToolBar/ToolBar'
import Boards from '../Boards/Boards'

//UTILS
import Utils from '../../utils'


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
    componentDidCatch() {
        console.log("componentDidCatch")
    }
    componentDidMount() {
        const {boards: propBoards, fetchBoards} = this.props
        propBoards.length === 1 ? fetchBoards() : null
    }
    logout = () => {
        alert("LOGOUT")
        // this.props.requestUserLogout()
        // this.props.history.push('/')
    }

    render() {
        const { location, match, boards } = this.props
        
        return (
            <div style={{position: 'releted'}}>
                <ToolBar>
                    <Link to='/' >HOME</Link>
                    <Link to={`${this.props.match.url}profile/silver-ok`}>—profile—</Link>
                    <div/>
                    <Link to={`${this.props.match.url}board/9fbabd96602348eaba70fdaf8154944f`}>board</Link>
                    <button onClick={this.logout}>LOG OUT</button>

                </ToolBar>
                        {/* <Route path={`${this.props.match.path}profile/:userId`} component={Profile}/> */}
                <div className="container">
                    <Switch>

                        <Route exact path={`${this.props.match.path}`} render={(props) => {
                            return (
                                <Boards {...props}>
                                    <Boards.Important />
                                    <Boards.Private />
                                    <Boards.Comands />
                                </Boards>
                            )
                        }}/>

                        <Route path={`${this.props.match.path}board/:boardId`} render={(props) => {
                            console.log(" <Route path={`${this.props.match.path}/:boardId`} render={(props)", props)

                            return <h1>We are change location</h1>
                        }}/>


                        <Route path={`${this.props.match.path}profile/:userId`} render={(props) => {
                            console.log(" <Route path={`${this.props.match.path}profile/:userId`} render={(props)", props)
                            
                            return <h1>profile {props.match.params.userId}</h1>
                        }}/>


                        <Route exact path={`${this.props.match.path}:teamId`} render={(props) => {
                            // here i will retrive from the reducer our TEAM With releted boards
                            // let foundedTeam = Utils.returnGroupById(boards, props.match.params.teamId)[0]
                            console.log(foundedTeam)
                            console.log({props})
                            return <div>We are on the right spot <strong>{foundedTeam.title}</strong></div>
                        }}/>
                    </Switch>                
                </div>
 
                 <div>
                     <EditForm/>
                 </div>
                 
                <footer>
                    <h1>Footer</h1>
                </footer>
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
const mapStateToProps = ({ organizations: {teams} }) => ({boards: teams})

const mapDispatchToProps = (dispatch) => ({
    fetchBoards(){
        console.log("occur")
        dispatch(BoardActions.fetchBoards())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))