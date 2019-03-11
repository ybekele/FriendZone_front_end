
import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Post from './Post'

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
                                <option>Public</option>
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
                                <Button color="secondary">Post!</Button>
                                </InputGroupAddon>
                            </InputGroup> 
                        </FormGroup>
                    </Form>
                    </Collapse>
                    <h4>Your available posts:</h4>
                    <Col sm="6">
                        <div>
                            <Post />
                            <Post />
                            <Post />
                            <Post />
                        </div>
                        
                    </Col>
                    
                </Col>
            </center>
            
        );
        
    }
}

export default Homepage;