import React, { Component } from "react";
import './dashboard.css';

import FormField from '../widgets/FormFields/formFields';

class Dashboard extends Component{

    state={
        postError: '',
        loading: false,
        formdata: {
            author: {
                element: 'input',
                value: '',
                config: {
                    name: 'author_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            title: {
                element: 'input',
                value: '',
                config: {
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Enter your title'
                },
                validation: {
                    required: true,
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
        }
        newElement.touched = element.blur
        newFormData[element.id] = newElement;

        this.setState({
            formdata: newFormData
        });


    }

    validate=(element)=>{
        let error = [true,''];

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid ? [valid , message]: error
        }
        return error;
    }

    submitButton = () =>(
        this.state.loading ? 
        'Loading ...' 
        :
        <div>
            <button type="submit">Add post</button>

        </div>
    )

    submitForm =(event)=>{
        event.preventDefault();

            let dataToSubmit={}
            let formIsValid=true;

            for(let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid
            }
            console.log(dataToSubmit)

            if(formIsValid){
                console.log('submit post')
            }else{
                this.setState({
                    postError:'something went wrong'
                })
            }
    }

    showError=()=>(
        this.state.postError !=='' ?
    <div className={"error"}>{this.state.postError}</div>
        :''
    )
    render(){
        return(
            <div className="post-container">
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <FormField
                        id={'author'}
                        formdata={this.state.formdata.author}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'title'}
                        formdata={this.state.formdata.title}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Dashboard
