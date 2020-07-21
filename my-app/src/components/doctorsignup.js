import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

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


class DoctorSignup extends Component{
    
        constructor(props) {
            super(props);
        
            this.state = {
              QB : require('../../node_modules/quickblox/quickblox'),
              id: 0,
              firstName: null,
              lastName: null,
              email: null,
              password: null,
              confirmpassword: null,
              dob:null,
              postalcode:null,
              
              privatized:null,
              speciality:null,
            
              formErrors: {
                is_Auth: false,
                firstName: "",
                lastName: "",
                email: "",
                speciality:"",
                experience:"",
                privatized:"",
                cap:"",
                password: "",
                confirmpassword:"",
                dob:"",
                postalcode:"",
                
              }
            };
          }

          componentWillMount(){
            var CREDENTIALS = {
            'appId': "84745",
            'authKey': 'LdXtzcfrYbBjeAe',
            'authSecret': 'dBGXnpyZWmqzTWf'
            };
    
            (this.state.QB).init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret);
            
            var params = {login: 'sajal',password: 'quickblox'};  
          
            (this.state.QB).createSession(params, function(err, result) {
            if(result)
            {
            console.log("session created");
            console.log(result);
            }
            else
            {
            console.log("error thrown");
            console.error(err);// callback function
            }
          });
          }


          first_function = function() { 
            console.log("Entered first function"); 
            return new Promise(resolve => { 
              resolve(this.create_user()); 
            }); 
            }; 
    

          testBackend = async () => {

            var place_of_practices = "";

            place_of_practices = this.state.privatized;  

            var user = {
              email: this.state.email,
              name: this.state.firstName + " " + this.state.lastName,
              speciality: this.state.speciality,
              experience: this.state.experience,
              place_of_practice: place_of_practices,
              postal_code: this.state.postalcode,
              password: this.state.password    
              };
            var users = [user]
    
            const test = await fetch("http://localhost:8000/specialist_signup/", {
              method: "POST",
              headers: headers,
              body: JSON.stringify(users),
              cache: "default"
            });
            const testJson = await test.json();
            if(testJson)
              console.log(testJson.status)

            if(testJson.status == "Ok"){
              console.log("Entered testBackend");

              const first_promise= await this.first_function(); 
              console.log("After awaiting," + 
              "the promise returned from first function is:"); 
              console.log(first_promise); 
              alert("Ok");
              this.setState({is_Auth:true});
              }
            else
              alert(((testJson.status[0]).email)[0])    
          }


          create_user = () => {
            var param = {
              password: "quickblox",
              full_name: "quickblox",
              email: this.state.email
            };
            (this.state.QB).users.create(param, function(err, res) {
              if (err) {
                console.log("error in creation")
                console.error(err)
              } else {
                console.log(res)
              }
            });
            return "sajal";
          }
        
          handleSubmit = e => {
            e.preventDefault();
        
            if (formValid(this.state)) {
              console.log(`
                --SUBMITTING--
                First Name: ${this.state.firstName}
                Last Name: ${this.state.lastName}
                Email: ${this.state.email}
                Password: ${this.state.password}
                
                Date of Birth: ${this.state.dob}
                Postal Code:${this.state.postalcode}
                Speciality:${this.state.speciality}
                Experience:${this.state.experience}
                Privatized:${this.state.privatized}


              `);
              this.testBackend()
            } else {
              console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
              alert("Please fulfill all the criteria of each field");
            }
          };
           
          handleChange = e => {
            e.preventDefault();
            const { name, value } = e.target;
            let formErrors = { ...this.state.formErrors };
        
            switch (name) {
              case "firstName":
                formErrors.firstName =
                  value.length < 3 ? "minimum 3 characaters required" : "";
                break;
              case "lastName":
                formErrors.lastName =
                  value.length < 3 ? "minimum 3 characaters required" : "";
                break;
              case "email":
                formErrors.email = emailRegex.test(value)
                  ? ""
                  : "invalid email address";
                break;
              case "speciality":
                formErrors.speciality =
                  value.length < 3 ? "minimum 3 characaters required" : "";
                break;
              case "experience":
                formErrors.experience =
                  value.length < 1 ? "minimum 1 characaters required" : "";
                break;
              case "privatized":
                    formErrors.privatized =
                      value.length < 3 ? "minimum 3 characaters required" : "";
                    break;
              
                case "postalcode":
                formErrors.postalcode =
                  value.length !== 6 ? "exact 6 number required" : "";
                break;
              case "password":
                formErrors.password =
                  value.length < 6 ? "minimum 6 characaters required" : "";
                break;
              case "confirmpassword":
                formErrors.confirmpassword =
                  this.state.password !== value ? "Entered value dosen't match the original Password" : "";
                break;
             
            case "dob":
                formErrors.dob =
                  value.length < 1 ? "minimum 1 characaters required" : "";
                break;
              default:
                break;
            }
        
            this.setState({ formErrors, [name]: value }, () => console.log(this.state));
          };
          render(){
            const { formErrors } = this.state;
            if(!this.state.is_Auth){
            return(
            <div className="wrapper">
            <div className="form-wrapper">
              <h1>Specialist Sign Up</h1>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="firstName">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    className={formErrors.firstName.length > 0 ? "error" : null}
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="lastName">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className={formErrors.lastName.length > 0 ? "error" : null}
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.lastName.length > 0 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                  )}
                </div>
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
                <div className="speciality">
                  <label htmlFor="speciality">Speciality</label>
                  <input
                    className={formErrors.speciality.length > 0 ? "error" : null}
                    placeholder="Specialization"
                    type="text"
                    name="speciality"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.speciality.length > 0 && (
                    <span className="errorMessage">{formErrors.speciality}</span>
                  )}
                </div>
                <div className="experience">
                <label htmlFor="experience">Experience</label>
                <input
                  className={formErrors.experience.length > 0 ? "error" : null}
                  placeholder="Years"
                  type="Number"
                  name="experience"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.experience.length > 0 && (
                  <span className="errorMessage">{formErrors.experience}</span>
                )}
              </div>
              <div className="privatized">
                  <label htmlFor="privatized">Privatized Clinic \ Hospital Name</label>
                  <input
                    className={formErrors.privatized.length > 0 ? "error" : null}
                    placeholder="Clinic Name \ Hospital Name"
                    type="text"
                    name="privatized"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.privatized.length > 0 && (
                    <span className="errorMessage">{formErrors.privatized}</span>
                  )}
                </div>
               
                <div className="dob">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    className={formErrors.dob.length > 0 ? "error" : null}
                    placeholder="DD/MM/YYYY"
                    type="date"
                    name="dob"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.dob.length > 0 && (
                    <span className="errorMessage">{formErrors.dob}</span>
                  )}
                </div>
                <div className="postalcode">
                  <label htmlFor="postalcode">Postal Code</label>
                  <input
                    className={formErrors.postalcode.length > 0 ? "error" : null}
                    placeholder="6 Digits"
                    type="postalcode"
                    name="postalcode"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.postalcode.length > 0 && (
                    <span className="errorMessage">{formErrors.postalcode}</span>
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
                <div className="confirmpassword">
                  <label htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    className={formErrors.confirmpassword.length > 0 ? "error" : null}
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmpassword"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.confirmpassword.length > 0 && (
                    <span className="errorMessage">{formErrors.confirmpassword}</span>
                  )}
                </div>
                <div className="createAccount">
                  <button type="submit">Create Account</button>
                    
                
                
                </div>
              </form>
            </div>
            </div>
        
        )
    }
    else{
      return <Redirect to="/"/>
    }
  }
  
}


export default DoctorSignup;