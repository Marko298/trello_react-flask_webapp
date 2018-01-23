import React, {Component, Fragment, Children, cloneElement} from 'react'
import {withRouter} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//actions
import PopupActions from '../../actions/EditModeAction'
//components
import TabRoutes from '../../components/TabRoutes/TabRoutes'
//containers
import BoardsList from '../BoardList/BoardList'
import BoardList from '../BoardList/BoardList'
// import EditForm from '../EditForm/EditForm'
import ButtonAddBoard from '../ButtonAddBoard/ButtonAddBoard'
import withEditMode from '../../HOC/withEditMode';




import Button from '../../components/Button/Button'
const actions = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_create_team_form
})
let AddTeamButton = withEditMode(actions)(Button)

class Boards extends Component {

    static Important = function(props) {
       const ImportantGroupBoards = props.boards.filter( ({status}) => status === "__IMPORTANT__")     
       return <BoardsList boardsGroup={ImportantGroupBoards} BoardsList/>
    }

    static Private = function(props) {
        const privateGroup = props.boards.filter( ({status}) => status === "__PRIVATE__")

        return <BoardsList boardsGroup={privateGroup}>
            <ButtonAddBoard>
                Add new Board
            </ButtonAddBoard>
        </BoardsList>
    }

    static Comands = withRouter(function({match ,...props}) {
        const comandsBoards = props.boards.filter( ({status}) => status === "__COMAND__" )

            const routes = [
                {path: '', title: "Boards"},
                {path: '/members', title: "Members"},
                {path: '/account', title: "Account"}
            ]
            
        return <BoardsList  render={(getProps) => (
            <TabRoutes {...getProps()} match={match} routers={routes} />
        )} boardsGroup={comandsBoards}>
            <ButtonAddBoard>
                Add new Board
            </ButtonAddBoard>
        </BoardsList>
        
    })

    static defaultProps = {
        boards: [],
        isLoading: false
    }
    
    create_team = () => {
        console.log("CREATE TEAM FROM BOARDS")

    }
    
    componentWillReceiveProps(nextProps) {
        // console.log("------------------------------------------------")
        // console.log("BoardsList componentWillReceiveProps", {nextProps})
        // console.log("------------------------------------------------")
    }

    componentWillUnmount() {
    }

    renderChildren = (boards) => Children.map(
            this.props.children,
            child => cloneElement(child, {boards})
        )

    render() {
        let styles = {
            position: 'relative',
            overflowY: 'auto'
        }
        const {boards} = this.props

        return (
            <div style={styles}>
                {this.props.isLoading ? "Loading" : null}
                <Fragment>
                    {this.renderChildren(boards)}
                </Fragment>

                <AddTeamButton>
                    Create team
                </AddTeamButton>

            </div>
        )
    }
}

const mapStateToProps = ({organizations: {teams, isLoading}, mode}) => ({
    boards: teams,
    editModIsOn: mode.forms.isPopupShow,
    isLoading
})

export default connect(mapStateToProps)(Boards)

// return (
//     <Item key={_id} title={boardName} r]ender={() => {
//         return (
//             <Input 
//                 type='checkbox' 
//                 name='boardName' 
//                 onChange={(e) => console.log("object")}>
//                 default label
//             </Input>
//         )
//     }}>
//     </Item>
// )}

// renderList = (boards) => {
//     return boards.map(function(board) {
//         return (
//             <div key={board.teamName}>
//                 <h1>{board.teamName}</h1>
//                 <Button>Push me</Button>
//                 <List 
//                     items={board.boards} 
//                     titelsPattern="boardName" 
//                     className="test-list"
//                     render={(props) => {
//                         return <Button  type="radio" {...props({
                           
//                             onClick: () => console.log("from ...props"),
//                             id: "IDDDDDDDD",
//                             className: ["nice-button", "itsok"]
//                         })}>
//                             Best button
//                         </Button>
//                     }}/>

//             </div>
//         )
//     })
// }