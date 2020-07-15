import React,{Component} from 'react';
import {CardTitle,Card,CardText,CardActions,CardMenu,Button,IconButton} from 'react-mdl';
import DoctorData from '../data/doctordata';



const DoctorList= DoctorData.map(doctor =>(
    <div style={{padding:'10px'}}>
            <Card shadow={0} style={{width: '300px', margin: 'auto'}}>
    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=338&ext=jpg) center / cover'}}>{doctor.lastName}</CardTitle>
    <CardText>
        {doctor.firstName}
    </CardText>
    <CardActions border>
        <Button colored>Availablity</Button>
        <Button colored>Ratings</Button>
        <Button colored>Message</Button>
        <Button colored>Audio Chat</Button>
        <Button colored>Video Chat</Button>
        <Button colored>{doctor.rate}</Button>
    </CardActions>
    <CardMenu style={{color: '#fff'}}>
        <IconButton name="share" />
    </CardMenu>
</Card></div>
))
class Doctor extends Component {
    render(){
        return(<div>{DoctorList}</div>
        )
    }
}
export default Doctor;