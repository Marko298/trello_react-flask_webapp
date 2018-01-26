import React from 'react'

import withEditMode from '../../HOC/withEditMode'
import Button from '../Button/Button'
import PopupActions from '../../actions/EditModeAction'

// import ButtonAddBoard from '../../containers/ButtonAddBoard/ButtonAddBoard'
// import ButtonAddTeam from '../../containers/ButtonAddTeam/ButtonAddTeam'

const actionsForTeam = () => ({
    menu: PopupActions.toggle_create_team_form
})
const actionsForBoard = () => ({
    menu: PopupActions.toggle_create_board_form
})


let ButtonAddTeam = withEditMode(actionsForTeam)(Button)
let ButtonAddBoard = withEditMode(actionsForBoard)(Button)



export default function CreativeMenu() {
    return (
        <div className="CreativeMenu">
            <ButtonAddBoard>
                Add Board
            </ButtonAddBoard>
            <ButtonAddTeam>
                Add Team
            </ButtonAddTeam>
        </div>
    )
}