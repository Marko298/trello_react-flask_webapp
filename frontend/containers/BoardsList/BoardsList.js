import React, {Component} from 'react'

import {connect} from 'react-redux'

class BoardsList extends Component {
    static defaultProps = {
        boards: []
    }
    componentWillReceiveProps(nextProps) {
        console.log("------------------------------------------------")
        console.log("BoardsList componentWillReceiveProps", {nextProps})
        console.log("------------------------------------------------")
    }

    componentDidMount() {
        console.log("componentDidMount BoardsList")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount BoardsList")
    }
    renderList = (boards) => {
        return boards.map(function(board) {
            return (
                <div key={board.teamName}>
                    <h1>{board.teamName}</h1>
                    <ul>
                        {board.boards.map(b => (
                            <li key={b._id} style={{backgroundColor: b.isImportant ? '#eeeeee' : '#efefef'}}>
                                {b.boardName}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        })
    }
    render() {
        const {boards} = this.props
        return (
            <div>
                {boards[0].teamName === '' 
                    ? (<h2> Loading ... </h2>)
                    : this.renderList(boards)
                }
            </div>
        )
     
    }
}


function mapStateToProps(state) {
    return {
        boards: state.boards
    }
}
export default connect(mapStateToProps)(BoardsList)