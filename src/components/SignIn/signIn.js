import React, { Component } from 'react';
import './signIn.css';
import {firebase} from '../../firebase';

import FormField from '../widgets/FormFields/formFields';

class SignIn extends Component {
    state = {
        registerError: '',
        loading: false,
        formdata: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
               
                    element: 'input',
                    value: '',
                    config: {
                        name: 'password_input',
                        type: 'password',
                        placeholder: 'Enter your password'
                    },
                    validation: {
                        required: true,
                        password: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: ''
                
            }

        }
    }

    updateForm = (element) => {
        const newFormData = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value;

        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid=validData[0];
            newElement.validationMessage=validData[1];

            console.log(validData)
        }
        newElement.touched = element.blur
        newFormData[element.id] = newElement;

        console.log(element.blur)

        this.setState({
            formdata: newFormData
        });


    }


    validate=(element)=>{
        let error = [true,''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email':''}`;
            error = !valid ? [valid , message]: error
        }

        if(element.validation.password){
            const valid = element.value.length>=5;
            const message = `${!valid ? 'Must be greater then 5':''}`;
            error = !valid ? [valid , message]: error
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid ? [valid , message]: error
        }
        return error;
    }

    submitForm=(event , type)=>{
        event.preventDefault();

        if(type !==null){

            let dataToSubmit={}
            let formIsValid=true;

            for(let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                   .signInWithEmailAndPassword(
                       dataToSubmit.email , 
                       dataToSubmit.password)
                    .then(()=>{
                        this.props.history.push('/');
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                            registerError:error.message
                        })
                    })
                }else{
                   firebase.auth()
                   .createUserWithEmailAndPassword(
                       dataToSubmit.email , 
                       dataToSubmit.password)
                    .then(()=>{
                        this.props.history.push('/');
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                            registerError:error.message
                        })
                    })
                }
            }
        }
    }

    submitButton = () =>(
        this.state.loading ? 
        'Loading ...' 
        :
        <div>
            <button onClick={(event)=>{this.submitForm(event, false)}}>Register</button>
            <button onClick={(event)=>{this.submitForm(event,true)}}>Log in</button>

        </div>
    )

    showError=()=>(
        this.state.registerError !=='' ?
    <div className={"error"}>{this.state.registerError}</div>
        :''
    )
    render() {
        return (
            <div className="log-container">
                <h2>Register / SignIn</h2>
                <form onSubmit={(event)=>{this.submitForm(event,null)}}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default SignIn;