import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import Patientpage from './patientconsole'
import Doctorpage from './doctor'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
});  

class Login extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
       
          email: null,
          password: null,
          isAuth: false,
          is_patient: true,
          patient_information: "52",
          formErrors: {
            
            email: "",
            password: "",
           
           
          }
        };
      }

      
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
           
            Email: ${this.state.email}
            Password: ${this.state.password}
        
          `);
          var place_of_practices = ""

          if(this.state.hospitalname!="")
            place_of_practices = this.state.hospitalname
          else
            place_of_practices = this.state.privatized  
  
          var user = {
            email: this.state.email,
            password: this.state.password    
            };
          var users = [user]
  
          fetch('http://localhost:8000/patient_doctor_login/',
                  {
                      method: 'POST',
                      body: JSON.stringify(users),
                      headers: headers
                  }
              )
              .then(res => res.json())
              .then(res => {
                  if(res.status === "Ok") {
                    this.setState({isAuth: true, patient_information: res.details})
                    
                  }
                  if(res.is_it_patient == 0) this.setState({is_patient: false})
              })
              .catch(error => console.error(error));

        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
    
      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };
    render(){
        const { formErrors } = this.state;

        if(this.state.isAuth) {
          if(this.state.is_patient){
           return (
              <Patientpage patientinfo = {this.state.patient_information}/>
           )
          }
           else{
            return (
              <Doctorpage></Doctorpage>
           )
           }
        }

        return(
            <div className="wrapper">
            <div className="form-wrapper">
              <h1>Login</h1>
              <form onSubmit={this.handleSubmit} noValidate>
                
                  
               
                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                </div>
                
                <div className="password">
                  <label htmlFor="password">Password</label>
                  <input
                    className={formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
                
                <div className="createAccount">
                  <button type="submit">Login</button>
                    
                  <Link to ="/Landingpage"><short>
                  Don't have an account ? Create one here.
                  </short></Link>  
                
                </div>
              </form>
            </div>
            </div>
        )
    }
}
export default Login;