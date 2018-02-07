import React from 'react'

import './ProgressBar.style.css'


export default function ProgressBar({plottProgress}) {

    let notCompleted = plottProgress.not_completed ? plottProgress.not_completed : 0
    let isCompleted = plottProgress.is_completed ? plottProgress.is_completed : 0 

    let fullWIdth = notCompleted + isCompleted

    let widthForCompleted = parseInt((isCompleted / fullWIdth) * 100)
    let widthForNotCompleted =  parseInt((notCompleted / fullWIdth) * 100)
   
    return (
        <div>
            <div style={{display: 'flex', width: '100%'}}>
                <div className='isCompleted' style={{height: '10px', width: widthForCompleted + '%'}}></div>
                <div className='notCompleted' style={{height: '10px', width: widthForNotCompleted + '%'}}></div>
            </div>
            <h2>
                isDoneOn: {widthForCompleted} %
            </h2>
        </div>
    )
}