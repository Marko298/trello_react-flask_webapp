import React, {Component} from 'react'
import {connect} from 'react-redux'

//components
import Input from '../Input/Input'
import Title from '../../components/Title/Title'
//contaienrs
import EditTitleForm from '../EditTitleForm/EditTitleForm'
//actions
import CardActions from '../../actions/CardAction';
import './ChecklistItem.style.css'
{/* <EditTitleForm title={title} save_changes={handleClickSaveChanges}/> */}
class ChecklistItem extends Component {
    state = {
        isCompleted: false
    }

    componentDidMount() {
        this.setState(state => ({isCompleted: this.props.isCompleted}))
    }

    handleChange = (name) => (e) => {

        this.setState(state => {
            return {
                ...state,
                isCompleted: !state.isCompleted
            }
        }, function() {
            this.props.toggle_completed(this.state.isCompleted)
        })

    }
    handleClickUpdateTitle = (newTitle) => {
        if(this.props.title !== newTitle && newTitle.length > 0) {
            this.props.update_title(newTitle)
        }
    }

    render() {

        const {title} = this.props
        const {handleChange, handleClickUpdateTitle} = this
        const {isCompleted} = this.state

        return (
            <div className='checklist-item'>
                <Input
                    type="checkbox"
                    checked={isCompleted}
                    name="isCompleted"
                    handleChange={handleChange}
                />
                <EditTitleForm title={title} save_changes={handleClickUpdateTitle}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, {_id, checkListId}) => ({
    toggle_completed(isCompleted) {
        dispatch(
            CardActions.update_item(checkListId, _id, {isCompleted})
        )
    },
    update_title(title) {
        dispatch(
            CardActions.update_item(checkListId, _id, {title})
        )
    }
})

export default connect(null, mapDispatchToProps)(ChecklistItem)