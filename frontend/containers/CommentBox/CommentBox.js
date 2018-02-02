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
import CommentActions from '../../actions/CommentAction';

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
            children,
            description,
            timeCreated,
            _id
        } = this.props

        const childProps = {
            forFirst: {
                btnText: "Edit...",
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
                handleClickEditComment
            }
        }

        return (
            <div>
                <Avatarka />
                <Title text={user_name} large bold/>
                <div>
                    {Children.only(children(childProps))}
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
            <Title text={description} medium/>
            <Button onClick={handleRemoveComment}> Delete ... </Button>
            <Button onClick={(e) => toggle()}>
                {btnText}
            </Button>
            <Timestamp time={timeCreated}/>
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
    handleClickEditComment
}) => {
    return (
        <Fragment>
            <Textarea
                value={field} 
                onChange={handleChange(name)} 
                name={name} 
            >
            {field}
            </Textarea>
            <Button
                onClick={handleClickEditComment}>
                {btnText}
            </Button>
            <Button
                onClick={(e) => toggle()}>
                {btnTextSecond}
            </Button>
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