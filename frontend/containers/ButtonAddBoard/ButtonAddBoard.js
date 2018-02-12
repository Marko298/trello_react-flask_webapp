import React, { Children } from 'react'
// import {connect} from 'react-redux'
// HOC
import withEditMode from  '../../HOC/withEditMode'
//components
import Button from '../../components/Button/Button'
//action
import Popup from '../../actions/EditModeAction'


const ButtonAddBoard = ({children}) => {
    return (
        <Button >
            {children ? children : ` Add board`}
        </Button>
    )

}

const actions = () => ({
    toggle: Popup.toggle_editMode,
    menu: Popup.toggle_create_board_form
})

// const mapDispatchToProps = (dispatch) => ({
//     toggle_editMode() {
//         dispatch(Popup.toggle_editMode())
//     }
// })

// export default withEditMode(Popup.toggle_editMode)(ButtonAddBoard)
export default withEditMode(actions)(ButtonAddBoard)