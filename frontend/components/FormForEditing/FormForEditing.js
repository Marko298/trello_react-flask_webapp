import React from 'react'
import PropTypes from 'prop-types'
//components
import Button from '../Button/Button'
import Input from '../../containers/Input/Input'
import Form from '../Form/Form'
import Textarea from '../Textarea/Textarea'

const FormForEditing = ({
    hanldeSubmit, 
    handleCancleAction, 
    inputs, 
    toggle, 
    buttonSettings,
    actionButtonText, 
    ...props
}) => {
    return (
        <Form onSubmit={hanldeSubmit} method={props.method}>

            {inputs.map(({
                component,
                name,
                field,
                onChange,
                label
            }) => {
                return (
                    component === 'input' && 
                    <Input
                        label={label} 
                        field={field} 
                        name={name}
                        handleChange={onChange}
                    />  
                    || component === 'textarea' && 
                    <Textarea
                        label={label} 
                        field={field} 
                        name={name}
                        onChange={onChange(name)} 
                    />
                ) 
            })}
            <div className='button-group-editing'>
                <Button type='submit' success={buttonSettings.success} disabled={buttonSettings.disabled}>
                    {actionButtonText}
                </Button>
                <Button type='button' onClick={(e) => {
                    toggle() || props.close()
                    // console.log({toggle})
                    // EditFormOrganization()
                }}>
                    Cancle
                </Button>
            </div>
        </Form>
    )
}

FormForEditing.defaultProps = {
    actionButtonText: 'Save',
    buttonSettings: {
        success: true,
        disabled: false
    }
}

FormForEditing.propTypes = {
    inputs: PropTypes.arrayOf(PropTypes.object)
}
export default FormForEditing