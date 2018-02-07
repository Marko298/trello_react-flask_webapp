import React, {Component, Children, Fragment} from 'react'
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
        presetedTextBtn: ''
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

        const childProps = {
            forFirst: {
                btnText: textForFirstButton,
            },
            forSecond: {
                name: 'title',
                handleChange: this.handleChange,
                field: this.state.title,
                btnText: "Add",
                btnTextSecond: 'X',
                handleClick: this.handleClick
            }
        }

        const {children} = this.props

        return Children.only(children(childProps))
    }
}


const FirstComponent = ({
    toggle,
    btnText,
}) => {
return (
        <Button onClick={(e) => toggle()}>
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
    handleClick
}) => {
    return (
        <Fragment>
            <Textarea
                value={field} 
                onChange={handleChange} 
                name={name} 
            >
            {field}
            </Textarea>
            <Button
                onClick={handleClick}>
                {btnText}
            </Button>
            <Button
                onClick={(e) => toggle()}>
                {btnTextSecond}
            </Button>
        </Fragment>
    )   
}


export default withToggleBTWComponents(EditTitleForm)({
    FirstComponent,
    SecondComponent
})