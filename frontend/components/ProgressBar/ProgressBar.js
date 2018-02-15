import React from 'react'

import './ProgressBar.style.css'
import Title from '../Title/Title'


export default function ProgressBar({plottProgress, textTitle}) {

    let notCompleted = plottProgress.not_completed ? plottProgress.not_completed : 0
    let isCompleted = plottProgress.is_completed ? plottProgress.is_completed : 0 

    let widthForCompleted, widthForNotCompleted, fullWIdth

    if (isCompleted === 0) {
        widthForCompleted = 0
        widthForNotCompleted = 100
    } else {
        fullWIdth = notCompleted + isCompleted
    
        widthForCompleted = parseInt((isCompleted / fullWIdth) * 100)
        widthForNotCompleted =  parseInt((notCompleted / fullWIdth) * 100)
    }
   
    return (
        <div className='progress-wrppaer'>
            <Title text={`${textTitle}${widthForCompleted}%`} small tiny/>
            <div className='progress-asset' style={{display: 'flex', width: '100%'}}>
                <div className='isCompleted' 
                    style={{height: '8px', width: widthForCompleted + '%'}} />
                <div className='notCompleted' 
                    style={{height: '8px', width: widthForNotCompleted + '%'}} />
            </div>
        </div>
    )
}

ProgressBar.defaultProps = {
    textTitle: ''
}