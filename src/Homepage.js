
import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

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
            <center>
                <Button id='post' size='sm' color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Make Post!</Button>
                
                <Col sm="9">
                    <Collapse isOpen={this.state.collapse}>
                    <Form className="postForm">
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Image URL" />
                                <InputGroupAddon addonType="append">
                                <Input type="file" name="file" id="exampleFile" />
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <Input placeholder="Tell us something!" />
                                <InputGroupAddon addonType="append">
                                <Button color="secondary">Post!</Button>
                                </InputGroupAddon>
                            </InputGroup> 
                        </FormGroup>
                    </Form>
                    </Collapse>
                    <h4>Your available posts:</h4>
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
            </center>
            
        );
        
    }
}

export default Homepage;