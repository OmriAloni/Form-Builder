import React from "react";
import { NavLink, Redirect } from "react-router-dom";
const formsAddress = 'http://localhost:5000/api/forms';

import { Builder } from "./Builder";
import { Submit } from "./Submit";
import { Submissions } from "./Submissions";

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last: 2,
            showBuilder: false,
            forms: []
        };

        this.handleAddForm = this.handleAddForm.bind(this);
        this.BuilderButtonClick = this.BuilderButtonClick.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.moveElements = this.moveElements.bind(this);
    }

    updateDataBase(params) {
        
    }

    componentDidMount(){
        fetch(formsAddress)
        .then(res => res.json())
        .then (forms => this.setState({forms}, ()=> console.log('Forms fetched..',
        forms)));
    }

    handleAddForm(formToAdd) { 
        var form = {
            formID: this.state.last,
            formName: formToAdd.formName,
            labels: formToAdd.inputs,
            numOfSubmissions: 0,
            submits: []
        };

        this.setState({ last: this.state.last +1});
        this.setState({ forms: [...this.state.forms, form] });
        // updateDataBase(this.state.form);
    }

    moveElements(source, target) {
        for (var i = 0; i < source.length; i++) {
            var element = source[i].inputFieldLabel;
            source.splice(i, 1);
            target.push(element);
            i--;
        }
    }


    handleSubmitForm(submitToAdd) {
        var submit = {
            submitID: submitToAdd.submits.length,
            inputs: []
        };

        moveElements(submitToAdd.labels, submit.inputs);

        this.setState(
            { forms: this.state.forms[submitToAdd.formID].numOfSubmissions + 1 },
            { forms: [...this.state.forms[submitToAdd.formID].submits, submit] }
        );

        // updateDataBase(this.state.forms);
    }

    BuilderButtonClick() {
        this.setState({
            showBuilder: true
        });
    }

    FormRow = (props) => {
        return (
            <tr>
                <td>{props.data.formID}</td>
                <td>{props.data.formName}</td>
                <td>{props.data.numOfSubmissions}</td>
                <td><NavLink to={{ pathname: '/Submit'     , state: { form: props.data } }} > View </NavLink></td>
                <td><NavLink to={{ pathname: '/Submissions', state: { form: props.data } }} > View </NavLink></td>
            </tr>
        );
    }


    render() {
        
        let rows = this.state.forms.map(form => {
            return (<
                this.FormRow
                key={form.formID}
                data={form}
                    />);
        });

        return (
            <div className="container">
                <h4> Form Builder App </h4>

                <table ata-toggle="table1" cellPadding="10" border="1" >
                    <thead>
                        <tr>
                            <th>   Form ID   </th>
                            <th>   Form Name   </th>
                            <th>   # Submissions   </th>
                            <th>   Submit Page   </th>
                            <th>   Submissions Page   </th>
                        </tr>
                    </thead>
                    <tbody> {rows} </tbody>
                </table>
            
                <br/>
                
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="save" className="btn btn-success" onClick={this.BuilderButtonClick} >
                            Create a Form
                        </button>
                        {this.state.showBuilder ?
                            <Builder handleAddForm={(form) => this.handleAddForm(form)}/> : null
                        }  
                    </div>
                </div>
            </div>
        );    
    }
    get displayName() { return 'Home'; }
}