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
import ColorBox from '../../components/ColorBox/ColorBox'

//actions
import BoardActions from '../../actions/BoardAction';

//containers
import Popup from '../Popup/Popup'
import PopupActions from '../../actions/EditModeAction';

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
        selected: '',
        bacground: '#e91e63',
        isBoardCreating: false
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState( prevState => ({...prevState, [name]: value}), () => {
            console.log("Yehhoo", this.state.selected)
        } )
    }

    handleClick = () => {
        const {selected, title, bacground} = this.state
        const {create_board, toggle, userId} = this.props
        const selectedDefault = selected.length === 0 ? selected : userId

        const boardSchema = {
            boardName: title,
            styleSettings: {
                backgroundColor: bacground
            }
        }

        this.setState( (state) => ({...state, isBoardCreating: true}) )

        create_board(boardSchema, selectedDefault).then(resp => {
            this.setState( (state) => ({...state, isBoardCreating: false}) )
            // if(isEditBoardShow) {
            //     toggle()
            // }
            return resp
        }).then((resp) => {
            const {history, match} = this.props
            history.push(
                `${match.url}board/${resp._id}/${resp.reletedTo.teamId}`,
                {
                    boardId: resp._id,
                    toolbar_style: {
                        color: resp.styleSettings.backgroundColor
                    }
                }
            )
        })

    }

    componentWillReceiveProps(nextProps) {
        if(!this.props.selected && nextProps.selected) {
            this.setState(prevState => ({...prevState, selected: nextProps.selected}))
        }
    }
    componentDidMount() {
        if(this.props.selected && !this.state.selected) {
            this.setState(prevState => ({...prevState, selected: this.props.selected}))
        }
    }

    handleChangeColor = ({color}) => (e) => {

        this.setState((state) => {
            return {
                ...state,
                bacground: color
            }
        })

    }

    _close_menu = (e) => {
        const {isPopupShow, withOverlayScene} = this.props
        isPopupShow && this.props.close_menu()
        withOverlayScene &&  this.props.close_overlay()
    }

    _renderDropDown = () => {
        const {selected, teams, userId} = this.props
        const selectedIsString = typeof selected === 'string'
        // const selectedIsObject = typeof selected === 'object'

        if(selectedIsString && Object.keys(selected).length === 0) {
            return teams.map( ({
                _id,
                title,
            }) => {
                return (
                    <option key={_id} value={_id} selected={userId === _id}>
                        {title}
                    </option>
                )
            })
        }

        return teams.map(team => {
            return (
                <option key={team._id} value={team._id} selected={
                    selected === team._id ? team.title : ''
                }>{team.title}</option>
            )
        })
    }

    render() {

        const backgrounds = [
            '#e91e63',
            '#4a148c',
            '#5e35b1',
            '#448aff',
            '#03a9f4',
            '#0097a7',
            '#4db6ac',
            '#2e7d32',
        ]
        
        const {selected, title, bacground, isBoardCreating} = this.state
        const {teams} = this.props

        const foDisabled = (isBoardCreating || !title.length)

        return (
            <div className='add-board-container '>
                <div className='add-board-form'>
                    <Form method='post'>
                        <div className="form-input-board" style={{backgroundColor: bacground || 'none'}}>

                            <div className='form-fieldset'>
                                <Input
                                    autocomplete='off' 
                                    name="title" 
                                    value={title} 
                                    onChange={this.handleChange} 
                                    className='add-board-label'
                                    placeholder="Title for board ..."
                                />

                                <Button onClick={this._close_menu}>
                                    <i className='fas fa-times'/>
                                </Button>
                            </div>

                            <div className='form-fieldset '>
                                <select name="selected" onChange={this.handleChange} className="select-drop-down" >
                                    {this._renderDropDown()}
                                </select>
                            </div>
                        </div>
                        <div className='form-fieldset '>
                            <Button onClick={this.handleClick} disabled={foDisabled} success={!!title.length}>
                                create
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='background-list'>
                    {backgrounds.map((color, idx) => {
                        return (
                            <ColorBox key={idx} selectedLabels={bacground} color={color} className="small" handleClick={this.handleChangeColor}/>
                        )
                    })}
                    <div className='small-button'>
                        <i className='fas fa-ellipsis-h' />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({mode, organizations: {teams}, user: {userId} }) => ({
    teams: teams.map((group) => {
        if(group.title !== "__PRIVATE__" && group.title !== "__IMPORTANT__") {
            return {title: group.title, _id: group._id}
        }
    }).filter(b => b),
    selected: mode.selected,
    withOverlayScene: mode.withOverlayScene,
    isPopupShow: mode.forms.isPopupShow,
    userId
})

const mapDispatchToProps = (dispatch) => ({
    create_board(board, teamId) {
        return dispatch(BoardActions.create_board(board, teamId))
    },
    close_menu() {
        dispatch(PopupActions.toggle_editMode())
    },
    close_overlay() {
        dispatch(PopupActions.toggle_overlay())
    }
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBoardForm))