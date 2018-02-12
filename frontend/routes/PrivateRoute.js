import React from 'react'
import {Route, Redirect} from 'react-router-dom'


const Container = ({children}) => (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#e1f5fe'
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            
        }}>
            {children}
        </div>
    </div>
)

function PrivateRoute({component: Component, ...rest}) {
    const isAuth = rest.isAuth && rest.isAuth.hasOwnProperty('length') && rest.isAuth.length > 0
    return (
        <Route {...rest} render={props => (
            !isAuth 
            ? (
                <Container>
                    <Component {...props} />
                </Container>
            ) 
            : (<Redirect to={{
                pathname: rest.redirectPath,
                state: { from: props.location }
            }}/>)
        )}/>
    )
}

  export default PrivateRoute