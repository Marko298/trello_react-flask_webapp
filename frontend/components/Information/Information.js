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
            
            <div className="button-group-editing ">
                <Button type='button' onClick={(e) => {
                    props.toggle();
                    handleCancleAction()
                }}>
                    <i className="fas fa-pencil-alt" />
                    {buttonText ? buttonText : 'edit'}
                </Button>
            </div>
        </div>
    )
}

Inpormation.defaultProps = {
    title: '',
    paragraph: '',
    buttonText: ''
}