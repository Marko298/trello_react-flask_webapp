import React, {Component, Children} from 'react'
import {createPortal} from 'react-dom'
import {withRouter} from 'react-router-dom'
import {func} from 'prop-types'

import Button from '../../components/Button/Button'

import './ModalWindow.style.css'

let body = document.querySelector('body')

class ModalWindow extends Component {
    static propTypes = {
        children: func.isRequired
    }

    constructor(props) {
        super(props)
        this.el = document.createElement('div')
        this.el.setAttribute("id", "portal");
    }

    componentDidMount(){
        body.appendChild(this.el)
    }

    componentWillUnmount() {
        body.removeChild(this.el)
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
        return createPortal(
            <section className='overlay-modal' onClick={this.handleClick}>
                <div className='modal-wrapper'>
                    <div className='model-header'>
                        <Button onClick={this.back}>
                            <i className="fas fa-times" />
                        </Button>
                    </div>
                    <div>
                        {Children.only(children(this.props))}
                    </div>
                </div>
            </section>,
            this.el
        )
    }
}

export default withRouter(ModalWindow)