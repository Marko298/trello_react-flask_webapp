import React from 'react'
//components
import Title from '../Title/Title'
import Button from '../Button/Button'

export default function Inpormation({
    title, 
    paragraph, 
    handleCancleAction, 
    buttonText, 
    ...props
}) {
    return (
        <div>
            <Title text={title} bold large>
                <p>
                    {paragraph}
                </p>
            </Title>
            
            <Button onClick={(e) => {
                props.toggle();
                handleCancleAction()
            }}>
                {buttonText ? buttonText : 'edit'}
            </Button>
        </div>
    )
}

Inpormation.defaultProps = {
    title: '',
    paragraph: '',
    buttonText: ''
}