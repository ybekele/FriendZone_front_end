import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner, Alert } from 'reactstrap';
import './App.css';
import classnames from 'classnames';
import Homepage from './Homepage';
import Friends from './Friends';
import Settings from './Settings';

var host_url = 'http://127.0.0.1:8000';
host_url = 'https://project-cmput404.herokuapp.com';
var login_url = host_url+'/api/auth/login';
var logout_url = host_url+'/api/auth/logout';
var register_url = host_url+'/api/auth/register';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      login: true,
      token: 'null',
      signup: false,
      username: 'null',
      githubURL: 'null',
    };
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
      // console.log('Success:', JSON.stringify(response));
      if (response.hasOwnProperty("token")){
        this.setState({login:true, token: response["token"],username:document.getElementById("usernameText").value});
        console.log(this.state.token);
      }else{
        document.getElementById('alert').innerHTML = 'username & password do not match!!!';
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
        if (response.hasOwnProperty("token")){
          this.setState({login:true, token: response["token"],username:document.getElementById("usernameText").value});
          console.log(this.state.token);
        } else{
          document.getElementById('alert').innerHTML = JSON.stringify(response);
        }

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
    if (!this.state.login){
        if (this.state.signup){
            return(
                <center>
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
            <Form  className='loginForm'>
              <Spinner type="grow" color="primary" />
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
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Homepage
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Friends & Requests
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <Button outline size='sm' className='logout' color="primary" onClick={()=>{this.trylogout()}}>Logout</Button>{' '}
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Homepage author_state={this.state}/>
          </TabPane>
          <TabPane tabId="2">
            <Friends author_state={this.state}/>
          </TabPane>
          <TabPane tabId="3">
            <Settings />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default App;


