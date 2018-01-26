import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

//components
import Input from '../Input/Input'
import Button from '../../components/Button/Button'

//actions
import ListActions from '../../actions/ListAction'

class AddListForm extends Component {
    state = {
        title: ''
    }
    handleChange = (name) => (e)  => {
        this.setState({
            [name] : e.target.value
        })
    }
    handleClick = (e) => {
        const {title} = this.state

        this.props.create_list(title)
    }
    componentDidMount() {
        console.log("componentDidMount", this.props)
    }

    render() {
        const {title} = this.state
        return (
            <h2>
                <Input name='title' field={title} handleChange={this.handleChange}/>
                <Button onClick={this.handleClick}>
                    AddListForm?
                </Button>
                AddListForm
            </h2>

        )
    }
}

const mapStateToProps = ({lists}) => ({
    list_schema: lists.list_schema
})

const mapDispatchToProps = (dispatch, props) => ({
    create_list(title) {

        console.log({props})
        const data = {title}
        const {boardId} = props.location.state
        
        dispatch(ListActions.create_list(data, boardId))
    }
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddListForm))