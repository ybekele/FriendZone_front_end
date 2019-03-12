
import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;



class Homepage extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    state = {
        collapsed: false,
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }

    
    

    render(){
        return(

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
        
    }
}


export default Homepage;
