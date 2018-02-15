import React from 'react'

import Avatarka from '../Avatarka/Avatarka'
import Textarea from '../Textarea/Textarea'
import Button from '../Button/Button'

import './CommentForm.style.css'

export default function CommentForm({
    userPhoto,
    userName,
    comment,
    onChange,
    handleClick,
    disabled 
}) {
    return (
        <div className='comment-form'>
            <div className='comment-form__avatar'>
                <Avatarka src={userPhoto} alt={userName}/>
            </div>
            <div className='comment-form__body'>
                <Textarea
                    placeholder="Write a comment..." 
                    field={comment} 
                    name='comment' 
                    onChange={onChange('comment')}
                    
                    />
                <Button onClick={handleClick} disabled={disabled}>
                    Save
                </Button>
            </div>
        </div>
    )
}