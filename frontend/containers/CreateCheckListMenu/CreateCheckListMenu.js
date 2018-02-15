import React, {Component} from 'react'
import {connect} from 'react-redux'

//components
import FormForEditing from '../../components/FormForEditing/FormForEditing'
//actions
import CardActions from '../../actions/CardAction';

import FP from '../../utils'


class CreateChecklistMenu extends Component {
    state = {
        title: ''
    }

    handleChange = (name) => ({target: {value}}) => this.setState(state => ({[name]: value}))
        
    handleSubmit = (e) => {
        e.preventDefault()

        FP.composition(this)
            .map(( {
                state: {title},
                props: {cardId, create_checklist}
            }) => ({title,cardId,create_checklist}) )
            .fold(({
               title,
               cardId,
               create_checklist 
           }) => create_checklist(cardId, title) )
    }

    get Inputs() {
        return [{
            component: 'input',
            name: 'title',
            field: this.state.title,
            onChange: (e) => this.handleChange('title'),
            label: "Label CheckList"
        }]
    }

    render() {
        const {handleSubmit} = this
        const {close} = this.props
        return (
            <FormForEditing
                method='POST'
                toggle={close}
                hanldeSubmit={handleSubmit}
                handleCancleAction={(e) => {}}
                inputs={this.Inputs}
                actionButtonText='Create Checklsit'  
            />
        )
    }
}

const mapStateToProps = ({
    lists,
    mode: {selected}
}) => ({
    cardId: selected._id
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    create_checklist(cardId, checklist) {
        console.log("create_checklist", cardId, {ownProps})
        dispatch( CardActions.create_checklist(cardId, checklist) )
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChecklistMenu)