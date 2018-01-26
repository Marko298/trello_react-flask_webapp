import React from 'react'

import PopupActions from '../../actions/EditModeAction'
import withEditMode from '../../HOC/withEditMode';
import Button from '../../components/Button/Button'


const actions = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_create_team_form
})
// let AddTeamButton = withEditMode(actions)(Button)

export default withEditMode(actions)(Button)
