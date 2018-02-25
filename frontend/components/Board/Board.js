import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {Link, withRouter} from 'react-router-dom'
//actions
import {toggleIsImportant} from '../../actions/BoardAction'
import BoardActions from '../../actions/BoardAction'
//components
import Input from '../Input/Input'
import Title from '../Title/Title'
//colors
import {Color} from '../../__asssets/color'
//styles
import './Board.css'

// //DND
// import Type from '../../types'
// import {DragSource} from 'react-dnd'


// const boardTarget = {
//     beginDrag({_id, index}, monitor, component) {
//         console.log("BIGN DROP", {index,_id})

//         return {index,_id}
//     }
// }

// function collect(connect, monitor) {
//     return {
//         connectDragSource: connect.dragSource(),
//         isDragging: monitor.isDragging()
//     }
// }

class Board extends Component {
    state = {
        isChecked: false
    }
    static propTypes = {
        boardName: PropTypes.string.isRequired
    }

    static defaultProps = {
        Theme: {
            container: ''
        }
    }


    componentDidMount() {
        this.setState((prevState) => {
            return {
                isChecked: this.props.isImportant
            }
        })
    }


    toggleCheckbox = (preState) => ({
        ...preState,
        isChecked: !preState.isChecked
    })

    handleChange = (_id) => (e) => {
        this.setState(this.toggleCheckbox)
        let request = { isImportant: !this.state.isChecked}
        this.props.toggleIsImportant(_id, request)

    }
    render() {

        const {
            isImportant, 
            boardName,
            _id, 
            classTheme,
            reletedTo, 
            styleSettings,
            status
        } = this.props

        const {Theme: {container, isImortant, title, SettingBoard}} = this.props
        const {isChecked} = this.state

        // const opacity = isDragging ? 0 : 1
        // ${this.props.match.url}
        return (
            <li style={{...styleSettings}} className={container}>
                <Link to={{
                    state: {
                        boardId: _id,
                        toolbar_style: {
                            color: styleSettings.backgroundColor
                        }
                    },
                    pathname: `/board/${_id}/${reletedTo.teamId}`
                }} >

                    <Title 
                        text={boardName} 
                        medium 
                        color={Color.white} 
                        className={title}
                    />
                   {status && status === '__IMPORTANT__' ? <p> {reletedTo.teamName} </p> : null}
                 
                </Link> 
                <div className={SettingBoard}>
                    <Input
                        className='inp-t'
                        type='checkbox' 
                        name="isImportant"
                        checked={isChecked}
                        onChange={this.handleChange(_id)}
                    >
                        
                    </Input>
                    {this.props.children}
                </div>
            </li>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    toggleIsImportant(id, data) {
        dispatch(BoardActions.toggleIsImportant(id, data))
    }
})



// export default withRouter(
//     connect(null, mapDispatchToProps)(DragSource(Type.BOARD, boardTarget, collect)(Board))
// )

// export default compose(
//     withRouter,
//     DragSource(Type.BOARD, boardTarget, collect),
//     connect(null, mapDispatchToProps)
// )(Board)

export default withRouter(connect(null, mapDispatchToProps)(Board))
