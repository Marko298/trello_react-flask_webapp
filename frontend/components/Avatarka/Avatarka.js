import React from 'react'

export default function Avatarka({src, alt, ...props}) {
    return (
        <div>
            — A V A T A R K A —
            <img src={src} alt={alt}/>
        </div>
    )
}