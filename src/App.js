import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner } from 'reactstrap';
import './App.css';
import classnames from 'classnames';
import Homepage from './Homepage';
import Friends from './Friends';
import Settings from './Settings';

var host_url = 'http://127.0.0.1:8000';
var login_url = host_url+'/api/auth/login';
var logout_url = host_url+'/api/auth/logout';
var register_url = host_url+'/api/auth/register';

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
    };
  }

  trylogin(){

    // console.log(this.state);

    var data = {"username": "yi", "email":"", "password":"1"};

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
        this.setState({login:true, token: response["token"]});
        console.log(this.state.token);
      }

    })
    .catch(error => console.error('Error:', error));
  }

  trylogout(){

    fetch(logout_url, {
      method: 'POST', // or 'PUT'
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'token '+this.state.token,
      }
    });
    this.setState({login:false});
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
          this.setState({login:true, token: response["token"]});
          console.log(this.state.token);
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
                    <Form  className='registerForm'>
                      <Spinner type="grow" color="primary" />
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
                      <Button onClick={()=> {this.setState({signup:false})}}>Go Back</Button>
                      <Button onClick={()=> {this.tryregister();}}>Sign up</Button>
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
              <Button onClick={()=> {this.trylogin();}}>Submit</Button>
              <Button onClick={()=> {this.setState({signup: true});}}>Sign up</Button>
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
            <Homepage />
          </TabPane>
          <TabPane tabId="2">
            <Friends />
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
