import React, {Component} from 'react'
import { connect } from "react-redux"

import Input from '../Input/Input'
//components
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

//containers
import ChecklistItem from '../ChecklistItem/ChecklistItem'
import EditTitleForm from '../EditTitleForm/EditTitleForm'
//stylrs
import './CheckList.style.css'
//actions
import CardActions from '../../actions/CardAction';
import PopupActions from '../../actions/EditModeAction'
// HOC
import withEditMode from '../../HOC/withEditMode' 



const actionToRemove = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_allow_remove
})
let RemoveItem = withEditMode(actionToRemove)(Button)

class CheckList extends Component {
    state = {
        title: '',
        showButton: true,
        isCheckListUpdated: false
    }   
    
    handleAddItem = (e) => {
        if(this.state.length !== 0) {
            this.setState( (state) => ({...state, isCheckListUpdated: true }) )
            this.props.add_item(this.state.title).then( (resp) => {
                this.setState( (state) => ({ ...state, isCheckListUpdated: false}) )
            }) 
        }
    }

    handleClickSaveChanges = (newTitle) => {
        if(newTitle !== this.props.title && newTitle.length > 0) {
            this.setState( (state) => ({...state, isCheckListUpdated: true }) )
            this.props.update_checklist(newTitle).then( (resp) => {
                this.setState( (state) => ({ ...state, isCheckListUpdated: false }) )
            }) 
        }
    }

    handleChange = (name) => ({target}) => this.setState(state => ({...state, [name]: target.value}))
    
    calculateProgress = (items) => {

        let result = items.reduce(function(memo, {isCompleted}){
            if(isCompleted) {
                memo['is_completed'] = memo['is_completed'] ? memo['is_completed'] + 1 : 1
            }
            if(!isCompleted) {
                memo['not_completed'] = memo['not_completed'] ? memo['not_completed'] + 1 : 1
            }
            return memo
        },{})

        return result

    }
    _hideDeleteButton = () => this.setState( (state) => ({...state, showButton: !state.showButton }))
       
    render() {

        const {title, items, _id, add_item} = this.props
        const {
            handleDeleteChecklist, 
            handleAddItem, 
            handleChange, 
            handleClickSaveChanges,
            calculateProgress
        } = this
        const {title: stateTitle, showButton, isCheckListUpdated} = this.state

        const Theme = {
            firstButton: 'edit-checklist__title',
            textarea: 'edit-checklist__textarea',
            buttonGroup: 'edit-checklist__btn-group',
            EditTitleForm: {
                firstButton: 'add-description__first-btn',
                textarea: 'edit-checklist__textarea',
                buttonGroup: 'edit-checklist__btn-group',
            }
        }

        return (
            <div className='checklist'>
                <div className='checklist__header'>
                    <div className='checklist__title' style={{
                        width: !showButton ? 'calc(100% - 40px)' : 'auto', 
                        marginLeft: !showButton ? '40px' : 'none'
                        }}
                    >
                        <EditTitleForm
                            isLoading={isCheckListUpdated}
                            Theme={Theme} 
                            title={title} 
                            save_changes={handleClickSaveChanges} 
                            handleClick={this._hideDeleteButton}
                        />
                    </div>
                    {showButton && 
                        <div className='checklist_controll-group'>
                            <RemoveItem selected={_id}>
                                <Title text="Remove" medium tiny/>
                            </RemoveItem>
                        </div>
                    }
                    
                    <ProgressBar plottProgress={calculateProgress(items)}/>
                </div>
                <ul style={{marginLeft: '40px'}}>
                    {items.map(item => {
                        return (
                            <li key={item._id}>
                                <ChecklistItem checkListId={_id} {...item}/>
                            </li>
                        )
                    })}
                </ul>

                <div style={{marginLeft: '40px'}}>
                    <EditTitleForm
                        isLoading={isCheckListUpdated}
                        Theme={Theme.EditTitleForm} 
                        presetedTextBtn="add item button..." 
                        title={stateTitle} 
                        save_changes={handleAddItem}
                    />
                </div>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, {_id}) => ({
    add_item(title) {
        return dispatch( CardActions.add_item(_id, title) )
    },
    update_checklist(title) {
        return dispatch( CardActions.update_checklist(_id, {title}) )
    }
})

export default connect(
    null,
    mapDispatchToProps
)(CheckList)