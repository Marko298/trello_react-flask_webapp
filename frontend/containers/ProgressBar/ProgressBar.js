import React, {Component} from 'react'

import './ProgressBar.style.css'

class ProgressBar extends Component {
    render() {

        const {progress, isLoaded} = this.props

        return (
            <div className='ProgressBar_container' style={{
                display: !isLoaded ? 'none' : 'flex'
            }}>
                <span className='ProgressBar_text'>
                    Uploading
                </span>
                <span className='ProgressBar_procent'>
                    {progress - 1}%
                </span>
            </div>
        )
    }
} 

ProgressBar.defaultProps = {
    progress: 1
}

export default ProgressBar