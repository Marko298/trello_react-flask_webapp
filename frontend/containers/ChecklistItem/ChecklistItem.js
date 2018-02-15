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
        isCompleted: this.props.isCompleted,
        isItemLoading: false
    }


    handleChange = (name) => (e) => {

        this.setState(state => {
            return {
                ...state,
                isCompleted: !state.isCompleted,
                isItemLoading: true
            }
        }, function() {
            this.props.toggle_completed(this.state.isCompleted).then(data => {
                this.setState( (state) => ({...state, isItemLoading: false }) )
            })
        })

    }
    handleClickUpdateTitle = (newTitle) => {
        if(this.props.title !== newTitle && newTitle.length > 0) {
            this.setState( (state) => ({...state, isItemLoading: true }) )
            this.props.update_title(newTitle).then(data => {
                this.setState( (state) => ({...state, isItemLoading: false }) )
            })
        }
    }

    render() {

        const {title} = this.props
        const {handleChange, handleClickUpdateTitle} = this
        const {isCompleted, isItemLoading} = this.state

        const Theme = {
            firstButton: 'add-description__first-btn',
            textarea: 'edit-checklist__textarea',
            buttonGroup: 'edit-checklist__btn-group',
        }

        return (
            <div className='checklist-item'>
                <Input
                    disabled={isItemLoading}
                    readOnly={isItemLoading}
                    type="checkbox"
                    checked={isCompleted}
                    name="isCompleted"
                    handleChange={handleChange}
                />
                <div className='checklist-item__title'>
                    <EditTitleForm
                        btnText="Change title in checklist"
                        Theme={Theme} 
                        isLoading={isItemLoading}
                        title={title} save_changes={handleClickUpdateTitle}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, {_id, checkListId}) => ({
    toggle_completed(isCompleted) {
        return dispatch(
            CardActions.update_item(checkListId, _id, {isCompleted})
        )
    },
    update_title(title) {
        return dispatch( CardActions.update_item(checkListId, _id, {title}) )
    }
})

export default connect(null, mapDispatchToProps)(ChecklistItem)