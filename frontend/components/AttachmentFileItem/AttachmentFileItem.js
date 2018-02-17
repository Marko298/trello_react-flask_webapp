import React from 'react'
//components
import Title from '../Title/Title'
import Timestamp from '../Timestamp/Timestamp'
import Button from '../Button/Button'

import './AttachmentFileItem.style.css'

const AttachmentFileItem = ({
    file_id,
    image,
    filename,
    uploadDate,
    handleClickAssignFile,
    handleClickRemoveFile,
    textForButton,
    disabled
}) =>
    <div className='attachment-file'>
        <div className='attachment-file__header'>
            <img src={image} style={{width: '100%'}}/>
        </div>
        <div className='attachment-file__body'>

            <Title text={filename} small tiny/>
            <Timestamp time={uploadDate}/>
            
            <div className='btn-group'>
                <Button onClick={handleClickAssignFile(file_id)} disabled={disabled}>
                    {textForButton ? "remove cover" : "assing cover"}
                </Button>
                <Button onClick={handleClickRemoveFile(file_id)} disabled={disabled}>
                    remove
                </Button>
            </div>
        </div>
    </div>;


export default AttachmentFileItem