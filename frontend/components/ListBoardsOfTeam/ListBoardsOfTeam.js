import React, {Fragment, Children, cloneElement} from 'react'

//components
import List from '../Lists/Lists'
import Board from '../Board/Board'


// const renderChildren = (teamId, boards, children) => {
//     const boards = boards.filter(board => {
//         if(board._id === teamId) return board
//     })
//     return Children.map(children, child => {
//         return cloneElement(child, {selected: boards[0]})
//     })
// }

// // const ListBoardsOfTeam = ({
// //     BoardsLine,
// //     SingleBoard,
// //     boards,
// //     status,
// //     propsCollection,
// //     renderChildren,
// //     team_id,
// //     ...props
// // }) => (
   
// // )

class ListBoardsOfTeam extends React.Component {

    renderChildren = (teamId) => {
        const boards = this.props.boards.filter(board => {
            if(board._id === teamId) return board
        })
        return Children.map(this.props.children, child => {
            return cloneElement(child, {selected: boards[0]})
        })
    }

    render() {
        const {
            BoardsLine,
            SingleBoard,
            boards,
            status,
            propsCollection,
            renderChildren,
            team_id,
        } = this.props
        return (
            <List  className={BoardsLine}>
                <Fragment>
                    {boards.map( (board, idx) => (
                            <Board
                                moveBoard={() => {}}
                                index={idx}
                                status={status}
                                Theme={SingleBoard}
                                {...board} 
                                key={`${board._id}_${idx}`}
                            >
                                {this.props.renderChildrenForBoard(propsCollection(board._id))}
                            </Board>
                        ))
                    }
                </Fragment>
                {this.props.children && <li className='single-board button-board'>{this.renderChildren(team_id)}</li> }
            </List>
        )
    }
}

export default ListBoardsOfTeam