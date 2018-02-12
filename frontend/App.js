import React, {Component} from 'react'
import Routes from './routes/Routes'

import Button from './components/Button/Button'
import Title from './components/Title/Title'

//styles
import './__asssets/_base.css'

class App extends Component {
    render() {
        return (
           <Routes/>
        )
    }
}

export default App
