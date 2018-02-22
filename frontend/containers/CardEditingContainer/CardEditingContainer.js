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
import CommentForm from '../../components/CommentForm/CommentForm'
import Timestamp from '../../components/Timestamp/Timestamp'
import AttachmentFileItem from '../../components/AttachmentFileItem/AttachmentFileItem'
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
import CardActions from '../../actions/CardAction'



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
        comment: '',
        title: this.props.list.cards.title,
        isCommentCreated: false,
        isAttachmentLoading: false,
        isChecklistLoading: false
    }

    componentDidMount() {
        const isAttachmentsExist = this.props.list.cards.attachments.files.length > 0

        if(isAttachmentsExist) {
            this.setState( (state) => ({ ...state,  isAttachmentLoading: true}))
            this.props.get_all_attachmants().then(() => {
                this.setState( (state) => ({ ...state, comment: '', isAttachmentLoading: false }) )
            })
        }

    }

    handleCreateCommentClick = (e) => {
        const {comment} = this.state
        this.setState( (state) => ({ ...state,  isCommentCreated: true}))
        this.props.create_comment(comment).then( () => {
            this.setState( (state) => ({ ...state, comment: '', isCommentCreated: false }))
        })
    }
    
    handleClickRemoveFile = (fileId) => (event) => {
        this.setState( (state) => ({ ...state, isAttachmentLoading: true }) )
        this.props.remove_attachment(fileId).then(() => {
            this.setState( (state) => ({ ...state, isAttachmentLoading: false }) )
        })
    }

    handleClickAssignFile = (file_id) => (e) => {
        this.setState( (state) => ({ ...state, isAttachmentLoading: true }) )
        this.props.assign_file(file_id).then(() => {
            this.setState( (state) => ({ ...state, isAttachmentLoading: false }) )
        })
    }


    _handleChange = (name) => ({ target: {value} }) => this.setState({[name]: value})

    _handleBlur = (e) => {
        if(this.state.title !== this.props.list.cards.title) {
            this.props.update_card({
                title: this.state.title
            }) 
        }
    }

    _handleFileOnChange = (e) => {
        let image = e.target.files[0]
        let data = new FormData(this.form[0])
        data.append('attachment', image)

        this.setState( (state) => ({ ...state, isAttachmentLoading: true }) )
        this.props.upload_attachment_to_card(data).then(resp => {
            this.setState( (state) => ({ ...state, isAttachmentLoading: false }) )
        })
    }

    render() {

        const {list, list: {cards}, userPhoto, userName} = this.props
        const {comment, isAttachmentLoading} = this.state

        const Theme = {
            Description: {
                first_button: 'add-description__first-btn',
                textarea: 'add_description__textarea',
                button_group: 'add-description__btn-group'
            }
        }


        const isObject = Array.isArray(cards.attachments.files) && cards.attachments.files.every(function(a) {
            return typeof a === 'object'
        })

        return (
            <div>
                <header className='container-editing__header'>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#CDD2D4'
                    }}>
                        {cards.attachments.assigned && <div style={{width: '300px'}}>
                            
                            <img src={cards.attachments.assigned} style={{width: '100%'}}/>
                        </div>}
                    </div>
                    
                    <div className='container-editing__header-top'>
                        <i className="fab fa-flipboard" />
                        <Input 
                            name='title' 
                            handleChange={this._handleChange} 
                            field={this.state.title}
                            onBlur={this._handleBlur}
                        />
                    </div>
                    <p className='container-editing__sub-header'>
                        <span> in list: </span>
                        <Title text={list.title} medium />
                    </p>
                </header>

                <section className='editing-container'>
                    <div className='editing-left'>
                        <AddDescriptionForm 
                            card={cards} 
                            description={cards.description} 
                            Theme={Theme.Description}
                        />
                        {isObject && (
                            <div className='attachment-container'>
                                <Title text='Attachment' medium bold color='rgb(51,51,51)'/>
                                {cards.attachments.files.map(fileObj => {
                                    const textForButton = fileObj.file_id === cards.attachments.file_id
                                    return <AttachmentFileItem 
                                        {...fileObj}
                                        disabled={isAttachmentLoading}
                                        textForButton={textForButton} 
                                        handleClickAssignFile={this.handleClickAssignFile}
                                        handleClickRemoveFile={this.handleClickRemoveFile}
                                    />
                                })}
                            </div>
                        )}

                        <div id='checklistwrapper'>
                            <div>
                                {isObject && cards.checklists.map(checklist => {
                                    return <CheckList key={checklist._id} {...checklist}/>
                                })}
                            </div>
                        </div>

                        <Title text='Add comment' medium bold/>
                        <CommentForm 
                            userPhoto={userPhoto}
                            userName={userName}
                            comment={comment}
                            onChange={this._handleChange}
                            handleClick={this.handleCreateCommentClick}
                            disabled={this.state.isCommentCreated}
                        />

                       
                        <div>
                            <CommentList>
                                {(commentList) => commentList.map(c => <CommentBox key={c._id} {...c} />)}
                            </CommentList>
                            Activity component
                        </div>

                    </div>

                    <div className='editing-right'>
                        <Title text="Add" medium bold />
                        <ToggleLabelListBtn selected={cards} >
                            Add labels
                        </ToggleLabelListBtn>
                        <ToggleCheckListMenu selected={cards} >
                            Add checklist
                        </ToggleCheckListMenu>

                        <div className={isAttachmentLoading ? 'on-pending' : null}>
                            <form method='post' ref={node => this.form = node} className='attachment-form button'>
                                <input
                                    disabled={isAttachmentLoading}
                                    className='attachment' 
                                    id="attachment"
                                    type='file' 
                                    name='attachment' 
                                    onChange={this._handleFileOnChange} 
                                    />
                                <label htmlFor="attachment">
                                    Attachment
                                </label>
                            </form>
                        </div>

                    </div>

                </section>
            </div>
        )
    }
}


const mapStateToProps = ({lists: {boardProject}, user}, ownProps) => ({
    list: boardProject.lists.map(list => {

        const currentCardId = ownProps.match.params.cardId
        const currentListId = ownProps.match.params.listId
        
        if(list._id === currentListId) {
            return {
                ...list,
                cards: list.cards.filter(card => card._id === currentCardId)[0]
            }
        }
    }).filter(o => o)[0],
    userPhoto: user.photo,
    userName: user.name
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    create_comment(description) {

        const {cardId} = ownProps.match.params
        const body = { description }
        
        return dispatch( CommentActions.create_comment(body, cardId) )
    },
    update_card(updates) {

        const {cardId} = ownProps.match.params

        dispatch(
            CardActions.update_card(cardId, updates)
        )
    },
    upload_attachment_to_card(file) {
        const {cardId} = ownProps.match.params
        return dispatch( CardActions.add_attachment(cardId, file) )
    },
    get_all_attachmants() {
        
       const {cardId} = ownProps.match.params
       return dispatch(CardActions.get_all_attachments(cardId))
    },
    assign_file(fileId) {
        const {cardId} = ownProps.match.params
        
        return dispatch(CardActions.assign_file(cardId, fileId))
    },
    remove_attachment(file) {
        const {cardId} = ownProps.match.params
        return dispatch( CardActions.remove_attachment(cardId, file) )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CardEditingContainer)

