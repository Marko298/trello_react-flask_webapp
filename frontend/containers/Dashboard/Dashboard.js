import React, {Fragment} from 'react'
import {createPortal} from 'react-dom'
import {Switch, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
//actions
import BoardActions from '../../actions/BoardAction'
import PopupActions from '../../actions/EditModeAction'
//containers
import ToolBar from '../ToolBar/ToolBar'
import Boards from '../Boards/Boards'
import Popup from '../Popup/Popup'
import AddBoardForm from '../AddBoardForm/AddBoardForm'
import SidebarBoards from '../SidebarBoards/SidebarBoards'
import AccountSettingsMenu from '../AccountSettingsMenu/AccountSettingsMenu'
import EditFormOrganization from '../EditFormOrganization/EditFormOrganization'
import EditFormProfile from '../EditFormProfile/EditFormProfile'
import BoardPage from '../BoardPage/BoardPage'
import CardEditingContainer from '../CardEditingContainer/CardEditingContainer'
import ModalWindow from '../ModalWindow/ModalWindow'
import LabelList from '../LabelList/LabelList'
import CreateChecklistMenu from '../CreateChecklistMenu/CreateChecklistMenu'
import CheckToRemoveForm from '../CheckToRemoveForm/CheckToRemoveForm'
import AddTeamForm from '../AddTeamForm/AddTeamForm'
//components
import Row from '../../components/Row/Row'
import Wrapper from '../../components/Wrapper/Wrapper'
import TabRoutes from '../../components/TabRoutes/TabRoutes'
import Button from '../../components/Button/Button'
import CreativeMenu from '../../components/CreativeMenu/CreativeMenu'
import FormForEditing from '../../components/FormForEditing/FormForEditing'
import Information from '../../components/Information/Information'
//HOC's
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
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

    previouseLocation = this.props.location

    componentWillUpdate(nextProps) {
        const {location} = this.props

        if(
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        ) {
            this.previouseLocation = this.props.location
        }
    }

    componentDidCatch(err, info) {
        console.log("componentDidCatch", err, info)
    }
    componentDidMount() {


        document.title = "Dashbaord | Trello" 
        const {boards: propBoards, fetchBoardsAndTeams} = this.props

        propBoards.length === 1
            ? fetchBoardsAndTeams().then(response => {
                // console.log("Response from component", {response})
              })
            : null
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
            isCreativeMenuShow,
            isAccountSettingsMenuShow,
            isLabelListShow,
            isCreateChecklistMenuShow,
            isAllowToRemove
        }, sidebar: {backing, isPinned}, userId, user } = this.props

        const routes = [
            {path: '', title: "Boards"},
            {path: '/members', title: "Members"},
            {path: '/settings', title: "settings"}
        ]

        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previouseLocation !== location
        )

        let notEmptyOrganization = this.props.boards.filter(team => team.boards.length > 0)

        return (
            <Fragment>
                <SidebarBoards>
                    <Boards boards={notEmptyOrganization} important={this.props.important}>
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
                        <Switch location={isModal ? this.previouseLocation : location}>
                            <Route exact path={`${this.props.match.path}`} render={(props) => {
                                const {boards, important} = this.props
                                return (
                                    <Boards boards={boards} important={important} {...props}>
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

                                // <i>We are change location <strong> {board.boardName} </strong> </i>
                                return (
                                    <div style={{position: 'relative', overflowY: 'auto', flexGrow: 1}}> 
                                        <BoardPage board={board} {...props}/>
                                    </div>
                                )
                                
                            }}/>

                            {/* <Route path={`${this.props.match.path}profile/:userId`} render={(props) => {
                                console.log(" <Route path={`${this.props.match.path}profile/:userId`} render={(props)", props)
                                return <h1>profile {props.match.params.userId}</h1>
                            }}/> */}


                            <Route path={`${this.props.match.path}:teamId`} render={(props) => {
                                let foundedTeam = Utils.returnGroupById(boards, props.match.params.teamId)[0]
                                let isProfileEditings = userId === foundedTeam._id

                                let BoardEditing = withToggleBTWComponents(EditFormOrganization)({
                                    FirstComponent: FormForEditing,
                                    SecondComponent: Information
                                })

                                let ProfileEditing = withToggleBTWComponents(EditFormProfile)({
                                    FirstComponent: FormForEditing,
                                    SecondComponent: Information
                                })

                                let {title}  = foundedTeam
                                
                                return (
                                    isProfileEditings 
                                        ? <ProfileEditing title={title} {...user}/> 
                                        : <BoardEditing title={title}/>
                                )

                            }}/>
                        </Switch>

                        {isModal ? <Route path={`/card/:cardId/:listId`} render={(props) => {
                            const {match} = props
                            return createPortal(
                                <ModalWindow {...props}>
                                    {(rest) => <CardEditingContainer match={match} {...rest}/>}
                                </ModalWindow>,
                                document.getElementById('portal')
                            )
                        }}/> : null}


                    </Wrapper> 

                 <Wrapper className='pop-over'>
                    <Popup>
                        <Popup.Menu 
                            title="Create Board"
                            toShow={isCreateBoardFormShow}
                            component={AddBoardForm} 
                            stepBackWithAction={PopupActions.toggle_creative_menu} 
                        />

                        <Popup.Menu 
                            title="Create Team" 
                            toShow={isCreateTeamFormShow} 
                            component={AddTeamForm} 
                            stepBackWithAction={PopupActions.toggle_creative_menu} 
                        />

                        <Popup.Menu 
                            title="Create"
                            toShow={isCreativeMenuShow} 
                            component={CreativeMenu} 
                        />

                        <Popup.Menu 
                            title="Profile Pasha School"
                            toShow={isAccountSettingsMenuShow} 
                            component={AccountSettingsMenu} 
                        />

                        <Popup.Menu 
                            title="Chose the label bro"
                            toShow={isLabelListShow} 
                            component={LabelList} 
                        />

                        <Popup.Menu 
                            title="Create Checklist"
                            toShow={isCreateChecklistMenuShow} 
                            component={CreateChecklistMenu} 
                        />

                        <Popup.Menu 
                            title="Do you really ant to remove it ?"
                            toShow={isAllowToRemove} 
                            component={CheckToRemoveForm} 
                        />
                    </Popup>
                 </Wrapper>
            </Fragment>
        )
    }
}



const mapStateToProps = ({
    user,
    organizations: {teams},
    mode: {menu, sidebar}
}) => ({
    user,
    userId: user.userId,
    boards: teams.map(team => {
        if(team._id === user.userId) {
            return {
                ...team,
                status: "__PRIVATE__"
            }
        } else {
            return {
                ...team,
                status: "__COMAND__"
            }
        }
    }),
    menu: {...menu},
    sidebar: {
        backing: sidebar.backing,
        isPinned: sidebar.isPinned
    },
    important: teams
        .map(team => team.boards
            .filter(board => board.isImportant))
        .filter(b => b && b.hasOwnProperty('length') && b.length > 0)
        .reduce((memo, team) => {
            memo.boards = [...memo.boards ? memo.boards : [], ...team]
            memo.status = '__PRIVATE__'
            memo.title = null
            memo._id = null
            return memo
        }, {})
 
    })
    

    
const mapDispatchToProps = (dispatch) => ({
    fetchBoardsAndTeams() {
        return dispatch(BoardActions.fetchBoardsAndTeams())
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
