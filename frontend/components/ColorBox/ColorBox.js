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
    let isSelected;
    if (typeof selectedLabels === 'object') {
        isSelected = selectedLabels.includes(_id) ? true : false
    } else if (typeof selectedLabels === 'string') {
        isSelected = selectedLabels === color 
    }
    

    // let isSelected = selectedLabels === color 
    
    
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
        {isSelected && <div style={{
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
