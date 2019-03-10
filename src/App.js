import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Input, Button, Form, FormGroup, Label, Col, Spinner } from 'reactstrap';
import './App.css';
import classnames from 'classnames';
import Homepage from './Homepage';
import Friends from './Friends';
import Settings from './Settings';


class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      login: false
    };
  }

  trylogin(){
    this.setState({login:true});
    // console.log(this.state);
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
      return(
        <center>
          <Col sm="6">
            <Form  className='loginForm'>
              <Spinner type="grow" color="primary" />
              <FormGroup>
                <Label for="usernameText">User name</Label>
                <Input name="text" id="usernameText" />
              </FormGroup>
              <FormGroup>
                <Label for="userPassword">Password</Label>
                <Input type="password" name="password" id="userPassword" placeholder="password placeholder" />
              </FormGroup>
              <Button onClick={()=> {this.trylogin();}}>Submit</Button>
            </Form>
          </Col>
        </center>
      );
    };
    return (
      <div>
        <Nav tabs>
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
        <Button outline size='sm' className='logout' color="primary" onClick={()=>{this.setState({login:false});}}>Logout</Button>{' '}
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
