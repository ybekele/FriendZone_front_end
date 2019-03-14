import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner, Alert } from 'reactstrap';
import './App.css';
import classnames from 'classnames';
import Homepage from './Homepage';
import Friends from './Friends';
import Settings from './Settings';

// import Pagination from rest_framework;
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Collapse, Card, CardBody, CardTitle, CardText, Row } from 'reactstrap';
import { Layout, Menu, Icon } from 'antd';
import { List, Avatar } from 'antd';


const { Header, Sider, Content } = Layout;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },

  {
    title: 'Ant Design Title 5',
  },
  {
    title: 'Ant Design Title 6',
  },
  {
    title: 'Ant Design Title 7',
  },
  {
    title: 'Ant Design Title 8',
  },
];




var host_url = 'http://127.0.0.1:8000';
host_url = 'https://project-cmput404.herokuapp.com';
var login_url = host_url+'/api/auth/login';
var logout_url = host_url+'/api/auth/logout';
var register_url = host_url+'/api/auth/register';
var getposts_url = host_url+'/api/posts'
//var getposts_url = host_url+'/api/auth/posts'
var gitfeed_url = 'https://api.github.com/users/'
// must put user in the middle
var events_url = '/events'

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

  getItems() {
    fetch('getposts_url') //(+<pk>)
    .then(results => results.json())
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
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

  try_get() {
    
  fetch(getposts_url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'token ' + this.state.token,
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

    //<Menu.Item key="4" className='logout' onClick={()=>{this.trylogout()}}></Menu.Item>
    return (
      <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
          <Icon type="home" />

            <span>Home</span>    
            
          </Menu.Item>
          <Menu.Item key="2" className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
          <Icon type="team" />
            <span>Friends</span>
            
          </Menu.Item>
          <Menu.Item key="3" className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
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
        
        

{/* const {data} = this.props;
const contentList = data.map(post => {
  return(
    <li>{data.title, data.content, data.author}</li>
    */}
    
  {/* )
}) */}
<center>

<Button id = 'refresh' size='sm' color="primary" onClick={()=> {this.try_get();}}>Refresh!</Button>
<Button id='post' size='sm' color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Make Post!</Button>
                
                <Col sm="9">
                    <Collapse isOpen={this.state.collapse}>
                    <Form className="postForm">
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Image URL" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary">Upload from local(not available)</Button>
                                </InputGroupAddon>
                                {/* <InputGroupAddon addonType="append">
                                <Input type="file" name="file" id="exampleFile" />
                                </InputGroupAddon> */}
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                                <option value="">Who can view?</option>
                                <option>Me only</option>
                                <option>Another author</option>
                                <option>My friends</option>
                                <option>Friends of friends</option>
                                <option>Only friends on my host</option>
                                <option value="P">Public</option>
                            </CustomInput>
                            <CustomInput type="select" id="exampleCustomMutlipleSelect" name="customSelect" disabled>
                                <option value="">Which auther can view?</option>
                                <option>Author 1</option>
                                <option>Author 2</option>
                                <option>Author 3</option>
                                <option>Author 4</option>
                                <option>Author 5</option>
                            </CustomInput>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder="Tell us something!" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary" onClick={()=> {this.send_post();}}>Post!</Button>
                                </InputGroupAddon>
                            </InputGroup> 
                        </FormGroup>
                    </Form>
                    </Collapse>
                    <h4>Your available posts:</h4>
                    <Col sm="6">
                        <div>
                        <List
        

        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        /> */}
            
          </List.Item>
          
          
          
          
        )}
        

        
      />
                        </div>
                        
                    </Col>
                    
                </Col>

</center>

      
      
     
      
        </Content>
      </Layout>
    </Layout>

  




    );
    
      }}
    
    

export default App;
