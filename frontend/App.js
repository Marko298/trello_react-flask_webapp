import React, {Component} from 'react'
import Routes from './routes/Routes'

import Button from './components/Button/Button'
import Title from './components/Title/Title'

//containers
// import Auth from './containers/Auth/Auth'
// import NavigationBar from './containers/NavigationBar/NavigationBar'

class App extends Component {
    render() {
        return (
           <Routes/>
        )
    }
}

export default App
