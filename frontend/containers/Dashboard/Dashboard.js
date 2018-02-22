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
import ProgressBar from '../ProgressBar/ProgressBar'
import UpdateBoardNameForm from '../UpdateBoardNameForm/UpdateBoardNameForm'
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
        <i className="fas fa-times" />
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
            isAllowToRemove,
            isUpdateBoardNameMenuShow
        }, sidebar: {backing, isPinned}, 
        userId, user, withOverlayScene, progress, isFileUploaded} = this.props

        const routes = [
            {path: '', title: "Boards", icon: "fab fa-flipboard"},
            {path: '/members', title: "Members", icon: "fas fa-users"},
            {path: '/settings', title: "settings", icon: "fas fa-cogs"}
        ]

        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previouseLocation !== location
        )

        let notEmptyOrganization = this.props.boards.filter(team => team.boards.length > 0)
        const ThemeSidebar = {
            titleWrapper: "title-dashboard-boardlist sidebar",
            title: {
                medium: true
            },
            // BoardsLine: "container-boardlist",
            // RoutesLine: {
            //     button: "route-button",
            //     container: 'route-container'
            // },
            // BoardList: 'board-list-container',
            SingleBoard: {
                container: 'single-board sidebar-board',
                // title: 'title-for-single-board',
                // isImortant: 'is-important',
                SettingBoard: "board-input-container"
            }
        }
        return (
            <Fragment>
                <SidebarBoards>
                    <Boards 
                        withAddTeamButton={false} 
                        boards={notEmptyOrganization} 
                        important={this.props.important} 
                        Theme={ThemeSidebar}
                    >
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
                       <ProgressBar progress={progress} isLoaded={isFileUploaded}/>
                        <Switch location={isModal ? this.previouseLocation : location}>
                            <Route exact path={`${this.props.match.path}`} render={(props) => {
                                const Theme = {
                                    titleWrapper: "title-dashboard-boardlist",
                                    BoardsLine: "container-boardlist",
                                    RoutesLine: {
                                        button: "route-button",
                                        container: 'route-container'
                                    },
                                    BoardList: 'board-list-container',
                                    SingleBoard: {
                                        container: 'single-board',
                                        title: 'title-for-single-board',
                                        isImortant: 'is-important',
                                    }
                                }
                                const {boards, important} = this.props
                                return (
                                    <Boards boards={boards} important={important} {...props} Theme={Theme}>
                                        <Boards.Important title="Starred Boards"/>
                                        <Boards.Private withButtonAddBoard title="Personal Boards"/>
                                        <Boards.Comands withButtonAddBoard render={(getProps) => (
                                            <TabRoutes {...getProps()} match={match} routers={routes} Theme={Theme.RoutesLine}/>
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


                            <Route path={`${this.props.match.path}:teamId`} render={(props) => {
                                let foundedTeam = Utils.returnGroupById(boards, props.match.params.teamId)[0]
                                console.log({foundedTeam}, this.props.user)
                                let isProfileEditings = userId === (foundedTeam ? foundedTeam._id : userId)

                                let BoardEditing = withToggleBTWComponents(EditFormOrganization)({
                                    FirstComponent: FormForEditing,
                                    SecondComponent: Information
                                })
                                

                                let ProfileEditing = withToggleBTWComponents(EditFormProfile)({
                                    FirstComponent: FormForEditing,
                                    SecondComponent: Information
                                })


                                let title  = foundedTeam ? foundedTeam.title : this.props.user.name
                                
                                return (
                                    isProfileEditings 
                                        ? <ProfileEditing title={title} {...user}/> 
                                        : <BoardEditing title={title} {...foundedTeam}/>
                                )

                            }}/>
                        </Switch>

                        {isModal ? <Route path={`/card/:cardId/:listId`} render={(props) => {
                            const {match} = props
                            let div = document.createElement('div').setAttribute('id', 'portal')

                            return (
                                <ModalWindow {...props}>
                                    {(rest) => <CardEditingContainer match={match} {...rest}/>}
                                </ModalWindow>
                            )
                        }}/> : null}


                    </Wrapper> 

                 <Wrapper className={withOverlayScene ? 'pop-over overlay' : 'pop-over' }>
                    <Popup>
                        <Popup.Menu
                            withHeader={false}
                            withOverlay
                            title="Create Board"
                            toShow={isCreateBoardFormShow}
                            component={AddBoardForm} 
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

                        <Popup.Menu 
                            title="Change board name"
                            toShow={isUpdateBoardNameMenuShow} 
                            component={UpdateBoardNameForm} 
                        />
                    </Popup>
                 </Wrapper>
            </Fragment>
        )
    }
}



const mapStateToProps = ({
    tools,
    user,
    organizations: {teams},
    mode: {menu, sidebar, withOverlayScene}
}) => ({
    progress: tools.uploadingProgress,
    isFileUploaded: tools.isFileStartUpload,
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
    withOverlayScene: withOverlayScene,
    important: teams
        .map(team => team.boards
            .filter(board => board.isImportant))
        .filter(b => b && b.hasOwnProperty('length') && b.length > 0)
        .reduce((memo, team) => {
            memo.boards = [...memo.boards ? memo.boards : [], ...team]
            memo.status = '__IMPORTANT__'
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

// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
