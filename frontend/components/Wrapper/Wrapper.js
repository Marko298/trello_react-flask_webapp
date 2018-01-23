import React from 'react'

//styles
import './Wrapper.css'

function Wrapper({children, ...props}) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}

export default Wrapper