import React from 'react';
import LandingPage from './Landingpage';
import {Switch,Route} from 'react-router-dom';
import Nursing from './nursing';
import Doctor from './doctor';
import Hospitals from './hospitals';
import Aboutus from './aboutus';
import Contactus from './contactus';
import DoctorSignup from './doctorsignup';


const Main=()=>{
   return ( <Switch>
    <Route exact path="/" component={LandingPage}/>
    <Route  path="/nursing" component={Nursing}/>
    <Route  path="/doctor" component={Doctor}/>
    <Route  path="/hospitals" component={Hospitals}/>
    <Route  path="/aboutus" component={Aboutus}/>
    <Route  path="/contactus" component={Contactus}/>
    <Route path="/doctorsignup" component={DoctorSignup}/>
    </Switch>);
}
export default Main;