import React from 'react'

//styles
import './Row.style.css'

function Row({children}) {
    return (
        <div className='flex-row'>
            {children}
        </div>
    )
}

export default Row