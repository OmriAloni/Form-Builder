import React from "react";
import { NavLink } from "react-router-dom";
import  Recaptcha from'react-recaptcha';
const submitAddress = 'http://localhost:5000/api/submit'; // adress to send a submission to DB

export class Submit extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            labels: this.props.location.state.form.labels,
            form: this.props.location.state.form,
            isVerified: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.labelsToInputs = this.labelsToInputs.bind(this);
        this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        
    }

    // copy elemnts from the source arr to the target arr
    labelsToInputs(source, target) { 
        for (var i = 0; i < source.length; i++) {
            var element = source[i].inputFieldLabel;
            target.push(element);         
        }
        return (target);
    }

    updateDataBase(form) { // sends a submitted form to the server
        var request = new XMLHttpRequest();  // XMLrequest
        request.open('POST', submitAddress, false);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var formAsJson = JSON.stringify(form);
        request.send(formAsJson); // send in json format
    }

    handleInputChange(event) { // updates the input from I/O @event - onChange of inputs blocks
        const value = event.target.value;
        const name = event.target.name;
        
        let labels = this.state.labels.slice();
        for (let i in labels) {
            if (labels[i].inputName === name) { // serach for the input name in the inputs arr 
                labels[i].inputFieldLabel = value; //update his value
                this.setState({ labels });
                break;
            }
        }
    }

    // handles "submit form" click. creates and sends the submited form to data base
    handleSubmitForm(event) {  
        if(this.state.isVerified){ // check if the user checked the recaptcha
            event.preventDefault();

            var formToAdd = this.state.form; // the form we send
            formToAdd.numOfSubmissions = formToAdd.numOfSubmissions + 1; // update num of submmisions

            var submit = { // a submit object
                submitID: formToAdd.submits.length,
                inputs: []
            };

            // copy elemnts from the labels arr to the submit inputs arr
            submit.inputs = this.labelsToInputs(formToAdd.labels, submit.inputs); 

            formToAdd.submits.push(submit); // update the submit

            this.updateDataBase(formToAdd); // send to DB
            alert('Form Submitted!');

            let labels = this.state.labels.slice();
            for (let i in labels) {
                    labels[i].inputFieldLabel = ''; //update his value
                }
            this.setState({ labels });
        }
        
        else{
            alert('Please verfiay your are not bot');
        }
    }

    recaptchaLoaded(){ // make sure recaptcha was loaded
        console.log('recaptcha loaded');
    }

    verifyCallback(response){ // user used recaptcha
        if(response){
            this.setState({
                isVerified:true
            });
        }
    }
   
    render() {
        return (
            <div className="container">
                <h2> {this.state.form.formName} form </h2>
                <p> please fill the {this.state.form.formName} Form and click Submit </p>
      
                <div className="form-group">
                    {this.state.labels.map((label, index) => (
                        <div className="labels">
                            <label htmlFor="labels" className="col-sm-2 control-label">  {label.inputName} </label>
                            <input
                                className="labels"
                                name={label.inputName}
                                id={label.inputName}
                                value={label.inputFieldLabel}
                                type={label.inputType}
                                onChange={this.handleInputChange}
                                placeholder={label.inputName}
                            >
                            </input>
                        </div>
                    ))}
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="save" className="btn btn-success" onClick={this.handleSubmitForm}>
                            Submit
                        </button>
                    </div>
                    &emsp;
                    <Recaptcha
                        sitekey="6LfHfHAUAAAAADZ4x1DTjB-69zURWAlkSKY875Jz"
                        render="explicit"
                        onloadCallback={this.recaptchaLoaded}
                        verifyCallback={this.verifyCallback}
                    />
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="save" className="btn btn-success">
                            <NavLink to={"/Home"} className="White-Link" > Back  </NavLink> </button>
                    </div>
                </div>
            </div>
        );
    }

    get displayName() { return 'Submit'; }
}