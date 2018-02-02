import React, {Component, Children} from 'react'
import {connect} from 'react-redux'
import {func} from 'prop-types'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
//components
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
//actions
import CardActions from '../../actions/CardAction'

class AddCardForm extends Component {

    state = {title: ''}

    static propTypes = {
        children: func.isRequired
    }

    handleChange = (name) => (e) => this.setState({ [name] : e.target.value })

    handleClick = (e) => {
        this.props.create_card(this.state.title)
    }

    render() {
        const {children} = this.props
        const {title} = this.state

        const propsForChildren = {
            forFirst: {
                btnText: "Add card..."
            },
            forSecond: {
                btnTextFirst: "Add",
                btnTextSecond: "Cancle",
                field: title,
                name: 'title',
                handleChange: this.handleChange,
                handleClick: this.handleClick
            }
        }

        const AddCard = children.call(null, propsForChildren)

        return Children.only(AddCard) 
    }
}

const FirstForm = ({
    toggle,
    btnText,
    ...props
}) => {
    return (
        <Button onClick={(e) => toggle()}>
            {btnText}
        </Button>
    )
}

const SecondForm = ({
    toggle,
    btnTextFirst,
    btnTextSecond,
    field,
    handleChange,
    handleClick,
    name,
    ...props
}) => {
    return ([ 
        <Textarea field={field} name={name} onChange={handleChange(name)} key='textarea'/>,
        <Button onClick={handleClick} key='firstBtn'>
            {btnTextFirst} 
        </Button>,
        <Button onClick={(e) => toggle()} key='secondBtn'>
            {btnTextSecond}
        </Button>,
    ])
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    create_card(title) {
        let {forList, boardId} = ownProps
        let data = {title, boardId}
        dispatch(CardActions.create_card_request(forList, data))
    }
})

export default connect(null, mapDispatchToProps)(
    withToggleBTWComponents(AddCardForm)({
        FirstComponent: FirstForm,
        SecondComponent: SecondForm
    })
)
