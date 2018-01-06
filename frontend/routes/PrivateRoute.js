import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const isAuth = rest.isAuth && rest.isAuth.hasOwnProperty('length') && rest.isAuth.length > 0
    return (
        <Route {...rest} render={props => (
            !isAuth ?
            (<Component {...props} />) : (<Redirect to={{
                pathname: rest.redirectPath,
                state: { from: props.location }
            }}/>)
        )}/>
    )
}

  export default PrivateRoute