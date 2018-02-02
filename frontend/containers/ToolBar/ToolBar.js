import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//action
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Row from '../../components/Row/Row'
//HOC
import withEditMode from '../../HOC/withEditMode'
//containers
import Popup from '../Popup/Popup'
//styles
import './ToolBar.style.css'

const actionsForCreativeMenu = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_creative_menu
})
let CreativeMenuButton = withEditMode(actionsForCreativeMenu)(Button)

const actionsForAccountSettingsMenu = () => ({
    toggle: PopupActions.toggle_editMode,
    menu: PopupActions.toggle_account_settings_menu
})
let AccountSettings = withEditMode(actionsForAccountSettingsMenu)(Button)


class ToolBar extends Component {
    state = {
        offsetTopCreativeMenu: 0,
        offsetTopAccountSettingsMenu: 0
    }

    componentDidMount(){

        let {bottom: buttomCreativeBtn} = this.findElementEndReturnCords(this.CreativeMenuButton)
        let {bottom: buttomAccountBtn} = this.findElementEndReturnCords(this.AccountSettings)

        this.setState(function(prevState){
            return {
                ...prevState,
                offsetTopCreativeMenu: buttomCreativeBtn,
                offsetTopAccountSettingsMenu: buttomAccountBtn 
            }
        })
    }

    findElementEndReturnCords = (element) => {
        let node = findDOMNode(element)
        let cords = node.getBoundingClientRect()

        return cords
    }

    boundElement = (nodeName) => (element) => {
        if(this[nodeName]) return
        this[nodeName] = element
    }

    render() {
        const {isPinned} = this.props
        const {boundElement} = this
        const {offsetTopAccountSettingsMenu, offsetTopCreativeMenu} = this.state

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
                    <CreativeMenuButton 
                        ref={boundElement('CreativeMenuButton')} 
                        customTop={offsetTopCreativeMenu}
                    >
                        ICON[+]
                    </CreativeMenuButton>
                    
                    <AccountSettings
                        customTop={offsetTopAccountSettingsMenu} 
                        ref={boundElement('AccountSettings')}
                    >
                        Account Settings
                    </AccountSettings>
                </Row>


            </div>
        )
    }
}

const mapStatToProps = ({mode: {sidebar, menu} }) => ({
    isPinned: sidebar.isPinned,
    menu: {...menu}

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