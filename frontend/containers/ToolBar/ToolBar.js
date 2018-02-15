import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
//action
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Avatarka from '../../components/Avatarka/Avatarka'
//HOC
import withEditMode from '../../HOC/withEditMode'
//containers
import Popup from '../Popup/Popup'
import Input from '../Input/Input'
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
        const {isPinned, user: {photo, name}} = this.props
        const {boundElement} = this
        const {offsetTopAccountSettingsMenu, offsetTopCreativeMenu} = this.state

        let bgFromBoard = (
            this.props.location.state &&
            this.props.location.state.toolbar_style &&
            this.props.location.state.toolbar_style.color
        )

        return (
            <div className="tool-bar" style={{
                backgroundColor: bgFromBoard ? `${bgFromBoard}77` : "#026aa7"
            }}>
                <div className='left-toolbar-side'>
                    {!isPinned && 
                        <Button onClick={this.props.toggleSidebar}>
                            <i className="fas fa-clipboard" />
                                Boards
                        </Button> 
                    }
                    <Input 
                        name='search' 
                        placeholder="Search..."
                        value="Comming soon"
                        />   
                </div>
                
                <div className='middle-toolbar-side'>
                    {/* <Spinner /> */}
                    <Link to='/'>Trello</Link>
                </div>  

                <div className='right-toolbar-side'>
                    <CreativeMenuButton 
                        ref={boundElement('CreativeMenuButton')} 
                        customTop={offsetTopCreativeMenu}
                        >
                        <i className="fas fa-plus" />
                    </CreativeMenuButton>
                    <div>
                        <Button>
                            <i className="far fa-bell" />
                        </Button>
                    </div>
                    
                    <AccountSettings
                        className='avatarka-wrapper-button'
                        customTop={offsetTopAccountSettingsMenu} 
                        ref={boundElement('AccountSettings')}
                        >
                        <Avatarka src={photo} alt={name} small/> 
                    </AccountSettings>
                </div>
            </div>
        )
    }
}

function Circle() {
    return (
        <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#cccccc'
        }} />
    )
   
   
}

function Spinner() {
    return (
        <div style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#cccccc'
        }} />
    )
}

const mapStatToProps = ({mode: {sidebar, menu}, user }) => ({
    isPinned: sidebar.isPinned,
    menu: {...menu},
    user: {
        photo: user.photo,
        name: user.name
    }
})

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar(){
        dispatch(PopupActions.toggle_sidebard_boardlist())
    },
    toggleCreativeMenu() {
        dispatch(PopupActions.toggle_creative_menu())
    }
})

export default withRouter(connect(mapStatToProps, mapDispatchToProps)(ToolBar))