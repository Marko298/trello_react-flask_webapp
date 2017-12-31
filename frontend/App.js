import React, {Component} from 'react'
import Routes from './routes/Routes'

import Button from './components/Button/Button'
import TextField from './components/TextField/TextField'
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

{/* <Button clickHanler={() => {console.log("click me")}} >
    Click me
</Button>

<TextField label="here is the label"/>
<Title>Here is the title</Title> */}

export default App