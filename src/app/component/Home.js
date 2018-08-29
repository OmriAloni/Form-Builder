import React from "react";
import { NavLink, Redirect } from "react-router-dom";
const formsAddress = 'http://localhost:5000/api/forms';
const lastAddress = 'http://localhost:5000/api/last';


export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last: 2,
            forms: []
        };  
    }
    
    componentDidMount(){
        fetch(formsAddress)
        .then(res => res.json())
        .then (forms => this.setState({forms}, ()=> console.log('Forms fetched..',
        forms)));

        fetch(lastAddress)
        .then(res => res.json())
        .then (last => this.setState({last},()=> console.log('last fetched',
        last)));
    }

    
    FormRow = (props) => { 
        return (
            <tr>
                <td>{props.data.formID}</td>
                <td>{props.data.formName}</td>
                <td>{props.data.numOfSubmissions}</td>
                <td><NavLink to={{ pathname: '/Submit', state: { form: props.data } }} > View </NavLink></td>
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
                formPath={"/" + form.formID}
                    />);
        });

        return (
            <div className="container">
                <h4> Form Builder App </h4>
                <p>To add a new form: click Create Form</p>

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
                
                <div className="CreateFormButton">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="save" className="btn btn-success"  >
                            <NavLink 
                                to={{ pathname: "/Builder" , 
                                state: { last: this.state.last } }} 
                                className="White-Link" > Create Form 
                            </NavLink>
                        </button> 
                    </div>
                </div>
            </div>
        );    
    }
    get displayName() { return 'Home'; }
}