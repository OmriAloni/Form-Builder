import React from "react";
import createBrowserHistory from 'history/createBrowserHistory';
const newHistory = createBrowserHistory();
import { NavLink, Redirect } from "react-router-dom";

export class Submit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            formID: this.props.location.state.form.formID,
            formName: this.props.location.state.form.formName,
            numOfSubmissions: this.props.location.state.form.numOfSubmissions,
            labels: this.props.location.state.form.labels,
            submits: this.props.location.state.form.submits
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmitForm = this.handleSubmitForm.bind(this.props.location.handleSubmitForm);
        
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            numOfSubmissions: numOfSubmissions + 1
        });

        //handleSubmitForm(this.state); 

        let labels = this.state.labels.slice();
        for (let i in labels) {
                labels[i].inputFieldLabel = '';
                this.setState({ labels });
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/Home' }} />;
        }
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
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
                        {this.renderRedirect()}
                        <button type="save" className="btn btn-success" onClick={() => { this.props.route.handleSubmitForm(this.state); this.setRedirect(); }}>Submit Form</button>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="save" className="btn btn-success">
                            <NavLink to={"/Home"} activeClassName="active" > Back  </NavLink> </button>
                    </div>
                </div>
            </div>
        );
    }

    get displayName() { return 'Submit'; }
}