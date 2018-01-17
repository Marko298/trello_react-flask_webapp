import React from 'react'

//styles
import './Wrapper.css'

function Wrapper({children}) {
    return (
        <div style={{padding: '0 50px', borderBottom: '1px solid black'}}>
            {children}
        </div>
    )
}

export default Wrapper