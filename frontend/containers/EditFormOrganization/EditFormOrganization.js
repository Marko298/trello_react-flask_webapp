import React, {Component, Children} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
//components
import Avatarka from '../../components/Avatarka/Avatarka'
import TabRoutes from '../../components/TabRoutes/TabRoutes'
import BoardActions from '../../actions/BoardAction';
import UploadImageForm from '../../components/UploadImageForm/UploadImageForm'
import Board from '../../components/Board/Board'
import ListBoardsOfTeam from '../../components/ListBoardsOfTeam/ListBoardsOfTeam'
//containers
import ButtonAddBoard from '../ButtonAddBoard/ButtonAddBoard'
//styles
import './EditFormOrganization.style.css'

class EditFormOrganization extends Component {
    static routes = [
        {path: '', title: "Boards"},
        {path: '/members', title: "Members"},
        {path: '/settings', title: "Settings"}
    ]

    state = {
        teamName: this.props.title,
        website: this.props.website,
        descrition: this.props.descrition,
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
                name: "teamName",
                field: this.state.teamName,
                onChange: this.handleChange,
                label: "Team teamName"
            },
            {
                component: 'input',
                name: "website",
                field: this.state.website,
                onChange: this.handleChange,
                label: 'Website'
            },
            {
                component: 'textarea',
                name: "descrition",
                field: this.state.descrition,
                onChange: this.handleChange,
                label: 'Description'
            }
        ]
    }

   _handleSubmit = (e) => {
        e.preventDefault()

        this.props.update_team({
            teamName: this.state.teamName,
            website: this.state.website,
            descrition: this.state.descrition
        })
   }

   handleChangeImage = (e) => {
       e.preventDefault()

       let image = e.target.files[0]

        this.setState(state => ({image}), function() {
            console.log("WE ARE TRY TO UPLOAD")
            let data = new FormData(this.form[0])
            data.append('photo', this.state.image)
            this.props.upload_photo(data)

        })
   }
   renderChildren = (teamId) => {
        const boards = this.props.boards.filter(board => {
            if(board._id === teamId) return board
        })
        return Children.map(this.props.children, child => {
            return cloneElement(child, {selected: boards[0]})
        })
    }

    render() {
        const {InputsSchema, handleChange} = this
        const {children, title, photo, isTeamEditingRequestDone} = this.props

        const propsForChildren = {
            forFirst: {
                inputs: InputsSchema,
                buttonSettings: {
                    disabled: isTeamEditingRequestDone,
                    success: !isTeamEditingRequestDone
                },
                hanldeSubmit: this._handleSubmit,
                handleCancleAction: () => {}
            },
            forSecond: {
                title: title,
                paragraph: ": some text",
                handleCancleAction: () => {},
                buttonText: "Edit Team Profile"
            }
        }

        const {match, match: {params}, boards} = this.props
        const Theme = {
            container: 'tab-routes-edit',
            button: 'tab-routes-edit__button',
            SingleBoard: {
                container: 'single-board',
                title: 'title-for-single-board',
                isImortant: 'is-important',
            },
            BoardsLine: "container-boardlist",
        }

        return (
            <div style={{position: 'relative', overflowY: 'auto', flexGrow: 1}}>
                <div className="edit-form-wrapper">
                    <div className='edit-form-container'>
                        <div className='left-column'>

                            <Avatarka src={photo} alt={title} medium className='edit-avatar-image'> 
                                <UploadImageForm
                                    handleChangeImage={this.handleChangeImage}
                                    innerRef={n => this.form = n}
                                />
                            </Avatarka>

                            {this.props.isTeamEditingRequestDone && "Loading..."}
                        </div>
                        <div className='right-column'>
                            {Children.only(children(propsForChildren))}
                        </div>
                    </div>
                </div>
                 <div>
                    <TabRoutes 
                        Theme={Theme} 
                        exact
                        active='selected-tab-link' 
                        match={match} 
                        routers={EditFormOrganization.routes} 
                    >
                        <Switch>

                            <Route path={`/${params.teamId}/members`} render={(props) => {
                                console.log({props})
                                return (
                                    <div>Members</div>
                                )
                            }}/>

                            <Route path={`/${params.teamId}/settings`} render={(props) => {
                                return (
                                    <div>settings</div>
                                )
                            }}/>

                            <Route path={`/${params.teamId}`} render={(props) => {
                                return (
                                    <div className='edit-form-organization-boards'>
                                        <ListBoardsOfTeam 
                                            boards={boards}
                                            BoardsLine={Theme.BoardsLine}
                                            SingleBoard={Theme.SingleBoard}
                                            status=" "
                                            renderChildren={this.renderChildren}
                                            propsCollection={() => {}}
                                            renderChildrenForBoard={() => {}}
                                        >
                                            <ButtonAddBoard customTop={50} justifyContanteCenter={true} customWidth={415}>
                                                Add new Board
                                            </ButtonAddBoard>
                                        </ListBoardsOfTeam>
                                    </div>
                                )
                            }}/>

                        </Switch>
                    </TabRoutes>
                 </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    update_team(updates) {
        const {_id} = props
        dispatch(
            BoardActions.update_team(_id, updates)
        )
    },
    upload_photo(photo) {
        const {_id} = props

        dispatch(
            BoardActions.upload_image(_id, photo)
        )
    }
})

const mapStateToProps = ({organizations}, props) => ({
    isTeamEditingRequestDone: organizations.isTeamEditingRequestDone,
    boards: organizations.teams.map( team => {
        if ( team._id === props._id ) {
            return team.boards
        }
        return
    }).filter(o => o)[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditFormOrganization))