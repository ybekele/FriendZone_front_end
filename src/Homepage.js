
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Homepage extends Component{
    render(){
        return(
            <Row>
                <Col sm="12">
                <h4>Homepage</h4>
                </Col>
                <Col sm="6">
                <Card body id = 'card'>
                  <CardTitle>Example</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <Button onClick={
                      ()=>{
                        var card = document.getElementById('card');
                        var item = document.createElement('h1');
                        var content = document.createTextNode('content');
                        item.appendChild(content);
                        card.appendChild(item);
                      }
                  }>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
        );
        
    }
}

export default Homepage;