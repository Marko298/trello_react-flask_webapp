import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './NavigationBar.style.css'

 class NavigationBar extends Component {
    render() {
        return (
            <nav className='navigation-bar'>
                <a href='https://github.com/PashaSchool' className="logo-githab-author-link">
                    <i className="fab fa-github"></i>
                </a>
                <div className='navigation-bar__right'>
                    <Link to='/'>HOME</Link>
                    <Link className='login' to='/login'>login</Link>
                    <Link className='sign-in' to='/signin'>Signin</Link>
                </div>
            </nav>
        )
    }
}

export default NavigationBar