import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'

//components
// import FormForEditing from '../../components/FormForEditing/FormForEditing'
import Avatarka from '../../components/Avatarka/Avatarka'



class EditFormProfile extends Component {
    state = {
        fullName: this.props.title,
        initials: '',
        bio: ''
    }
    handleChange = (name) => (e) => {
        this.setState({
            [name] : e.target.value
        })
    }
    static propTypes = {
        children: PropTypes.func.isRequired
    }
    get InputsSchema() {
        return [
            {
                component: 'input',
                name: "fullName",
                field: this.state.fullName,
                onChange: this.handleChange,
                label: "Full name"
            },
            {
                component: 'input',
                name: "initials",
                field: this.state.initials,
                onChange: this.handleChange,
                label: 'Initials'
            },
            {
                component: 'textarea',
                name: "bio",
                field: this.state.bio,
                onChange: this.handleChange,
                label: 'Bio'
            }
        ]
    }


    render() {
        const {InputsSchema, handleChange} = this
        const {children, title} = this.props

        const propsForChildren = {
            forFirst: {
                inputs: InputsSchema,
                hanldeSubmit: () => {},
                handleCancleAction: () => {}
            },
            forSecond: {
                title: title,
                paragraph: ": bio",
                handleCancleAction: () => {},
                buttonText: "Edit Profile"
            }
        }
        return (
            <div>
                <Avatarka/>
                 {Children.only(children(propsForChildren))}
            </div>
        )
    }
}

export default EditFormProfile