import React, {Component} from 'react'
import {Link} from 'react-router-dom'

//svg icons
import Comment from 'react-svg-loader!../../__asssets/icons/comments.svg'
import Attachment from 'react-svg-loader!../../__asssets/icons/attachment.svg'
import Checklist from 'react-svg-loader!../../__asssets/icons/checklist.svg'

import './CardItem.style.css'

function Image({src}) {
    return (
        <div>
            <img src={src} style={{width: '100%'}}/>
        </div>
    )
}

class CardItem extends Component {
    calculateCompletedItems = (checklist) => {
        let isCompleted = 0
        let inPropgress = 0

        checklist.forEach(ch => {
            let isHaveItems = ch.items.length

            if (isHaveItems) {
                ch.items.forEach(item => {
                    if (item.isCompleted) {
                        isCompleted++
                        return
                    }
                    inPropgress++
                    return
                })
            }

        })

        return `${isCompleted}/${inPropgress}`

    }
    _renderCommentsIcon = (commentsLength) => (
        <div className='indicator-container'>
            {commentsLength} <Comment width="14px" height="14px" /> 
        </div>
    )
    _renderChecklistIcon = (checklistIcon) => (
        <div className='indicator-container'>
            {this.calculateCompletedItems(checklistIcon)} <Checklist width="14px" height="14px" /> 
        </div>
    )
    _renderAttachmentsIcon = (attachmentLength) => (
        <div className='indicator-container'>
            {attachmentLength} <Attachment width="14px" height="14px" /> 
        </div>
    )
    render() {

        const {card} = this.props
        const isComment = card.comments.length
        const isChecklist = card.checklists.length 
        const isAttachment = card.attachments.files.length
        const isLabels = card.labels.length

        console.log("card.labels", card.labels)

        return (
            <Link to={{
                pathname: `/card/${card._id}/${this.props._id}`,
                state: {
                    modal: true
                }
            }}>
                {card.attachments.assigned && <Image src={card.attachments.assigned}/>}

                { isLabels && (
                    <div className='label-wrapper'>
                        {card.labels.map( ({color}) => <span style={{backgroundColor: color}} />)}
                    </div>
                )}

                {card.title}
                <div className='indicator-wrapper'>
                    {isComment > 0 && this._renderCommentsIcon(isComment)}
                    {isAttachment > 0 && this._renderAttachmentsIcon(isAttachment)}
                    {isChecklist > 0 && this._renderChecklistIcon(card.checklists)}
                </div>
            </Link>
        )
    }
}

export default CardItem