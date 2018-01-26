import React from 'react'
import {Link, withRouter} from 'react-router-dom'

//styles
import './TabRoutes.css'

function TabRoutes({children, routers, match, _id}) {
    return (
        <div>
            <span>
                TabRoutes
            </span>
            {routers.map((route, idx) => (
                <Link key={idx} to={`${match.url}${_id}${route.path}`}>{route.title}</Link>
            ))}
            {/* Render the list of links with a path that comes from props, so in props I wll get arrays */}
            {children}
        </div>
    )
}

TabRoutes.defaultProps = {
    _id: ''
}

export default TabRoutes