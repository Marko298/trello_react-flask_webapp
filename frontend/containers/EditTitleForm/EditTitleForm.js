import React, {Component, Children, Fragment} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {func} from 'prop-types'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents'
//components
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'

class EditTitleForm extends Component {

    state = { title: this.props.title }

    static defaultProps = {
        title: '',
        presetedTextBtn: '',
        Theme: {},
        handleClick: () => {},
        isLoading: false
    }

    static propTypes = {
        children: func.isRequired
    }

    handleChange = ({ target: {name, value} }) => {
        this.setState(state => ({
            [name] : value
        }))
    }

    handleClick = (e) => {
        const {save_changes} = this.props

        save_changes(this.state.title)

    }

    render() {

        const textForFirstButton = this.props.presetedTextBtn ? this.props.presetedTextBtn : this.state.title
        const {children, Theme: {firstButton, textarea, buttonGroup} } = this.props
        const childProps = {
            forFirst: {
                btnText: textForFirstButton,
                classes: {
                    firstButton
                },
                addonsActionWhileToogling: this.props.handleClick
            },
            forSecond: {
                name: 'title',
                handleChange: this.handleChange,
                field: this.state.title,
                btnText: "Add",
                btnTextSecond: 'X',
                handleClick: this.handleClick,
                addonsActionWhileToogling: this.props.handleClick,
                classes: {textarea, buttonGroup},
                buttonSettings: {
                    success: this.state.title.length, 
                    disabled: this.props.isLoading || !this.state.title.length
                }
            }
        }

        console.log("EdiutingTitleForm", this.props)

        return Children.only(children(childProps))
    }
}


const FirstComponent = ({
    toggle,
    btnText,
    classes: {firstButton},
    addonsActionWhileToogling
}) => {
return (
        <Button onClick={(e) => compose( toggle, addonsActionWhileToogling )() } className={firstButton}>
            {btnText}
        </Button>
    )
}

const SecondComponent = ({
    toggle,
    btnText,
    handleChange,
    name,
    field,
    btnTextSecond,
    handleClick,
    classes: {textarea, buttonGroup},
    addonsActionWhileToogling,
    buttonSettings: {success, disabled}
}) => {
    return (
        <Fragment>
            <Textarea
                className={textarea}
                value={field} 
                onChange={handleChange} 
                name={name} 
            >
                {field}
            </Textarea>
            <div className={buttonGroup}>
                <Button
                    success={success}
                    disabled={disabled}

                    onClick={handleClick}>
                    {btnText}
                </Button>
                <Button
                    onClick={(e) => compose( toggle, addonsActionWhileToogling )()}>
                    <i className="fas fa-times" />
                </Button>
            </div>
        </Fragment>
    )   
}


export default withToggleBTWComponents(EditTitleForm)({
    FirstComponent,
    SecondComponent
})