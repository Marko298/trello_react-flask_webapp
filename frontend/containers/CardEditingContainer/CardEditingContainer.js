import React, {Component} from 'react'
import {connect} from 'react-redux'
//styles
import './CardEditingContainer.style.css'
//components
import Input from '../Input/Input'
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
import Avatarka from '../../components/Avatarka/Avatarka'
import FormForEditing from '../../components/FormForEditing/FormForEditing'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
import withEditMode from '../../HOC/withEditMode'
//containers
import CommentBox from '../CommentBox/CommentBox'
import AddDescriptionForm from '../../containers/AddDescriptionForm/AddDescriptionForm'
import CommentList from '../CommentList/CommentList'
import CheckList from '../CheckList/CheckList'
//actions
import PopupActions from '../../actions/EditModeAction';
import CommentActions from '../../actions/CommentAction';



const actionsForMenuListLabels = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_menu_labelList
})
let ToggleLabelListBtn = withEditMode(actionsForMenuListLabels)(Button)


const actionForToggleChecklistMenu = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_checklist_menu
})
let ToggleCheckListMenu = withEditMode(actionForToggleChecklistMenu)(Button)





class CardEditingContainer extends Component {
    state = {
        comment: ''
    }

    handleCreateCommentClick = (e) => {
        const {comment} = this.state
        this.props.create_comment(comment)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({[name]: value})
    }


    render() {

        const {list, list: {cards}} = this.props
        const {comment} = this.state
        const {handleChange} = this


        return (
            <div>
                <header>
                    <Title text={list.title} large bold />
                    from list: <Title text={cards.title} medium />
                </header>
                <section className='editing-container'>
                    <div className='editing-left'>
                        <div>
                            <AddDescriptionForm card={cards} description={cards.description}/>
                        </div>
                        <div>
                            <Avatarka />
                            <Textarea
                                placeholder="Write a comment..." 
                                field={comment} 
                                name='comment' 
                                onChange={handleChange}
                              
                            />
                            <div>
                                <div>
                                    {cards.checklists.map(checklist => {
                                        return <CheckList key={checklist._id} {...checklist}/>
                                    })}
                                </div>
                            </div>


                            <Button onClick={this.handleCreateCommentClick}>
                                Create Comment
                            </Button>
                            Comments Component
                        </div>
                        <div>
                            <CommentList>
                                {(commentList) => commentList.map(c => <CommentBox key={c._id} {...c} />)}
                            </CommentList>
                            Activity component
                        </div>
                    </div>

                    <div className='editing-right'>
                        <ToggleLabelListBtn selected={cards}>
                            Add labels
                        </ToggleLabelListBtn>
                        <ToggleCheckListMenu selected={cards}>
                            Add checklist
                        </ToggleCheckListMenu>
                       
                        {/* <Input type='file' name='attachment' handleChange={this.handle_Test}/> */}
                    </div>

                </section>
            </div>
        )
    }
}


// function renderComments(comments) {
//     return comments.map(comment => {
//         return <CommentBox {...comment} />
//     })
// }

const mapStateToProps = ({lists: {boardProject}}, ownProps) => ({
    list: boardProject.lists.map(list => {

        const currentCardId = ownProps.match.params.cardId
        const currentListId = ownProps.match.params.listId
        
        if(list._id === currentListId) {
            return {
                ...list,
                cards: list.cards.filter(card => card._id === currentCardId)[0]
            }
        }
    }).filter(o => o)[0]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    create_comment(description) {

        const {cardId} = ownProps.match.params
        const body = { description }
        
        dispatch( CommentActions.create_comment(body, cardId) )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CardEditingContainer)

