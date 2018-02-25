import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import {Switch, Route, withRouter, Link} from 'react-router-dom'

import {connect} from 'react-redux'

//components
import Avatarka from '../../components/Avatarka/Avatarka'
import TabRoutes from '../../components/TabRoutes/TabRoutes'
import UploadImageForm from '../../components/UploadImageForm/UploadImageForm'
import Title from '../../components/Title/Title'
//actions
import UserActions from '../../actions/UserAction';
//styles
import './EditProfile.style.css'

function Circle() {
    return (
        <div style={{width:'90px', height: '90px', backgroundColor: 'red', borderRadius: "50%"}}>
                            </div>
    )
}



{/* <form method='post' ref={n => this.form = n} onSubmit={this.handleSubmit}>
<input type='file' name='img' onChange={this.handleChangeImage}/>
<button type='submit'>
    submit
</button>
</form> */}

class EditFormProfile extends Component {
    static routes = [
        {path: '', title: "Profile"},
        {path: '/cards', title: "Cards"},
        {path: '/settings', title: "Settings"}
    ]
    state = {
        fullName: this.props.title,
        initials: this.props.initials,
        bio: this.props.bio,
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

        this.setState(state => ({image}), function() {
            console.log("WE ARE TRY TO UPLOAD")
            let data = new FormData(this.form[0])
            data.append('photo', this.state.image)
            this.props.upload_photo(data)

        })
    }
    
    handleSubmit = (e) => {
    //    e.preventDefault();
    //    let data = new FormData(this.form[0])
    //    data.append('photo', this.state.image)
    //    this.props.upload_photo(data)

    }

    _update_user_data = (event) => {
        event.preventDefault()

        this.props.update_user({
            name: this.state.name,
            bio: this.state.bio,
            initials: this.state.initials
        })

    }

    render() {

        const {InputsSchema, handleChange} = this
        const {
            children, 
            title, 
            photo, 
            match,
            match: {params}, 
            isDataUpdateRequestDone, 
            bio,
            teams
        } = this.props

        const propsForChildren = {
            forSecond: {
                title: title,
                paragraph: bio,
                handleCancleAction: () => {},
                buttonText: "Edit Profile"
            },
            forFirst: {
                inputs: InputsSchema,
                buttonSettings: {
                    disabled: isDataUpdateRequestDone,
                    success: !isDataUpdateRequestDone
                },
                hanldeSubmit: this._update_user_data,
                handleCancleAction: () => {}
            }
        }
        const Theme = {
            container: 'tab-routes-edit',
            button: 'tab-routes-edit__button'
        }
        return (
            <div style={{position: 'relative', overflowY: 'auto', flexGrow: 1}}>
                <div className="edit-form-wrapper">
                    <div className='edit-form-container'>
                        
                       <div className='left-column'>
                            {/* <Circle /> */}
                            <Avatarka src={photo} alt={title} medium className='edit-avatar-image'> 
                                <UploadImageForm
                                    handleSubmit={this.handleSubmit}
                                    handleChangeImage={this.handleChangeImage}
                                    innerRef={n => this.form = n}
                                />
                            </Avatarka>
                            {isDataUpdateRequestDone && "Loading bro... have to wait a bit"}
                            
                        </div>
                        <div className='right-column'>
                            {Children.only(children(propsForChildren))}
                        </div>
                    </div>
                </div>

                <TabRoutes
                    Theme={Theme} 
                    match={match} 
                    routers={EditFormProfile.routes} 
                    exact
                    active='selected-tab-link'
                >
                    <Switch>

                        <Route path={`/${params.teamId}/cards`} render={(props) => {
                            console.log({props})
                            return (
                                <div>Cards</div>
                            )
                        }}/>

                        <Route path={`/${params.teamId}/settings`} render={(props) => {
                            return (
                                <div>settings</div>
                            )
                        }}/>

                        <Route path={`/${params.teamId}`} render={(props) => {
                            return (
                                <div>
                                    <Title text='Team' bold medium/>
                                    <div>
                                        {teams.map( ({_id, title}) => 
                                            <Link to={_id} key={_id}>
                                                {title}
                                            </Link>
                                        )}
                                    </div>
                                    
                                </div>
                            )
                        }}/> 

                    </Switch>
                </TabRoutes>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    upload_photo(photo) {
        dispatch(
            UserActions.change_photo(photo)
        )
    },
    update_user(updates) {
        dispatch(
            UserActions.update_user(updates)
        )
    }
})

const mapStateToProps = ({user, organizations: {teams} }) => ({
    isDataUpdateRequestDone: user.isDataUpdateRequest,
    initials: user.initials,
    bio: user.bio,
    teams: teams.filter(team => team._id !== user.userId)
})
// export default EditFormProfile
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFormProfile))