import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
//actions
import PopupActions from '../actions/EditModeAction'


const withEditMode = (action, {topCordinates}={}) => (Component) => {
    class Wrapper extends React.Component {
        static defaultProps = {
            selected: {}
        }
        state = {
            left: 0,
            top: 0,
            width: 0
        }

        getCordinates = () => {
            const {width, top, left} = this.node.getBoundingClientRect()
            const isTopCordinatesAlreadyExist = topCordinates !== undefined && topCordinates
            
            let settings = {
                width: parseInt(width) + 'px',
                top: isTopCordinatesAlreadyExist || parseInt(top + window.scrollY) + 'px',
                left: parseInt(left + window.scrollX) + 'px'
            }
            settings.selected = this.props.selected
            this.props.get_cordinates(settings)
        }

        getElement = (element) => {
            if(this.node) return
            this.node = element
        }

        render() {
            const {getElement, getCordinates} = this
            const {toggle, menuToShow} = this.props

            return (
                <div 
                    ref={getElement} 
                    onClick={ compose( getCordinates, toggle, menuToShow ) }
                >
                    <Component {...this.props}/>
                </div>
            )
        }

        componentDidMount() {
            const {width, top, left} = this.node.getBoundingClientRect()
            this.setState((state) => ({width, top, left}) )
        }

    }

    const mergeProps = (stateProps, dispatchProps, ownProps) => {
        const { dispatch } = dispatchProps

        return {
            ...ownProps,
            toggle() {
                dispatch(action().toggle())
            },
            menuToShow() {
                dispatch(action().menu())
            },
            get_cordinates: (cods) => {
                dispatch(PopupActions.get_cordinates(cods))
            }
        }
    }

    return connect(null, null, mergeProps)(Wrapper)
}


export default withEditMode