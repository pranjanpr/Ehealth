import React, {useState} from 'react';
import {CardTitle,Card,CardText,CardActions,CardMenu,Button,IconButton} from 'react-mdl';
import DoctorData from '../data/doctordata';
import {Dropdown} from 'react-bootstrap'
import {Modal} from 'react-bootstrap'



export default function Doctor({patient_email, closingsearch}){   
    
    const headers = new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
    });

    const [email_of_doctor, setEmail] = useState("");
    const [date_of_doctor, setDate] = useState("");
    const [starttime_of_doctor, setStartTime] = useState("");
    const [endTime_of_doctor, setEndTime] = useState("");
    const [firstName_of_doctor, setFirstName] = useState("");
    const [typeofcall, setTypeofCall] = useState("");
    const [confirmmodal, setconfirmmodal] = useState(false);

    const testBackend = async () => {     
        var user = {
          patient_email_id: patient_email,
          specialist_email_id: email_of_doctor,
          date: date_of_doctor,
          time_start: starttime_of_doctor,
          time_end: endTime_of_doctor,
          type_of_call: typeofcall     
          };
        var users = [user]

        const test = await fetch("http://localhost:8000/appointment/", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(users),
          cache: "default"
        });
        const testJson = await test.json();
        if(testJson)
          console.log(testJson.status);
      
      }
    
    const date_time_selecter = (date, starttime, endtime, emailid, firstnameid) => {
        console.log(date, starttime, endtime, emailid, firstnameid);
        console.log(patient_email);
        setDate(date);
        setStartTime(starttime);
        setEndTime(endtime);
        setEmail(emailid);
        setFirstName(firstnameid); 
    }

    const typeofcallselector = (data, emailid) => {
        console.log(data, emailid);
        setTypeofCall(data);
    }

    const closeconfirm = () => {
        setconfirmmodal(false);
    }

    const openconfirm = () => {
        setconfirmmodal(true);
    }

    const submit = () => {
        if((email_of_doctor != "")&&(date_of_doctor!="")&&(starttime_of_doctor!="")&&(endTime_of_doctor!="")&&(firstName_of_doctor!="")&&(typeofcall!="")){
            testBackend();
            closingsearch();
        }    

        else{
            alert("kindly dont leave any detail empty");
        } 


    }

    const DoctorList= DoctorData.map(doctor =>(
        <div style={{padding:'10px'}}>
                <Card shadow={0} style={{width: '300px', margin: 'auto'}}>
        <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg) center / cover'}}>{doctor.specialization}</CardTitle>
       <CardText>
            {doctor.firstName}
        </CardText>
        <CardActions border>
            
            <Button colored >experience:{doctor.experience}</Button>
            <Button colored onClick = {() => typeofcallselector("Chat", doctor.email)}>Message</Button>
            <Button colored onClick = {() => typeofcallselector("Audio", doctor.email)}>Audio Chat</Button>
            <Button colored onClick = {() => typeofcallselector("Video", doctor.email)}>Video Chat</Button>
            <Button colored>{doctor.rate}</Button>
            <Button colored onClick = {openconfirm}>Confirm</Button>
            
            <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic">
                Availability for Next Two days
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-22", "11:00:00", "12:00:00", doctor.email, doctor.firstName)}>22/07/2020 11am-12pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-22", "14:00:00", "15:00:00", doctor.email, doctor.firstName)}>22/07/2020 2pm-3pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-22", "17:00:00", "18:00:00", doctor.email, doctor.firstName)}>22/07/2020 5pm-6pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-22", "20:00:00", "21:00:00", doctor.email, doctor.firstName)}>22/07/2020 8pm-9pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-22", "21:00:00", "22:00:00", doctor.email, doctor.firstName)}>22/07/2020 9pm-10pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-23", "9:00:00", "10:00:00", doctor.email, doctor.firstName)}>23/07/2020 9am-10am</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-23", "12:00:00", "13:00:00", doctor.email, doctor.firstName)}>23/07/2020 12pm-1pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-23", "16:00:00", "17:00:00", doctor.email, doctor.firstName)}>23/07/2020 4pm-5pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-23", "17:00:00", "18:00:00", doctor.email, doctor.firstName)}>23/07/2020 5pm-6pm</Dropdown.Item>
            <Dropdown.Item onClick = {() => date_time_selecter("2020-07-23", "18:00:00", "19:00:00", doctor.email, doctor.firstName)}>23/07/2020 6pm-7pm</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </CardActions>
            <CardMenu style={{color: '#fff'}}>
            <IconButton name="share" />
            </CardMenu>
            </Card></div>
    ))
   
    if(confirmmodal==false){
        return(
        <div>{DoctorList}</div>
        )}

    else{
        return (
        <div>
            <Modal show={confirmmodal}>
            <Modal.Header closeButton onClick = {closeconfirm}>
            <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h2>Kindly provide your confirmation for the appointment details</h2>
                <br></br>
                <h5>Name of Doctor: {firstName_of_doctor}</h5>
                <br></br>
                <h5>Email Id of Doctor: {email_of_doctor}</h5>
                <br></br>
                <h5>Date of Appointment: {date_of_doctor}</h5>
                <br></br>
                <h5>Start Time: {starttime_of_doctor}</h5>
                <br></br>
                <h5>End Time: {endTime_of_doctor}</h5>
                <br></br>
                <h5>Type of Call: {typeofcall}</h5>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={submit}>
            Confirm
            </Button>
            <Button variant="secondary" onClick={closeconfirm}>
            Close
            </Button>
            </Modal.Footer>
            </Modal>
      </div>
        )
    };
        
    
}
