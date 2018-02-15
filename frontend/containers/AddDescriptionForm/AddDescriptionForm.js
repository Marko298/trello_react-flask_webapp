import React, {Component, Children, Fragment} from 'react'
import {connect} from 'react-redux'
import {func} from 'prop-types'
//HOC
import withToggleBTWComponents from '../../HOC/withToggleBTWComponents.js'
//components
import Button from '../../components/Button/Button'
import Textarea from '../../components/Textarea/Textarea'
import { prototype } from 'events';

//actions
import ListActions from '../../actions/ListAction';

class AddDescriptionForm extends Component {
    static propTypes = {
        children: func.isRequired,
    }

    static defaultProps = {
        description: '',
        Theme: {}
    }

    state = {
        description: this.props.description || '',
        isLoading: false
    }

   
    handleChange = ({target: {value, name}}) => this.setState(state => ({...state, [name] : value}))

    handleClick = (e) => {
        
        if(this.state.description !== this.props.description) {

            this.setState( (state) => ({...state, isLoading: true}) )

            this.props.add_description(this.state.description).then( (response) => {
                this.setState( (state) => ({ ...state, isLoading: false}) )
            })

        }
    }

    render() {
        
        const { children, description, Theme: {first_button, textarea, button_group} } = this.props
        const {description: stateDescr, isLoading} = this.state
        let titleForDescription = description ? "Edit description" : "Add description"

        const childProps = {
            forFirst: {
                btnText: titleForDescription,
                className: first_button
            },
            forSecond: {
                name: 'description',
                handleChange: this.handleChange,
                field: this.state.description,
                btnText: "Add",
                btnTextSecond: 'X',
                handleClick: this.handleClick,
                classes: {
                    textarea,
                    button_group
                },
                buttonSettings: {
                    success: stateDescr.length,
                    disabled: isLoading
                }
            }
        }
        return Children.only(children(childProps))
    }
}



const FirstComponent = ({
    toggle,
    btnText,
    className
}) => {
    return (
        <Button onClick={(e) => toggle()} className={className}>
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
    classes: {textarea, button_group},
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
            <div className={button_group}>
                <Button
                    success={success}
                    disabled={disabled}
                    onClick={handleClick}>
                    {btnText}
                </Button>
                <Button
                    onClick={(e) => toggle()}>
                    
                    <i className='fas fa-times'/>
                </Button>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    add_description(description) {
        let data = {description}
        let {_id: cardId} = ownProps.card
        return dispatch(ListActions.add_description(cardId, data))
    }
})
export default connect(null, mapDispatchToProps)(withToggleBTWComponents(AddDescriptionForm)({
    FirstComponent,
    SecondComponent
}))