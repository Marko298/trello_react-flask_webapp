import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
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

        // title: 'title-for-single-board',
        // isImortant: 'is-important'
        return (
            <li style={{...styleSettings}} className={container}>
                <Link to={{
                    state: {
                        boardId: _id,
                        toolbar_style: {
                            color: styleSettings.backgroundColor
                        }
                    },
                    pathname: `${this.props.match.url}board/${_id}/${reletedTo.teamId}`
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
// {isChecked ? <i className="fas fa-star"></i> : <i className="far fa-star"></i>}
// {
//     isChecked ? <i class="far fa-star"></i> : null
// }

const mapDispatchToProps = (dispatch) => ({
    toggleIsImportant(id, data) {
        dispatch(BoardActions.toggleIsImportant(id, data))
    }
})

// export default connect(null, mapDispatchToProps)(Board)
export default withRouter(connect(null, mapDispatchToProps)(Board))