import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//action
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Row from '../../components/Row/Row'
import withEditMode from '../../HOC/withEditMode'
//styles
import './ToolBar.style.css'

const actionsForCreativeMenu = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_creative_menu
})
let CreativeMenu = withEditMode(actionsForCreativeMenu)(Button)

const actionsForAccountSettingsMenu = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_account_settings_menu
})
let AccountSettings = withEditMode(actionsForAccountSettingsMenu)(Button)

class ToolBar extends Component {
    render() {
        const {isPinned} = this.props
        return (
            <div className="tool-bar">
                <Row>
                    {!isPinned && 
                        <Button onClick={this.props.toggleSidebar}>
                            BOARDS
                        </Button> 
                    }
                    <input />   
                    <Link to='/'>HOME</Link>
                    <CreativeMenu>ICON[+]</CreativeMenu>
                    
                    <AccountSettings>Account Settings</AccountSettings>
                </Row>
            </div>
        )
    }
}

const mapStatToProps = ({mode: {sidebar} }) => ({
    isPinned: sidebar.isPinned
})

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar(){
        dispatch(PopupActions.toggle_sidebard_boardlist())
    },
    toggleCreativeMenu() {
        dispatch(PopupActions.toggle_creative_menu())
    }
})

export default connect(mapStatToProps, mapDispatchToProps)(ToolBar)