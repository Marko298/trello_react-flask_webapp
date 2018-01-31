import React from 'react'

import './LabelBox.style.css'


export default function LabelBox({
    _id,
    color,
    description,
    selectedLabels,
    handleClick,
    ...props
}) {
    
    const isSelected = selectedLabels.includes(_id) ? true : false
    
    const styles = function({color}) {
        return {
            border: isSelected ? '5px solid black' : 'none',
            backgroundColor: color
        }
    }

    let label = {description, color, _id}

    return (
        <div
            onClick={handleClick(label)} 
            className="label-box"
            style={styles(label)}
        >
            {description}
        </div>
    )
}

// className="label-box large" 