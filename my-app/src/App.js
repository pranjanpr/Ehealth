import React,{Component} from 'react';
import './App.css';
import {Layout,Header,Navigation,Drawer,Content,Textfield} from 'react-mdl';
import Main from './components/main';
import {Link} from 'react-router-dom';



class App extends Component {
   
  render(){
    
  return (
    
<div className="demo-big-content">
<Layout >
    <Header className="header-color" title="E-HEALTH" >
        <Navigation>
            <Link to ="/doctor">Doctor</Link>
            <Link to="/nursing">Nursing</Link>
            <Link to="/hospitals">Hospitals</Link>
            <Link to="/aboutus">About us</Link>
            <Link to="/contactus">Contact us</Link>
        </Navigation>
        <Textfield
                value=""
                onChange={() => {}}
                label="Search for medicines"
                expandable
                expandableIcon="search"
            />
    </Header>
    <Drawer title="Title">
        <Navigation>
            <Link to="/">Home</Link>
            <a href="/">Link</a>
            <a href="/">Link</a>
            <a href="/">Link</a>
            <a href="/">Link</a>
        </Navigation>
    </Drawer>
    <Content>
    <div><Main/></div>
   </Content>
   
</Layout>

</div>

 
  );
}
}
export default App;








