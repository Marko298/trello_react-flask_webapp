import React from 'react'
import {compose} from 'redux'

import {connect} from 'react-redux'

//actions
import {get_cordinates} from '../actions/EditModeAction'


const withEditMode = (Component) => {
    class Wrapper extends React.Component {
        state = {
            left: 0,
            top: 0,
            width: 0
        }

        getCordinates = () => {
            const {width, top, left} = this.node.getBoundingClientRect()

            let settings = {
                width:parseInt(width) + 'px',
                top: parseInt(top + window.scrollY) + 'px',
                left: parseInt(left + window.scrollX) + 'px'
            }
            settings.selected = this.props.selected
            this.props.get_cordinates(settings)
        }

        render() {
            const {top, left, width} = this.state
            const configureStyle = {top, left, width}

            return (
                <div ref={n => this.node = n} onClick={ compose(this.getCordinates, this.props.toggle_editMode) }>
                    <Component {...this.props} />
                </div>
            )
        }

        componentDidMount() {
            const {width, top, left} = this.node.getBoundingClientRect()
            this.setState((state) => ({width, top, left}) )
        }

    }
    return connect(null, {get_cordinates})(Wrapper)
}

export default withEditMode