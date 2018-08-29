import React from "react";
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();
import { NavLink } from "react-router-dom";

export class Submissions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formID: this.props.location.state.form.formID,
            formName: this.props.location.state.form.formName,
            numOfSubmissions: this.props.location.state.form.numOfSubmissions,
            labels: this.props.location.state.form.labels,
            submits: this.props.location.state.form.submits
        };
    }

    FormRow = (props) => {
        return (
            <tr>
                <td>{props.data.submitID}</td>
                {props.data.inputs.map(input => {
                    return (<td>{input}</td>);
                })}
            </tr>
        );
    }

    render() {
        let rows = this.state.submits.map(submit => {
            return (<
                this.FormRow
                key={submit.submitID}
                data={submit}
            />);
        });

        return (
            <div className="container">
                <h2>{this.state.formName} Submissions </h2>
                
                <table ata-toggle="table" cellPadding="10" border="1" text-indent= "10px" >
                    <thead>
                        <tr>
                            <th>Form ID</th>
                            {this.state.labels.map((label, index) => (
                                <th>{label.inputName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>

                <br/>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button 
                        type="save" 
                        className="btn btn-success">
                            <NavLink 
                                to={"/Home"} 
                                className="White-Link" > 
                                Back  
                            </NavLink> 
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    get displayName() { return 'Submissions'; }
}