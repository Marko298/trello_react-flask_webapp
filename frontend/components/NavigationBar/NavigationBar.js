import React, {Component} from 'react'
import {Link} from 'react-router-dom'

 class NavigationBar extends Component {
    render() {
        return (
            <nav>
                <h1>Navigation bar</h1>
                <Link to='/'>HOME</Link>
                <Link to='/login'>login</Link>
                <Link to='/signin'>Signin</Link>
            </nav>
        )
    }
}

export default NavigationBar