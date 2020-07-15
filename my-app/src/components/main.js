import React from 'react';
import LandingPage from './Landingpage';
import {Switch,Route} from 'react-router-dom';
import Nursing from './nursing';
import Doctor from './doctor';
import Hospitals from './hospitals';
import Aboutus from './aboutus';
import Contactus from './contactus';
import DoctorSignup from './doctorsignup';
import Login from './login';
import Dashboard from './patientconsole';
import Homepage from './homepage';
import Teststripe from './teststripe';
import Success from './Success';
import Canceled from './Canceled';
import Checkout from './Checkout';
import Searched from './searchresults';
import DoctorDashboard from './doctorconsole';

const Main=()=>{
   return ( <Switch>
    <Route exact path="/" component={Homepage}/>
    <Route  path="/Landingpage" component={LandingPage}/>
    <Route  path="/nursing" component={Nursing}/>
    <Route  path="/doctor" component={Doctor}/>
    <Route  path="/hospitals" component={Hospitals}/>
    <Route path="/doctorconsole" component={DoctorDashboard}/>
    <Route path="/doctorsignup" component={DoctorSignup}/>
    <Route path="/login" component={Login}/>
    <Route path="/patientconsole" component={Dashboard}/>
    <Route path="/teststripe" component={Teststripe}/>
    <Route path="/Checkout" component={Checkout}/>
    <Route path="/Canceled" component={Canceled}/>
    <Route path="/Success" component={Success}/>
    <Route path="/searchresults" component={Searched}/>
    </Switch>);
}
export default Main;