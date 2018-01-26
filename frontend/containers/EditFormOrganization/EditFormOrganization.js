import React, {Component, Children} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

//components
// import FormForEditing from '../../components/FormForEditing/FormForEditing'
import Avatarka from '../../components/Avatarka/Avatarka'
import TabRoutes from '../../components/TabRoutes/TabRoutes'



class EditFormOrganization extends Component {
    static routes = [
        {path: '', title: "Boards"},
        {path: '/members', title: "Members"},
        {path: '/settings', title: "Settings"}
    ]

    state = {
        name: this.props.title,
        website: '',
        description: ''
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
                name: "name",
                field: this.state.name,
                onChange: this.handleChange,
                label: "Team name"
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
                name: "description",
                field: this.state.description,
                onChange: this.handleChange,
                label: 'Description'
            }
        ]
    }

    componentDidMount() {
        console.log("componentDidMount", this.props)
    }

    render() {
        const {InputsSchema, handleChange} = this
        const {children, title} = this.props

        console.log("this.props", this.props)

        const propsForChildren = {
            forFirst: {
                inputs: InputsSchema,
                hanldeSubmit: () => {},
                handleCancleAction: () => {}
            },
            forSecond: {
                title: title,
                paragraph: ": some text",
                handleCancleAction: () => {},
                buttonText: "Edit Team Profile"
            }
        }

        const {match, match: {params}} = this.props

        return (
            <div>
                <Avatarka/>
                 {Children.only(children(propsForChildren))}
                 <div>
                    <TabRoutes match={match} routers={EditFormOrganization.routes} >
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
                                    <div>Board</div>
                                )
                            }}/>

                        </Switch>
                    </TabRoutes>
                 </div>
            </div>
        )
    }
}

export default withRouter(EditFormOrganization)