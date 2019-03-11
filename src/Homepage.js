
import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
class Homepage extends Component{

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    
    toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
    }

    render(){
        return(

               <Layout className="layout">
                    <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">Homepage</Menu.Item>
                        <Menu.Item key="2">Network</Menu.Item>
                        <Menu.Item key="3">Settings</Menu.Item>
                        <Menu.Item> <Button outline size='sm' className='logout' color="primary" onClick={()=>{this.trylogout()}}>Logout</Button>{' '}</Menu.Item>
                    </Menu>
                    
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            
            
        );
        
    }
}

export default Homepage;

