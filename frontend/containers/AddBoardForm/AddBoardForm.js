import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

import './AddBoardForm.css'

//actions
// import PopupActions from '../../actions/EditModeAction'

//components 
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'

//actions
import BoardActions from '../../actions/BoardAction';

//containers
import Popup from '../Popup/Popup'

class AddBoardForm extends Component {
    static defaultProps = {
        teams: [
            { 
                title: "",
                _id: ""
            }
        ],
        selected: {
            title: '',
            _id: ''
        }
    }
    state = {
        title: '',
        selected: ''
    }
   

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState( prevState => ({[name]: value}) )
    }



    handleClick = () => {
        const {selected, title} = this.state
        const {create_board, toggle} = this.props
        const boardSchema = {
            boardName: title,
        }

        create_board(boardSchema, selected).then(resp => {
            // if(isEditBoardShow) {
            //     toggle()
            // }
            return resp
        }).then((resp) => {
            const {history, match} = this.props
            history.push(
                `${match.url}board/${resp._id}/${resp.reletedTo.teamId}`,
                {boardId: resp._id}
            )
        })

    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.selected._id && nextProps.selected._id) {
            this.setState(prevState => ({selected: nextProps.selected._id}))
        }
    }
    componentDidMount() {
        if(this.props.selected._id && !this.state.selected) {
            this.setState(prevState => ({selected: this.props.selected._id}))
        }
    }

    render() {

        console.log(this.props)
        
        const {selected, title} = this.state
        const {teams} = this.props
        // const styles = {width, top, left, display: isEditBoardShow ? 'block' : 'none'}

        return (
            <Form method='post'>

                <Input name="title" value={title} onChange={this.handleChange}>
                    Title: 
                </Input>
        
                <select name="selected" onChange={this.handleChange} >
                    { teams.map(team => {
                        return (
                            <option key={team._id} value={team._id} selected={
                                selected === team._id ? team.title : ''
                            }>{team.title}</option>
                        )
                    }) }
                </select>

                <Button onClick={this.handleClick}>
                    create
                </Button>

            </Form>
        )
    }

}

const mapStateToProps = ({mode, organizations: {teams}}) => ({
    teams: teams.map((group) => {
        if(group.title !== "__PRIVATE__" && group.title !== "__IMPORTANT__") {
            return {title: group.title, _id: group._id}
        }
    }).filter(b => b),
    selected: mode.selected
})

const mapDispatchToProps = (dispatch) => ({
    create_board(board, teamId) {
        return dispatch(BoardActions.create_board(board, teamId))
    }
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBoardForm))