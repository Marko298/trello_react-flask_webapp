import React, {Fragment} from 'react'
import {Switch, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'

import {connect} from 'react-redux'
//actions
import BoardActions from '../../actions/BoardAction'
//containers
import ToolBar from '../ToolBar/ToolBar'
import Boards from '../Boards/Boards'
import Popup from '../Popup/Popup'
import AddBoardForm from '../AddBoardForm/AddBoardForm'
import SidebarBoards from '../SidebarBoards/SidebarBoards'
 

//components
import Row from '../../components/Row/Row'
import Wrapper from '../../components/Wrapper/Wrapper'

//UTILS
import Utils from '../../utils'
import AddTeamForm from '../AddTeamForm/AddTeamForm';


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

let Logo = () => (
    <Link to='/' >HOME</Link>
)


class Dashboard extends React.Component {
    static defaultProps = {
        boards: [],
        sidebar: {
            backing: 0,
            isPinned: false
        }
    }

    static styles = ({isPinned, backing}) => {
        return {
            height: '100%',
            marginLeft: isPinned ? backing + 'px' : 0,
            display: 'flex',
            flexDirection: 'column'
        }
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
        document.title = "Dashbaord | Trello" 
        const {boards: propBoards, fetchBoardsAndTeams} = this.props

        propBoards.length === 1
            ? fetchBoardsAndTeams().then(response => {
                console.log("Response from component", {response})
              })
            : null
    }

    logout = () => {
        alert("LOGOUT")
        // this.props.requestUserLogout()
        // this.props.history.push('/')
    }
 
    create_team = () => {
        console.log("Create Team action is fire")
    }

    render() {
        const { location, match, boards } = this.props
        const {menu: {isCreateBoardFormShow, isCreateTeamFormShow}, sidebar: {backing, isPinned} } = this.props

        return (
            <Fragment>
                <SidebarBoards/>
                    <Wrapper style={Dashboard.styles({isPinned, backing})}> 
                        <ToolBar/>
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

                            <Route path={`${this.props.match.path}board/:boardId/:teamId`} render={(props) => {
                                const {teamId, boardId} = props.match.params
                                const board = Utils.returnBoardFromTeam(boards, teamId, boardId)
                                return <i>We are change location <strong> {board.boardName} </strong> </i>
                            }}/>

                            <Route path={`${this.props.match.path}profile/:userId`} render={(props) => {
                                console.log(" <Route path={`${this.props.match.path}profile/:userId`} render={(props)", props)
                                return <h1>profile {props.match.params.userId}</h1>
                            }}/>

                            <Route exact path={`${this.props.match.path}:teamId`} render={(props) => {
                                let foundedTeam = Utils.returnGroupById(boards, props.match.params.teamId)[0]
                                return <div>We are on the right spot <strong>{foundedTeam.title}</strong></div>
                            }}/>
                        </Switch>
                    </Wrapper> 

                 <Wrapper className='pop-over'>
                    <Popup>
                        <Popup.Menu 
                            title="Create Board"
                            toShow={isCreateBoardFormShow}
                            component={AddBoardForm} 
                        />

                        <Popup.Menu 
                            title="Create Team" 
                            toShow={isCreateTeamFormShow} 
                            component={AddTeamForm} 
                        />
                    </Popup>
                 </Wrapper>
                 
                <footer>
                    <h1>Footer</h1>
                </footer>
            </Fragment>
        )
    }
}



const mapStateToProps = ({ organizations: {teams},  mode: {menu, sidebar}}) => ({
    boards: teams,
    menu: {...menu},
    sidebar: {
        backing: sidebar.backing,
        isPinned: sidebar.isPinned
    }
})

const mapDispatchToProps = (dispatch) => ({
    fetchBoardsAndTeams() {
        return dispatch(BoardActions.fetchBoardsAndTeams())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))