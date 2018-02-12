import React from 'react'

import './Avatarka.style.css'

function styles ({medium, small, ractangle}) {
    return {
        width: medium && '100px' || small && '30px',
        height: medium && '100px' || small && '30px',
        borderRadius: ractangle && '4px' || '50%',
        backgroundColor: "#ffffff"
    }
}

export default function Avatarka({src, alt, children, ...props}) {
    let classes = props.className ? props.className.concat(" Avatarka") : "Avatarka"
    return (
        <div style={styles(props)} className={classes}>
            <img src={src} alt={alt} style={{borderRadius: props.ractangle ? '4px' : '50%'}}/>
            {children}
        </div>
    )
}

Avatarka.defaultProps = {
    medium: false,
    small: true,
    ractangle: false
}