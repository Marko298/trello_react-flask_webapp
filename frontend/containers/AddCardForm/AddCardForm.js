import React, {Component, Children, Fragment} from 'react'
import {connect} from 'react-redux'
import {func} from 'prop-types'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
//components
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
//actions
import CardActions from '../../actions/CardAction'

import './AddCardForm.style.css'

class AddCardForm extends Component {
    state = {title: ''}
    static propTypes = {
        children: func.isRequired
    }

    handleChange = (name) => ({target: {value} }) => this.setState({ [name] : value })

    handleClick = (e) => {
        const {title} = this.state

        if(title.length > 0) {
            this.props.create_card(title)
            this.setState({
                title: ''
            })

        }
    }

    render() {
        const {children, isListOending} = this.props
        const {title} = this.state

        const propsForChildren = {
            forFirst: {
                btnText: "Add card...",
                buttonSettings: {
                    disabled: isListOending
                }
            },
            forSecond: {
                btnTextFirst: "Add",
                btnTextSecond: "Cancle",
                field: title,
                name: 'title',
                handleChange: this.handleChange,
                handleClick: this.handleClick,
                buttonSettings: {
                    success: this.state.title.length > 0,
                    disabled: !this.state.title.length
                }
            }
        }

        const AddCard = children.call(null, propsForChildren)

        return Children.only(AddCard) 
    }
}

const FirstForm = ({
    toggle,
    btnText,
    buttonSettings: {disabled},
    ...props
}) => {
    return (
        <div className='add-card-form-first'>
            <Button onClick={(e) => toggle()} disabled={disabled}>
                {btnText}
            </Button>
        </div>
    )
}

const SecondForm = ({
    toggle,
    btnTextFirst,
    btnTextSecond,
    field,
    handleChange,
    handleClick,
    buttonSettings: {success, disabled},
    name,
    ...props
}) => {
    return ( 
        <div className='add-card-form-second'>
            <Textarea field={field} name={name} onChange={handleChange(name)} />
            <div className='add-card-form-second__btn-group'>
                <Button onClick={handleClick} success={success} disabled={disabled}>
                    {btnTextFirst} 
                </Button>
                <Button onClick={(e) => toggle()} >
                    <i className="fas fa-times" />
                </Button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch, {forList, boardId}) => ({
    create_card(title) {
        let data = {title, boardId}
        return dispatch(CardActions.create_card_request(forList, data))
    }
})

export default connect(null, mapDispatchToProps)(
    withToggleBTWComponents(AddCardForm)({
        FirstComponent: FirstForm,
        SecondComponent: SecondForm
    })
)
