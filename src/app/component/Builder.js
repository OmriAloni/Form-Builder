import React from "react";
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();
import { NavLink, Redirect } from "react-router-dom";
const formAddress = 'http://localhost:5000/api/builder';


export class Builder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last: this.props.location.state.last,
            formName: '',
            inputs: [
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
        this.handleSave = this.handleSave.bind(this);
        this.appendInput = this.appendInput.bind(this);
    }

    updateDataBase(params) {
        var request = new XMLHttpRequest();
        request.open('POST', formAddress, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var jsonToSend = JSON.stringify(params);
        request.send(jsonToSend);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let inputs = this.state.inputs.slice();
        for (let i in inputs) {
            if (inputs[i].inputName === name) {
                inputs[i].inputFieldLabel = value;
                inputs[i].inputType = value;
                this.setState({ inputs });
                break;
            }
        }
        
    }

    handleSave(event) { 
        event.preventDefault();
        
        var form = {
            formID: this.state.last ,
            formName: this.state.formName,
            labels: this.state.inputs,
            numOfSubmissions: 0,
            submits: []
        };
        this.updateDataBase(form);

        this.setState({
            last: this.state.last +1,
            formName: '',
            inputs: []
        });
    }

    appendInput() {
        event.preventDefault();
        
        var newInput = {
            inputName: document.getElementById("inputName").value,
            inputFieldLabel: document.getElementById("FieldLabel").value,
            inputType: document.getElementById("inputType").value
        };
        if(newInput.inputName !== '' || newInput.inputFieldLabel !== '' ){
            this.setState({ inputs: this.state.inputs.concat([newInput]) });
            this.setState({
                inputName: '',
                inputFieldLabel: '',
            });
        }
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
                                onClick={this.appendInput}> Add Label
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
                            <button type="save" className="btn btn-success" onClick={this.handleSave}>
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