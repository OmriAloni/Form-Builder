import React from "react";
import { NavLink } from "react-router-dom";

const formAddress = 'http://localhost:5000/api/builder'; // Adress for the server


export class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last: this.props.location.state.last, //  hold the id of the last form
            formName: '', // saves the form name
            inputs: [   // array of the form labels
                {
                    inputName: 'First Name',
                    inputFieldLabel: 'Omri',
                    inputType: 'text'
                },
                {
                    inputName: 'Last Name',
                    inputFieldLabel: 'Alon',
                    inputType: 'text'
                }
            ]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveForm = this.handleSaveForm.bind(this);
        this.handleAddLabel = this.handleAddLabel.bind(this);
    }

    updateDataBase(params) { // sends a form to the server @params- form
        var request = new XMLHttpRequest(); // XMLrequest
        request.open('POST', formAddress, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var jsonToSend = JSON.stringify(params); // send in json format
        request.send(jsonToSend);
    }

    handleInputChange(event) { // updates the input from I/O @event - onChange of inputs blocks
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let inputs = this.state.inputs.slice();
        for (let i in inputs) {
            if (inputs[i].inputName === name) { // serach for the input name in the inputs arr 
                inputs[i].inputFieldLabel = value; //update his values
                inputs[i].inputType = value;
                this.setState({ inputs });
                break;
            }
        }   
    }

    handleSaveForm(event) { // handles "save form" click. sends the form to data base
        event.preventDefault();
        if(this.state.formName !== ''){ // input check - cannot get empty name
            var form = { // the form that was created
                    formID: this.state.last ,
                    formName: this.state.formName,
                    labels: this.state.inputs,
                    numOfSubmissions: 0,
                    submits: []
            };
            this.updateDataBase(form); // update data base

            this.setState({ // initalize for next form
                last: this.state.last +1,
                formName: '',
                inputs: []
            });
        }
    }

    handleAddLabel() { // handles "add label" click.adds the label to inputs arr
        event.preventDefault();
        
        var newInput = { // the input to add with the user values
            inputName: document.getElementById("inputName").value,
            inputFieldLabel: document.getElementById("FieldLabel").value,
            inputType: document.getElementById("inputType").value
        };
        if(newInput.inputName !== '' || newInput.inputFieldLabel !== '' ){ // cannot get empty values
            this.setState({ 
                inputs: this.state.inputs.concat([newInput]), 
                inputName:'',
                inputFieldLabel:''
             });
        }
            else {}
    }

    render() {
        return (
            <div className="container">
                <hr />
                <h4> Form Builder </h4>
                <p> Choose input name,  field label and type and click Add Label </p>

                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputName" className="col-sm-2 control-label">  Input Name:</label>
                        <div className="col-sm-10">
                            <input
                                name="inputName"
                                className="form-control"
                                id="inputName"
                                value={this.state.inputName}
                                onChange={this.handleInputChange}
                                placeholder="Input Name"
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputFieldLabel" className="col-sm-2 control-label">  Field Label:</label>
                        <div className="col-sm-10">
                            <input
                                name="inputFieldLabel"
                                className="form-control"
                                id="FieldLabel"
                                value={this.state.inputFieldLabel}
                                onChange={this.handleInputChange}
                                placeholder="Field Label"
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputType" className="col-sm-2 control-label">Input Type:</label>
                        <div className="col-sm-10">
                            <select
                                name="inputType"
                                className="form-control"
                                id="inputType"
                                onChange={this.handleInputChange}
                            >
                                <option value="text">Text</option>
                                <option value="color">Color</option>
                                <option value="date">Date</option>
                                <option value="tel">Telephone</option>
                                <option value="number">Number</option>
                                <option value="email">E-mail</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button 
                                type="save" 
                                className="btn btn-success" 
                                onClick={this.handleAddLabel}> Add Label
                            </button>
                        </div>
                    </div>

                    <hr />

                    {this.state.inputs.map((input, index) => (
                        <div className="inputs">
                            <label 
                                htmlFor="labels"
                                className="col-sm-2 control-label"> {input.inputName}
                            </label>
                            <input
                                readOnly
                                name={input.inputName}
                                value={input.inputFieldLabel}
                                type= {input.inputType}
                            />
                        </div>
                    ))}

                    <hr />
                    <p> When done, choose name for the form  and click Save Form</p>
                    
                    <div className="form-group">
                        <label htmlFor="FormName" className="col-sm-2 control-label">  Form Name: </label>
                        <div className="col-sm-10">
                            <input
                                name="FormName"
                                className="form-control"
                                id="FormName"
                                value={this.state.formName}
                                onChange={(e) => this.setState({ formName: e.target.value })}
                                placeholder="Form Name"
                            >
                            </input>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="save" className="btn btn-success" onClick={this.handleSaveForm}>
                                    Save Form 
                            </button>
                        </div>
                    </div>

                    <button 
                        type="save"
                        className="btn btn-success">
                            <NavLink to={"/Home"} className="White-Link" >
                                Back  
                            </NavLink>
                    </button>
                </form>
            </div>
        );
    }
    
    get displayName() { return 'Builder'; }
}