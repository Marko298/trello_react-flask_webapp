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

class Board extends Component {
    state = {
        isChecked: false
    }
    static propTypes = {
        boardName: PropTypes.string.isRequired
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

        
        const {isImportant, boardName, teamName, _id, reletedTo, classTheme, styleSettings} = this.props
        const {isChecked} = this.state

        return (
            <li style={{margin: '20px 0', ...styleSettings}} className='li-t'>
                <Link to={{
                    state: {
                        boardId: _id
                    },
                    pathname: `${this.props.match.url}board/${_id}/${reletedTo.teamId}`
                }} >
                    <Title text={boardName} medium color={Color.white}/>
                    <p>{isImportant ? teamName : null}</p>
                </Link> 
                    <div>
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

export default withRouter(connect(null, mapDispatchToProps)(Board))