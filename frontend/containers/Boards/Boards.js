import React, {Component, Fragment, Children, cloneElement} from 'react'
import {withRouter} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//components
import TabRoutes from '../../components/TabRoutes/TabRoutes'
import Button from '../../components/Button/Button'
//containers
import BoardsList from '../BoardList/BoardList'
import BoardList from '../BoardList/BoardList'
import EditForm from '../EditForm/EditForm'

//HOC
import withEditMode from '../../HOC/withEditMode'


class Boards extends Component {

    static Important = function(props) {
       const ImportantGroupBoards = props.boards.filter( ({status}) => status === "__IMPORTANT__")

       let ButtonAddBoard = withEditMode(Button)
       
       return <BoardsList boardsGroup={ImportantGroupBoards}>
                    {str => (
                            <ButtonAddBoard onClick={(e) => {
                                console.log("CLICKed", str)
                                }}>
                                Add new Board 
                            </ButtonAddBoard>
                        )
                    }
                </BoardsList>
    }

    static Private = function(props) {
        const privateGroup = props.boards.filter( ({status}) => status === "__PRIVATE__")
        let ButtonAddBoard = withEditMode(Button)

        return <BoardsList boardsGroup={privateGroup}>
            <ButtonAddBoard onClick={(e) => {
                console.log("CLICKed")
            }}>
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

        let ButtonAddBoard = withEditMode(Button)

        return <BoardsList  render={(getProps) => <TabRoutes {...getProps({
            defaultProps: "just test props"
        })} match={match} routers={routes} />} boardsGroup={comandsBoards}>
         <ButtonAddBoard onClick={(e) => {
                console.log("CLICKed")
            }}>
                Add new Board
            </ButtonAddBoard>
        </BoardsList>
        
    })

    static defaultProps = {
        boards: [],
    }

    
    componentWillReceiveProps(nextProps) {
        // console.log("------------------------------------------------")
        // console.log("BoardsList componentWillReceiveProps", {nextProps})
        // console.log("------------------------------------------------")
    }

    componentDidMount() {
        // console.log(this.props)
        // console.log("componentDidMount BoardsList")
    }

    renderChildren = (boards) => Children.map(
            this.props.children,
            child => cloneElement(child, {boards})
        )

    render() {
        const {boards} = this.props

        return (
            <Fragment>
                {this.renderChildren(boards)}
            </Fragment>
        )
    }
}

const mapStateToProps = ({boardsGroup: boards}) => ({boards})

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