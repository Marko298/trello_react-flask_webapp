import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
//actions
import BoardActions from '../../actions/BoardAction';

class UpdateBoardNameForm extends Component {
    state = {
        boardName: this.props.boardName
    }
    static defaultProps = {
        boardName: ''
    }

    _handleChange = ({target}) => {
        let {name, value} = target

        this.setState(state => ({
            ...state,
            [name] : value
        }))
    }
    _handleClick = (e) => {

        this.props.update_board(
            this.props.boardId,
            {boardName: this.state.boardName}
        )

    }

    get _buttonSettings () {
        console.log(this.props)
        return {
            success: this.state.boardName.length && !this.props.isUpdated,
            disabled: this.props.isUpdated || !this.state.boardName.length
        }
    }
    render() {
        return (
            <Fragment>
                <Input 
                    name="boardName"
                    value={this.state.boardName} 
                    onChange={this._handleChange}
                />
                <Button {...this._buttonSettings} onClick={this._handleClick}>
                    change name
                </Button>
            </Fragment>
        )
    }
}

const mapStateToProps = ({mode: {selected, menu}, organizations}) => ({
    boardId: selected._id,
    boardName: selected.boardName,
    isUpdated: organizations.isBoardUpdating
})

const mapDispatchToProps = (dispatch) => ({
    update_board(boardId, updates) {
        dispatch(
            BoardActions.update_board(boardId, updates)
        )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBoardNameForm)
