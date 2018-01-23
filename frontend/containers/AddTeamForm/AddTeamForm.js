import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

//components 
import Form from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Title from '../../components/Title/Title'
import Wrapper from '../../components/Wrapper/Wrapper'
import Row from '../../components/Row/Row'

//actions
import BoardActions from '../../actions/BoardAction';

//containers
import Popup from '../Popup/Popup'

class AddBoardTeam extends Component {
   
    static defaultProps = {
        selected: {},
        isLoading: false
    }

    state = {
        title: "",
        description: "",
        selected: {}
    }

    handleChange = (e) => {
        let { name, value } = e.target
        this.setState( prevState => ({[name]: value}) )
    }



    handleClick = () => {
      const {title} = this.state

      const teamSchema = {
        teamName: title
      }

      this.props.create_team(teamSchema)

    }

    componentWillReceiveProps(nextProps) {
        console.log("AddBoardTeam componentWillReceiveProps", nextProps, this.props)
    }

    render() {

        const {selected, title, description} = this.state

        return (
            <Form method='post'>

                <Input name="title" value={title} onChange={this.handleChange}>
                    team name: 
                </Input>
                <textarea name="description" onChange={this.handleChange} value={description}/>
        
                <Button onClick={this.handleClick}>
                    create team
                </Button>

            </Form>
        )
    }

}

const mapStateToProps = ({mode}) => ({
    isLoading: mode.isTeamCreatingLoading
})

const mapDispatchToProps = (dispatch) => ({
    create_team(team){
        dispatch(BoardActions.create_team(team))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBoardTeam)