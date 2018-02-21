import React, {Component} from 'react'
import Routes from './routes/Routes'

import Button from './components/Button/Button'
import Title from './components/Title/Title'

// import MyTagControlContext from './dnd'


//styles
import './__asssets/_base.css'

class App extends Component {
    render() {
        return (
           <Routes/>
        )
    }
}

// export default MyTagControlContext(App)
export default App
