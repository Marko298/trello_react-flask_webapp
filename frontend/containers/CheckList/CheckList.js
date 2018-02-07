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
        title: ''
    }
    
    handleAddItem = (e) => {
        if(this.state.length !== 0) {
            this.props.add_item(this.state.title)
        }
    }

    handleClickSaveChanges = (newTitle) => {
        if(newTitle !== this.props.title && newTitle.length > 0) {
            this.props.update_checklist(newTitle)
        }
    }

    handleChange = (name) => ({target}) => this.setState(state => ({[name]: target.value}))
    
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
    render() {

        const {title, items, _id, add_item} = this.props
        const {
            handleDeleteChecklist, 
            handleAddItem, 
            handleChange, 
            handleClickSaveChanges,
            calculateProgress
        } = this
        const {title: stateTitle} = this.state

        return (
            <div className='border-bottom'>
                <ProgressBar plottProgress={calculateProgress(items)}/>
                <ul>
                    {items.map(item => {
                        return (
                            <li key={item._id}>
                                <ChecklistItem checkListId={_id} {...item}/>
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <RemoveItem selected={_id}>
                        Delte item...
                    </RemoveItem>
                </div>

                <EditTitleForm title={title} save_changes={handleClickSaveChanges}/>

                <EditTitleForm presetedTextBtn="add item button..." title={stateTitle} save_changes={add_item}/>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, {_id}) => ({
    add_item(title) {
        dispatch(
            CardActions.add_item(_id, title)
        )
    },
    update_checklist(title) {
        dispatch(
            CardActions.update_checklist(_id, {title})
        )
    }
})

export default connect(
    null,
    mapDispatchToProps
)(CheckList)