import React from 'react'

export default function UploadImageForm({handleChangeImage, innerRef}) {
    return (
        <form method='post' ref={innerRef}>
            <input type='file' id='img' name='img' onChange={handleChangeImage} className="input-file"/>
            <label htmlFor="img" className='input-file__label'>
                Upload image
            </label>
        </form>
    )
}