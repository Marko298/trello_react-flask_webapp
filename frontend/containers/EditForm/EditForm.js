import React, {Component} from 'react'
import {connect} from 'react-redux'

import './EditForm.css'

//actions
import {toggle_editMode} from '../../actions/EditModeAction'
// import {create_board} from '../../actions/BoardAction'


//components 
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'

//actions
import BoardActions from '../../actions/BoardAction';

class EditForm extends Component {
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
    header = () => {
        return (
            <Wrapper>
                <Row>
                    <Title>Create Board</Title>
                    <Button onClick={this.close}>
                        X (close)
                    </Button>
                </Row>
            </Wrapper>
        )
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState( prevState => ({[name]: value}) )
    }

    close = () => this.props.toggle_editMode()

    create = () => {
        console.log("CREATED")
    }
    componentDidMount() {
        console.log(this.props)
    }
    handleClick = () => {
        const {selected, title} = this.state
        

        const board = {
            boardName: title,
        }

        this.props.create_board(board, selected).then(resp => {
            // console.log({resp})
            if(this.props.isEditBoardShow) {
                console.log("CLOSE EDITMODE")
                this.props.toggle_editMode()
                return
            }
            console.log("THE FORM IS ALREADY CLOSED SO MODE TO THE NEXT STEP —")
            return
        }).then(() => {
            console.log("REDIRECTED")
        })

    }


    render() {
        
        const {selected, title} = this.state
        const {width, top, left, isEditBoardShow, teams} = this.props
        const styles = {width, top, left, display: isEditBoardShow ? 'block' : 'none'}

        return (
            <div className='test-box' style={{...styles}} >
                <Form renderHeader={this.header} method='post'>

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
            </div>
        )
    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.selected._id && nextProps.selected._id) {
            this.setState(prevState => ({selected: nextProps.selected._id}))
        }
    }
}

const mapStateToProps = ({mode, organizations: {teams}}) => ({
    top: mode.top,
    left: mode.left,
    width: mode.width,
    isEditBoardShow: mode.forms.isEditBoardShow,
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
    },
    toggle_editMode() {
        dispatch(toggle_editMode())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditForm)