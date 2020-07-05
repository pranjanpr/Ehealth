import React,{Component} from 'react';
import '../App.css';
import {Layout,Header,Navigation,Drawer,Content,Textfield} from 'react-mdl';
import Main from './main';
import {Link} from 'react-router-dom';

class HomePage extends Component{
    render(){
        return (
           <div><h1>Home Page</h1></div>

        )
    }
}

export default HomePage;