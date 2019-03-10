import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Friends extends Component{
    render(){
        return(
          <Row>
            <Col sm="12">
            <h4>Friends & Request</h4>
            </Col>
            <Col sm="6">
            <Card body>
              <CardTitle>Example</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
        );
        
    }
}

export default Friends;