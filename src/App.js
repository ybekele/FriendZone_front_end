import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner, Alert } from 'reactstrap';
import './App.css';
import classnames from 'classnames';
import Homepage from './Homepage';
import Friends from './Friends';
import Settings from './Settings';

import { Layout, Menu, Icon } from 'antd';
import { List, Avatar } from 'antd';

const { Header, Sider, Content } = Layout;




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
    };
  }
 
state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  trylogin(){

    // console.log(this.state);

    var data = {
      "username": document.getElementById("usernameText").value,
      "email":"",
      "password":document.getElementById("userPassword").value,
    };

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
        this.setState({login:true, token: response["token"]});
        console.log(this.state.token);
      }else{
        document.getElementById('alert').innerHTML = 'username & password do not match!!!';
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
    this.setState({login:false, signup:false});
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

  // This is the Sign Up functionality 
  render() {
    if (!this.state.login){
        if (this.state.signup){
            return(
                <center>
                  <Col sm="6">
                  <h1>Sing Up</h1>
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
      <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
          <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
          <Icon type="team" />
            <span>Friends</span>
          </Menu.Item>
          <Menu.Item key="3">
           <Icon type="user" />
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="4" className='logout' onClick={()=>{this.trylogout()}}>
           <Icon type="logout"/>
            <span>Log Out</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        </Header>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          Content
        </Content>
      </Layout>
    </Layout>

  




    );
    
      }}
    
    

export default App;
