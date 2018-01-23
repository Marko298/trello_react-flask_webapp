import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
            <li style={{margin: '20px 0', ...styleSettings}}>
                <div>
                    <Title text={boardName} medium color={Color.white}/>
                    <div>
                        <Input
                            type='checkbox' 
                            name="isImportant"
                            checked={isChecked}
                            onChange={this.handleChange(_id)}
                            >
                        </Input>
                        {this.props.children}
                    </div>
                    <p>{isImportant ? teamName : null}</p>
                </div>
            </li>
        )
    }
}


Board.propTypes = {
    boardName: PropTypes.string.isRequired
}

const mapDispatchToProps = (dispatch) => ({
    toggleIsImportant(id, data) {
        dispatch(BoardActions.toggleIsImportant(id, data))
    }
})

export default connect(null, mapDispatchToProps)(Board)