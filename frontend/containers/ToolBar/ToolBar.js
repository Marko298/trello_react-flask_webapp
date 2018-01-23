import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
//action
import PopupActions from '../../actions/EditModeAction'
//components
import Button from '../../components/Button/Button'
import Row from '../../components/Row/Row'
//styles
import './ToolBar.style.css'


class ToolBar extends Component {

    render() {
        return (
            <div className="tool-bar">
                <Row>
                    <Button onClick={this.props.toggleSidebar}>
                        BOARDS
                    </Button> 
                    <input />   
                    <Link to='/'>HOME</Link>
                    <h6>ICON[+]</h6>
                </Row>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    toggleSidebar(){
        dispatch(PopupActions.toggle_sidebard_boardlist())
    }
})

export default connect(null, mapDispatchToProps)(ToolBar)