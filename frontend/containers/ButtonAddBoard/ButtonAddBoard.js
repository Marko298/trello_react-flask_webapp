import React, { Children } from 'react'
import {connect} from 'react-redux'
// HOC
import withEditMode from  '../../HOC/withEditMode'
//components
import Button from '../../components/Button/Button'
//action
import {toggle_editMode} from '../../actions/EditModeAction'


const ButtonAddBoard = (props) => {
    return (
        <Button>
            Add board
        </Button>
    )

}

export default connect(null, {toggle_editMode})(withEditMode(ButtonAddBoard))