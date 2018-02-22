import React, {Component, Fragment, Children, cloneElement} from 'react'
import {withRouter} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//components
import TabRoutes from '../../components/TabRoutes/TabRoutes'
import Title from '../../components/Title/Title'
//containers
import BoardsList from '../BoardList/BoardList'
import BoardList from '../BoardList/BoardList'
import ButtonAddBoard from '../ButtonAddBoard/ButtonAddBoard'
import AddTeamButton from '../ButtonAddTeam/ButtonAddTeam'
//icons




import './Boards.style.css'

class Boards extends Component {

    static Important = function(props) {
        let {important} = props
        const isHasBoards = important && important.boards && important.boards.hasOwnProperty('length') && important.boards.length > 0
        
        return isHasBoards
            ? <BoardsList
                status="__IMPORTANT__" 
                title={props.title} 
                boardsGroup={[ important ? important : {} ]} 
                render={props.render} 
                Theme={props.Theme}
             /> 
             :  null
    }

    static Private = function(props) {
        const privateGroup = props.boards.filter( ({status}) => status === "__PRIVATE__")
        const isHasPrivateBoards = privateGroup[0] && privateGroup[0].boards.length > 0

        return isHasPrivateBoards
            ?  props.withButtonAddBoard !== undefined 
                ? (
                    <BoardsList 
                        title={props.title} 
                        boardsGroup={privateGroup} 
                        render={props.render}
                        Theme={props.Theme}
                    >
                        <ButtonAddBoard customTop={50} justifyContanteCenter={true} customWidth={415}>
                            Add new Board
                        </ButtonAddBoard>
                    </BoardsList>
                )
                : (
                    <BoardsList 
                        title={props.title} 
                        boardsGroup={privateGroup} 
                        render={props.render}
                        Theme={props.Theme}
                    />

                )
            : null
    }

    static Comands = withRouter(function({match ,...props}) {
        const comandsBoards = props.boards.filter( ({status}) => status === "__COMAND__" )

        return comandsBoards.map(board => {
            return props.withButtonAddBoard !== undefined 
            ? (
                <BoardsList
                    boardsGroup={[board]} 
                    render={props.render}
                    Theme={props.Theme}
                >
                    <ButtonAddBoard customTop={50} justifyContanteCenter={true} customWidth={415}>
                        Add new Board
                    </ButtonAddBoard>
                </BoardsList>
            )
            : (
                <BoardsList
                    renderChildrenForBoard={props.renderChildrenForBoard} 
                    boardsGroup={[board]} render={props.render} 
                    Theme={props.Theme}
                />
            )
        })
    })

    static defaultProps = {
        boards: [],
        isLoading: false,
        Theme: {},
        withAddTeamButton: true
    }
    
    create_team = () => {
        console.log("CREATE TEAM FROM BOARDS")

    }
    
    renderChildren = (boards, important, Theme) => 
        Children.map(this.props.children,
            child => cloneElement(child, {boards, important, Theme})
        )

    render() {
       
        const {boards, important, Theme, withAddTeamButton} = this.props

        return (
            <div className='boards-container'>
                {this.props.isLoading ? "Loading" : null}
                <Fragment>
                    {this.renderChildren(boards, important, Theme)}
                </Fragment>
                {withAddTeamButton && <AddTeamButton><Title text="Create new team" underline medium tiny/></AddTeamButton>}
            </div>
        )
    }
}

const mapStateToProps = ({organizations: {isLoading}, mode}) => ({
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