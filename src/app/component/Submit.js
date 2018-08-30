import React from "react";
import { NavLink } from "react-router-dom";
const submitAddress = 'http://localhost:5000/api/submit'; // adress to send a submission to DB

export class Submit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  // state = form with all his updated fields
            formID: this.props.location.state.form.formID,
            formName: this.props.location.state.form.formName,
            numOfSubmissions: this.props.location.state.form.numOfSubmissions,
            labels: this.props.location.state.form.labels,
            submits: this.props.location.state.form.submits
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.labelsToInputs = this.labelsToInputs.bind(this);
        
    }

    // copy elemnts from the source arr to the target arr
    labelsToInputs(source, target) { 
        for (var i = 0; i < source.length; i++) {
            var element = source[i].inputFieldLabel;
            target.push(element);         
        }
        return (target);
    }

    handleInputChange(event) { // updates the input from I/O @event - onChange of inputs blocks
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        let labels = this.state.labels.slice();
        for (let i in labels) {
            if (labels[i].inputName === name) { // serach for the input name in the inputs arr 
                labels[i].inputFieldLabel = value; //update his values
                this.setState({ labels });
                break;
            }
        }
    }

    updateDataBase(params) { // sends a form to the server @params- form
        var request = new XMLHttpRequest();  // XMLrequest
        request.open('POST', submitAddress, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var jsonToSend = JSON.stringify(params);
        request.send(jsonToSend); // send in json format
    }

    // handles "submit form" click. creates and sends the submited form to data base
    handleSubmitForm(event) {  
        event.preventDefault();

        var formToAdd = this.props.location.state.form; // the form we send
        formToAdd.numOfSubmissions = formToAdd.numOfSubmissions + 1; // update num of submmisions

        var submit = { // a submit object
            submitID: formToAdd.submits.length,
            inputs: []
        };

        // copy elemnts from the labels arr to the submit inputs arr
        submit.inputs = this.labelsToInputs(formToAdd.labels, submit.inputs); 

        formToAdd.submits.push(submit); // update the submit

        this.updateDataBase(formToAdd); // send to DB

        let labels = this.state.labels.slice(); // initalize the labels
        for (let i in labels) {
                labels[i].inputFieldLabel = '';
                this.setState({ labels });
         }
    }
   
    render() {
        return (
            <div className="container">
                <h2> {this.state.formName} form </h2>
                <p> please fill the {this.state.formName} Form and click Submit </p>
      
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
                        <button type="save" className="btn btn-success" onClick={this.handleSubmitForm}>Submit Form</button>
                    </div>
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