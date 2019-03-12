import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, Collapse, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class Post extends Component{

    render(){
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Form>
                    <InputGroup>
                        <Input type="textarea" name="text" id="exampleText" placeholder="Leave a comment!" />
                        <InputGroupAddon addonType="append">
                        <Button color="secondary">Post!</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
                <Button>Button</Button>
                </CardBody>
            </Card>
        )
    }
}

export default Post;