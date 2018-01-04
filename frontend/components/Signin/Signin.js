import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//components
import Button from '../../components/Button/Button'
import TextField from '../../components/TextField/TextField'
import Title from '../Title/Title'

import Form from '../../components/Form/Form'


import './Signin.style.css'

class Signin extends Component {
    state = {
        fields: [
            {name: ''},
            {email: ''}, 
            {password: ''}
        ]
    }

    handleChange = (field) => (evant) => {

        let value = evant.target.value;

        this.setState(function (state) {
            let updatedFields = state.fields
                .reduce((acumulator, obj) => {
                    if (field in obj) {
                        obj[field] = value
                    }
                    acumulator.push(obj)
                    return acumulator
                }, [])

            return {...state, fields: [...updatedFields]}
        })
    }
    
    onSubmit = () => {
        alert("from SignIn class")
    }

    header = () => (
        <Title>Register a new account in Trello</Title>
    )
    footer = () => (
        <Link to='/login'>Have already account ?</Link>
    )

    render() {
        const {fields} = this.state;

        const {name} = fields[0];
        const {email} = fields[1];
        const {password} = fields[2];
  
        return (
            <Form 
                submit={this.onSubmit}
                renderHeader={this.header}
                renderFooter={this.footer}>
                 <TextField
                    handleChange={this.handleChange}
                    name="name"
                    field={name}
                    label='Name'/>
                <TextField
                    handleChange={this.handleChange}
                    name="email"
                    field={email}
                    label='Email'/>
                <TextField
                    handleChange={this.handleChange}
                    name="password"
                    field={password}
                    label='Password'
                    type='password'/>
                <Button primary type='submit'>Sign in</Button>
            </Form>
        )
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log("componentWillUpdate", nextState.error, this.state.error)
        // if(nextState.error.length === 0 && this.state.error.length > 0) {
        //     console.log("WEEEA RER")
        //     this.handleError([])
        // }
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log("componentDidUpdate", this.state.error, prevState.error)
    }  
}

export default Signin
// class Signin extends Component {
//     state = {
//         fields: [
//             {name: ''},
//             {email: ''}, 
//             {password: ''}
//         ],
//         error: []
//     }

//     static _isEmpty = (field) => {
//         if(field.length == 0) {
//             throw new Error(`isRequired fields ${field}`)
//         }
//         if(field.length > 1) {
//             return true
//         } else {
//             throw new Error(`мало букв`)
//         }
//     }

//     static _isValidEmail(email) {
//         let re = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
//         if( !re.test(email.toLowerCase()) ) {
//             throw new Error(`invalid email`)
//         } else {
//             return true
//         }
//     }

//     handleError = (error) => {
//         this.setState(function(state) {
//                 return {...state, error: [...error]}
//             })
//         return
//     }

//     handleChange = (field) => (evant) => {

//         let value = evant.target.value;

//         this.setState(function (state) {
//             let updatedFields = state.fields
//                 .reduce((acumulator, obj) => {
//                     if (field in obj) {
//                         obj[field] = value
//                     }
//                     acumulator.push(obj)
//                     return acumulator
//                 }, [])

//             return {...state, fields: [...updatedFields]}
//         })
//     }

//     validateFields = () => {
//         let {fields, error} = this.state;
//         const errorsList = [];

//         fields.forEach(o => {         
//             for(let key in o) {
//                 let value = o[key];

//                 try {
//                     Signin._isEmpty(value)
//                     if(key === 'email') {
//                         Signin._isValidEmail(value)
//                     }
//                 } catch ({message}) {
//                     errorsList.push(message)
//                 }

                
//             }
//         })
        
//         errorsList.length ? this.handleError(errorsList) : this.handleError([])
//         console.log("errorsList", errorsList);
//         console.log("this.state.error", this.state.error)
//         if(!error.length && fields[1].email.length) {
//             return true
//         }
//         return false
//     }
    
//     onSubmit = (e) => {
//         e.preventDefault();

//         console.log("Submit is occur")
//         console.log(this.validateFields())

//     }

//     render() {
//         const {name, email, password} = [...this.state.fields];
//         return (
//             <Form submitHanlder={this.onSubmit}>
//                 <Title>Register a new account in Trello</Title>
                
//                 <TextField
//                     handleChange={this.handleChange}
//                     name="name"
//                     field={name}
//                     label='Name'/>
//                 <TextField
//                     handleChange={this.handleChange}
//                     name="email"
//                     field={email}
//                     label='Email'/>
//                 <TextField
//                     handleChange={this.handleChange}
//                     name="password"
//                     field={password}
//                     label='Password'
//                     type='password'/>

//                 <Button type='submit'>Sign in</Button>
//                 <Link to='/login'>Have already account ?</Link>
//             </Form>
//         )
//     }

//     componentWillUpdate(nextProps, nextState) {
//         console.log("componentWillUpdate", nextState.error, this.state.error)
//         // if(nextState.error.length === 0 && this.state.error.length > 0) {
//         //     console.log("WEEEA RER")
//         //     this.handleError([])
//         // }
//     }
//     componentDidUpdate(prevProps, prevState) {
//         // console.log("componentDidUpdate", this.state.error, prevState.error)
//     }  
// }





// function magicFunc(Component) {
//     return class Wrapper extends Component {

//         render() {
//             <Component />
//         }
//     }
// }

// class MagicComponent extends Component {
//     render() {
//         return (
//             React.Children
//         )
//     }
// }