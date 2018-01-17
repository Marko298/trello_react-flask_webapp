import React from 'react'
import {compose} from 'redux'

import {connect} from 'react-redux'

//actions
// import {toggle_editMode} from '../actions/EditModeAction'


const withEditMode = (Component) => {
    class Wrapper extends React.Component {
        state = {
            left: 0,
            top: 0,
            width: 0
        }

        componentDidMount() {
            const {width, top, left} = this.node.getBoundingClientRect()
            this.setState((state) => ({width, top, left}) )

        }
        __WRAPPER_CLICK__ = (e) => {
            console.log("from wrapper")      
            //here I have to setup top/width/left settigns
            // for reducer
            // and then in the next click event 
            // just make ToggleVisible for EditComponent
            // and gives for this component axisting styles from the reducer
            // in general Here will be the two actions
            // the firs for settings style and the second is for toggling component

            // then will create action for closing aka toggle back component
            // and ajax sending data into the server for savign board 
        }


        render() {
            const {top, left, width} = this.state
            const configureStyle = {top, left, width}

            return (
                <div ref={n => this.node = n}>
                    <Component {...this.props} onClick={compose(this.props.onClick, this.__WRAPPER_CLICK__)}/>
                </div>
            )
        }
    }
    return connect()(Wrapper)
}

export default withEditMode