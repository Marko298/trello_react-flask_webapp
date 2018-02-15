import React, { Children, Component, Fragment } from 'react'
import {connect} from 'react-redux'
import {func} from 'prop-types'

import Title from '../../components/Title/Title'
import Avatarka from '../../components/Avatarka/Avatarka'
import FormForEditing from '../../components/FormForEditing/FormForEditing'
import Button from '../../components/Button/Button'
import Timestamp from '../../components/Timestamp/Timestamp'

import Textarea from '../../components/Textarea/Textarea'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
import CommentActions from '../../actions/CommentAction'

//styles
import './CommentBox.style.css'

class CommentBox extends Component {
    state = {description: ''}

    componentDidMount() {
        this.setState({
            description: this.props.description
        })
    }

    handleChange = (name) => ({target}) => this.setState(prevState => ({ [name] : target.value }))

    handleClickEditComment = (e) => {
        this.props.edit_comment(this.state.description)
    }
    handleRemoveComment = (e) => {
        this.props.remove_comment()
    }
    render() {

        const {description: descriptionControlled} = this.state
        const {handleRemoveComment, handleClickEditComment} = this

        const {
            user_name,
            user_photo,
            children,
            description,
            timeCreated,
            _id
        } = this.props

        const childProps = {
            forFirst: {
                btnText: "Edit",
                description,
                timeCreated,
                handleRemoveComment
            },
            forSecond: {
                name: 'description',
                handleChange: this.handleChange,
                field: descriptionControlled,
                btnText: "Save",
                btnTextSecond: 'Cancel',
                handleClickEditComment,
                classes: {
                    textarea: 'edit-checklist__textarea',
                    buttonGroup: 'edit-checklist__btn-group',
                }
            }
        }

        // EditTitleForm: {
        //     firstButton: 'add-description__first-btn',

        // }

        return (
            <div className='comment-box'>
                <div className='comment-box__avatar'>
                    <Avatarka src={user_photo} atl={user_name}/>
                </div>
                <div className='comment-box__body'>
                    <div className='comment-box__user-name'>
                        <Title text={user_name} large bold/>
                    </div>
                    <div className='comment-box__description'>
                        {Children.only(children(childProps))}
                    </div>
                </div>
            </div>
        )
    }
} 


const FirstComponent = ({
    toggle,
    btnText,
    description,
    timeCreated,
    handleRemoveComment
}) => {
    return (
        <Fragment>
            <div className='comment-box__text'>
                <Title text={description} medium/>
            </div>
            <div className='comment-box__footer'>
                <Timestamp time={timeCreated}/>
                <Button onClick={handleRemoveComment}> Delete </Button>
                <Button onClick={(e) => toggle()}>
                    {btnText}
                </Button>
            </div>
        </Fragment>
    )
}

const SecondComponent = ({
    toggle,
    btnText,
    handleChange,
    name,
    field,
    btnTextSecond,
    handleClickEditComment,
    classes: {textarea, buttonGroup}
}) => {
    return (
        <Fragment>
            <Textarea
                className={textarea}
                value={field} 
                onChange={handleChange(name)} 
                name={name} 
            >
            {field}
            </Textarea>
            <div className={buttonGroup}>
                <Button
                    success={true}
                    onClick={handleClickEditComment}>
                    {btnText}
                </Button>
                <Button
                    onClick={(e) => toggle()}>
                    {btnTextSecond}
                </Button>
            </div>
        </Fragment>
    )
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    edit_comment(description) {
        const {_id} = ownProps
        dispatch( CommentActions.edit_comment(_id, description) )
    },
    remove_comment() {
        const {_id} = ownProps
        dispatch( CommentActions.remove_comment(_id) )
    }
})

export default connect(null, mapDispatchToProps)(
    withToggleBTWComponents(CommentBox)({
    FirstComponent,
    SecondComponent
}))