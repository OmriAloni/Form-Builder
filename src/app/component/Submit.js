import React from "react";
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();
import { NavLink, Redirect } from "react-router-dom";
const submitAddress = 'http://localhost:5000/api/submit';

export class Submit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formID: this.props.location.state.form.formID,
            formName: this.props.location.state.form.formName,
            numOfSubmissions: this.props.location.state.form.numOfSubmissions,
            labels: this.props.location.state.form.labels,
            submits: this.props.location.state.form.submits
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.moveElements = this.moveElements.bind(this);
        
    }

    moveElements(source, target) {
        for (var i = 0; i < source.length; i++) {
            var element = source[i].inputFieldLabel;
            target.push(element);         
        }
        return (target);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        let labels = this.state.labels.slice();
        for (let i in labels) {
            if (labels[i].inputName === name) {
                labels[i].inputFieldLabel = value;
                this.setState({ labels });
                break;
            }
        }
    }

    updateDataBase(params) {
        var request = new XMLHttpRequest();
        request.open('POST', submitAddress, true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var jsonToSend = JSON.stringify(params);
        request.send(jsonToSend);
    }

    handleSubmit(event) {
        event.preventDefault();

        var formToAdd = this.props.location.state.form;
        formToAdd.numOfSubmissions = formToAdd.numOfSubmissions + 1;

        var submit = {
            submitID: formToAdd.submits.length,
            inputs: []
        };

        submit.inputs = this.moveElements(formToAdd.labels, submit.inputs);

        formToAdd.submits.push(submit);

        this.updateDataBase(formToAdd);

        let labels = this.state.labels.slice();
        for (let i in labels) {
                labels[i].inputFieldLabel = '';
                this.setState({ labels });
         }
    }
   
    render() {
        return (
            <div className="container">
                <h2> {this.state.formName} form </h2>
                <p> please fill the {this.state.formName} form and click Submit </p>
      
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
                        <button type="save" className="btn btn-success" onClick={this.handleSubmit}>Submit Form</button>
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