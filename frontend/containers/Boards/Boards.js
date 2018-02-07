import React, {Component, Fragment, Children, cloneElement} from 'react'
import {withRouter} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//components
import TabRoutes from '../../components/TabRoutes/TabRoutes'
//containers
import BoardsList from '../BoardList/BoardList'
import BoardList from '../BoardList/BoardList'
import ButtonAddBoard from '../ButtonAddBoard/ButtonAddBoard'
import AddTeamButton from '../ButtonAddTeam/ButtonAddTeam'


// export AddTeamButton

class Boards extends Component {

    static Important = function(props) {
        let {important} = props
         
       return <BoardsList title={props.title} boardsGroup={[ important ? important : {} ]} render={props.render}/>
    }

    static Private = function(props) {
        const privateGroup = props.boards.filter( ({status}) => status === "__PRIVATE__")

        return props.withButtonAddBoard !== undefined 
        ? (
            <BoardsList title={props.title} boardsGroup={privateGroup} render={props.render}>
                <ButtonAddBoard>
                    Add new Board
                </ButtonAddBoard>
            </BoardsList>
        )
        : (
            <BoardsList title={props.title} boardsGroup={privateGroup} render={props.render} />
        )
    }

    static Comands = withRouter(function({match ,...props}) {
        const comandsBoards = props.boards.filter( ({status}) => status === "__COMAND__" )

        return comandsBoards.map(board => {
            return props.withButtonAddBoard !== undefined 
            ? (
                <BoardsList 
                    boardsGroup={[board]} 
                    render={props.render}
                >
                    <ButtonAddBoard>
                        Add new Board
                    </ButtonAddBoard>
                </BoardsList>
            )
            : (
                <BoardsList
                    renderChildrenForBoard={props.renderChildrenForBoard} 
                    boardsGroup={[board]} render={props.render} 
                />
            )
        })
    })

    static defaultProps = {
        boards: [],
        isLoading: false
    }
    
    create_team = () => {
        console.log("CREATE TEAM FROM BOARDS")

    }
    
    renderChildren = (boards, important) => Children.map(
            this.props.children,
            child => cloneElement(child, {boards, important})
        )

    render() {
        let styles = {
            position: 'relative',
            overflowY: 'auto'
        }
        const {boards, important} = this.props

        return (
            <div style={styles}>
                {this.props.isLoading ? "Loading" : null}
                <Fragment>
                    {this.renderChildren(boards, important)}
                </Fragment>

                <AddTeamButton>
                    Create team
                </AddTeamButton>

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