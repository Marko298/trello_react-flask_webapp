import React from 'react'
import {withRouter, NavLink} from 'react-router-dom'

//styles
import './TabRoutes.style.css'

function TabRoutes({children, routers, match, _id, Theme, exact, active}) {
    return (
        <div>
            <div className={Theme.container}>
                {routers.map((route, idx) => (
                    <div className={Theme.button}>

                        <NavLink
                            exact={exact} 
                            key={idx} 
                            to={`${match.url}${_id}${route.path}`} 
                            activeClassName={active}
                        >
                            <span>{route.title}</span>
                            {route.icon && <i className={route.icon}/>}
                        </NavLink>

                    </div>
                ))}
            </div>
            <div>
              {children}
            </div>
        </div>
    )
}

TabRoutes.defaultProps = {
    _id: '',
    Theme: {
        container: '',
        button: ''
    },
    exact: false,
    active: ""
}

export default TabRoutes