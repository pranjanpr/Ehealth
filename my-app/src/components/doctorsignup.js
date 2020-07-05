import React, { Component } from 'react';


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

class DoctorSignup extends Component{
    
        constructor(props) {
            super(props);
        
            this.state = {
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
            } else {
              console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
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
                  value.length < 3 ? "minimum 3 characaters required" : "";
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
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.speciality}</span>
                  )}
                </div>
                <div className="experience">
                <label htmlFor="experience">Experience</label>
                <input
                  className={formErrors.speciality.length > 0 ? "error" : null}
                  placeholder="Years"
                  type="Number"
                  name="experience"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
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
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.privatized}</span>
                  )}
                </div>
               
                <div className="dob">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    className={formErrors.dob.length > 0 ? "error" : null}
                    placeholder="DD/MM/YYYY"
                    type="dob"
                    name="dob"
                    noValidate
                    onChange={this.handleChange}
                  />
                  {formErrors.dob.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
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
                  {formErrors.password.length > 0 && (
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
}

export default DoctorSignup;