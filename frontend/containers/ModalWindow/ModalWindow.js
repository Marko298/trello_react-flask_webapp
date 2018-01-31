import React, {Component, Children} from 'react'
import {withRouter} from 'react-router-dom'
import {func} from 'prop-types'

import './ModalWindow.style.css'

class ModalWindow extends Component {
    static propTypes = {
        children: func.isRequired
    }
    back = (e) => {
        e.stopPropagation()
        this.props.history.goBack()
    }

    handleClick = (e) => {
        if(e.target.tagName === 'SECTION') {
            this.back(e)
        }
    }
    render() {
        const {children, props} = this.props
        return (
            <section className='overlay' onClick={this.handleClick}>
                <div className='modal-wrapper'>
                    <button onClick={this.back}>
                        Close this modal
                    </button>
                    <div>
                        {Children.only(children(this.props))}
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(ModalWindow)