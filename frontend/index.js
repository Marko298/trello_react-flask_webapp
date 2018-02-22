import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers'
import thunk from 'redux-thunk'
//components
import App from './App'

import {createLogger} from 'redux-logger'

//HMR
import { AppContainer } from 'react-hot-loader'

const logger = createLogger();

// const store = createStore(reducer, applyMiddleware(thunk));
const store = createStore(reducer, applyMiddleware(thunk, logger));


//  <div>Hello React</div>
// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>,
//     document.getElementById("app")
// )

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => {
        const newApp = require('./App').default
      render(newApp)
    })
  }
