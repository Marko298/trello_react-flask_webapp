import React from 'react'
import PropTypes from 'prop-types'
//components
import Button from '../Button/Button'
import Input from '../../containers/Input/Input'
import Form from '../Form/Form'
import Textarea from '../Textarea/Textarea'

const FormForEditing = ({hanldeSubmit, handleCancleAction, inputs, toggle, ...props}) => {
    return (
        <Form onSubmit={hanldeSubmit}>

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

            <Button type='submit'>
                Save
            </Button>
            <Button type='button' onClick={(e) => {
                toggle()
                // console.log({toggle})
                // EditFormOrganization()
            }}>
                Cancle
            </Button>
        </Form>
    )
}

FormForEditing.propTypes = {
    inputs: PropTypes.arrayOf(PropTypes.object)
}
export default FormForEditing