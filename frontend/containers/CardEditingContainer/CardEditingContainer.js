import React, {Component} from 'react'
import {connect} from 'react-redux'
//styles
import './CardEditingContainer.style.css'
//components
import Title from '../../components/Title/Title'
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
import Avatarka from '../../components/Avatarka/Avatarka'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
import withEditMode from '../../HOC/withEditMode'
//containers
import CommentBox from '../CommentBox/CommentBox'
import AddDescriptionForm from '../../containers/AddDescriptionForm/AddDescriptionForm'
import CommentList from '../CommentList/CommentList'
//actions
import PopupActions from '../../actions/EditModeAction';
import CommentActions from '../../actions/CommentAction';



const actionsForMenuListLabels = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_menu_labelList
})
let ToggleLabelListBtn = withEditMode(actionsForMenuListLabels)(Button)



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
                                style={{
                                    padding: '20px',
                                    width: '400px',
                                    fontSize: '24px',
                                    height: '150px'
                                }}
                            />
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

