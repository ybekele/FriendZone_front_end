import React, { Component } from 'react';
import { CardImg, CardSubtitle, CustomInput, InputGroup, InputGroupAddon, Input, Form, FormGroup, CardHeader, Card, CardBody, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Comments from './Comment'
class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:{
                "postid": "",
                "publicationDate": "",
                "title": "title",
                "source": "",
                "origin": "",
                "contentType": "",
                "author": {
                  "url": "",
                  "pk": "",
                  "firstName": null,
                  "lastName": "",
                  "userName": "",
                  "hostName": "",
                  "githubUrl": ""
                },
                "content": "content",
                "images":[],
                "permission": "",
                "categories": [],
                "unlisted": false,
                "visibleTo": []
            },
            comments: [],
            getComment: true,
        };
    }

    render(){
        console.log(this.props.value);
        this.state.data=this.props.value[0];
        return (
            <Card>
                <CardImg top width="100%" src={this.state.data.images[0]['img']} alt="Card image cap" />
                <CardHeader tag="h3">{this.state.data.title}</CardHeader>
                <CardBody>
                    <CardText>{"Author: "+this.state.data.author.userName}</CardText> 
                    <CardText>{this.state.data.content}</CardText>
                    <CardText><Comments data={this.state.data}></Comments></CardText>
                    <Form>
                        <InputGroup>
                            <Input type="textarea" name="text" id="exampleText" placeholder="Leave a comment!" />
                            <InputGroupAddon addonType="append">
                            <Button color="secondary">Post!</Button>
                            </InputGroupAddon>
                        </InputGroup>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default Post;