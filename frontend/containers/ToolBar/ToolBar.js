import React from 'react'

//styles
import './ToolBar.style.css'

function ToolBar(props) {
    return (
        <div className='tool-bar'>
            <h6>Borads</h6>
            <input type='text' placeholder='search borads... '/>
            <h6>HOME[TRELLO]</h6>
            <h6>ICON[+]</h6>
            <h6>ICON[jingle]</h6>
            <h6>ICON[manage-profile]</h6>
            {props.children}
        </div>
    )
}

export default ToolBar