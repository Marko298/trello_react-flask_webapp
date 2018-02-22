import React, {Component, Children, Fragment} from 'react'
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

import './AddListForm.style.css'

class AddListForm extends Component {
    static defaultProps = {
        disabled: false
    }
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
                className: 'add-listform__toggle-btn',
                buttonSettings: {
                    disabled: this.props.disabled
                }
            },
            forSecond: {
                title,
                inputName: 'title',
                handleChange,
                handleClick,
                firstBtnText: "Cancel",
                secondBtnText: "Add",
                classes: {
                    inputClass: 'add-listform__input',
                    btnGroup: 'add-listform__btn-group',
                    wrapper: 'add-listform__wrapper'
                }
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
    btnText,
    className,
    buttonSettings: {disabled}
}) => (
    <Button disabled={disabled} className={className} onClick={(e) => {
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
    classes: {inputClass, btnGroup, wrapper},
    ...props
}) => (
    <div className={wrapper}>
        <Input
            className={inputClass} 
            name={inputName} 
            field={title} 
            handleChange={handleChange}
            key='input'
            />
        <div className={btnGroup}>
            <Button onClick={handleClick}  success>
                {secondBtnText}
            </Button>
            <Button onClick={(e) => toggle()} >
                <i className="fas fa-times" /> 
            </Button>
        </div>
    </div>

)


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)
    (withToggleBTWComponents(AddListForm)({
        FirstComponent: FirstForm,
        SecondComponent: SecondForm
    }))
)