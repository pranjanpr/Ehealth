import React,{Component} from 'react';
import {CardTitle,Card,CardText,CardActions,CardMenu,Button,IconButton} from 'react-mdl';
import Hospdata from '../data/hospdata';


const hospitalList= Hospdata.map(hospital =>(
    <div style={{padding:'10px'}}>
            <Card shadow={0} style={{width: '300px', margin: 'auto'}}>
    <CardTitle style={{color: '#fff', height: '176px', background: 'url(https://images.newindianexpress.com/uploads/user/imagelibrary/2020/3/27/w900X450/DFFDGHGx.jpg) center / cover'}}>{hospital.name}</CardTitle>
    <CardText>
        {hospital.size}
    </CardText>
    <CardActions border>
        <Button colored>Availablity</Button>
        <Button colored>Ratings</Button>
    </CardActions>
    <CardMenu style={{color: '#fff'}}>
        <IconButton name="share" />
    </CardMenu>
</Card></div>
))
class Hospitals extends Component {
    render(){
        return(<div>{hospitalList}</div>
        )
    }
}
export default Hospitals;