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
import TabRoutes from '../../components/TabRoutes/TabRoutes'
import Button from '../../components/Button/Button'
import CreativeMenu from '../../components/CreativeMenu/CreativeMenu'

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


const ToggleListButton = (props) => (
    <Button onClick={props.toggleList} className='sidebar-button-collapse'>
        {props.isShow ? "-" : "+"}
    </Button>
)

const RemoveBoard = (props) => (
    <Button onClick={(e) => props.removeBoard(props._id)}>
        X
    </Button>
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

        console.log("this.props.important()", this.props.important)


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

    // render={(getProps) => (
    //     <TabRoutes {...getProps()} match={match} routers={routes} />
    // )} 
    // renderChildrenForBoard={(getProps) => <Button {...getProps()}> X </Button>} 
    render() {
        const { location, match, boards } = this.props
        const {menu: {
            isCreateBoardFormShow,
            isCreateTeamFormShow,
            isCreativeMenuShow
        }, sidebar: {backing, isPinned} } = this.props

        const routes = [
            {path: '', title: "Boards"},
            {path: '/members', title: "Members"},
            {path: '/account', title: "Account"}
        ]

        return (
            <Fragment>
                <SidebarBoards>
                    <Boards boards={this.props.notEmptyBoards}>
                        <Boards.Important
                            title="Starred Boards" 
                            render={(getProps) => (
                                <ToggleListButton {...getProps()} />
                            )}
                        />
                        <Boards.Private 
                            title="Personal Boards" 
                            render={(getProps) => (
                                <ToggleListButton {...getProps()} />
                            )}
                        />
                        <Boards.Comands
                            renderChildrenForBoard={(getProps) => <RemoveBoard {...getProps()} />}
                            render={(getProps) => (
                                <ToggleListButton {...getProps()} />
                            )}
                        />
                    </Boards>
                </SidebarBoards>
                    <Wrapper style={Dashboard.styles({isPinned, backing})}> 
                        <ToolBar/>
                        <Switch>
                            <Route exact path={`${this.props.match.path}`} render={(props) => {
                                return (
                                    <Boards boards={this.props.boards} {...props}>
                                        <Boards.Important title="Starred Boards"/>
                                        <Boards.Private withButtonAddBoard title="Personal Boards"/>
                                        <Boards.Comands withButtonAddBoard render={(getProps) => (
                                            <TabRoutes {...getProps()} match={match} routers={routes} />
                                        )} />
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
                                console.log({foundedTeam})
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

                        <Popup.Menu 
                            title="Create" 
                            toShow={isCreativeMenuShow} 
                            component={CreativeMenu} 
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
    },
    notEmptyBoards: teams.filter(team => team.boards.length > 0),
    important: teams.map(team => {
            if(team.status === "__IMPORTANT__") {
                return
            }

            return team.boards.filter(board => board.isImportant)
        }).filter(b => b && b.hasOwnProperty('length') && b.length > 0)
})

const mapDispatchToProps = (dispatch) => ({
    fetchBoardsAndTeams() {
        return dispatch(BoardActions.fetchBoardsAndTeams())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))