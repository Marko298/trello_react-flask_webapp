import React from 'react'

//styles
import './Row.style.css'

const styles = function({spaceBetween}) {
    return {
        display: 'flex',
        justifyContent: spaceBetween ? 'space-between' : 'flex-start'
    }
}

function Row({children, ...props}) {
    return (
        <div className={props.className} style={styles(props)} >
            {children}
        </div>
    )
}

Row.defaultProps = {
    spaceBetween: false
}

export default Row