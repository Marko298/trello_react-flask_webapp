import React, {Component, Children} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {func} from 'prop-types'
//components
import Input from '../Input/Input'
import Button from '../../components/Button/Button'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
//actions
import ListActions from '../../actions/ListAction'

class AddListForm extends Component {
    static propTypes = {
        children: func.isRequired
    }
    state = {title: ''}

    handleChange = (name) => (e) => this.setState({ [name] :  e.target.value})

    handleClick = (e) => {
        const {title} = this.state
        this.props.create_list(title)
    }

    render() {
        const {title} = this.state
        const {children} = this.props
        const {handleChange, handleClick} = this

        const propsForChildren = {
            forFirst: {
                btnText: "Create list...",
            },
            forSecond: {
                title,
                inputName: 'title',
                handleChange,
                handleClick,
                firstBtnText: "Cancel",
                secondBtnText: "Add"
            }
        }

        const AddList = children.call(null, propsForChildren)

        return Children.only(AddList)
    }
}

const mapStateToProps = ({lists}) => ({
    list_schema: lists.list_schema
})

const mapDispatchToProps = (dispatch, props) => ({
    create_list(title) {
        const data = {title}
        const {boardId} = props.location.state
        dispatch(ListActions.create_list(data, boardId))
    }
})

const FirstForm = ({
    toggle,
    btnText
}) => (
    <Button onClick={(e) => {
        toggle()
    }}>
        {btnText}
    </Button>
)

const SecondForm = ({
    toggle,
    firstBtnText,
    secondBtnText,
    handleChange,
    handleClick,
    title,
    inputName,
    ...props
}) => (
    [
        <Input 
            name={inputName} 
            field={title} 
            handleChange={handleChange}
            key='input'
        />,
        <Button onClick={(e) => toggle()} key='firstButton'>
            {firstBtnText}
        </Button>,
        <Button onClick={handleClick} key='secondButton'>
            {secondBtnText}
        </Button>
    ]

)


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)
    (withToggleBTWComponents(AddListForm)({
        FirstComponent: FirstForm,
        SecondComponent: SecondForm
    }))
)