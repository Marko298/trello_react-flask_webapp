import React, {Component} from 'react'
import {connect} from 'react-redux'
//components
import Button from '../../components/Button/Button'
//actions
import CardActions from '../../actions/CardAction'


function CheckToRemoveForm({selected, close, delete_checklist}) {

    const handleClick = (e) => {
        delete_checklist(selected)
            .then(() => close())
    }

    return (
        <Button onClick={handleClick}>
            REMOVE
        </Button>
    )
}

const mapSstateToProps = ({mode}) => ({
    selected: mode.selected
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    delete_checklist(_id) {
        console.log({_id})
        return dispatch(
            CardActions.remove_checklist(_id)
        )
    }
})

export default connect(mapSstateToProps, mapDispatchToProps)(CheckToRemoveForm)