import React from 'react'

import './ColorBox.style.css'


export default function ColorBox({
    _id,
    color,
    description,
    selectedLabels,
    handleClick,
    ...props
}) {
    
    // const isSelected = selectedLabels.includes(_id) ? true : false

    let isChecked = selectedLabels === color 
    
    
    const styles = function({color}) {
        return {
            // border: isSelected ? '5px solid black' : 'none',
            backgroundColor: color
        }
    }

    const classes = props.className ? props.className.concat(' label-box') : 'label-box'

    let label = {description, color, _id}

    return (
        <div
            onClick={handleClick(label)} 
            className={classes}
            style={styles(label)}
        >
        {isChecked && <div style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'yellow'
        }} />}
            {description}
        </div>
    )
}

ColorBox.defaultProps = {
    _id: '',
    color: '',
    description: null,
    selectedLabels: [],
    handleClick: () => {}
}
