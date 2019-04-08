import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner, Alert } from 'reactstrap';
import './App.css';
import classnames from 'classnames';
import Homepage from './Homepage';
import Friends from './Friends';
import Profile from './Profile';
import Notifications from './Notifications';
import MyFriends from './MyFriends';
import MyPosts from './MyPosts';
import ForeignAuthors from './ForeignAuthors';
import Logo from './logoback.png';




var host_url = 'http://localhost:8000'
var host_url = 'https://project-cmput404.herokuapp.com';
var login_url = host_url+'/api/auth/login';
var logout_url = host_url+'/api/auth/logout';
var register_url = host_url+'/api/auth/register';

//const { Header, Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      login: false,
      token: 'null',
      signup: false,
      username: 'null',
      githubURL: 'null',
      loading : false
    };
  }




  
  componentDidMount(){
    this.setState({login:false})
    
  }

  startloading() { 
    this.setState({loading : true})
    setTimeout(
      function() {
          this.setState({loading : false });
      }
      .bind(this),
      5000
  );
  }

  doneloading() {
    this.setState({loading : false})
  }

  trylogin(){
    
    console.log("this should be user name in app")
    console.log(document.getElementById("usernameText").value)
    // console.log(this.state);

    var data = {
      "username": document.getElementById("usernameText").value,
      "email":"",
      "password":document.getElementById("userPassword").value,
    };
    this.setState({username: data["username"]});

    // var data = {"username": "yi", "email":"", "password":"1"};

    fetch(login_url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log('Success:', JSON.stringify(response));
      if (response.hasOwnProperty("token")){
        this.setState({login:true, token: response["token"],username:document.getElementById("usernameText").value});
        console.log("here is the login response")
        console.log(response);
      }else{
        document.getElementById('alert').innerHTML = response.non_field_errors;
      }

    })
    .catch(error => console.error('Error:', error));
  }

  try_getinfo() {

  }

  trylogout(){

    fetch(logout_url, {
      method: 'POST', // or 'PUT'
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'token '+this.state.token,
      }
    });
    this.setState({login:false, signup:false,username:'null'});
  }

  tryregister(){

      // console.log(document.getElementById("usernameText").value);

      var data = {
          "username": document.getElementById("usernameText").value,
          "email":document.getElementById("emailText").value,
          "password":document.getElementById("userPassword").value,
      };
      console.log(data);
      fetch(register_url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log('Success:', JSON.stringify(response));
        this.setState({login:false, signup:false});
      })
      .catch(error => console.error('Error:', error));
  }






  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  
  render() {
    // #bdc3c7, #2c3e50
    // document.body.style.backgroundColor = 'linear-gradient(#green, #2c3e50);'
    // document.body.style = 'background: linear-gradient(#bdc3c7, #2c3e50)'
    
    if (!this.state.login){
        if (this.state.signup){
            return(
                <center >

                  <Col sm="6">
                  <h1>Sign Up</h1>
                    <Form  className='loginForm'>
                      <FormGroup>
                        <Label for="usernameText">User name</Label>
                        <Input name="text" id="usernameText" placeholder="Enter your user name" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="userPassword">Password</Label>
                        <Input type="password" name="password" id="userPassword" placeholder="Enter your password" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="Text">Email</Label>
                        <Input name="text" id="emailText" placeholder="Enter your user email" />
                      </FormGroup>
                      <Button className='loginbuttons' onClick={()=> {this.setState({signup:false})}}>Go Back</Button>
                      <Button className='loginbuttons' onClick={()=> {this.tryregister();}}>Sign up</Button>
                      <Alert id='alert' color="info"></Alert>
                    </Form>
                  </Col>
                </center>
            )
        };
      return(
        <center>
          

          <Col sm="6">
          
          
            <Form  className='loginForm' >
              {/* <Spinner type="grow" color="primary" /> */}
              <img src={require('./logoback.png')} width='50%' height="50%" alt="cam"/>
              <FormGroup>
                <Label for="usernameText">User name</Label>
                <Input name="text" id="usernameText" placeholder="Enter your user name" />
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input type="password" name="password" id="userPassword" placeholder="Enter your password" />
              </FormGroup>
              <Button className='loginbuttons' onClick={()=> {this.trylogin();}}>Login</Button>
              <Button className='loginbuttons' onClick={()=> {this.setState({signup: true});}}>Sign up</Button>
              <Alert id='alert' color="info"></Alert>
            </Form>
          </Col>
        </center>
      );
    };
    return (
      
      <div>
        <Nav tabs className='navtab'>
          
          {/* <i style={{ fontSize: 40, width:50, marginLeft:10, marginTop:2 }} class="fas fa-user-circle"></i> */}
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-home"></i>
              Homepage
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-binoculars"></i>
              Find Friends
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-id-card"></i>
              MyProfile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-bell"></i>
              Notifications
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-user-friends"></i>
              MyFriends
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '6' })}
              onClick={() => { this.toggle('6'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-edit"></i>
              MyPosts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '7' })}
              onClick={() => { this.toggle('7'); }}
            ><i style={{ fontSize: 20, width:30}} class="fas fa-edit"></i>
              ForeignAuthors
            </NavLink>
          </NavItem>
        </Nav>
        <Button outline size='sm' className='logout' color="primary" onClick={()=>{this.trylogout()}}>Logout</Button>{' '}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane className='content' tabId="1">
            <Homepage style={{marginTop: 30}} author_state={this.state}/>
          </TabPane>
          <TabPane className='content' tabId="2">
            <Friends author_state={this.state}/>
          </TabPane>
          <TabPane className='content' tabId="3">
            <Profile author_state={this.state} />
          </TabPane>
          <TabPane className='content' tabId="4">
            <Notifications author_state={this.state} />
          </TabPane>
          <TabPane className='content' tabId="5">
            <MyFriends author_state={this.state} />
          </TabPane>
          <TabPane className='content' tabId="6">
            <MyPosts author_state={this.state} />
          </TabPane>
          <TabPane className='content' tabId="7">
            <ForeignAuthors author_state={this.state} />
          </TabPane>
        </TabContent>
      </div>

    
      
    
    );
  }
}

export default App;