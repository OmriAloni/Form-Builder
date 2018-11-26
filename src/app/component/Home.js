import React from "react";
import { NavLink } from "react-router-dom";

const formsAddress  = 'http://localhost:5000/api/forms';  //adress to fetch forms from DB 
const lastAddress   = 'http://localhost:5000/api/last';   // adress to fetch last ID from DB
const deleteAddress = 'http://localhost:5000/api/delete'; // adress to delete form from DB

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last: 2, // holds the id of the last form
            forms: [] // holds all the forms and their submissions
        };
        this.handleDeleteForm = this.handleDeleteForm.bind(this);  
    }
    
    componentDidMount(){ // runs at the begging of the component lifecycle to fetch data from DB
        // fetch forms
        fetch(formsAddress)
        .then(res => res.json())
        .then (forms => this.setState({forms}, ()=> console.log('Forms fetched..',
        forms)));

        //fetch last
        fetch(lastAddress)
        .then(res => res.json())
        .then (last => this.setState({last},()=> console.log('last fetched',
        last)));
    }

    handleDeleteForm(formToDelete) { // handles "delete form" click. send a request to server to delete form
        event.preventDefault();
        
        var request = new XMLHttpRequest(); // XMLrequest to delete the form
        request.open('POST', deleteAddress, false);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var formAsJson = JSON.stringify(formToDelete); // send in json format
        request.send(formAsJson);

        console.log(this.state.forms);
        this.componentDidMount();
        console.log(this.state.forms);
    }

    
    // forms a row at the forms table with the following columns.
    //  Form id
    //  Form Name
    //  Number of Submissions
    //  link to Form Submit Page
    //  link to Form Submissions Page
    FormRow = (props) => { 
        return (
            <tr>
                <td>{props.data.formID}</td> 
                <td>{props.data.formName}</td>
                <td>{props.data.numOfSubmissions}</td>
                <td><NavLink to={{ pathname: '/Submit' + props.formPath, state: { form: props.data } }} > View </NavLink></td>
                <td><NavLink to={{ pathname: '/Submissions' + props.formPath, state: { form: props.data } }} > View </NavLink></td>
            </tr>
        );
    }

    render() {
        
        let rows = this.state.forms.map(form => {
            return (<
                this.FormRow
                key={form.formID}
                data={form}
                formPath={"/" + form.formID}
                    />);
        });

        return (
            <div className="container">
                <h4> Form Builder App </h4>
                <p>To add a new form, press Create Form</p>

                <table ata-toggle="table1" cellPadding="10" border="1" >
                    <thead>
                        <tr>
                            <th>   Form ID          </th>
                            <th>   Form Name        </th>
                            <th>   # Submissions    </th>
                            <th>   Submit Page      </th>
                            <th>   Submissions Page </th>
                        </tr>
                    </thead>
                    <tbody> {rows} </tbody>
                </table>
            
                <br/>
                
                <div className="CreateFormButton">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="save" className="btn btn-success"  >
                            <NavLink 
                                to={{ pathname: "/Builder" , 
                                state: { last: this.state.last } }} 
                                className="White-Link" >
                                    Create Form 
                            </NavLink>
                        </button> 
                    </div>
                </div>
            </div>
        );    
    }
    
    get displayName() { return 'Home'; }
}
