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
        description: ''
    }

    state = {
        description: this.props.description
    }

    // componentDidMount() {
    //     if(this.props.description.length > 0) {
    //         this.setState(prevState => {
    //             return {
    //                 ...prevState,
    //                 description: this.props.description
    //             }
    //         })
    //     }
    // }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({[name] : value})
    }

    handleClick = (e) => {
        this.props.add_description(this.state.description)
    }

    render() {
        const {children, description} = this.props
        let titleForDescription = description ? "Edit description" : "Add description"

        const childProps = {
            forFirst: {
                btnText: titleForDescription,
            },
            forSecond: {
                name: 'description',
                handleChange: this.handleChange,
                field: this.state.description,
                btnText: "Add",
                btnTextSecond: 'X',
                handleClick: this.handleClick
            }
        }
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

const mapDispatchToProps = (dispatch, ownProps) => ({
    add_description(description) {
        let data = {description}
        let {_id: cardId} = ownProps.card
        dispatch(ListActions.add_description(cardId, data))
    }
})
export default connect(null, mapDispatchToProps)(withToggleBTWComponents(AddDescriptionForm)({
    FirstComponent,
    SecondComponent
}))