import React from 'react'
import PropTypes from 'prop-types'
import {StyledTitle} from './Title.style'

const Title = ({children}) => {
    return (
        <StyledTitle>
            {children}
        </StyledTitle>
    )
}

Title.defaultProps = {
    children: ''
}

Title.propTypes = {
    children: PropTypes.string
}

export default Title
