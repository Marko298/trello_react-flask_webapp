import React from 'react'
import PropTypes from 'prop-types'
// import {StyledTitle} from './Title.style'

import './Title.css'

const Title = ({children}) => {
    return (
        <span className='title'>
            {children}
        </span>
    )
}


export default Title
