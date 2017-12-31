import React, {Component} from 'react'
import {Link} from 'react-router-dom'

 class NavigationBar extends Component {
    constructor(props) {
        super(props)
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log('_____________________')
    //     console.log('New Props', nextProps)
    //     console.log('_____________________')
    // }
    // componentDidMount() {
    //     console.log('_____________________')
    //     console.log(this.props)
    //     console.log("Component Did mount")
    //     console.log('_____________________')
    // }
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