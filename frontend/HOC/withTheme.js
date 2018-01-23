import React from 'react'

export default function withTheme(Component) {
    return function Theme(Theme) {
        return function Wrapper(props) {
            return (
                <Component {...props} Theme={Theme}/>
            )
        }
    }
}