import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
//actions
import PopupActions from '../actions/EditModeAction'

const addonsSettings = {
    usePreviousePosition: false
}

const withEditMode = (action, addonsSettings={}) => (Component) => {
    class Wrapper extends React.Component {
        static defaultProps = {
            selected: {},
            customWidth: 0,
            customTop: 0,
            customLeft: 0
        }

        getCordinates = () => {
            if(addonsSettings.usePreviousePosition) {
                return null
            }
            const {width, top, left} = this.node.getBoundingClientRect()
            const {customLeft, customTop, customWidth} = this.props

            let settings = {
                width: customWidth ? customWidth + 'px': width > 400 ? '400px' : '300px',
                top: customTop ? customTop + 'px' : parseInt(top + window.scrollY) + 'px',
                left: customLeft ? customLeft + 'px': parseInt(left + window.scrollX) + 'px'
            }
            settings.selected = this.props.selected
            this.props.get_cordinates(settings)
        }

        getElement = (element) => {
            if(this.node) return
            this.node = element
        }

        componentWillReceiveProps(next) {
            if(!next.isPopupShow && this.props.isPopupShow) {
                this.props.clear_cordinates()
            }
        }


        render() {
            const {getElement, getCordinates} = this
            const {toggle, menuToShow} = this.props

            return (
                <div ref={getElement} onClick={ compose( getCordinates, toggle, menuToShow ) } >
                    <Component {...this.props}/>
                </div>
            )
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        toggle() {
            action().toggle && dispatch(action().toggle())
        },
        menuToShow() {
            dispatch(action().menu())
        },
        get_cordinates: (cods) => {
            dispatch(PopupActions.get_cordinates(cods))
        },
        clear_cordinates() {
            dispatch(PopupActions.clear_cordinates())
        }
    })

    const mapStateToProps = ({mode}) => ({
        left: mode.left,
        top: mode.top,
        width: mode.width,
        isPopupShow: mode.forms.isPopupShow
    })

    return connect(mapStateToProps, mapDispatchToProps)(Wrapper)
}


export default withEditMode