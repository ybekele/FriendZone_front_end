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
                "permission": "",
                "categories": [],
                "unlisted": false,
                "visibleTo": []
            },
            comments: [],
            getComment: true,
        };
    }
    componentDidMount(){
        
    }

    render(){
        console.log("this is the props in posts");
        console.log(this.props.value);
        console.log("this is the ")
        console.log(this.state.data);
        console.log("this is the props being passed")
        console.log(this.props.value[0]);
        this.state.data=this.props.value[0];
        return (
            <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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