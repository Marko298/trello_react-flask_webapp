import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'

//components
// import FormForEditing from '../../components/FormForEditing/FormForEditing'
import Avatarka from '../../components/Avatarka/Avatarka'
import UserActions from '../../actions/UserAction';


class EditFormProfile extends Component {
    state = {
        fullName: this.props.title,
        initials: '',
        bio: '',
        image: this.props.photo || ''
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

    handleChangeImage = (e) => {
        let image = e.target.files[0]

        this.setState(state => ({image}), () => console.log(this.state.image))
    }
    
    handleSubmit = (e) => {
        e.preventDefault();

       let data = new FormData(this.form[0])

       data.append('photo', this.state.image)

       console.log("form is submitted")
       this.props.upload_photo(data)

    }


    render() {
        const {InputsSchema, handleChange} = this
        const {children, title, photo} = this.props

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
            <div style={{position: 'relative', overflowY: 'auto', flexGrow: 1}}>
                <Avatarka src={photo} alt={title}/>
                <form method='post' ref={n => this.form = n} onSubmit={this.handleSubmit}>
                    <input type='file' name='img' onChange={this.handleChangeImage}/>
                    <button type='submit'>
                        submit
                    </button>
                </form>
                 {Children.only(children(propsForChildren))}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    upload_photo(photo) {
        console.log("The photo from upload photo—action", {photo})
        dispatch(
            UserActions.change_photo(photo)
        )
    }
})
// export default EditFormProfile
export default connect(null, mapDispatchToProps)(EditFormProfile)